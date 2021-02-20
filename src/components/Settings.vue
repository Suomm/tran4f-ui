<template>
  <Row :gutter="20">
    <i-col span="5">
      <Menu
        width="auto"
        :active-name="0"
        @on-select="select"
      >
        <MenuGroup title="文件">
          <MenuItem :name="0">操作模式</MenuItem>
          <MenuItem :name="1">复制方式</MenuItem>
          <MenuItem :name="2">扩展操作</MenuItem>
          <MenuItem :name="3">文件整合</MenuItem>
          <MenuItem :name="4">文件加密</MenuItem>
        </MenuGroup>
        <MenuGroup title="选项">
          <MenuItem :name="5">模板设置</MenuItem>
          <MenuItem :name="6">其它选项</MenuItem>
        </MenuGroup>
      </Menu>
    </i-col>
    <i-col span="19">
      <div class="framework menu-style">
        <Drawer
          v-model="drawer"
          title="请在下面配置操作方式"
          :closable="false"
          :mask-closable="false"
          :width="700"
          :scrollable="true"
          :transfer="false"
          :inner="true"
          :mask-style="{ backgroundColor: 'transparent' }"
        >
          <p>{{ argument.detail }}</p>
          <br />
          <Input
            type="textarea"
            v-model="argument.format"
            :autosize="{ minRows: 10, maxRows: 15 }"
          />
          <br />
          <br />
          <Button type="primary" @click="drawer = false" long>返回设置</Button>
        </Drawer>
        <Tabs v-model="index" type="card" name="settings">
          <TabPane tab="settings">
            <Divider orientation="left" size="small"
              >请在下方修改操作模式</Divider
            >
            <RadioGroup
              vertical
              size="large"
              v-model="operateMode"
              style="width: 640px; height: 400px; overflow-y: scroll"
            >
              <Radio
                v-for="(e, i) in $store.state.mode"
                :key="e.name"
                :label="i"
                border
                class="option"
              >
                <span>{{ e.name }}</span>
                <span class="detail">{{ e.detail }}</span>
              </Radio>
            </RadioGroup>
          </TabPane>
          <TabPane tab="settings">
            <Board name="operateMethod" :items="$store.state.operator" @click="open" />
          </TabPane>
          <TabPane tab="settings">
            <Board name="sequenceMethod" :items="$store.state.sequence" @click="open" />
          </TabPane>
          <TabPane tab="settings">
            <Board name="integrateMethod" :items="$store.state.integrate" @click="open" />
          </TabPane>
          <TabPane tab="settings">
            <Board name="encryptMethod" :items="$store.state.encrypt" @click="open" />
          </TabPane>
          <TabPane tab="settings">
            <Form label-position="top">
              <FormItem label="请选择模板文件类型：">
                <RadioGroup size="large" v-model="outer">
                  <Radio :label="0">
                    <span>配置文件</span>
                  </Radio>
                  <Radio :label="1">
                    <span>用户设置</span>
                  </Radio>
                  <Radio :label="2">
                    <span>正则表达式</span>
                  </Radio>
                  <Radio :label="3">
                    <span>文件夹目录</span>
                  </Radio>
                  <Radio :label="4">
                    <span>表达式与目录</span>
                  </Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="请选择模板文件位置：">
                <Tag v-show="board" color="blue">您已成功导入{{ path }}</Tag>
                <Input v-model="path" placeholder="请选择模板文件位置" />
                <div class="footer">
                  <Button type="primary" @click="openFile">浏览</Button>&nbsp;
                  <Button
                    type="primary"
                    :disabled="path.length == 0"
                    @click="reset"
                    >导入</Button
                  >&nbsp;
                  <Button
                    type="primary"
                    :disabled="path.length == 0"
                    @click="output"
                    >导出</Button
                  >
                </div>
              </FormItem>
            </Form>
          </TabPane>
          <TabPane tab="settings">
            <Form label-position="right" :label-width="100" label-i-colon>
              <Row>
                <i-col span="12">
                  <FormItem label="气泡提示">
                    <i-switch
                      v-model="poptip"
                      size="large"
                      :true-value="false"
                      :false-value="true"
                    >
                      <span slot="open">开启</span>
                      <span slot="close">关闭</span>
                    </i-switch>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="任务合并">
                    <Poptip
                      trigger="click"
                      word-wrap
                      width="370"
                      placement="right"
                      content="任务合并"
                      :disabled="poptip"
                    >
                      <InputNumber
                        v-model="merge"
                        :max="1000000000"
                        :min="100"
                        :step="100"
                        :editable="false"
                      ></InputNumber>
                    </Poptip>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="自动停止">
                    <i-switch
                      v-model="delay"
                      size="large"
                      :true-value="false"
                      :false-value="true"
                    >
                      <span slot="open">开启</span>
                      <span slot="close">关闭</span>
                    </i-switch>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="延迟时间">
                    <Poptip
                      trigger="click"
                      word-wrap
                      width="370"
                      placement="right"
                      content="延迟时间"
                      :disabled="poptip"
                    >
                      <InputNumber
                        v-model="time"
                        :disabled="delay"
                        :max="60 * 24"
                        :min="1"
                        :step="1"
                        :editable="false"
                      ></InputNumber>
                    </Poptip>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="历史记录">
                    <i-switch
                      v-model="history"
                      size="large"
                      :true-value="false"
                      :false-value="true"
                    >
                      <span slot="open">开启</span>
                      <span slot="close">关闭</span>
                    </i-switch>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="保存条数">
                    <Poptip
                      trigger="click"
                      word-wrap
                      width="370"
                      placement="right"
                      content="保存条数"
                      :disabled="poptip"
                    >
                      <InputNumber
                        v-model="lines"
                        :disabled="history"
                        :max="10000"
                        :min="10"
                        :step="10"
                        :editable="false"
                      ></InputNumber>
                    </Poptip>
                  </FormItem>
                </i-col>
              </Row>
              <FormItem label="文件后缀名" ref="doc">
                <Tag
                  v-for="item in $store.state.suffixes"
                  :key="item"
                  :name="item"
                  closable
                  color="primary"
                  type="border"
                  @on-close="handleClose"
                  >{{ item }}</Tag
                >
                <Poptip
                  trigger="click"
                  word-wrap
                  placement="top"
                  width="300"
                  :disabled="poptip"
                  content="添加匹配正则表达式时文件的后缀名，请在此输入合法的文件后缀名（必须以 “\.” 开头），并按回车键确认或点击后面的加号确认。"
                >
                  <Input
                    v-model="append"
                    icon="ios-add"
                    @on-click="handleAdd"
                    @on-enter="handleAdd"
                    placeholder="文件后缀名"
                    :maxlength="20"
                    size="small"
                    style="width: 120px"
                  />
                </Poptip>
              </FormItem>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </i-col>
  </Row>
