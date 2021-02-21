<template>
    <div>
        <Steps :current="steps" style="width: 700px; margin: 20px auto">
            <Step title="匹配文件" content="请匹配需要进行操作的文件"></Step>
            <Step title="选择目录" content="请选择需要操作的文件目录"></Step>
            <Step title="完成操作" content="启动文件的相关操作"></Step>
        </Steps>
        <div class="framework tabs-style">
            <Tabs v-model="index" type="card" name="center">
                <TabPane tab="center">
                    <Entries @on-click="add" />
                </TabPane>
                <TabPane tab="center">
                    <Design @on-cancel="cancel" />
                </TabPane>
                <TabPane tab="center">
                    <Folders />
                </TabPane>
                <TabPane tab="center">
                    <Dashboard @on-start="left=true" @on-stop="left=false"/>
                </TabPane>
            </Tabs>
        </div>
        <ButtonGroup :style="{float: 'right', marginRight: '20px', marginTop: '-45px', position:'relative'}">
            <Button type="primary" @click="pre" :disabled="left">
                <Icon type="ios-arrow-back" />上一步
            </Button>
            <Button type="primary" @click="next" :disabled="right">
                下一步
                <Icon type="ios-arrow-forward" />
            </Button>
        </ButtonGroup>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'

    import Design from './contents/Design.vue'
    import Entries from './contents/Entries.vue'
    import Folders from './contents/Folders.vue'
    import Dashboard from './contents/Dashboard.vue'

    export default {
        data() {
            return {
                left: true,
                right: false,
                steps: 0,
                index: 0
            }
        },
        methods: {
            next() {
                switch (this.steps) {
                    case 0:
                        if (this.options.regexDatas.length == 0) {
                            this.$Message.error({
                                background: true,
                                content: "正则表达式列表不能为空！"
                            });
                        } else {
                            if (this.options.operateMode == 1)
                                this.$store.commit('clear')
                            this.index = 2;
                            this.left = false;
                            this.steps++;
                        }
                        break;
                    case 1:
                        if (
                            this.options.outputFolderIndices.length == 0 &&
                            this.options.operateMode != 1
                        ) {
                            this.$Message.error({
                                background: true,
                                content: "导入文件夹目录不能为空！"
                            });
                        } else if (
                            this.options.transferFolder.length ==
                            this.options.outputFolderIndices.length
                        ) {
                            this.$Message.error({
                                background: true,
                                content: "导出文件夹目录不能为空！"
                            });
                        } else {
                            this.index = 3;
                            this.right = true;
                            this.steps++;
                        }
                        break;
                }
            },
            pre() {
                this.right = false;
                this.steps--;
                switch (this.steps) {
                    case 0:
                        this.index = 0;
                        this.left = true;
                        break;
                    case 1:
                        this.index = 2;
                        break;
                }
            },
            add() {
                this.index = 1;
                this.right = true;
            },
            cancel() {
                this.index = 0;
                this.right = false;
            }
        },
        components: {
            Design,
            Entries,
            Folders,
            Dashboard
        },
        computed: mapState(['options'])
    }
</script>