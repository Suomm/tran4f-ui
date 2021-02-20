<template>
    <div>
        <Input placeholder="请输入正则表达式" />
        <br />
        <br />
        <Tag checkable color="success">导入：10</Tag>
        <Tag checkable color="success">匹配：10</Tag>
        <div style="float: right">
            <Button type="primary">添加</Button>&nbsp;
            <Button type="primary">匹配</Button>&nbsp;
            <Button type="primary">规则</Button>&nbsp;
            <Button type="primary">帮助</Button>
        </div>
        <br />
        <br />
        <Card :padding="0" dis-hover bordered style="height: 350px; overflow-y: scroll">
            <CellGroup>
                <Cell v-for="item in cells" :key="item.title" :title="item.title" :selected="item.selected">
                    <Badge dot slot="extra" :count="item.selected ? 1 : 0" />
                </Cell>
            </CellGroup>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cells: [], // 测试正则文件表达式 { title:String selected:boolean }
            }
        }
    }
</script>