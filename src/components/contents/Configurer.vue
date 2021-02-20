<template>
    <Form label-position="right" :label-width="100" label-i-colon>
        <Row>
            <i-col span="12">
                <FormItem label="气泡提示">
                    <i-switch v-model="poptip" size="large" :true-value="false" :false-value="true">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </i-switch>
                </FormItem>
            </i-col>
            <i-col span="12">
                <FormItem label="任务合并">
                    <Poptip trigger="click" word-wrap width="370" placement="right" content="任务合并" :disabled="poptip">
                        <InputNumber v-model="merge" :max="1000000000" :min="100" :step="100" :editable="false">
                        </InputNumber>
                    </Poptip>
                </FormItem>
            </i-col>
        </Row>
        <Row>
            <i-col span="12">
                <FormItem label="自动停止">
                    <i-switch v-model="delay" size="large" :true-value="false" :false-value="true">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </i-switch>
                </FormItem>
            </i-col>
            <i-col span="12">
                <FormItem label="延迟时间">
                    <Poptip trigger="click" word-wrap width="370" placement="right" content="延迟时间" :disabled="poptip">
                        <InputNumber v-model="time" :disabled="delay" :max="60 * 24" :min="1" :step="1"
                            :editable="false">
                        </InputNumber>
                    </Poptip>
                </FormItem>
            </i-col>
        </Row>
        <Row>
            <i-col span="12">
                <FormItem label="历史记录">
                    <i-switch v-model="history" size="large" :true-value="false" :false-value="true">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </i-switch>
                </FormItem>
            </i-col>
            <i-col span="12">
                <FormItem label="保存条数">
                    <Poptip trigger="click" word-wrap width="370" placement="right" content="保存条数" :disabled="poptip">
                        <InputNumber v-model="lines" :disabled="history" :max="10000" :min="10" :step="10"
                            :editable="false"></InputNumber>
                    </Poptip>
                </FormItem>
            </i-col>
        </Row>
        <FormItem label="文件后缀名" ref="doc">
            <Tag v-for="item in $store.state.suffixes" :key="item" :name="item" closable color="primary" type="border"
                @on-close="handleClose">{{ item }}</Tag>
            <Poptip trigger="click" word-wrap placement="top" width="300" :disabled="poptip"
                content="添加匹配正则表达式时文件的后缀名，请在此输入合法的文件后缀名（必须以 “\.” 开头），并按回车键确认或点击后面的加号确认。">
                <Input v-model="append" icon="ios-add" @on-click="handleAdd" @on-enter="handleAdd" placeholder="文件后缀名"
                    :maxlength="20" size="small" style="width: 120px" />
            </Poptip>
        </FormItem>
    </Form>
</template>

<script>
    const valid = /^\\\.\w+$/g;
    export default {
        name: "Configurer",
        data() {
            return {
                append: "", // 设置中用户输入的文件后缀名
            }
        },
        methods: {

            handleAdd() {
                if (this.append.length != 0) {
                    valid.lastIndex = 0;
                    if (!valid.test(this.append)) {
                        this.showMsg(false, "请输入合法的文件后缀名！");
                        return false;
                    }

                    for (let i = 0; i < this.settings.suffixes.length; i++) {
                        if (this.settings.suffixes[i] == this.append) {
                            this.showMsg(false, "文件后缀名重复了！");
                            return false;
                        }
                    }

                    this.settings.suffixes.push(this.append);
                    this.showMsg(true, `您成功添加了名为 ${this.append} 文件后缀名`);
                    this.append = "";
                }
            },
            handleClose(event, name) {
                if (this.settings.suffixes.length == 1) {
                    this.showMsg(false, "最后一个文件后缀名不能删去！");
                } else {
                    let index = this.settings.suffixes.indexOf(name);
                    this.settings.suffixes.splice(index, 1);
                    this.showMsg(true, `您成功删除了文件后缀名 ${name}`);
                }
            }
        },
        computed: {
            poptip: {
                get() {
                    return this.$store.state.poptip
                },
                set(val) {
                    this.$store.commit('update', 'poptip', val)
                }
            },
            history: {
                get() {
                    return this.$store.state.history
                },
                set(val) {
                    this.$store.commit('update', 'history', val)
                }
            },
            delay: {
                get() {
                    return this.$store.state.delay
                },
                set(val) {
                    this.$store.commit('update', 'delay', val)
                }
            },
            time: {
                get() {
                    return this.$store.state.time
                },
                set(val) {
                    this.$store.commit('update', 'time', val)
                }
            },
            lines: {
                get() {
                    return this.$store.state.lines
                },
                set(val) {
                    this.$store.commit('update', 'lines', val)
                }
            },
            merge: {
                get() {
                    return this.$store.state.merge
                },
                set(val) {
                    this.$store.commit('update', 'merge', val)
                }
            },
        }
    }
</script>