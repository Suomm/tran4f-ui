<template>
  <!-- tran4f UI 主界面 -->
  <div id="panel">
    <!-- 顶部 -->
    <TabBar />
    <!-- 主体 -->
    <Tabs id="content" name="MenuBar">
      <TabPane tab="MenuBar" label="文件操作" icon="md-list-box">
        <Home @start="state=true" @stop="state=false"/>
      </TabPane>
      <TabPane tab="MenuBar" label="用户设置" :disabled="state" icon="md-build">
        <!-- <Row :gutter="20">
          <i-col span="5">
            <Menu
              width="auto"
              :active-name="0"
              @on-select="function (i) { drawer = false; setup = i; }"
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
                <Button type="primary" @click="drawer = false" long
                  >返回设置</Button
                >
              </Drawer>
              <Tabs v-model="setup" type="card" name="settings">
                <TabPane tab="settings">
                  <Divider orientation="left" size="small"
                    >请在下方修改操作模式</Divider
                  >
                  <RadioGroup
                    vertical
                    size="large"
                    v-model="settings.operateMode"
                    style="width: 640px; height: 400px; overflow-y: scroll"
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
                    <RadioGroup
                      v-model="settings.operateMethod"
                      size="large"
                      vertical
                    >
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
                    <Button
                      type="primary"
                      @click="open(settings.operateMethod)"
                      long
                      >进入配置选项</Button
                    >
                  </div>
                </TabPane>
                <TabPane tab="settings">
                  <div class="list">
                    <RadioGroup
                      v-model="settings.sequenceMethod"
                      size="large"
                      vertical
                      accordion
                    >
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
                    <Button
                      type="primary"
                      @click="open(settings.sequenceMethod)"
                      long
                      >进入配置选项</Button
                    >
                  </div>
                </TabPane>
                <TabPane tab="settings">
                  <div class="list">
                    <RadioGroup
                      v-model="settings.integrateMethod"
                      size="large"
                      vertical
                    >
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
                    <Button
                      type="primary"
                      @click="open(settings.integrateMethod)"
                      long
                      >进入配置选项</Button
                    >
                  </div>
                </TabPane>
                <TabPane tab="settings">
                  <div class="list">
                    <RadioGroup
                      v-model="settings.encryptMethod"
                      size="large"
                      vertical
                    >
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
                    <Button
                      type="primary"
                      @click="open(settings.integrateMethod)"
                      long
                      >进入配置选项</Button
                    >
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
                      <Tag v-show="board" color="blue"
                        >您已成功导入{{ path }}</Tag
                      >
                      <Input v-model="path" placeholder="请选择模板文件位置" />
                      <div class="footer">
                        <Button type="primary" @click="openFile">浏览</Button
                        >&nbsp;
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
                        >{{ item }}</Tag
                      >
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
        </Row> -->
        <Settings/>
      </TabPane>
      <TabPane tab="MenuBar" label="实用工具" :disabled="state" icon="md-pricetags" >
        <!-- <Row :gutter="20">
          <i-col span="5">
            <Menu
              width="auto"
              :active-name="0"
              @on-select="function (i) { drawer = false; tool = i; }"
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
                  <Input
                    search
                    enter-button="浏览"
                    placeholder="请选择配置文件"
                  />
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
                  <div style="float: right">
                    <Button type="primary">添加</Button>&nbsp;
                    <Button type="primary">匹配</Button>&nbsp;
                    <Button type="primary">规则</Button>&nbsp;
                    <Button type="primary">帮助</Button>
                  </div>
                  <br />
                  <br />
                  <Card
                    :padding="0"
                    dis-hover
                    bordered
                    style="height: 350px; overflow-y: scroll"
                  >
                    <CellGroup>
                      <Cell
                        v-for="item in cells"
                        :key="item.title"
                        :title="item.title"
                        :selected="item.selected"
                      >
                        <Badge
                          dot
                          slot="extra"
                          :count="item.selected ? 1 : 0"
                        />
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
                  <Input
                    search
                    enter-button="选择"
                    @on-search="driver = true"
                    placeholder="选择解密驱动"
                  />
                  <br />
                  <Input
                    search
                    enter-button="浏览"
                    @on-search="console.log('……')"
                    placeholder="浏览文件位置"
                  />
                  <br />
                  <Input
                    search
                    enter-button="浏览"
                    @on-search="console.log('……')"
                    placeholder="浏览导出位置"
                  />
                  <br />
                  <Button type="primary" long @click="console.log('……')"
                    >确定</Button
                  >
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
                      <div v-if="data3.length == 0" style="padding: 5px 16px">
                        没有加载到驱动类
                      </div>
                    </AutoComplete>
                  </Modal>
                </TabPane>
                <TabPane tab="settings">
                  <Row :gutter="10">
                    <i-col span="20" style="height: 450px; overflow-y: scroll">
                      <Timeline>
                        <transition-group name="fade">
                          <TimelineItem
                            v-for="(item, i) in collect"
                            :key="i + 1"
                            :color="item.level"
                            >{{ item.message }}</TimelineItem
                          >
                        </transition-group>
                      </Timeline>
                    </i-col>
                    <i-col span="1">
                      <Divider type="vertical" style="height: 450px" />
                    </i-col>
                    <i-col span="3">
                      <Button type="primary" @click="console.log('……')"
                        >更新</Button
                      >
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
        </Row> -->
        <Tools/>
      </TabPane>
      <TabPane tab="MenuBar" label="模组列表" :disabled="state" icon="md-card">
        <!-- <Card
          title="模组列表"
          icon="ios-options"
          :padding="10"
          style="width: 850px"
        >
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
        </Card> -->
        <Modules/>
      </TabPane>
      <TabPane tab="MenuBar" label="关于我们" :disabled="state" icon="md-contact">
        <Contact/>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
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

import { mapState } from "vuex";

import Home from "./components/Home";
import TabBar from "./components/TabBar";
import Contact from "./components/Contact";
import Settings from "./components/Settings";
import Tools from "./components/Tools";
import Modules from "./components/Modules";

export default {
  data() {
    return {
      state: false // 复制开始结束时其他标签页的状态
    };
  },
  components: {
    Home,
    Tools,
    TabBar,
    Contact,
    Modules,
    Settings
  },
  computed: {
    ...mapState(["operateMode"])
  },
  watch: {
    operateMode: function () {
      if (this.operateMode == 1) {
        let parent = this.$refs.files;
        _delete(parent.data, parent.targetKeys, function (a, b) {
          return a.key == b;
        });
      }
    },
  },
};
</script>
<style scoped>
/* 主界面的设置 */
#panel {
  width: 920px;
  height: 580px;
  overflow: hidden;
  border: 1px solid #2d8cf0;
}

/* 用户操作区域的主要设置 */
#content {
  width: 860px;
  height: 520px;
  overflow: hidden;
  margin: 5px auto;
}
</style>