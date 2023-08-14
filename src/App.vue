<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from "./view/home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style lang="scss">
@import url(./assets/font/iconfont.css);
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  font-size: 25px;
  vertical-align: middle;
  color: rgb(117, 120, 137);
  transition: 0.3s;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  padding: 0;
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  list-style-type: none;

  // background-color: rgb(151, 157, 167);
}
/* 整个滚动条 */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  background-color: #acacac;
  /* 关键代码 */

  border-radius: 32px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background-color: #dbeffd1e;
  border-radius: 32px;
}
</style>
