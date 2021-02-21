<template>
    <div>
        <Transfer :data="$store.state.options.transferFolder" 
            :target-keys="$store.state.options.outputFolderIndices"
            :list-style="{ height: '330px', width: '374px' }" 
            :titles="['导出文件夹目录', '导入文件夹目录']" ref="transfer"
            :filterable="true" :filter-method="filterMethod" 
            :render-format="format" @on-change="handleChange">
            <div class="blank"></div>
        </Transfer>
        <div class="left">
            <Button type="primary" size="small" @click="left_push">添加</Button>
            &nbsp;
            <Button type="primary" size="small" @click="left_remove">删除</Button>
        </div>
        <div class="right">
            <Button type="primary" size="small" @click="right_push">添加</Button>
            &nbsp;
            <Button type="primary" size="small" @click="right_remove">删除</Button>
        </div>
    </div>
</template>

<script>
    const {
        dialog
    } = require('electron').remote;

    export default {
        methods: {
            handleChange(newTargetKeys) {
                this.$store.state.options.outputFolderIndices = newTargetKeys
            },
            filterMethod(data, query) {
                return data.value.indexOf(query) > -1;
            },
            format(item) {
                return "<span title='" + item.value + "'>" + item.value + "</span>";
            },
            left_push() {
                dialog.showOpenDialog({
                    title: "请选择导入文件夹目录",
                    properties: ['openDirectory']
                }).then(ret => {
                    if (!ret.canceled) {
                        this.$store.commit('push', {
                            key: this.transferFolder.length,
                            value: ret.filePaths.pop()
                        });
                    }
                });
            },
            left_remove() {
                this.$store.commit('remove', this.$refs.transfer.leftCheckedKeys)
            },
            right_push() {
                if (this.operateMode == 1) {
                    this.$Message.error({
                        background: true,
                        content: "在“删除”模式下您不能向“导出文件夹目录”中添加文件夹目录！",
                    });
                } else {
                    let ret = dialog.showOpenDialog({
                        title: "请选择导出文件夹目录",
                        properties: ['openDirectory']
                    });
                    if (!ret.canceled) {
                        this.$store.commit('push', {
                            key: this.transferFolder.length,
                            value: ret.filePaths.pop(),
                        });
                        this.$store.state.outputFolderIndices.push(parent.data.length - 1);
                    }
                }
            },
            right_remove() {
                // var parent = this.$refs.transfer;
                // let keys = [...parent.rightCheckedKeys];
                // _delete(parent.data, parent.rightCheckedKeys, function (a, b) {
                //   return a.key == b;
                // });
                // _delete(parent.targetKeys, keys, function (a, b) {
                //   return a == b;
                // });
            },
        }
    }
</script>

<style scoped>
    /* 穿梭框下脚占位样式（不用做显示） */
    .blank {
        height: 25px;
        width: 85px;
        margin: 5px;
    }

    /* 穿梭框左右小按钮的样式 */

    .left {
        float: left;
        position: relative;
        z-index: 1;
        margin: -30px 0 0 275px;
    }

    .right {
        float: right;
        position: relative;
        z-index: 1;
        margin: -30px 10px 0 0;
    }
</style>