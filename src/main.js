import Vue from 'vue'
import './content.css'
import 'view-design/dist/styles/iview.css'

import {
    Row,
    Col,
    Tag,
    Card,
    Menu,
    Form,
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
} from 'view-design';

Vue.prototype.$Modal = Modal;

Vue.prototype.$Message = Message;
Vue.prototype.$Message.config({
    top: 75,
    duration: 2
});

Vue.component('Row', Row);
Vue.component('Tag', Tag);
Vue.component('i-col', Col);
Vue.component('Card', Card);
Vue.component('Menu', Menu);
Vue.component('List', List);
Vue.component('Tabs', Tabs);
Vue.component('Form', Form);
Vue.component('Step', Step);
Vue.component('Icon', Icon);
Vue.component('Cell', Cell);
Vue.component('Panel', Panel);
Vue.component('Alert', Alert);
Vue.component('Table', Table);
Vue.component('Radio', Radio);
Vue.component('Input', Input);
Vue.component('Modal', Modal);
Vue.component('Badge', Badge);
Vue.component('Steps', Steps);
Vue.component('Drawer', Drawer);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Poptip', Poptip);
Vue.component('Button', Button);
Vue.component('i-switch', Switch);
Vue.component('TabPane', TabPane);
Vue.component('Divider', Divider);
Vue.component('ListItem', List.Item);
Vue.component('Dropdown', Dropdown);
Vue.component('FormItem', FormItem);
Vue.component('Checkbox', Checkbox);
Vue.component('Collapse', Collapse);
Vue.component('MenuItem', MenuItem);
Vue.component('Transfer', Transfer);
Vue.component('Timeline', Timeline);
Vue.component('MenuGroup', MenuGroup);
Vue.component('CellGroup', CellGroup);
Vue.component('RadioGroup', RadioGroup);
Vue.component('ButtonGroup', ButtonGroup);
Vue.component('InputNumber', InputNumber);
Vue.component('TimelineItem', TimelineItem);
Vue.component('AutoComplete', AutoComplete);
Vue.component('ListItemMeta', List.Item.Meta);
Vue.component('DropdownMenu', DropdownMenu);

Vue.config.productionTip = false

import Vuex from 'vuex'

Vue.use(Vuex)

const _push = (data, obj) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].value == obj.value) return false;
    }
    data.push(obj);
    return true;
}

const _delete = (data, keys, test) => {
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

const store = new Vuex.Store({
    state: {
        encrypt: null,
        sequence: null,
        operator: null,
        integrate: null,
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
        mode: [{
                name: "复制",
                detail: "将导入文件夹目录中的文件复制到导出文件夹目录中，如果文件名重复会提醒选择处理策略",
            },
            {
                name: "删除",
                detail: "删除导入文件及目录中的所有文件（文件夹）",
            },
            {
                name: "移动",
                detail: "将文件从导入文件夹目录移动到导出文件夹目录（源目录中的文件将不存在）",
            },
            {
                name: "跳过",
                detail: "在文件复制过程中如果导出文件夹目录中包含同名文件，则跳过复制导入文件夹目录中的文件",
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
            "\\.txt"
        ]
    },
    mutations: {
        source(state, obj) {
            return _push(state.transferFolder, obj)
        },
        addRegExp(state, obj) {
            return _push(state.regexDatas, obj)
        },
        delRegExp(state, obj) {
            _delete(state.regexDatas, obj, function(a, b) {
                return a.key === b.key && a.value === b.value;
            });
        },
        suffix(state, obj) {
            return _push(state.suffixes, obj)
        },
        update(state, payload) {
            state[payload.name] = payload.value
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