<template>
    <Form label-position="top">
        <FormItem label="请选择模板文件类型：">
            <RadioGroup size="large" v-model="type">
                <Radio :label="0">
                    <span>配置文件</span>
                </Radio>
                <Radio :label="1">
                    <span>用户设置</span>
                </Radio>
                <Radio :label="2">
                    <span>正则表达式</span>
                </Radio>
                <Radio :label="3">
                    <span>文件夹目录</span>
                </Radio>
                <Radio :label="4">
                    <span>表达式与目录</span>
                </Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="请选择模板文件位置：">
            <Input v-model="fileName" placeholder="请选择模板文件位置" />
            <div class="footer">
                <Button type="primary" @click="open">浏览</Button>&nbsp;
                <Button type="primary" :disabled="fileName == null" @click="reset">导入</Button>&nbsp;
                <Button type="primary" :disabled="fileName == null" @click="output">导出</Button>
            </div>
        </FormItem>
    </Form>
</template>

<script>
    import {
        mapState
    } from 'vuex'

    const {
        dialog
    } = require('electron').remote
    
    export default {
        data() {
            return {
                type: 0,
                fileName: ""
            }
        },
        methods: {
            open() {
                dialog.showOpenDialog({
                    properties: ['openFile'],
                    filters: [{
                        name: 'JSON',
                        extensions: ['json']
                    }]
                }).then(ret => {
                    if (!ret.canceled)
                        this.fileName = ret.filePaths.pop()
                })
            },
            output() {
                let obj = {}
                switch (this.type) {
                    case 0: // 配置文件
                        if (
                            this.options.transferFolder.length == 0 ||
                            this.options.regexDatas.length == 0
                        ) {
                            this.$Message.error({
                                background: true,
                                content: "请按要求完成模板后再导出！"
                            })
                        } else {
                            obj["options"] = this.options
                            obj["configs"] = this.configs
                        }
                        break;
                    case 1: // 用户设置
                        obj["configs"] = this.configs
                        break;
                    case 2: // 正则表达式
                        if (this.options.regexDatas.length == 0) {
                            this.$Message.error({
                                background: true,
                                content: "请按要求完成模板后再导出！"
                            })
                        } else {
                            obj["options"] = {
                                "regexDatas": this.options.regexDatas
                            }
                        }
                        break;
                    case 3: // 文件夹目录
                        if (this.options.transferFolder.length == 0) {
                            this.$Message.error({
                                background: true,
                                content: "请按要求完成模板后再导出！"
                            })
                        } else {
                            obj["options"] = {
                                "transferFolder": this.options.transferFolder,
                                "outputFolderIndices": this.options.outputFolderIndices
                            }
                        }
                        break;
                    case 4: // 表达式与目录
                        if (
                            this.options.transferFolder.length == 0 ||
                            this.options.regexDatas.length == 0
                        ) {
                            this.$Message.error({
                                background: true,
                                content: "请按要求完成模板后再导出！"
                            })
                        } else {
                            obj["options"] = {
                                "transferFolder": this.options.transferFolder,
                                "outputFolderIndices": this.options.outputFolderIndices,
                                "regexDatas": this.options.regexDatas
                            }
                        }
                        break;
                }
                console.log(obj)
            },
            reset() {}
        },
        computed: mapState(['options', 'configs'])
    }
</script>

<style scoped>
    /* 导入模板选项的按钮样式 */
    .footer {
        float: right;
        margin: 10px 0px;
    }
</style>