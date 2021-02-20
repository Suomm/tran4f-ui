<template>
    <div>
        <Input search enter-button="浏览" placeholder="请选择配置文件" />
        <br />
        <Table border :columns="columns" :data="data" :max-height="400" highlight-row size="small"
            no-data-text="请选择导入配置文件"></Table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                columns: [{
                        title: "项目",
                        key: "name",
                        resizable: true,
                        width: 180,
                    },
                    {
                        title: "信息",
                        key: "detail",
                        type: "html",
                        render: (h, params) => {
                            return h(
                                "div", {
                                    props: {},
                                },
                                params.row.detail
                            );
                        },
                    },
                ],
                data: [], // 配置文件信息 { name:String detial:String } <br>换行
            }
        }
    }
</script>