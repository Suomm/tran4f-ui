<template>
    <!-- tran4f UI 主界面 -->
    <div id="panel">
        <!-- 顶部 -->
        <TabBar />
        <!-- 主体 -->
        <Tabs id="content" name="MenuBar">
            <TabPane tab="MenuBar" label="文件操作" icon="md-list-box">
                <Home @start="state=true" @stop="state=false" />
            </TabPane>
            <TabPane tab="MenuBar" label="用户设置" :disabled="state" icon="md-build">
                <Settings />
            </TabPane>
            <TabPane tab="MenuBar" label="实用工具" :disabled="state" icon="md-pricetags">
                <Tools />
            </TabPane>
            <TabPane tab="MenuBar" label="模组列表" :disabled="state" icon="md-card">
                <Modules />
            </TabPane>
            <TabPane tab="MenuBar" label="关于我们" :disabled="state" icon="md-contact">
                <Contact />
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import Home from "./components/Home.vue"
    import Tools from "./components/Tools.vue"
    import TabBar from "./components/TabBar.vue"
    import Contact from "./components/Contact.vue"
    import Modules from "./components/Modules.vue"
    import Settings from "./components/Settings.vue"

    export default {
        data() {
            return {
                state: false
            }
        },
        components: {
            Home,
            Tools,
            TabBar,
            Contact,
            Modules,
            Settings
        }
    }
</script>

<style scoped>
    /* 主界面的设置 */
    #panel {
        width: 920px;
        height: 580px;
        overflow: hidden;
        border: 1px solid #2d8cf0;
    }

    /* 用户操作区域的主要设置 */
    #content {
        width: 860px;
        height: 520px;
        overflow: hidden;
        margin: 5px auto;
    }
</style>