<template>
  <div>
    <p class="control shut" @click="shutdown">×</p>
    <p class="control mini" @click="minimize">-</p>
    <div id="logo" style="-webkit-app-region: drag">
      <span id="name">
        <b>tran4f</b>
      </span>
    </div>
  </div>
</template>

<script>
const { ipcRenderer: ipc } = require("electron");
export default {
  methods: {
    shutdown() {
      ipc.send("close")
    },
    minimize() {
      ipc.send("minimize")
    },
  },
};
</script>

<style scoped>
/* 图标的设置 */
#logo {
  width: 830px;
  height: 30px;
  background-image: url("../assets/logo.png");
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
</style>
