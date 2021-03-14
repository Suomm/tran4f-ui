<template>
    <div>
        <Divider orientation="left" size="small">请在下方修改操作模式</Divider>
        <RadioGroup vertical size="large" v-model="$store.state.options.operateMode"
            style="width: 640px; height: 400px; overflow-y: scroll">
            <Radio v-for="(e, i) in $store.state.service.mode" :key="e.name" :label="i" border class="option">
                <span>{{ e.name }}</span>
                <span class="detail">{{ e.detail }}</span>
            </Radio>
        </RadioGroup>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>
    /* 操作模式的选项样式 */
    .option {
        width: 640px;
        margin-bottom: 10px;
    }
</style>