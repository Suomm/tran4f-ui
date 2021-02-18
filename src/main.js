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

import axios from 'axios'

Vue.prototype.$axios = axios

import App from './App.vue'

new Vue({
    render: h => h(App),
}).$mount('#app')