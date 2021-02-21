<template>
    <Row :gutter="20">
        <i-col span="5">
            <Menu width="auto" :active-name="0" @on-select="i => {index = i; drawer = false;}">
                <MenuGroup title="文件">
                    <MenuItem :name="0">操作模式</MenuItem>
                    <MenuItem :name="1">复制方式</MenuItem>
                    <MenuItem :name="2">扩展操作</MenuItem>
                    <MenuItem :name="3">文件整合</MenuItem>
                    <MenuItem :name="4">文件加密</MenuItem>
                </MenuGroup>
                <MenuGroup title="选项">
                    <MenuItem :name="5">模板设置</MenuItem>
                    <MenuItem :name="6">其它选项</MenuItem>
                </MenuGroup>
            </Menu>
        </i-col>
        <i-col span="19">
            <div class="framework menu-style">
                <Drawer v-model="drawer" title="请在下面配置操作方式" :closable="false" :mask-closable="false" :width="700"
                    :scrollable="true" :transfer="false" :inner="true" :mask-style="{ backgroundColor: 'transparent' }">
                    <p>{{ argument.detail }}</p>
                    <br />
                    <Input type="textarea" v-model="argument.format" :autosize="{ minRows: 10, maxRows: 15 }" />
                    <br />
                    <br />
                    <Button type="primary" @click="drawer = false" long>返回设置</Button>
                </Drawer>
                <Tabs v-model="index" type="card" name="settings">
                    <TabPane tab="settings">
                        <Mode />
                    </TabPane>
                    <TabPane tab="settings">
                        <Board name="operateMethod" :items="service.operator" @click="open" />
                    </TabPane>
                    <TabPane tab="settings">
                        <Board name="sequenceMethod" :items="service.sequence" @click="open" />
                    </TabPane>
                    <TabPane tab="settings">
                        <Board name="integrateMethod" :items="service.integrate" @click="open" />
                    </TabPane>
                    <TabPane tab="settings">
                        <Board name="encryptMethod" :items="service.encrypt" @click="open" />
                    </TabPane>
                    <TabPane tab="settings">
                        <Templet />
                    </TabPane>
                    <TabPane tab="settings">
                        <Configurer />
                    </TabPane>
                </Tabs>
            </div>
        </i-col>
    </Row>
</template>

<script>
    import Mode from "./contents/Mode.vue";
    import Board from "./contents/Board.vue";
    import Templet from "./contents/Templet.vue";
    import Configurer from "./contents/Configurer.vue";

    export default {
        data() {
            return {
                index: 0,
                drawer: false,
                argument: {
                    detail: "",
                    format: ""
                }
            }
        },
        methods: {
            open() {
                this.drawer = true
            }
        },
        computed: {
            service() {
                return this.$store.state.service
            }
        },
        components: {
            Mode,
            Board,
            Templet,
            Configurer
        }
    }
</script>