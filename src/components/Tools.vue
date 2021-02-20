<template>
  <Row :gutter="20">
    <i-col span="5">
      <Menu width="auto" :active-name="0" @on-select="(i) => index = i">
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
        <Tabs v-model="index" type="card" name="tools">
          <TabPane tab="tools">
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
          <TabPane tab="tools">
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
                  <Badge dot slot="extra" :count="item.selected ? 1 : 0" />
                </Cell>
              </CellGroup>
            </Card>
          </TabPane>
          <TabPane tab="tools">
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
          <TabPane tab="tools">
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
                :filter-method="filterMethod"
                placement="bottom-start"
                placeholder="在此选择解密驱动类"
              >
                <div v-if="data3.length == 0" style="padding: 5px 16px">
                  没有加载到驱动类
                </div>
              </AutoComplete>
            </Modal>
          </TabPane>
          <TabPane tab="tools">
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
</template>

<script>
export default {
  name: "Tools",
  data() {
    return {
      index: 0,
      data3: [], // 驱动类名称（字符串数组）
      collect: [], // 内部控制器内容
      complete: "", // 解密驱动名称
      driver: false, // 解密驱动选择窗口
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
          render: (h) => {
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
    };
  },
  methods: {
      filterMethod(value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
  },
};
</script>

<style scoped>
</style>