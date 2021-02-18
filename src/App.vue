<template>
  <!-- tran4f UI 主界面 -->
  <div id="panel">
    <!-- 顶部 -->
    <!-- <div> -->
      <p class="control shut" @click="shutdown">×</p>
      <p class="control mini" @click="minimize">-</p>
      <div id="logo" style="-webkit-app-region: drag;">
        <span id="name">
          <b>tran4f</b>
        </span>
      </div>
    <!-- </div> -->
    <!-- 主体 -->
    <Tabs id="content" name="MenuBar">
      <TabPane tab="MenuBar" label="文件操作" icon="md-list-box">
        <Steps :current="steps" style="width: 700px; margin: 20px auto;">
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
                :data="settings.regexDatas"
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
              <RadioGroup v-model="type" size="large" :value="0" vertical @on-change="change">
                <div style="float: right;">
                  <Tag color="primary">匹配源：</Tag>
                  <i-switch size="large" v-model="origin" :true-value="true" :false-value="false">
                    <span slot="open">文件</span>
                    <span slot="close">目录</span>
                  </i-switch>
                </div>
                <Radio :label="0" class="touch">
                  <span>预定义表达式</span>
                </Radio>
                <Form :label-width="90" :disabled="panel1">
                  <Row :gutter="220" class-name="row">
                    <i-col span="12">
                      <FormItem label="文件名类型:">
                        <Select v-model="item" @on-change="selectChange">
                          <Option v-for="(element, i) in values" :value="i" :key="i">{{ element }}</Option>
                        </Select>
                      </FormItem>
                    </i-col>
                    <i-col span="12">
                      <FormItem label="文件后缀名:">
                        <Select v-model="rear" :disabled="!origin">
                          <Option
                            v-for="(element, i) in settings.suffixes"
                            :key="i"
                            :value="i"
                          >{{ element }}</Option>
                        </Select>
                      </FormItem>
                    </i-col>
                  </Row>
                  <Row class-name="row">
                    <Input :placeholder="statement" v-model="title" :disabled="notInput" />
                  </Row>
                </Form>
                <Radio :label="1" class="touch">
                  <span>自动生成表达式</span>
                </Radio>
                <Form :disabled="panel2">
                  <Row :gutter="10" class-name="row" style="width: 805px;">
                    <i-col span="22">
                      <Input placeholder="请选择同一类型的一组文件中的一个系统，将会为您自动生成正则表达式" v-model="fileName" />
                    </i-col>
                    <i-col span="2">
                      <Button type="primary" @click="read">浏览</Button>
                    </i-col>
                  </Row>
                </Form>
                <Radio :label="2" class="touch">
                  <span>自定义表达式</span>
                </Radio>
                <Form :disabled="panel3">
                  <Row class-name="row">
                    <Input v-model="regex" placeholder="请输入一个正确的正则表达式" />
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
                :data="settings.transferFolder"
                :target-keys="settings.outputFolderIndices"
                :list-style="{height:'330px', width:'379px'}"
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
                <Button type="primary" size="small" @click="left_push">添加</Button>&nbsp;
                <Button type="primary" size="small" @click="left_remove">删除</Button>
              </div>
              <div class="right">
                <Button type="primary" size="small" @click="right_push">添加</Button>&nbsp;
                <Button type="primary" size="small" @click="right_remove">删除</Button>
              </div>
            </TabPane>
            <TabPane tab="center">
              <div>
                <Tag checkable color="blue">您已经完成了相关的配置，请点击“开始”按钮，系统会帮您完成接下来的文件操作！</Tag>
                <div id="box">
                  <transition-group id="msg" name="fade" tag="ul" ref="msg">
                    <li v-for="item in list" :style="item.style" :key="item.key">{{ item.value }}</li>
                    <li :key="-1">&nbsp;</li>
                    <li :key="-2">&nbsp;</li>
                  </transition-group>
                </div>
                <div :style="group">
                  <Button type="primary" :disabled="start" @click="submit">开始</Button>&nbsp;
                  <Button type="error" :disabled="!start" @click="stop">停止</Button>&nbsp;
                  <Button type="primary" :disabled="start" @click="clear">清空</Button>&nbsp;
                  <Button type="warning" :disabled="start" @click="backups">备份</Button>
                </div>
                <Modal
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
                </Modal>
              </div>
            </TabPane>
          </Tabs>
        </div>
        <ButtonGroup
          :style="{float: 'right', marginRight: '20px', marginTop: '-45px', position:'relative'}"
        >
          <Button type="primary" @click="previous" :disabled="left">
            <Icon type="ios-arrow-back" />上一步
          </Button>
          <Button type="primary" @click="next" :disabled="right">
            下一步
            <Icon type="ios-arrow-forward" />
          </Button>
        </ButtonGroup>
      </TabPane>
      <TabPane tab="MenuBar" label="用户设置" :disabled="other" icon="md-build">
        <Row :gutter="20">
          <i-col span="5">
            <Menu
              width="auto"
              :active-name="0"
              @on-select="function(i) {drawer = false; setup = i;}"
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
                :mask-style="{backgroundColor: 'transparent'}"
              >
                <p>{{ argument.detail }}</p>
                <br />
                <Input
                  type="textarea"
                  v-model="argument.format"
                  :autosize="{minRows: 10,maxRows: 15}"
                />
                <br />
                <br />
                <Button type="primary" @click="drawer = false" long>返回设置</Button>
              </Drawer>
              <Tabs v-model="setup" type="card" name="settings">
                <TabPane tab="settings">
                  <Divider orientation="left" size="small">请在下方修改操作模式</Divider>
                  <RadioGroup
                    vertical
                    size="large"
                    v-model="settings.operateMode"
                    style="width: 640px; height: 400px; overflow-y: scroll;"
                  >
                    <Radio
                      v-for="(item, i) in mode"
                      :key="item.name"
                      :label="i"
                      border
                      class="option"
                    >
                      <span>{{ item.name }}</span>
                      <span class="detail">{{ item.detail }}</span>
                    </Radio>
                  </RadioGroup>
                </TabPane>
                <TabPane tab="settings">
                  <div class="list">
                    <RadioGroup v-model="settings.operateMethod" size="large" vertical>
                      <Collapse class="collapse" simple accordion>
                        <Panel v-for="item in operator" :key="item.title">
                          {{ item.title }}
                          <div slot="content">
                            <Radio
                              v-for="e in item.children"
                              :key="e.label"
                              :label="e.label"
                              border
                            >
                              <span>{{ e.name }}</span>
                              <span class="detail">{{ e.details }}</span>
                            </Radio>
                          </div>
                        </Panel>
                      </Collapse>
                    </RadioGroup>
                    <Button type="primary" @click="open(settings.operateMethod)" long>进入配置选项</Button>
                  </div>
                </TabPane>
                <TabPane tab="settings">
                  <div class="list">
                    <RadioGroup v-model="settings.sequenceMethod" size="large" vertical accordion>
                      <Collapse class="collapse" simple accordion>
                        <Panel v-for="item in sequence" :key="item.title">
                          {{ item.title }}
                          <div slot="content">
                            <Radio
                              border
                              v-for="e in item.children"
                              :key="e.label"
                              :label="e.label"
                            >
                              <span>{{ e.name }}</span>
                              <span class="detail">{{ e.details }}</span>
                            </Radio>
                          </div>
                        </Panel>
                      </Collapse>
                    </RadioGroup>
                    <Button type="primary" @click="open(settings.sequenceMethod)" long>进入配置选项</Button>
                  </div>
                </TabPane>
                <TabPane tab="settings">
                  <div class="list">
                    <RadioGroup v-model="settings.integrateMethod" size="large" vertical>
                      <Collapse class="collapse" simple accordion>
                        <Panel v-for="item in integrate" :key="item.title">
                          {{ item.title }}
                          <div slot="content">
                            <Radio
                              v-for="e in item.children"
                              :key="e.label"
                              :label="e.label"
                              border
                            >
                              <span>{{ e.name }}</span>
                              <span class="detail">{{ e.details }}</span>
                            </Radio>
                          </div>
                        </Panel>
                      </Collapse>
                    </RadioGroup>
                    <Button type="primary" @click="open(settings.integrateMethod)" long>进入配置选项</Button>
                  </div>
                </TabPane>
                <TabPane tab="settings">
                  <div class="list">
                    <RadioGroup v-model="settings.encryptMethod" size="large" vertical>
                      <Collapse class="collapse" simple accordion>
                        <Panel v-for="item in encrypt" :key="item.title">
                          {{ item.title }}
                          <div slot="content">
                            <Radio
                              v-for="e in item.children"
                              :key="e.label"
                              :label="e.label"
                              border
                            >
                              <span>{{ e.name }}</span>
                              <span class="detail">{{ e.details }}</span>
                            </Radio>
                          </div>
                        </Panel>
                      </Collapse>
                    </RadioGroup>
                    <Button type="primary" @click="open(settings.integrateMethod)" long>进入配置选项</Button>
                  </div>
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
                      <Input v-model="path" placeholder="请选择模板文件位置"/>
                      <div class="footer">
                        <Button type="primary" @click="openFile">浏览</Button>&nbsp;
                        <Button type="primary" :disabled="path.length == 0" @click="reset">导入</Button>&nbsp;
                        <Button type="primary" :disabled="path.length == 0" @click="output">导出</Button>
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
                            v-model="settings.poptip"
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
                            :disabled="settings.poptip"
                          >
                            <InputNumber
                              v-model="settings.merge"
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
                            v-model="settings.delay"
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
                            :disabled="settings.poptip"
                          >
                            <InputNumber
                              v-model="settings.time"
                              :disabled="settings.delay"
                              :max="60*24"
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
                            v-model="settings.history"
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
                            :disabled="settings.poptip"
                          >
                            <InputNumber
                              v-model="settings.lines"
                              :disabled="settings.history"
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
                        v-for="item in settings.suffixes"
                        :key="item"
                        :name="item"
                        closable
                        color="primary"
                        type="border"
                        @on-close="handleClose"
                      >{{ item }}</Tag>
                      <Poptip
                        trigger="click"
                        word-wrap
                        placement="top"
                        width="300"
                        :disabled="settings.poptip"
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
      </TabPane>
      <TabPane tab="MenuBar" label="实用工具" :disabled="other" icon="md-pricetags">
        <Row :gutter="20">
          <i-col span="5">
            <Menu
              width="auto"
              :active-name="0"
              @on-select="function(i) {drawer = false; tool = i;}"
            >
              <MenuGroup title="内置工具">
                <MenuItem :name="0">配置文件查看器</MenuItem>
                <MenuItem :name="1">正则编写校正器</MenuItem>
                <MenuItem :name="2">操作记录比较器</MenuItem>
              </MenuGroup>
              <MenuGroup title="拓展工具">
                <MenuItem :name="3">加密文件查看器</MenuItem>
                <MenuItem :name="4">程序控制查看器</MenuItem>
              </MenuGroup>
            </Menu>
          </i-col>
          <i-col span="19">
            <div class="framework menu-style">
              <Tabs v-model="tool" type="card" name="settings">
                <TabPane tab="settings">
                  <Input search enter-button="浏览" placeholder="请选择配置文件" />
                  <br />
                  <Table
                    border
                    :columns="columns2"
                    :data="data2"
                    :max-height="400"
                    highlight-row
                    size="small"
                    no-data-text="请选择导入配置文件"
                  ></Table>
                </TabPane>
                <TabPane tab="settings">
                  <Input placeholder="请输入正则表达式" />
                  <br />
                  <br />
                  <Tag checkable color="success">导入：10</Tag>
                  <Tag checkable color="success">匹配：10</Tag>
                  <div style="float: right;">
                    <Button type="primary">添加</Button>&nbsp;
                    <Button type="primary">匹配</Button>&nbsp;
                    <Button type="primary">规则</Button>&nbsp;
                    <Button type="primary">帮助</Button>
                  </div>
                  <br />
                  <br />
                  <Card :padding="0" dis-hover bordered style="height: 350px; overflow-y: scroll;">
                    <CellGroup>
                      <Cell
                        v-for="item in cells"
                        :key="item.title"
                        :title="item.title"
                        :selected="item.selected"
                      >
                        <Badge dot slot="extra" :count="item.selected ? 1 : 0" />
                      </Cell>
                    </CellGroup>
                  </Card>
                </TabPane>
                <TabPane tab="settings">
                  <Table
                    size="small"
                    :max-height="450"
                    :columns="columns1"
                    :data="data1"
                    border
                    highlight-row
                    no-data-text="暂无历史记录"
                  ></Table>
                </TabPane>
                <TabPane tab="settings">
                  <Input search enter-button="选择" @on-search="driver=true" placeholder="选择解密驱动" />
                  <br />
                  <Input search enter-button="浏览" @on-search="console.log('……')" placeholder="浏览文件位置" />
                  <br />
                  <Input search enter-button="浏览" @on-search="console.log('……')" placeholder="浏览导出位置" />
                  <br />
                  <Button type="primary" long @click="console.log('……')">确定</Button>
                  <Modal
                    v-model="driver"
                    :mask-closable="false"
                    :scrollable="true"
                    title="请选择驱动类"
                    ok-text="确定"
                    cancel-text="取消"
                  >
                    <AutoComplete
                      v-model="complete"
                      :data="data3"
                      :clearable="true"
                      :filter-method="filterMethod0"
                      placement="bottom-start"
                      placeholder="在此选择解密驱动类"
                    >
                      <div v-if="data3.length == 0" style="padding: 5px 16px;">没有加载到驱动类</div>
                    </AutoComplete>
                  </Modal>
                </TabPane>
                <TabPane tab="settings">
                  <Row :gutter="10">
                    <i-col span="20" style="height: 450px;overflow-y: scroll;">
                      <Timeline>
                        <transition-group name="fade">
                          <TimelineItem
                            v-for="(item, i) in collect"
                            :key="i+1"
                            :color="item.level"
                          >{{ item.message }}</TimelineItem>
                        </transition-group>
                      </Timeline>
                    </i-col>
                    <i-col span="1">
                      <Divider type="vertical" style="height: 450px;" />
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
                </TabPane>
              </Tabs>
            </div>
          </i-col>
        </Row>
      </TabPane>
      <TabPane tab="MenuBar" label="模组列表" :disabled="other" icon="md-card">
        <Card title="模组列表" icon="ios-options" :padding="10" style="width: 850px;">
          <template slot="extra">
            <Button type="primary" size="small">添加模组</Button>&nbsp;
            <Button type="primary" size="small">重新加载</Button>
          </template>
          <List size="small">
            <ListItem v-for="item in modules" :key="item.name">
              <ListItemMeta :title="item.name" :description="item.detail" />
              <template slot="action">
                <li>
                    <Button type="primary" size="small">查看</Button>&nbsp;
                    <Button type="error" size="small">删除</Button>
                </li>
              </template>
            </ListItem>
          </List>
        </Card>
      </TabPane>
      <TabPane tab="MenuBar" label="关于我们" :disabled="other" icon="md-contact"></TabPane>
    </Tabs>
  </div>
