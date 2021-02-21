<template>
    <div>
        <Input search enter-button="选择" @on-search="driver = true" placeholder="选择解密驱动" />
        <br />
        <Input search enter-button="浏览" @on-search="driver = true" placeholder="浏览文件位置" />
        <br />
        <Input search enter-button="浏览" @on-search="driver = true" placeholder="浏览导出位置" />
        <br />
        <Button type="primary" long>确定</Button>
        <Modal v-model="driver" :mask-closable="false" :scrollable="true" title="请选择驱动类" ok-text="确定" cancel-text="取消">
            <AutoComplete v-model="name" :data="data" :clearable="true" :filter-method="filterMethod"
                placement="bottom-start" placeholder="在此选择解密驱动类">
                <p v-if="data.length == 0" style="padding: 5px 16px">没有加载到驱动类</p>
            </AutoComplete>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                name: "",
                driver: false
            }
        },
        methods: {
            filterMethod(value, option) {
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            }
        }
    }
</script>