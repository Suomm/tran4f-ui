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
            <Tag v-show="complete" color="blue">您已成功导入{{ path }}</Tag>
            <Input v-model="path" placeholder="请选择模板文件位置" />
            <div class="footer">
                <Button type="primary" @click="openFile">浏览</Button>&nbsp;
                <Button type="primary" :disabled="path == null" @click="reset">导入</Button>&nbsp;
                <Button type="primary" :disabled="path == null" @click="output">导出</Button>
            </div>
        </FormItem>
    </Form>
</template>

<script>
    const valid = /.+\.json$/g;
    export default {
        name: "Templet",
        data() {
            return {
                type: 0,
                path: null,
                complete: false
            }
        },
        methods: {
            openFile() {
                // let a = application.openJSONChooser();
                let a = "";
                if (a.length == 0 || !valid.test(a)) {
                    this.showMsg(false, "您选择的JSON文件有误！");
                } else {
                    this.path = a;
                }
            },
            output() {
                let obj = {};
                switch (this.type) {
                    case 0: // 配置文件
                        if (
                            this.settings.transferFolder.length == 0 ||
                            this.settings.regexDatas.length == 0
                        ) {
                            this.showMsg(false, "请按要求完成模板后再导出！");
                        } else {
                            obj = this.settings;
                        }
                        break;
                    case 1: // 用户设置
                        obj.operateMethod = this.settings.operateMethod;
                        obj.operateMode = this.settings.operateMode;
                        obj.suffixes = this.settings.suffixes;
                        obj.poptip = this.settings.poptip;
                        break;
                    case 2: // 正则表达式
                        if (this.settings.regexDatas.length == 0) {
                            this.showMsg(false, "请按要求完成模板后再导出！");
                        } else {
                            obj.regexDatas = this.settings.regexDatas;
                        }
                        break;
                    case 3: // 文件夹目录
                        if (this.settings.transferFolder.length == 0) {
                            this.showMsg(false, "请按要求完成模板后再导出！");
                        } else {
                            obj.transferFolder = this.settings.transferFolder;
                            obj.outputFolderIndices = this.settings.outputFolderIndices;
                        }
                        break;
                    case 4: // 表达式与目录
                        if (
                            this.settings.transferFolder.length == 0 ||
                            this.settings.regexDatas.length == 0
                        ) {
                            this.showMsg(false, "请按要求完成模板后再导出！");
                        } else {
                            obj.transferFolder = this.settings.transferFolder;
                            obj.outputFolderIndices = this.settings.outputFolderIndices;
                            obj.regexDatas = this.settings.regexDatas;
                        }
                        break;
                }
                // application.writeJSON(JSON.stringify(obj));
                this.complete = true;
            },
            reset() {
                try {
                    // this.readJSON(application.toJSONString());
                    let obj = JSON.parse({});
                    for (var i in obj) {
                        this.settings[i] = obj[i];
                    }
                    this.complete = true;
                } catch (e) {
                    this.showMsg(false, "这不是一个有效的JSON文件！");
                }
            },
        }
    }
</script>

<style scoped>
    /* 导入模板选项的按钮样式 */
    .footer {
        float: right;
        margin: 10px 0px;
    }
</style>