<template>
    <div>
        <Tag checkable color="blue">您已经完成了相关的配置，请点击“开始”按钮，系统会帮您完成接下来的文件操作！</Tag>
        <div id="box">
            <transition-group id="msg" name="fade" tag="ul" ref="msg">
                <li v-for="item in list" :style="item.style" :key="item.key">
                    {{ item.value }}
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
            <Button type="warning" :disabled="start" @click="backups">备份</Button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                start: false,
                list: []
            }
        },
        methods: {
            submit() {
                // let a = this.settings.transferFolder;
                // let b = [...this.settings.outputFolderIndices];
                // let c = this.settings.regexDatas;
                //dataSource.reset();
                // for (let i = 0; i < c.length; i++) {
                //dataSource.pushRegex(c[i].value);
                // }
                // Outer: for (let i = 0; i < a.length; i++) {
                //   let e = a[i];
                //   for (let j = 0; j < b.length; j++) {
                //     let x = b[j];
                //     if (e.key == x) {
                //dataSource.pushOutput(e.value);
                //     b.splice(j--, 1);
                //     continue Outer;
                //   }
                // }
                //dataSource.pushInput(e.value);
                // }

                //dataSource.operateMode = this.settings.operateMode;
                //dataSource.operateMethod = this.settings.operateMethod;
                // this.clear();
                //application.access();
                this.$emit('on-start');
                this.$store.state.program.start = true;
                this.start = true;
            },
            stop() {
                this.$emit('on-stop');
                this.$store.state.program.start = false;
                this.start = false;
                //application.stop();
            },
            clear() {
                if (this.list.length != 0) {
                    this.list = [];
                }
            },
            backups() {
                if (this.list.length == 0) {
                    this.showMsg(false, "控制台中暂无日志输出无法备份！");
                } else {
                    //application.backup(this.list);
                    this.showMsg(true, "成功将日志备份到 console.log");
                }
            },
            message(date, text, type) {
                let obj = {
                    key: this.list.length,
                    value: `[${date}] [${type}] : ${text}`,
                    style: null,
                };
                this.list.push(obj);
                let dom = this.$refs.msg.$el;
                dom.scrollTop = dom.scrollHeight;
            },
            info(date, text) {
                this.message(date, text, "info", "#515A6E");
            },
            success(date, text) {
                this.message(date, text, "success", "#00cc6a");
            },
            error(date, text) {
                this.message(date, text, "error", "#E81123");
            },
            warning(date, text) {
                this.message(date, text, "warning", "#ff9900");
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
        border: 1px solid gainsboro;
        border-radius: 10px;
        -moz-border-radius: 10px;
        -webkit-border-radius: 10px;
    }

    /* 消息输出窗口的内层窗口（用于展示信息）样式 */
    #msg {
        width: 700px;
        height: 194px;
        margin: 10px;
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