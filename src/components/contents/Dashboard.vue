<template>
    <div>
        <Tag checkable color="blue">您已经完成了相关的配置，请点击“开始”按钮，系统会帮您完成接下来的文件操作！</Tag>
        <div id="box">
            <transition-group id="msg" name="fade" tag="ul" ref="msg">
                <li v-for="e in list" :style="e.style" :key="e.key">
                    {{ e.value }}
                </li>
                <li :key="-1">&nbsp;</li>
                <li :key="-2">&nbsp;</li>
            </transition-group>
        </div>
        <div class="controller">
            <Button type="primary" :disabled="start" @click="submit">开始</Button>
            &nbsp;
            <Button type="error" :disabled="!start" @click="stop">停止</Button>
            &nbsp;
            <Button type="primary" :disabled="start" @click="clear">清空</Button>
            &nbsp;
            <Button type="warning" :disabled="start || list.length == 0" @click="backups">备份</Button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: []
            }
        },
        methods: {
            submit() {
                this.$emit('on-start')
                this.start = true
            },
            stop() {
                this.$emit('on-stop')
                this.start = false
            },
            clear() {
                if (this.list.length != 0) {
                    this.list = [];
                }
            },
            backups() {
                this.$Message.success({
                    background: true,
                    content: "成功将日志备份到 console.log"
                })
            },
            message(text, type, color) {
                let date = new Date()
                let fmt = date.getFullYear() + '-' +
                    (date.getMonth() + 1) + '-' +
                    date.getDate() + ' ' +
                    date.getHours() + ':' +
                    date.getMinutes() + ':' +
                    date.getSeconds()
                let obj = {
                    key: this.list.length,
                    value: `[${fmt}] [${type}] : ${text}`,
                    style: {
                        "color": color
                    }
                }
                this.list.push(obj)
                let dom = this.$refs.msg.$el
                dom.scrollTop = dom.scrollHeight
            },
            info(text) {
                this.message(text, "INFO", "#515A6E");
            },
            success(text) {
                this.message(text, "SUCCESS", "#00cc6a");
            },
            error(text) {
                this.message(text, "ERROR", "#E81123");
            },
            warning(text) {
                this.message(text, "WARNING", "#ff9900");
            }
        },
        computed: {
            start: {
                get() {
                    return this.$store.state.program.start
                },
                set(val) {
                    this.$store.state.program.start = val
                }
            }
        }
    }
</script>

<style scoped>
    /* 设置li样式（显示的消息） */
    li {
        list-style: none;
        font-size: 13px;
    }

    /* 消息输出窗口样式 */
    #box {
        width: 810px;
        height: 284px;
        margin-top: 10px;
        padding: 10px;
        border: 1px solid gainsboro;
        border-radius: 10px;
        -moz-border-radius: 10px;
        -webkit-border-radius: 10px;
    }

    /* 消息输出窗口的内层窗口（用于展示信息）样式 */
    #msg {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
    }

    /* 控制台消息显示动画 */

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
        transform: translateX(50%);
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s ease;
    }
</style>