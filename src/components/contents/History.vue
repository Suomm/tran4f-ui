<template>
    <Table size="small" :max-height="450" :columns="columns" :data="data" border highlight-row no-data-text="暂无历史记录">
    </Table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [{
                        title: "文件名",
                        key: "name",
                        render: (h, params) => {
                            return h("div", [
                                h("Icon", {
                                    props: {
                                        type: "person",
                                    },
                                }),
                                h("strong", params.row.name),
                            ]);
                        },
                    },
                    {
                        title: "状态",
                        key: "state",
                        width: 70,
                    },
                    {
                        title: "选项",
                        key: "action",
                        width: 200,
                        align: "center",
                        render: (h) => {
                            return h("div", [
                                h(
                                    "Button", {
                                        props: {
                                            type: "primary",
                                            size: "small",
                                        },
                                        style: {
                                            marginRight: "5px",
                                        },
                                        on: {
                                            click: () => {},
                                        },
                                    },
                                    "查看"
                                ),
                                h(
                                    "Button", {
                                        props: {
                                            type: "primary",
                                            size: "small",
                                        },
                                        style: {
                                            marginRight: "5px",
                                        },
                                        on: {
                                            click: () => {},
                                        },
                                    },
                                    "载入"
                                ),
                                h(
                                    "Button", {
                                        props: {
                                            type: "error",
                                            size: "small",
                                        },
                                        on: {
                                            click: () => {},
                                        },
                                    },
                                    "删除"
                                ),
                            ]);
                        },
                    },
                ],
                data: [], // 历史记录回看 { name:String state:String }
            }
        }
    }
</script>