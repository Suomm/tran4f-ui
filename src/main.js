import Vue from 'vue'
import './assets/content.css'
import 'view-design/dist/styles/iview.css'

import {
    Col,
    Row,
    Tag,
    Card,
    Form,
    Menu,
    Tabs,
    Step,
    List,
    Cell,
    Icon,
    Steps,
    Radio,
    Table,
    Modal,
    Input,
    Badge,
    Panel,
    Alert,
    Drawer,
    Button,
    Select,
    Option,
    Poptip,
    Switch,
    Message,
    Divider,
    TabPane,
    Collapse,
    FormItem,
    Checkbox,
    Transfer,
    MenuItem,
    Dropdown,
    Timeline,
    MenuGroup,
    CellGroup,
    RadioGroup,
    InputNumber,
    ButtonGroup,
    TimelineItem,
    AutoComplete,
    DropdownMenu
} from 'view-design'

Vue.prototype.$Modal = Modal

Vue.prototype.$Message = Message
Vue.prototype.$Message.config({
    top: 75,
    duration: 2
})

Vue.component('Row', Row)
Vue.component('Tag', Tag)
Vue.component('Card', Card)
Vue.component('Menu', Menu)
Vue.component('List', List)
Vue.component('Tabs', Tabs)
Vue.component('Form', Form)
Vue.component('Step', Step)
Vue.component('Icon', Icon)
Vue.component('Cell', Cell)
Vue.component('i-col', Col)
Vue.component('Panel', Panel)
Vue.component('Alert', Alert)
Vue.component('Table', Table)
Vue.component('Radio', Radio)
Vue.component('Input', Input)
Vue.component('Modal', Modal)
Vue.component('Badge', Badge)
Vue.component('Steps', Steps)
Vue.component('Drawer', Drawer)
Vue.component('Select', Select)
Vue.component('Option', Option)
Vue.component('Poptip', Poptip)
Vue.component('Button', Button)
Vue.component('TabPane', TabPane)
Vue.component('Divider', Divider)
Vue.component('i-switch', Switch)
Vue.component('Dropdown', Dropdown)
Vue.component('FormItem', FormItem)
Vue.component('Checkbox', Checkbox)
Vue.component('Collapse', Collapse)
Vue.component('MenuItem', MenuItem)
Vue.component('Transfer', Transfer)
Vue.component('Timeline', Timeline)
Vue.component('ListItem', List.Item)
Vue.component('MenuGroup', MenuGroup)
Vue.component('CellGroup', CellGroup)
Vue.component('RadioGroup', RadioGroup)
Vue.component('ButtonGroup', ButtonGroup)
Vue.component('InputNumber', InputNumber)
Vue.component('TimelineItem', TimelineItem)
Vue.component('AutoComplete', AutoComplete)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('ListItemMeta', List.Item.Meta)

Vue.config.productionTip = false

import Vuex from 'vuex'

Vue.use(Vuex)

import tools from './tools'

const store = new Vuex.Store({
    state: {
        configs: {
            // 气泡提示的开关
            merge: true,
            // 历史记录相关设置的开关
            history: true,
            // 自动（延时）停止选项的开关
            delay: false,
            // 延迟时间大小
            time: 10,
            // 历史记录保存条数
            lines: 10,
            // 任务合并的数值
            count: 100,
            // 文件后缀名
            suffixes: [
                ".docx",
                ".pptx",
                ".xlsx",
                ".doc",
                ".ppt",
                ".xls",
                ".jpg",
                ".png",
                ".gif",
                ".mp3",
                ".mp4",
                ".pdf",
                ".txt"
            ],
            modules: []
        },
        options: {
            // 操作模式序号
            operateMode: 0,
            // 正则表达式列表
            regexDatas: [],
            // 所有文件目录
            transferFolder: [],
            // 导出文件目录索引
            outputFolderIndices: [],
            // 加密实体类的名称
            encryptMethod: null,
            // 操作方式实体类的名称
            operateMethod: null,
            // 扩展操作实体类的名称
            sequenceMethod: null,
            // 文件整合实体类的名称
            integrateMethod: null
        },
        service: {
            encrypt: [],
            sequence: [],
            operator: [],
            integrate: [],
            mode: [{
                    name: "复制",
                    detail: "将导入文件夹目录中的文件复制到导出文件夹目录中，如果文件名重复会提醒选择处理策略"
                },
                {
                    name: "删除",
                    detail: "删除导入文件及目录中的所有文件（文件夹）"
                },
                {
                    name: "移动",
                    detail: "将文件从导入文件夹目录移动到导出文件夹目录（源目录中的文件将不存在）"
                },
                {
                    name: "跳过",
                    detail: "在文件复制过程中如果导出文件夹目录中包含同名文件，则跳过复制导入文件夹目录中的文件"
                },
                {
                    name: "替换",
                    detail: "使用导入文件夹目录中的文件替换导出文件夹目录中的同名文件"
                },
                {
                    name: "新建",
                    detail: "对导入文件夹目录中的文件进行重命名后新建在导出文件夹目录"
                },
                {
                    name: "整理",
                    detail: "对导入文件夹目录的一些文件进行整理后写入导出文件夹目录"
                },
                {
                    name: "修改",
                    detail: "只对导入文件夹目录中的文件名称进行统一的修改操作"
                },
                {
                    name: "加密",
                    detail: "对导入文件夹目录的文件进行加密后写入导出文件夹目录"
                }
            ]
        },
        program: {
            start: false,
            locked: false
        }
    },
    mutations: {
        push(state, val) {
            tools.$push(state.options.transferFolder, {
                key: state.options.transferFolder.length,
                value: val
            })
        },
        difference(state, array) {
            let a = new Set(array)
            let b = state.options.outputFolderIndices
            state.options.outputFolderIndices = b.filter(x => !a.has(x))
        },
        remove(state, keys) {
            tools.$delete(state.options.transferFolder, keys, (a, b) => a.key == b);
        },
        clear(state) {
            tools.$delete(state.options.transferFolder, state.options.outputFolderIndices, (a, b) => a.key == b);
        },
        addRegExp(state, o) {
            tools.$push(state.options.regexDatas, o)
        },
        delRegExp(state, keys) {
            tools.$delete(state.options.regexDatas, keys, (a, b) => a.value === b.value)
            if (state.program.locked && state.options.regexDatas.length == 0) state.program.locked = false
        },
        clearRegExp(state) {
            state.options.regexDatas.length = 0
            state.options.regexDatas.push({
                key: "匹配全部",
                value: ".+"
            })
        }
    }
})

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:1028/'

Vue.prototype.$axios = axios

import App from './App.vue'

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')