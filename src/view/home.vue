<template>
  <div class="home">
    <el-header>
      <div class="nav">
        <el-menu
          default-active="cardList"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="CardList">帅哥美女</el-menu-item>
          <el-menu-item index="ChatHome">即时通讯</el-menu-item>
          <el-menu-item index="PersonalDetail">个人资料</el-menu-item>
          <el-menu-item index="JoinUs">加入我们</el-menu-item>
        </el-menu>
      </div>
      <el-button class="quit" @click="quit">退出</el-button>
    </el-header>

    <el-container height="100%">
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
export default {
  name: "App",
  components: {
    Nav,
  },
  data() {
    return {
      activeTab: "cardList",
    };
  },
  methods: {
    handleSelect(e) {
      console.log(e);
      this.$router.push(
        {
          name: e,
        },
        () => {}
      );
    },
    quit() {
      this.$router.push(
        {
          name: "login",
        },
        () => {}
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  // background-color: rgb(39, 42, 55);
  // border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.nav {
  position: relative;
}
.quit {
  position: absolute;
  right: 30px;
  top: 13px;
}
:deep(.el-header) {
  padding: 0;
}
</style>
