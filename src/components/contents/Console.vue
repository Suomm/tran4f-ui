<template>
    <Row :gutter="10">
        <i-col span="20" style="height: 450px; overflow-y: scroll">
            <Timeline>
                <transition-group name="fade">
                    <TimelineItem v-for="(e, i) in contents" :key="i + 1" :color="e.level">
                        {{ e.message }}
                    </TimelineItem>
                </transition-group>
            </Timeline>
        </i-col>
        <i-col span="1">
            <Divider type="vertical" style="height: 450px" />
        </i-col>
        <i-col span="3">
            <Button type="primary" @click="contents = []">更新</Button>
            <br />
            <br />
            <Button type="warning" @click="contents = []">清空</Button>
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
                contents: []
            }
        }
    }
</script>