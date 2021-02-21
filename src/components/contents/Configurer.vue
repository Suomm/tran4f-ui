<template>
    <Form label-position="right" :label-width="100" label-colon>
        <Row>
            <i-col span="12">
                <FormItem label="气泡提示">
                    <i-switch v-model="configs.poptip" size="large">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </i-switch>
                </FormItem>
            </i-col>
            <i-col span="12">
                <FormItem label="任务合并">
                    <Poptip trigger="click" word-wrap width="370" placement="right" content="任务合并" :disabled="!configs.poptip">
                        <InputNumber v-model="configs.merge" :max="1000000000" :min="100" :step="100"
                            :editable="false" />
                    </Poptip>
                </FormItem>
            </i-col>
        </Row>
        <Row>
            <i-col span="12">
                <FormItem label="自动停止">
                    <i-switch v-model="configs.delay" size="large">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </i-switch>
                </FormItem>
            </i-col>
            <i-col span="12">
                <FormItem label="延迟时间">
                    <Poptip trigger="click" word-wrap width="370" placement="right" content="延迟时间" :disabled="!configs.poptip">
                        <InputNumber v-model="configs.time" :disabled="configs.delay" :max="60 * 24" :min="1" :step="1"
                            :editable="false" />
                    </Poptip>
                </FormItem>
            </i-col>
        </Row>
        <Row>
            <i-col span="12">
                <FormItem label="历史记录">
                    <i-switch v-model="configs.history" size="large">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </i-switch>
                </FormItem>
            </i-col>
            <i-col span="12">
                <FormItem label="保存条数">
                    <Poptip trigger="click" word-wrap width="370" placement="right" content="保存条数" :disabled="!configs.poptip">
                        <InputNumber v-model="configs.lines" :disabled="configs.history" :max="10000" :min="10" :step="10"
                            :editable="false" />
                    </Poptip>
                </FormItem>
            </i-col>
        </Row>
        <FormItem label="文件后缀名">
            <Tag v-for="e in configs.suffixes" :key="e" :name="e" closable color="primary" type="border"
                @on-close="handleClose">{{ e }}</Tag>
            <Poptip trigger="click" word-wrap placement="top" width="300" :disabled="!configs.poptip"
                content="添加匹配正则表达式时文件的后缀名，请在此输入合法的文件后缀名（必须以 “\.” 开头），并按回车键确认或点击后面的加号确认。">
                <Input v-model="suffix" icon="ios-add" @on-click="handleAdd" @on-enter="handleAdd" placeholder="文件后缀名"
                    :maxlength="20" size="small" style="width: 120px" />
            </Poptip>
        </FormItem>
    </Form>
</template>

<script>
    export default {
        data() {
            return {
                suffix: ""
            }
        },
        methods: {
            handleAdd() {
                if (!/^\\\.\w+$/.test(this.suffix)) {
                    this.$Message.error({
                        background: true,
                        content: "请输入合法的文件后缀名！"
                    })
                } else if (this.configs.suffixes.indexOf(this.suffix) != -1) {
                    this.$Message.error({
                        background: true,
                        content: "文件后缀名重复了！"
                    })
                } else {
                    this.configs.suffixes.push(this.suffix)
                    this.$Message.success({
                        background: true,
                        content: `您成功添加了名为 ${this.suffix} 文件后缀名`
                    })
                    this.suffix = ""
                }

            },
            handleClose(event, name) {
                console.log(event)
                if (this.configs.suffixes.length == 1) {
                    this.$Message.error({
                        background: true,
                        content: "最后一个文件后缀名不能删去！"
                    })
                } else {
                    let index = this.configs.suffixes.indexOf(name);
                    this.configs.suffixes.splice(index, 1);
                    this.$Message.success({
                        background: true,
                        content: "您成功删除了文件后缀名" + name
                    })
                }
            }
        },
        computed: {
            configs() {
                return this.$store.state.configs
            }
        }
    }
</script>