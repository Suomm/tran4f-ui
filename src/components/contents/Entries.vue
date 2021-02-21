<template>
    <div>
        <Table height="320" width="810" :columns="columns" 
            :data="$store.state.options.regexDatas" size="small"
            @on-row-click="select" ref="selection" no-data-text="暂无文件匹配表达式" tooltip-theme="light"></Table>
        <div class="controller">
            <Button type="primary" @click="$emit('on-click')">
                添加表达式
            </Button>
            &nbsp;
            <Button type="primary" @click="$store.commit('delRegExp', $refs.selection.getSelection())">
                删除表达式
            </Button>
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
                    }
                ]
            }
        },
        methods: {
            select(e, i) {
                console.log(e);
                this.$refs.selection.toggleSelect(i);
            }
        }
    }
</script>