</template>
<script>
const {ipcRenderer: ipc} = window.require('electron');

function _push(data, obj) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].value == obj.value) return false;
  }
  data.push(obj);
  return true;
}

function _delete(data, keys, test) {
  if (keys.length > 0) {
    Outer: for (let i = 0; i < data.length; i++) {
      let a = data[i];
      for (let j = 0; j < keys.length; j++) {
        let b = keys[j];
        if (test(a, b)) {
          data.splice(i--, 1);
          keys.splice(j--, 1);
          continue Outer;
        }
      }
      if (keys.length == 0) {
        break;
      }
    }
  }
}

const STATEMENT_1 = "请输入统一的标题名称和连接符，例如：（标题：）";
const STATEMENT_2 = "请输入连接符和统一的标题名称，例如：（：标题）";
const STATEMENT_3 = "请输入统一的文件或目录的名称";
const STATEMENT_4 = "此选项下不需要再输入额外的内容";
const WHOLE = {
  key: "匹配全部",
  value: ".+",
};

const jsonFile = /.+\.json$/g;
const valid = /^\\\.\w+$/g;
const deleteMode = 1;



export default {
  data() {
    return {
      columns1: [
        {
          title: "文件名",
          key: "name",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person",
                },
              }),
              h("strong", params.row.name),
            ]);
          },
        },
        {
          title: "状态",
          key: "state",
          width: 70,
        },
        {
          title: "选项",
          key: "action",
          width: 200,
          align: "center",
          render: h => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {},
                  },
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {},
                  },
                },
                "载入"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  on: {
                    click: () => {},
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      data1: [], // 历史记录回看 { name:String state:String }
      columns2: [
        {
          title: "项目",
          key: "name",
          resizable: true,
          width: 180,
        },
        {
          title: "信息",
          key: "detail",
          type: "html",
          render: (h, params) => {
            return h(
              "div",
              {
                props: {},
              },
              params.row.detail
            );
          },
        },
      ],
      data2: [], // 配置文件信息 { name:String detial:String } <br>换行
      cells: [], // 测试正则文件表达式 { title:String selected:boolean }
      data3: [], // 驱动类名称（字符串数组）
      collect: [], // 内部控制器内容
      complete: "", // 解密驱动名称
      driver: false, // 解密驱动选择窗口
      panel1: false, // 面板一用户预定义模板
      panel2: true, // 面板二自动生成表达式
      panel3: true, // 面板三手动填写表达式
      drawer: false, // 是否打开抽屉
      board: false, // 导入模板成功提示
      start: false, // 开始复制按钮的禁用
      prompt: false, // 复制文件发生异常时的提示框
      content: "", // 复制文件发生异常时的异常信息（由Java端提供）
      list: [], // 存储控制台的内容便于后台输出到文件
      type: 0, // 设置正则表达式的类型
      statement: STATEMENT_1, // 添加自定义正则表达式时的文本框输入提示
      item: 0, // 自定义正则表达式匹配类型数组的索引
      rear: 0, // 文件后缀名数组的索引
      title: "", // 自定义正则表达式选项中的文本框输入的内容
      regex: "", // 用户自己输入的正则表达式
      origin: true, // 操作的匹配源：文件或文件夹
      fileName: "", // 自动生成正则表达式选项中用户选择的文件名称
      lock: false, // 是否开启了匹配全部文件的选项
      notInput: false, // 自定义正则表达式选项中的文本框是否可以输入内容
      outer: 0, // 导出模板文件的类型
      path: "", // 用户选入的模板文件地址
      steps: 0, // 三部曲设置的步骤条索引
      index: 0, // 三部曲设置（包含添加表达式页）的索引
      other: false, // 复制开始结束时其他标签页的状态
      left: true, // 上一步按钮的状态
      right: false, // 下一步按钮的状态
      append: "", // 设置中用户输入的文件后缀名
      argument: {
        detail: "",
        format: "",
      }, // 用于显示的所需参数信息
      // configs: JSON.parse(dataSource.getConfigs()),
      // encrypt: JSON.parse(dataSource.getValues("ENCODE")), // 加密操作类数据
      // sequence: JSON.parse(dataSource.getValues("RENAME")), // 扩展操作类数组
      // operator: JSON.parse(dataSource.getValues("COPY")), // 操作模式类数组
      // integrate: JSON.parse(dataSource.getValues("INTEGRATE")), // 文件整合类数组
      configs: null,
      encrypt: null,
      sequence: null,
      operator: null,
      integrate: null,
      // modules: JSON.parse(dataSource.getMods()),
      // 模组文件的基本信息
      modules: [
        {
          name: "AFT.config",
          detail: "应用基本程序框架",
        },
      ],
      setup: 0, // 用户设置菜单栏的索引
      tool: 0, // 实用工具菜单栏的索引
      settings: {
        poptip: false, // 气泡提示的开关
        history: true, // 历史记录相关设置的开关
        delay: false, // 自动（延时）停止选项的开关
        operateMode: 0, // 操作模式序号
        encryptMethod: null,
        operateMethod: null, // 操作方式实体类的名称
        sequenceMethod: null, // 扩展操作实体类的名称
        integrateMethod: null, // 文件整合实体类的名称
        time: 10, // 延迟时间大小
        lines: 10, // 历史记录保存条数
        merge: 100, // 任务合并的数值
        transferFolder: [],
        outputFolderIndices: [],
        regexDatas: [],
        suffixes: [
          "\\.docx",
          "\\.pptx",
          "\\.xlsx",
          "\\.doc",
          "\\.ppt",
          "\\.xls",
          "\\.jpg",
          "\\.png",
          "\\.gif",
          "\\.mp3",
          "\\.mp4",
          "\\.pdf",
          "\\.txt",
        ],
      }, // 用户设置的基本选项
      group: {
        float: "left",
        marginTop: "20px",
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
      mode: [
        {
          name: "复制",
          detail:
            "将导入文件夹目录中的文件复制到导出文件夹目录中，如果文件名重复会提醒选择处理策略",
        },
        {
          name: "删除",
          detail: "删除导入文件及目录中的所有文件（文件夹）",
        },
        {
          name: "移动",
          detail:
            "将文件从导入文件夹目录移动到导出文件夹目录（源目录中的文件将不存在）",
        },
        {
          name: "跳过",
          detail:
            "在文件复制过程中如果导出文件夹目录中包含同名文件，则跳过复制导入文件夹目录中的文件",
        },
        {
          name: "替换",
          detail: "使用导入文件夹目录中的文件替换导出文件夹目录中的同名文件",
        },
        {
          name: "新建",
          detail: "对导入文件夹目录中的文件进行重命名后新建在导出文件夹目录",
        },
        {
          name: "整理",
          detail: "对导入文件夹目录的一些文件进行整理后写入导出文件夹目录",
        },
        {
          name: "修改",
          detail: "只对导入文件夹目录中的文件名称进行统一的修改操作",
        },
        {
          name: "加密",
          detail: "对导入文件夹目录的文件进行加密后写入导出文件夹目录",
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
    filterMethod0(value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
    submit() {
      let a = this.settings.transferFolder;
      let b = [...this.settings.outputFolderIndices];
      let c = this.settings.regexDatas;
      //dataSource.reset();
      for (let i = 0; i < c.length; i++) {
        //dataSource.pushRegex(c[i].value);
      }
      Outer: for (let i = 0; i < a.length; i++) {
        let e = a[i];
        for (let j = 0; j < b.length; j++) {
          let x = b[j];
          if (e.key == x) {
            //dataSource.pushOutput(e.value);
            b.splice(j--, 1);
            continue Outer;
          }
        }
        //dataSource.pushInput(e.value);
      }

      //dataSource.operateMode = this.settings.operateMode;
      //dataSource.operateMethod = this.settings.operateMethod;
      this.clear();
      //application.access();
      this.start = this.left = this.other = true;
    },
    stop() {
      this.left = this.other = this.prompt = this.start = false;
      //application.stop();
    },
    clear() {
      if (this.list.length != 0) {
        this.list = [];
      }
    },
    showMsg(type, msg) {
      var obj = {
        content: msg,
        background: true,
      };

      if (type) {
        this.$Message.success(obj);
      } else {
        this.$Message.error(obj);
      }
    },
    open(s) {
      this.argument = this.configs[s];
      this.drawer = true;
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
    },
    confirm(msg) {
      this.content = msg;
      this.prompt = true;
    },
    proceed() {
      this.prompt = false;
      //application.unlock();
    },
    add() {
      this.lock = this.lock && this.settings.regexDatas.length != 0;
      if (!this.lock) {
        this.index = 1;
        this.right = true;
      } else {
        this.showMsg(false, "您开启了‘匹配全部’模式，不能再添加正则表达式了！");
      }
    },
    remove() {
      _delete(
        this.settings.regexDatas,
        this.$refs.selection.getSelection(),
        function (a, b) {
          return a.key == b.key && a.value == b.value;
        }
      );
    },
    select(e, i) {
      this.$refs.selection.toggleSelect(i);
    },
    accept() {
      switch (this.type) {
        case 0: // 用户自定义
          if (this.item < 5 && this.title.length == 0) {
            this.showMsg(false, "请输入标题名称和连接符！");
          } else if (this.item == 5 && !this.origin) {
            this.showMsg(false, "匹配源为文件时才能使用匹配文件名选项！");
          } else {
            // let a = //application.getCustomData(
            //   this.item,
            //   this.settings.suffixes[this.rear],
            //   this.title
            // );
            let a = ''
            _push(this.settings.regexDatas, {
              key: this.values[this.item],
              value: a,
            });
            this.cancel();
          }
          break;
        case 1: // 自动生成
          if (this.fileName.length == 0) {
            this.showMsg(false, "请选择需要生成表达式的文件！");
          } else {
            let a = ''
            // let a = application.getAutoData();
            _push(this.settings.regexDatas, {
              key: "自动匹配",
              value: a,
            });
            this.cancel();
          }
          break;
        case 2: // 用户输入
          if (this.regex.length == 0) {
            this.showMsg(false, "请输入正则表达式！");
          } else {
            _push(this.settings.regexDatas, {
              key: "用户自定义",
              value: this.regex,
            });
            this.cancel();
          }
          break;
        case 3: // 匹配全部
          this.lock = true;
          this.settings.regexDatas.splice(0, this.settings.regexDatas.length);
          this.settings.regexDatas.push(WHOLE);
          this.cancel();
          break;
      }
    },
    cancel() {
      this.index = 0;
      this.right = false;
    },
    read() {
      let a = '';
      if (this.origin) {
        // a = application.openFileChooser();
      } else {
        // a = application.openDirectoryChooser();
      }

      if (a.length != 0) {
        this.fileName = a;
      }
    },
    change(e) {
      switch (e) {
        case 0:
          this.panel1 = false;
          this.panel2 = this.panel3 = true;
          break;
        case 1:
          this.panel2 = false;
          this.panel1 = this.panel3 = true;
          break;
        case 2:
          this.panel3 = false;
          this.panel1 = this.panel2 = true;
          break;
        case 3:
          this.panel1 = this.panel2 = this.panel3 = true;
          break;
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
    handleChange(newTargetKeys) {
      this.settings.outputFolderIndices = newTargetKeys;
    },
    filterMethod(data, query) {
      return data.value.indexOf(query) > -1;
    },
    format(item) {
      return "<span title='" + item.value + "'>" + item.value + "</span>";
    },
    left_push() {
      // let a = application.openDirectoryChooser();
      let a = ''
      if (a.length != 0) {
        let parent = this.$refs.files;
        _push(parent.data, {
          key: parent.data.length,
          value: a,
        });
      }
    },
    left_remove() {
      var parent = this.$refs.files;
      _delete(parent.data, parent.leftCheckedKeys, function (a, b) {
        return a.key == b;
      });
    },
    right_push() {
      if (this.settings.operateMode == deleteMode) {
        this.showMsg(
          false,
          "在“删除”模式下您不能向“导出文件夹目录”中添加文件夹目录！"
        );
      } else {
        // let a = application.openDirectoryChooser();
        let a = ''
        if (a.length != 0) {
          let parent = this.$refs.files;
          if (
            _push(parent.data, {
              key: parent.data.length,
              value: a,
            })
          ) {
            parent.targetKeys.push(parent.data.length - 1);
          }
        }
      }
    },
    right_remove() {
      var parent = this.$refs.files;
      let keys = [...parent.rightCheckedKeys];
      _delete(parent.data, parent.rightCheckedKeys, function (a, b) {
        return a.key == b;
      });
      _delete(parent.targetKeys, keys, function (a, b) {
        return a == b;
      });
    },
    update() {
      if (this.settings.operateMode == deleteMode) {
        let parent = this.$refs.files;
        _delete(parent.data, parent.targetKeys, function (a, b) {
          return a.key == b;
        });
      }
    },
    next() {
      switch (this.steps) {
        case 0:
          if (this.settings.regexDatas.length == 0) {
            this.showMsg(false, "正则表达式列表不能为空！");
          } else {
            this.index = 2;
            this.left = false;
            this.steps++;
          }
          break;
        case 1:
          if (
            this.settings.outputFolderIndices.length == 0 &&
            this.settings.operateMode != deleteMode
          ) {
            this.showMsg(false, "导入文件夹目录不能为空！");
          } else if (
            this.settings.transferFolder.length ==
            this.settings.outputFolderIndices.length
          ) {
            this.showMsg(false, "导出文件夹目录不能为空！");
          } else {
            this.index = 3;
            this.right = true;
            this.steps++;
          }
          break;
      }
    },
    previous() {
      this.right = false;
      this.success = true;
      this.steps--;

      switch (this.steps) {
        case 0:
          this.index = 0;
          this.left = true;
          break;
        case 1:
          this.index = 2;
          break;
      }
    },
    shutdown() {
      //application.shutdown(JSON.stringify(this.settings));
      ipc.send("close");
      // ipcRenderer.send("close");
    },
    minimize() {
      //application.minimize();
      ipc.send("minimize");
      // ipcRenderer.send("minimize");
    },
    openFile() {
      // let a = application.openJSONChooser();
      let a = ''
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
        this.board = true;
      } catch (e) {
        this.showMsg(false, "这不是一个有效的JSON文件！");
      }
    },
    readJSON(content) {
      let obj = JSON.parse(content);
      for (var i in obj) {
        this.settings[i] = obj[i];
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
  watch: {
    "settings.operateMode": function () {
      this.update();
    }
  },
  created() {
    // this.readJSON(application.readHistory());
    // this.$axios.get('test').then(function(rep) {
    //     console.log(rep);
    // });
    // console.log("OK");
  }
};
</script>
<style scoped>
.touch {
  width: 200px;
  margin: 5px 0 5px 0;
}

/* 主界面的设置 */
#panel {
  width: 920px;
  height: 580px;
  overflow: hidden;
  border: 1px solid #2d8cf0;
}

/* 图标的设置 */
#logo {
  width: 830px;
  height: 30px;
  background-image: url('assets/logo.png');
  background-repeat: no-repeat;
  background-size: 20px 20px;
  background-position: 5px 5px;
}

/* 最小化按钮和最大化按钮的设置 */

.control {
  height: 30px;
  width: 45px;
  color: black;
  text-align: center;
  font: 20px/30px "Consolas";
  float: right;
}

.mini:hover {
  background-color: #e5e5e5;
}

.shut:hover {
  color: white;
  background-color: #e81123;
}

.mini:active {
  background-color: #cacaca;
}

.shut:active {
  color: white;
  background-color: #f1707a;
}

/* 名称（tran4f 字样）的相关设置 */
#name {
  margin: 5px 30px;
  font: 14px/30px "Consolas";
}

/* 用户操作区域的主要设置 */
#content {
  width: 860px;
  height: 520px;
  overflow: hidden;
  margin: 5px auto;
}

/* 操作类选项列表 */
.list {
  width: 640px;
  height: 450px;
  overflow-y: scroll;
}

/* 折叠面板样式 */
.collapse {
  width: 650px;
  margin-bottom: 10px;
}

/* 折叠面板中各选项的小字描述 */
.detail {
  float: right;
  font-size: 12px;
}

/* 操作模式的选项样式 */
.option {
  width: 640px;
  margin-bottom: 10px;
}

/* 导入模板选项的按钮样式 */
.footer {
  float: right;
  margin: 10px 0px;
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

/* 用于添加正则表达式页面的行缩进 */
.row {
  margin: 3px 0;
  left: 20px;
}

/* 设置li样式（显示的消息） */
li {
  list-style: none;
  font-size: 13px;
}

/* 消息输出窗口样式 */
#box {
  width: 820px;
  height: 294px;
  margin-top: 10px;
  border: 1px solid gainsboro;
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
}

/* 消息输出窗口的内层窗口（用于展示信息）样式 */
#msg {
  width: 710px;
  height: 204px;
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
