<template>
    <Row :gutter="10">
        <i-col span="20" style="height: 450px; overflow-y: scroll">
            <Timeline>
                <transition-group name="fade">
                    <TimelineItem v-for="(item, i) in collect" :key="i + 1" :color="item.level">{{ item.message }}
                    </TimelineItem>
                </transition-group>
            </Timeline>
        </i-col>
        <i-col span="1">
            <Divider type="vertical" style="height: 450px" />
        </i-col>
        <i-col span="3">
            <Button type="primary" @click="console.log('……')">更新</Button>
            <br />
            <br />
            <Button type="warning" @click="collect = []">清空</Button>
            <br />
            <br />
            <Button>导入</Button>
            <br />
            <br />
            <Button>导出</Button>
        </i-col>
    </Row>
</template>

<script>
    export default {
        data() {
            return {
                collect: [], // 内部控制器内容
            }
        }
    }
</script>