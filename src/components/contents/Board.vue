<template>
    <div class="list">
        <RadioGroup v-model="value" size="large" vertical>
            <Collapse class="collapse" simple accordion>
                <Panel v-for="o in items" :key="o.title">
                    {{ o.title }}
                    <div slot="content">
                        <Radio v-for="e in o.children" :key="e.label" :label="e.label" border>
                            <span>{{ e.name }}</span>
                            <span class="detail">{{ e.details }}</span>
                        </Radio>
                    </div>
                </Panel>
            </Collapse>
        </RadioGroup>
        <Button type="primary" @click="$emit('click')" long>进入配置选项</Button>
    </div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                require: true
            },
            items: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        computed: {
            value() {
                return this.$store.state.options[this.name]
            }
        }
    }
</script>

<style scoped>
    /* 操作类选项列表 */
    .list {
        width: 650px;
        height: 450px;
        overflow-y: scroll;
    }

    /* 折叠面板样式 */
    .collapse {
        width: 650px;
        margin-bottom: 10px;
    }
</style>