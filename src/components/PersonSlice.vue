<template>
  <div class="list-item">
    <div class="avatar">
      <HeadPortrait :imgUrl="getAvatarUrl(user.avatar_url)"></HeadPortrait>
    </div>
    <div class="user-info">
      <h3>{{ user.nick_name || "无名客" }}</h3>
    </div>
    <div class="buttons">
      <button @click="openChat">聊天</button>
      <button @click="openDetails">详情</button>
    </div>
  </div>
</template>

<script>
import HeadPortrait from "./HeadPortrait.vue";
import base from "../api/index";

let baseUrl = base.baseUrl;

export default {
  components: {
    HeadPortrait,
  },
  props: ["user"],
  methods: {
    // 获取头像链接
    getAvatarUrl(route) {
      if (route == "") {
        return route;
      } else {
        return baseUrl + route;
      }
    },
    openChat() {
      // Implement chat button functionality
      this.$router.push({
        name: "ChatHome",
        params: {
          data: this.user, // 携带的参数
        },
      });
    },
    openDetails() {
      // Implement details button functionality
      this.$router.push({
        name: "LoverDetail",
        params: {
          data: this.user, // 携带的参数
        },
      });
    },
  },
};
</script>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.avatar {
  margin-right: 10px;
}

.avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-info {
  flex-grow: 1;
}

.buttons {
  display: flex;
  align-items: center;
}

.buttons button {
  margin-left: 10px;
}
</style>
