<template>
  <div>
    <Steps :current="steps" style="width: 700px; margin: 20px auto">
      <Step title="匹配文件" content="请匹配需要进行操作的文件"></Step>
      <Step title="选择目录" content="请选择需要操作的文件目录"></Step>
      <Step title="完成操作" content="启动文件的相关操作"></Step>
    </Steps>
    <div class="framework tabs-style">
      <Tabs v-model="index" type="card" name="center">
        <TabPane tab="center">
          <Table
            height="320"
            width="810"
            :columns="columns"
            :data="$store.state.regexDatas"
            size="small"
            @on-row-click="select"
            ref="selection"
            no-data-text="暂无文件匹配表达式"
            tooltip-theme="light"
          ></Table>
          <div :style="group">
            <Button type="primary" @click="add">添加表达式</Button>&nbsp;
            <Button type="primary" @click="remove">删除表达式</Button>
          </div>
        </TabPane>
        <TabPane tab="center">
          <RadioGroup
            v-model="type"
            size="large"
            :value="0"
            vertical
          >
            <div style="float: right">
              <Tag color="primary">匹配源：</Tag>
              <i-switch size="large" v-model="origin">
                <span slot="open">文件</span>
                <span slot="close">目录</span>
              </i-switch>
            </div>
            <Radio :label="0" class="touch">
              <span>预定义表达式</span>
            </Radio>
            <Form :label-width="90" :disabled="type != 0">
              <Row :gutter="220" class-name="row">
                <i-col span="12">
                  <FormItem label="文件名类型:">
                    <Select v-model="item" @on-change="selectChange">
                      <Option
                        v-for="(element, i) in values"
                        :value="i"
                        :key="i"
                        >{{ element }}</Option
                      >
                    </Select>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="文件后缀名:">
                    <Select v-model="rear" :disabled="!origin">
                      <Option
                        v-for="(element, i) in $store.state.suffixes"
                        :key="i"
                        :value="i"
                        >{{ element }}</Option
                      >
                    </Select>
                  </FormItem>
                </i-col>
              </Row>
              <Row class-name="row">
                <Input
                  :placeholder="statement"
                  v-model="title"
                  :disabled="notInput"
                />
              </Row>
            </Form>
            <Radio :label="1" class="touch">
              <span>自动生成表达式</span>
            </Radio>
            <Form :disabled="type != 1">
              <Row :gutter="10" class-name="row" style="width: 805px">
                <i-col span="22">
                  <Input
                    placeholder="请选择同一类型的一组文件中的一个系统，将会为您自动生成正则表达式"
                    v-model="fileName"
                  />
                </i-col>
                <i-col span="2">
                  <Button type="primary" @click="read">浏览</Button>
                </i-col>
              </Row>
            </Form>
            <Radio :label="2" class="touch">
              <span>自定义表达式</span>
            </Radio>
            <Form :disabled="type != 2">
              <Row class-name="row">
                <Input
                  v-model="regex"
                  placeholder="请输入一个正确的正则表达式"
                />
              </Row>
            </Form>
            <Radio :label="3" class="touch">
              <span>匹配所有文件</span>
            </Radio>
          </RadioGroup>
          <div :style="group">
            <Button type="primary" @click="accept">确认</Button>&nbsp;
            <Button type="primary" @click="cancel">取消</Button>
          </div>
        </TabPane>
        <TabPane tab="center">
          <Transfer
            :data="$store.state.transferFolder"
            :target-keys="$store.state.outputFolderIndices"
            :list-style="{ height: '330px', width: '374px' }"
            :titles="['导出文件夹目录', '导入文件夹目录']"
            ref="files"
            :filterable="true"
            :filter-method="filterMethod"
            :render-format="format"
            @on-change="handleChange"
          >
            <div class="blank"></div>
          </Transfer>
          <div class="left">
            <Button type="primary" size="small" @click="left_push">添加</Button>
            &nbsp;
            <Button type="primary" size="small" @click="left_remove">删除</Button>
          </div>
          <div class="right">
            <Button type="primary" size="small" @click="right_push">添加</Button>
            &nbsp;
            <Button type="primary" size="small" @click="right_remove">删除</Button>
          </div>
        </TabPane>
        <TabPane tab="center">
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
            <div :style="group">
              <Button type="primary" :disabled="start" @click="submit">开始</Button>
              &nbsp;
              <Button type="error" :disabled="!start" @click="stop">停止</Button>
              &nbsp;
              <Button type="primary" :disabled="start" @click="clear">清空</Button>
              &nbsp;
              <Button type="warning" :disabled="start" @click="backups">备份</Button>
            </div>
            <!-- <Modal
            v-model="prompt"
            title="文件复制过程中发生异常"
            :closable="false"
            :mask-closable="false"
            ok-text="继续"
            cancel-text="停止"
            @on-ok="proceed"
            @on-cancel="stop"
          >
            <p>{{ content }}</p>
          </Modal> -->
          </div>
        </TabPane>
      </Tabs>
    </div>
    <ButtonGroup
      :style="{
        float: 'right',
        marginRight: '20px',
        marginTop: '-45px',
        position: 'relative',
      }"
    >
      <Button type="primary" @click="previous" :disabled="left">
        <Icon type="ios-arrow-back" />上一步
      </Button>
      <Button type="primary" @click="next" :disabled="right">
        下一步
        <Icon type="ios-arrow-forward" />
      </Button>
    </ButtonGroup>
  </div>
