<template>
    <div>
        <RadioGroup v-model="type" size="large" vertical>
            <div style="float: right">
                <Tag color="primary">匹配源：</Tag>
                <i-switch size="large" v-model="origin" :disabled="type > 1">
                    <span slot="open">文件</span>
                    <span slot="close">目录</span>
                </i-switch>
            </div>
            <Radio :label="0" class="touch">
                <span>预定义表达式</span>
            </Radio>
            <Form :label-width="90" :disabled="type != 0" label-colon>
                <Row :gutter="220">
                    <i-col span="12">
                        <FormItem label="文件名类型" :style="{marginBottom: '5px'}">
                            <Select v-model="item" @on-change="change">
                                <Option v-for="(e, i) in model" :value="i" :key="i">
                                    {{ e }}
                                </Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="文件后缀名" :style="{marginBottom: '5px'}">
                            <Select v-model="suffix" :disabled="!origin">
                                <Option v-for="(e, i) in $store.state.configs.suffixes" :key="i" :value="i">
                                    {{ e }}
                                </Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <Input :placeholder="statement" v-model="title" :disabled="note" />
                </Row>
            </Form>
            <Radio :label="1" class="touch">
                <span>自动生成表达式</span>
            </Radio>
            <Form :disabled="type != 1">
                <Row :gutter="10" :style="{width: '805px'}">
                    <i-col span="22">
                        <Input placeholder="请选择同一类型的一组文件中的一个，将会为您自动生成正则表达式" v-model="fileName" />
                    </i-col>
                    <i-col span="2">
                        <Button type="primary" @click="choose">浏览</Button>
                    </i-col>
                </Row>
            </Form>
            <Radio :label="2" class="touch">
                <span>自定义表达式</span>
            </Radio>
            <Form :disabled="type != 2">
                <Input v-model="regex" placeholder="请输入一个正则表达式" />
            </Form>
            <Radio :label="3" class="touch">
                <span>匹配所有文件</span>
            </Radio>
        </RadioGroup>
        <div class="controller">
            <Button type="primary" @click="accept">确认</Button>&nbsp;
            <Button type="primary" @click="$emit('on-cancel')">取消</Button>
        </div>
    </div>
</template>

<script>
    const STATEMENT_1 = "请输入统一的标题名称和连接符，例如：（标题：）"
    const STATEMENT_2 = "请输入连接符和统一的标题名称，例如：（：标题）"
    const STATEMENT_3 = "请输入统一的文件或目录的名称"
    const STATEMENT_4 = "此选项下不需要再输入额外的内容"

    const DIGIT = "\\d+"
    const LETTER = "[a-zA-Z]+"
    const CHARACTERS = "[\\u4e00-\\u9fa5]+"

    const {
        dialog
    } = require('electron').remote

    export default {
        data() {
            return {
                // 设置正则表达式的类型
                type: 0,
                // 自定义正则表达式选项中的文本框是否可以输入内容
                note: false,
                // 自定义正则表达式选项中的文本框输入的内容
                title: "",
                // 用户自己输入的正则表达式
                regex: "",
                // 添加自定义正则表达式时的文本框输入提示
                statement: STATEMENT_1,
                // 自定义正则表达式匹配类型数组的索引
                item: 0,
                // 文件后缀名数组的索引
                suffix: 0,
                // 操作的匹配源：文件或文件夹
                origin: true,
                // 自动生成正则表达式选项中用户选择的文件名称
                fileName: "",
                // 自定义表达式支持的比配模型
                model: [
                    "标题与姓名",
                    "标题与数字",
                    "姓名与标题",
                    "数字与标题",
                    "唯一文件名",
                    "匹配后缀名",
                    "仅匹配数字",
                    "仅匹配标题"
                ]
            }
        },
        methods: {
            accept() {
                switch (this.type) {
                    case 0: // 用户自定义
                        if (this.item < 5 && this.title.length == 0) {
                            this.$Message.error({
                                background: true,
                                content: "请输入标题名称和连接符！"
                            })
                        } else if (this.item == 5 && !this.origin) {
                            this.$Message.error({
                                background: true,
                                content: "匹配源为文件时才能使用匹配文件名选项！"
                            })
                        } else {
                            let s = "";
                            switch (this.item) {
                                case 0:
                                    s = this.title + CHARACTERS
                                    break;
                                case 1:
                                    s = this.title + DIGIT
                                    break;
                                case 2:
                                    s = CHARACTERS + this.title
                                    break;
                                case 3:
                                    s = DIGIT + this.title
                                    break;
                                case 4:
                                    s = this.title
                                    break;
                                case 5:
                                    s = ".+"
                                    break;
                                case 6:
                                    s = DIGIT
                                    break;
                                case 7:
                                    s = CHARACTERS
                                    break;
                            }
                            if (this.origin)
                                s = s + this.$store.state.configs.suffixes[this.suffix]
                            this.$store.commit('addRegExp', {
                                key: this.model[this.item],
                                value: s
                            })
                            this.$emit('on-cancel')
                        }
                        break;
                    case 1: // 自动生成
                        if (this.fileName.length == 0) {
                            this.$Message.error({
                                background: true,
                                content: "请选择需要生成表达式的文件！"
                            });
                        } else {
                            let a = this.fileName.lastIndexOf('\\')
                            let b = this.fileName.lastIndexOf('.')
                            let s = this.fileName.substring(b)
                            let val = this.fileName.substring(a + 1, b)
                                .replace(/[a-zA-Z]+/g, LETTER)
                                .replace(/\d+/g, DIGIT)
                                .replace(/[\u4e00-\u9fa5]+/g, CHARACTERS)
                            this.$store.commit('addRegExp', {
                                key: "自动匹配",
                                value: val + s
                            })
                            this.$emit('on-cancel')
                        }
                        break;
                    case 2: // 用户输入
                        if (this.regex.length == 0) {
                            this.$Message.error({
                                background: true,
                                content: "请输入正则表达式！",
                            });
                        } else {
                            this.$store.commit('addRegExp', {
                                key: "用户自定义",
                                value: this.regex
                            })
                            this.$emit('on-cancel')
                        }
                        break;
                    case 3: // 匹配全部
                        this.$store.state.program.locked = true
                        this.$store.commit('clearRegExp')
                        this.$emit('on-cancel')
                        break;
                }
            },
            choose() {
                let prop;
                if (this.origin)
                    prop = ['openFile']
                else
                    prop = ['openDirectory']
                dialog.showOpenDialog({
                    properties: prop
                }).then(ret => {
                    if (!ret.canceled)
                        this.fileName = ret.filePaths.pop()
                })
            },
            change(e) {
                this.note = false;
                switch (e) {
                    case 0: // 标题+姓名
                    case 1: // 标题+数字
                        this.statement = STATEMENT_1;
                        break;
                    case 2: // 姓名+标题
                    case 3: // 数字+标题
                        this.statement = STATEMENT_2;
                        break;
                    case 4: // 唯一文件名
                        this.statement = STATEMENT_3;
                        break;
                    default: // 其他情况
                        this.note = true;
                        this.statement = STATEMENT_4;
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    /* 匹配正则表达式时可以点击单选按钮的区域 */
    .touch {
        width: 200px;
        margin: 5px 0 5px 0;
    }
</style>