<template>
    <div>
        <Table height="320" width="810" :columns="columns" :data="$store.state.regexDatas" size="small"
            @on-row-click="select" ref="selection" no-data-text="暂无文件匹配表达式" tooltip-theme="light"></Table>
        <div :style="group">
            <Button type="primary" @click="add">添加表达式</Button>&nbsp;
            <Button type="primary" @click="remove">删除表达式</Button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                columns: [{
                        type: "selection",
                        width: 60,
                        align: "center",
                    },
                    {
                        title: "类型",
                        key: "key",
                        width: 120,
                        sortable: true,
                        tooltip: true,
                    },
                    {
                        title: "正则表达式",
                        width: 640,
                        key: "value",
                        tooltip: true,
                    },
                ],
            }
        },
        methods: {
            select(e, i) {
                console.log(e);
                this.$refs.selection.toggleSelect(i);
            },
            add() {
                this.lock = this.lock && this.regexDatas.length != 0;
                if (!this.lock) {
                    this.index = 1;
                    this.right = true;
                } else {
                    this.$Message.error({
                        background: true,
                        content: "您开启了‘匹配全部’模式，不能再添加正则表达式了！",
                    });
                }
            },
            remove() {
                this.$store.commit('delRegExp', this.$refs.selection.getSelection());
                //   _delete(
                //     this.regexDatas,
                //     this.$refs.selection.getSelection(),
                //     function (a, b) {
                //       return a.key === b.key && a.value === b.value;
                //     }
                //   );
            },
        }
    }
</script>

<style scoped>
    /* 匹配正则表达式时可以点击单选按钮的区域 */
    .touch {
        width: 200px;
        margin: 5px 0 5px 0;
    }

    /* 用于添加正则表达式页面的行缩进 */
    .row {
        margin: 3px 0;
        left: 20px;
    }
</style>