</template>

<script>
const STATEMENT_1 = "请输入统一的标题名称和连接符，例如：（标题：）";
const STATEMENT_2 = "请输入连接符和统一的标题名称，例如：（：标题）";
const STATEMENT_3 = "请输入统一的文件或目录的名称";
const STATEMENT_4 = "此选项下不需要再输入额外的内容";
const WHOLE = {
  key: "匹配全部",
  value: ".+",
};
const deleteMode = 1;
export default {
  name: "Home",
  data() {
    return {
      prompt: false, // 复制文件发生异常时的提示框
      content: "", // 复制文件发生异常时的异常信息（由Java端提供）
      start: false, // 开始复制按钮的禁用
      list: [], // 存储控制台的内容便于后台输出到文件
      left: false, // 上一步按钮的状态
      right: false, // 下一步按钮的状态
      fileName: "", // 自动生成正则表达式选项中用户选择的文件名称
      lock: false, // 是否开启了匹配全部文件的选项
      notInput: false, // 自定义正则表达式选项中的文本框是否可以输入内容
      title: "", // 自定义正则表达式选项中的文本框输入的内容
      regex: "", // 用户自己输入的正则表达式
      statement: STATEMENT_1, // 添加自定义正则表达式时的文本框输入提示
      item: 0, // 自定义正则表达式匹配类型数组的索引
      rear: 0, // 文件后缀名数组的索引
      origin: true, // 操作的匹配源：文件或文件夹
      steps: 0, // 三部曲设置的步骤条索引
      index: 0, // 三部曲设置（包含添加表达式页）的索引
      type: 0, // 设置正则表达式的类型
      group: {
        float: "left",
        marginTop: "20px"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "类型",
          key: "key",
          width: 120,
          sortable: true,
          tooltip: true,
        },
        {
          title: "正则表达式",
          width: 640,
          key: "value",
          tooltip: true,
        },
      ],
      values: [
        "标题与姓名",
        "标题与数字",
        "姓名与标题",
        "数字与标题",
        "唯一文件名",
        "匹配后缀名",
        "仅匹配数字",
        "仅匹配标题",
      ],
    };
  },
  methods: {
    next() {
      this.index++;
      // switch (this.steps) {
      //   case 0:
      //     if (this.regexDatas.length == 0) {
      //       this.$Message.error({
      //         background: true,
      //         content: "正则表达式列表不能为空！"
      //       });
      //     } else {
      //       this.index = 2;
      //       this.left = false;
      //       this.steps++;
      //     }
      //     break;
      //   case 1:
      //     if (
      //       this.outputFolderIndices.length == 0 &&
      //       this.operateMode != deleteMode
      //     ) {
      //       this.$Message.error({
      //         background: true,
      //         content: "导入文件夹目录不能为空！"
      //       });
      //     } else if (
      //       this.transferFolder.length ==
      //       this.outputFolderIndices.length
      //     ) {
      //       this.$Message.error({
      //         background: true,
      //         content: "导出文件夹目录不能为空！"
      //       });
      //     } else {
      //       this.index = 3;
      //       this.right = true;
      //       this.steps++;
      //     }
      //     break;
      // }
    },
    previous() {
      this.index--;
      // this.right = false;
      // this.steps--;

      // switch (this.steps) {
      //   case 0:
      //     this.index = 0;
      //     this.left = true;
      //     break;
      //   case 1:
      //     this.index = 2;
      //     break;
      // }
    },
    handleChange(newTargetKeys) {
      this.$store.state.outputFolderIndices = newTargetKeys;
    },
    filterMethod(data, query) {
      return data.value.indexOf(query) > -1;
    },
    format(item) {
      return "<span title='" + item.value + "'>" + item.value + "</span>";
    },
    left_push() {
      // let a = application.openDirectoryChooser();
      let a = "";
      if (a.length != 0) {
          this.$store.commit('source', {
            key: this.$refs.files.data.length,
            value: a,
          });
        // let parent = this.$refs.files;
        // _push(parent.data, {
        //   key: parent.data.length,
        //   value: a,
        // });
      }
    },
    left_remove() {
      // var parent = this.$refs.files;
      // _delete(parent.data, parent.leftCheckedKeys, function (a, b) {
      //   return a.key == b;
      // });
    },
    right_push() {
      if (this.operateMode == deleteMode) {
        this.$Message.error({
          background: true,
          content: "在“删除”模式下您不能向“导出文件夹目录”中添加文件夹目录！",
        });
      } else {
        // let a = application.openDirectoryChooser();
        let a = "";
        if (a.length != 0) {
          let parent = this.$refs.files;
          if (this.$store.commit('source', {
              key: parent.data.length,
              value: a,
            })
          ) {
            // parent.targetKeys.push(parent.data.length - 1);
            this.$store.state.outputFolderIndices.push(parent.data.length - 1);
          }
        }
      }
    },
    right_remove() {
      // var parent = this.$refs.files;
      // let keys = [...parent.rightCheckedKeys];
      // _delete(parent.data, parent.rightCheckedKeys, function (a, b) {
      //   return a.key == b;
      // });
      // _delete(parent.targetKeys, keys, function (a, b) {
      //   return a == b;
      // });
    },
    accept() {
      switch (this.type) {
        case 0: // 用户自定义
          if (this.item < 5 && this.title.length == 0) {
            this.$Message.error({
              background: true,
              content: "请输入标题名称和连接符！",
            });
          } else if (this.item == 5 && !this.origin) {
            this.$Message.error({
              background: true,
              content: "匹配源为文件时才能使用匹配文件名选项！",
            });
          } else {
            // let a = //application.getCustomData(
            //   this.item,
            //   this.settings.suffixes[this.rear],
            //   this.title
            // );
            // let a = "";
            // _push(this.regexDatas, {
            //   key: this.values[this.item],
            //   value: a,
            // });
            this.cancel();
          }
          break;
        case 1: // 自动生成
          if (this.fileName.length == 0) {
            this.$Message.error({
              background: true,
              content: "请选择需要生成表达式的文件！",
            });
          } else {
            // let a = "";
            // let a = application.getAutoData();
            // _push(this.regexDatas, {
            //   key: "自动匹配",
            //   value: a,
            // });
            this.cancel();
          }
          break;
        case 2: // 用户输入
          if (this.regex.length == 0) {
            this.$Message.error({
              background: true,
              content: "请输入正则表达式！",
            });
          } else {
            // _push(this.regexDatas, {
            //   key: "用户自定义",
            //   value: this.regex,
            // });
            this.cancel();
          }
          break;
        case 3: // 匹配全部
          this.lock = true;
          this.regexDatas.splice(0, this.regexDatas.length);
          this.regexDatas.push(WHOLE);
          this.cancel();
          break;
      }
    },
    cancel() {
      this.index = 0;
      this.right = false;
    },
    read() {
      let a = "";
      if (this.origin) {
        // a = application.openFileChooser();
      } else {
        // a = application.openDirectoryChooser();
      }

      if (a.length != 0) {
        this.fileName = a;
      }
    },
    selectChange(e) {
      this.notInput = false;
      switch (e) {
        case 0: // 标题+姓名
        case 1: // 标题+数字
          this.statement = STATEMENT_1;
          break;
        case 2: // 姓名+标题
        case 3: // 数字+标题
          this.statement = STATEMENT_2;
          break;
        case 4: // 唯一文件名
          this.statement = STATEMENT_3;
          break;
        default:
          // 其他
          this.statement = STATEMENT_4;
          this.notInput = true;
          break;
      }
    },
    select(e, i) {
      console.log(e);
      this.$refs.selection.toggleSelect(i);
    },
    add() {
      this.lock = this.lock && this.regexDatas.length != 0;
      if (!this.lock) {
        this.index = 1;
        this.right = true;
      } else {
        this.$Message.error({
          background: true,
          content: "您开启了‘匹配全部’模式，不能再添加正则表达式了！",
        });
      }
    },
    remove() {
        this.$store.commit('delRegExp', this.$refs.selection.getSelection());
    //   _delete(
    //     this.regexDatas,
    //     this.$refs.selection.getSelection(),
    //     function (a, b) {
    //       return a.key === b.key && a.value === b.value;
    //     }
    //   );
    },
    submit() {
      this.$emit("start");
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
      this.start = this.left = true;
    },
    stop() {
      this.$emit("stop")
      this.left = this.other = this.prompt = this.start = false;
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
    confirm(msg) {
      this.content = msg;
      this.prompt = true;
    },
    proceed() {
      this.prompt = false;
      //application.unlock();
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
  },
};
</script>

<style scoped>
.touch {
  width: 200px;
  margin: 5px 0 5px 0;
}

/* 用于添加正则表达式页面的行缩进 */
.row {
  margin: 3px 0;
  left: 20px;
}

/* 穿梭框下脚占位样式（不用做显示） */
.blank {
  height: 25px;
  width: 85px;
  margin: 5px;
}

/* 穿梭框左右小按钮的样式 */

.left {
  float: left;
  position: relative;
  z-index: 1;
  margin: -30px 0 0 275px;
}

.right {
  float: right;
  position: relative;
  z-index: 1;
  margin: -30px 10px 0 0;
}

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