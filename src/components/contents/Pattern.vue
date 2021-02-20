<template>
    <div>
        <RadioGroup v-model="type" size="large" :value="0" vertical>
            <div style="float: right">
                <Tag color="primary">匹配源：</Tag>
                <i-switch size="large" v-model="origin">
                    <span slot="open">文件</span>
                    <span slot="close">目录</span>
                </i-switch>
            </div>
            <Radio :label="0" class="touch">
                <span>预定义表达式</span>
            </Radio>
            <Form :label-width="90" :disabled="type != 0">
                <Row :gutter="220" class-name="row">
                    <i-col span="12">
                        <FormItem label="文件名类型:">
                            <Select v-model="item" @on-change="selectChange">
                                <Option v-for="(element, i) in values" :value="i" :key="i">{{ element }}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="文件后缀名:">
                            <Select v-model="rear" :disabled="!origin">
                                <Option v-for="(element, i) in $store.state.suffixes" :key="i" :value="i">{{ element }}
                                </Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </Row>
                <Row class-name="row">
                    <Input :placeholder="statement" v-model="title" :disabled="notInput" />
                </Row>
            </Form>
            <Radio :label="1" class="touch">
                <span>自动生成表达式</span>
            </Radio>
            <Form :disabled="type != 1">
                <Row :gutter="10" class-name="row" style="width: 805px">
                    <i-col span="22">
                        <Input placeholder="请选择同一类型的一组文件中的一个系统，将会为您自动生成正则表达式" v-model="fileName" />
                    </i-col>
                    <i-col span="2">
                        <Button type="primary" @click="read">浏览</Button>
                    </i-col>
                </Row>
            </Form>
            <Radio :label="2" class="touch">
                <span>自定义表达式</span>
            </Radio>
            <Form :disabled="type != 2">
                <Row class-name="row">
                    <Input v-model="regex" placeholder="请输入一个正确的正则表达式" />
                </Row>
            </Form>
            <Radio :label="3" class="touch">
                <span>匹配所有文件</span>
            </Radio>
        </RadioGroup>
        <div style="">
            <Button type="primary" @click="accept">确认</Button>&nbsp;
            <Button type="primary" @click="cancel">取消</Button>
        </div>
    </div>
</template>

<script>
    const STATEMENT_1 = "请输入统一的标题名称和连接符，例如：（标题：）";
    const STATEMENT_2 = "请输入连接符和统一的标题名称，例如：（：标题）";
    const STATEMENT_3 = "请输入统一的文件或目录的名称";
    const STATEMENT_4 = "此选项下不需要再输入额外的内容";
    const WHOLE = {
        key: "匹配全部",
        value: ".+",
    };
    export default {
        data() {
            return {
                notInput: false, // 自定义正则表达式选项中的文本框是否可以输入内容
                title: "", // 自定义正则表达式选项中的文本框输入的内容
                regex: "", // 用户自己输入的正则表达式
                statement: STATEMENT_1, // 添加自定义正则表达式时的文本框输入提示
                item: 0, // 自定义正则表达式匹配类型数组的索引
                rear: 0, // 文件后缀名数组的索引
                origin: true, // 操作的匹配源：文件或文件夹
                type: 0, // 设置正则表达式的类型
                fileName: "", // 自动生成正则表达式选项中用户选择的文件名称
                lock: false, // 是否开启了匹配全部文件的选项
                values: [
                    "标题与姓名",
                    "标题与数字",
                    "姓名与标题",
                    "数字与标题",
                    "唯一文件名",
                    "匹配后缀名",
                    "仅匹配数字",
                    "仅匹配标题",
                ],
            }
        },
        methods: {
            accept() {
                switch (this.type) {
                    case 0: // 用户自定义
                        if (this.item < 5 && this.title.length == 0) {
                            this.$Message.error({
                                background: true,
                                content: "请输入标题名称和连接符！",
                            });
                        } else if (this.item == 5 && !this.origin) {
                            this.$Message.error({
                                background: true,
                                content: "匹配源为文件时才能使用匹配文件名选项！",
                            });
                        } else {
                            // let a = //application.getCustomData(
                            //   this.item,
                            //   this.settings.suffixes[this.rear],
                            //   this.title
                            // );
                            // let a = "";
                            // _push(this.regexDatas, {
                            //   key: this.values[this.item],
                            //   value: a,
                            // });
                            this.cancel();
                        }
                        break;
                    case 1: // 自动生成
                        if (this.fileName.length == 0) {
                            this.$Message.error({
                                background: true,
                                content: "请选择需要生成表达式的文件！",
                            });
                        } else {
                            // let a = "";
                            // let a = application.getAutoData();
                            // _push(this.regexDatas, {
                            //   key: "自动匹配",
                            //   value: a,
                            // });
                            this.cancel();
                        }
                        break;
                    case 2: // 用户输入
                        if (this.regex.length == 0) {
                            this.$Message.error({
                                background: true,
                                content: "请输入正则表达式！",
                            });
                        } else {
                            // _push(this.regexDatas, {
                            //   key: "用户自定义",
                            //   value: this.regex,
                            // });
                            this.cancel();
                        }
                        break;
                    case 3: // 匹配全部
                        this.lock = true;
                        this.regexDatas.splice(0, this.regexDatas.length);
                        this.regexDatas.push(WHOLE);
                        this.cancel();
                        break;
                }
            },
            cancel() {
                this.index = 0;
                this.right = false;
            },
            read() {
                let a = "";
                if (this.origin) {
                    // a = application.openFileChooser();
                } else {
                    // a = application.openDirectoryChooser();
                }

                if (a.length != 0) {
                    this.fileName = a;
                }
            },
            selectChange(e) {
                this.notInput = false;
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
                    default:
                        // 其他
                        this.statement = STATEMENT_4;
                        this.notInput = true;
                        break;
                }
            },
        }
    }
</script>