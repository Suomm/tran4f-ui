<template>
    <Row :gutter="20">
        <i-col span="5">
            <Menu width="auto" :active-name="0" @on-select="i => index = i">
                <MenuGroup title="内置工具">
                    <MenuItem :name="0">配置文件查看器</MenuItem>
                    <MenuItem :name="1">正则编写校正器</MenuItem>
                    <MenuItem :name="2">操作记录比较器</MenuItem>
                </MenuGroup>
                <MenuGroup title="拓展工具">
                    <MenuItem :name="3">加密文件查看器</MenuItem>
                    <MenuItem :name="4">程序控制查看器</MenuItem>
                </MenuGroup>
            </Menu>
        </i-col>
        <i-col span="19">
            <div class="framework menu-style">
                <Tabs v-model="index" type="card" name="tools">
                    <TabPane tab="tools">
                        <Contrast />
                    </TabPane>
                    <TabPane tab="tools">
                        <Matcher />
                    </TabPane>
                    <TabPane tab="tools">
                        <History />
                    </TabPane>
                    <TabPane tab="tools">
                        <Driver />
                    </TabPane>
                    <TabPane tab="tools">
                        <Console />
                    </TabPane>
                </Tabs>
            </div>
        </i-col>
    </Row>
</template>

<script>
    import Driver from './contents/Driver.vue'
    import Console from './contents/Console.vue'
    import History from './contents/History.vue'
    import Matcher from './contents/Matcher.vue'
    import Contrast from './contents/Contrast.vue'

    export default {
        data() {
            return {
                index: 0
            }
        },
        components: {
            Driver,
            Console,
            History,
            Matcher,
            Contrast
        }
    }
</script>