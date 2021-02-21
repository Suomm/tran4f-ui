<template>
    <Card title="模组列表" icon="ios-options" :padding="10" style="width: 850px">
        <template slot="extra">
            <Button type="primary" size="small">添加模组</Button>&nbsp;
            <Button type="primary" size="small">重新加载</Button>
        </template>
        <p v-if="modules.length == 0" style="text-align:center">没有可用的模组</p>
        <List size="small">
            <ListItem v-for="e in modules" :key="e.name">
                <ListItemMeta :title="e.name" :description="e.detail" />
                <template slot="action">
                    <li>
                        <Button type="primary" size="small">查看</Button>&nbsp;
                        <Button type="error" size="small">删除</Button>
                    </li>
                </template>
            </ListItem>
        </List>
    </Card>
</template>

<script>
    export default {
        computed: {
            modules() {
                return this.$store.state.configs.modules
            }
        }
    }
</script>