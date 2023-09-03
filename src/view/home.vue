<template>
  <div class="home">
    <el-header>
      <div class="nav">
        <el-menu
          :default-active="currentRoute"
          class="el-menu-top"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="CardList">帅哥美女</el-menu-item>
          <el-menu-item index="ChatHome">
            <el-badge is-dot :hidden="!hasNewMsg">即时通讯</el-badge>
          </el-menu-item>
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
import base from "../api/index";

let chatIP = base.chatIP;
let chatPort = base.chatPort;

export default {
  name: "App",
  components: {
    Nav,
  },
  data() {
    return {
      currentRoute: "CardList",
      hasNewMsg: false,
      wsSocket: null,
    };
  },

  mounted() {
    // ws建连
    if (this.wsSocket == null || this.wsSocket.readyState !== WebSocket.OPEN) {
      const token = localStorage.getItem("token");

      this.wsSocket = new WebSocket(
        "ws://" + chatIP + ":" + chatPort + "/v1/websocket/connect/" + token
      );

      this.wsSocket.onopen = function (e) {
        // alert("[open] Connection established");
        console.log("websocket connected successfully");
      };

      let that = this;
      this.wsSocket.onmessage = async function (event) {
        var jsonData = JSON.parse(event.data);
        if (jsonData.main_type == "message") {
          console.log("receive new message");
          if (that.$route.path !== "/ChatHome") {
            that.hasNewMsg = true;
            that.$message({
              message: "收到新消息！",
              duration: 1000,
              type: "success",
            });
          }
        }
      };

      this.wsSocket.onclose = function (event) {
        console.log("websocket close code: ", event.code, "   ", event.reason);
        if (event.wasClean) {
          // alert(
          //   `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
          // );
          console.log(
            `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
          );
        } else {
          // e.g. server process killed or network down
          // event.code is usually 1006 in this case
          // alert("[close] Connection died");
        }
      };

      this.wsSocket.onerror = function (error) {
        console.log(error);
        that.$message({
          message: "websocket连接错误",
          type: "error",
          duration: 1000,
        });
      };

      // Set the WebSocket instance in the Vuex store
      this.$store.commit("setWebSocketInstance", this.wsSocket);
    }
  },

  beforeDestroy() {
    // 在组件销毁之前的清理工作
    // 断开websocket并销毁
    this.wsSocket.close();
    this.wsSocket = null;
  },

  methods: {
    handleSelect(e) {
      console.log(e);
      if (e === "ChatHome") {
        this.hasNewMsg = false;
      }
      this.$router.push(
        {
          name: e,
        },
        () => {}
      );
    },
    quit() {
      localStorage.clear();
      this.$router.replace(
        {
          name: "login",
        },
        () => {}
      );
    },
  },
  watch: {
    $route(to, from) {
      // 监听到路由变化时的操作
      console.log("路由变化了", to, from);
      this.currentRoute = to.name;
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

.el-menu-top {
  margin-top: 4px;
}
</style>
