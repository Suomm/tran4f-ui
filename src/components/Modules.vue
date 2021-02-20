<template>
    <Card
          title="模组列表"
          icon="ios-options"
          :padding="10"
          style="width: 850px"
        >
          <template slot="extra">
            <Button type="primary" size="small">添加模组</Button>&nbsp;
            <Button type="primary" size="small">重新加载</Button>
          </template>
          <List size="small">
            <ListItem v-for="item in modules" :key="item.name">
              <ListItemMeta :title="item.name" :description="item.detail" />
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
    name: 'Modules',
    data() {
        return {
            modules: [
        {
          name: "tran4f.config",
          detail: "应用基本程序框架",
        },
      ],
        }
    }
}
</script>

<style scoped>

</style>