</template>

<script>
const jsonFile = /.+\.json$/g;
const valid = /^\\\.\w+$/g;
import Board from './Board';
export default {
  name: "Settings",
  data() {
    return {
      configs: null,
      append: "", // 设置中用户输入的文件后缀名
      board: false, // 导入模板成功提示
      outer: 0, // 导出模板文件的类型
      path: "", // 用户选入的模板文件地址
      index: 0, // 用户设置菜单栏的索引
      drawer: false, // 是否打开抽屉
      argument: {
        detail: "",
        format: "",
      }, // 用于显示的所需参数信息
    }
  },
  methods: {
    select(i) {this.drawer = false; this.index = i;},
    open(index) {
      // this.argument = this.configs[index];
      console.log(index)
      this.drawer = true;
    },
    openFile() {
      // let a = application.openJSONChooser();
      let a = "";
      if (a.length == 0 || !jsonFile.test(a)) {
        this.showMsg(false, "您选择的JSON文件有误！");
      } else {
        this.path = a;
      }
    },
    output() {
      let obj = {};
      switch (this.outer) {
        case 0: // 配置文件
          if (
            this.settings.transferFolder.length == 0 ||
            this.settings.regexDatas.length == 0
          ) {
            this.showMsg(false, "请按要求完成模板后再导出！");
          } else {
            obj = this.settings;
          }
          break;
        case 1: // 用户设置
          obj.operateMethod = this.settings.operateMethod;
          obj.operateMode = this.settings.operateMode;
          obj.suffixes = this.settings.suffixes;
          obj.poptip = this.settings.poptip;
          break;
        case 2: // 正则表达式
          if (this.settings.regexDatas.length == 0) {
            this.showMsg(false, "请按要求完成模板后再导出！");
          } else {
            obj.regexDatas = this.settings.regexDatas;
          }
          break;
        case 3: // 文件夹目录
          if (this.settings.transferFolder.length == 0) {
            this.showMsg(false, "请按要求完成模板后再导出！");
          } else {
            obj.transferFolder = this.settings.transferFolder;
            obj.outputFolderIndices = this.settings.outputFolderIndices;
          }
          break;
        case 4: // 表达式与目录
          if (
            this.settings.transferFolder.length == 0 ||
            this.settings.regexDatas.length == 0
          ) {
            this.showMsg(false, "请按要求完成模板后再导出！");
          } else {
            obj.transferFolder = this.settings.transferFolder;
            obj.outputFolderIndices = this.settings.outputFolderIndices;
            obj.regexDatas = this.settings.regexDatas;
          }
          break;
      }
      // application.writeJSON(JSON.stringify(obj));
      this.board = true;
    },
    reset() {
      try {
        // this.readJSON(application.toJSONString());
        let obj = JSON.parse({});
        for (var i in obj) {
          this.settings[i] = obj[i];
        }
        this.board = true;
      } catch (e) {
        this.showMsg(false, "这不是一个有效的JSON文件！");
      }
    },
    handleAdd() {
      if (this.append.length != 0) {
        valid.lastIndex = 0;
        if (!valid.test(this.append)) {
          this.showMsg(false, "请输入合法的文件后缀名！");
          return false;
        }

        for (let i = 0; i < this.settings.suffixes.length; i++) {
          if (this.settings.suffixes[i] == this.append) {
            this.showMsg(false, "文件后缀名重复了！");
            return false;
          }
        }

        this.settings.suffixes.push(this.append);
        this.showMsg(true, `您成功添加了名为 ${this.append} 文件后缀名`);
        this.append = "";
      }
    },
    handleClose(event, name) {
      if (this.settings.suffixes.length == 1) {
        this.showMsg(false, "最后一个文件后缀名不能删去！");
      } else {
        let index = this.settings.suffixes.indexOf(name);
        this.settings.suffixes.splice(index, 1);
        this.showMsg(true, `您成功删除了文件后缀名 ${name}`);
      }
    },
  },
  components: {
    Board
  },
  computed: {
    operateMode: {
      get() {return this.$store.state.operateMode},
      set(val) {this.$store.commit('update', 'operateMode', val)}
    },
    poptip: {
      get() {return this.$store.state.poptip},
      set(val) {this.$store.commit('update', 'poptip', val)}
    },
    history: {
      get() {return this.$store.state.history},
      set(val) {this.$store.commit('update', 'history', val)}
    },
    delay: {
      get() {return this.$store.state.delay},
      set(val) {this.$store.commit('update', 'delay', val)}
    },
    time: {
      get() {return this.$store.state.time},
      set(val) {this.$store.commit('update', 'time', val)}
    },
    lines: {
      get() {return this.$store.state.lines},
      set(val) {this.$store.commit('update', 'lines', val)}
    },
    merge: {
      get() {return this.$store.state.merge},
      set(val) {this.$store.commit('update', 'merge', val)}
    },
  }
};
</script>

<style scoped>
/* 操作模式的选项样式 */
.option {
  width: 640px;
  margin-bottom: 10px;
}

/* 折叠面板中各选项的小字描述 */
.detail {
  float: right;
  font-size: 12px;
}

/* 导入模板选项的按钮样式 */
.footer {
  float: right;
  margin: 10px 0px;
}
</style>