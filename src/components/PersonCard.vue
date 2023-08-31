<template>
  <div class="person-card" :class="{ activeCard: personInfo.id == current }">
    <div class="info">
      <HeadPortrait
        :imgUrl="getAvatarUrl(personInfo.chat_avatar)"
      ></HeadPortrait>
      <div class="info-detail">
        <div class="name">{{ personInfo.chat_name || "无名客" }}</div>
        <div class="last-message-bot">
          <span
            v-if="
              personInfo.last_message !== null &&
              personInfo.last_message.type == 0
            "
            class="last-message-content"
          >
            {{ personInfo.last_message.content }}
          </span>
          <span
            v-else-if="
              personInfo.last_message !== null &&
              personInfo.last_message.type == 1
            "
            class="last-message-content"
            >emoji~</span
          >
          <span v-else></span>
          <span
            class="last-message-time"
            v-if="personInfo.last_message.timestamp"
          >
            {{ getTimeDisplay(personInfo.last_message.timestamp) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadPortrait from "./HeadPortrait.vue";
import base from "../api/index";
let baseUrl = base.baseUrl;

export default {
  props: {
    personInfo: {
      default: {},
    },
    pcCurrent: {
      default: "",
    },
  },
  components: {
    HeadPortrait,
  },
  data() {
    return {
      current: "",
    };
  },
  watch: {
    pcCurrent: function () {
      this.isActive();
    },
  },
  methods: {
    isActive() {
      this.current = this.pcCurrent;
    },

    showHourAndMinute(timeInMilliSecond) {
      console.log(timeInMilliSecond);
      var date = new Date(timeInMilliSecond);
      return date.getHours() + ":" + date.getMinutes();
    },
    getTimeDisplay(timestamp) {
      let now = new Date();
      let nowTimestamp = now.getTime();
      let diff = (nowTimestamp - timestamp) / 1000; // 时间差，单位为秒

      // 判断是否是今天
      if (diff < 24 * 60 * 60) {
        // 如果是今天，展示时间
        return formatTime(timestamp);
      }

      // 判断是否是昨天
      let yesterday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 1
      );
      let yesterdayTimestamp = yesterday.getTime();
      if (timestamp > yesterdayTimestamp) {
        // 如果是昨天，展示"昨天 + 时间"
        return "昨天 " + formatTime(timestamp);
      }

      // 判断是否是两天以上
      if (diff < 2 * 24 * 60 * 60) {
        // 如果是两天以上，展示"几月几号"
        return formatDate(timestamp);
      }

      // 一年以上展示"年月日"
      return formatFullDate(timestamp);
      // 格式化时间
      function formatTime(timestamp) {
        let date = new Date(timestamp);
        let hour = date.getHours();
        let minute = date.getMinutes();
        return `${formatDigit(hour)}:${formatDigit(minute)}`;
      }

      // 格式化日期
      function formatDate(timestamp) {
        let date = new Date(timestamp);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return `${month}月${day}日`;
      }

      // 格式化年月日
      function formatFullDate(timestamp) {
        let date = new Date(timestamp);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return `${year}年${month}月${day}日`;
      }

      // 补零
      function formatDigit(num) {
        return num < 10 ? "0" + num : num;
      }
    },

    getAvatarUrl(route) {
      if (route == "") {
        return route;
      } else {
        return baseUrl + route;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.person-card {
  width: 250px;
  height: 80px;
  border-radius: 10px;
  background-color: rgb(50, 54, 68);
  position: relative;
  margin: 25px 0;
  cursor: pointer;
  .info {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 90%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    display: flex;
    .info-detail {
      margin-top: 5px;
      margin-left: 20px;
      .name {
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 5px;
      }
      .last-message-bot {
        max-width: 100px;
      }
      .last-message-content {
        display: block;
        color: #00ffff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
      }
      .last-message-time {
        color: #5c6675;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
      }
    }
  }
  &:hover {
    background-color: #1d90f5;
    transition: 0.3s;
    box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
    // box-shadow:  0 5px 20px rgba(251, 152, 11, .5);
    .info {
      .info-detail {
        .detail {
          color: #fff;
        }
      }
    }
  }
}
.activeCard {
  background-color: #1d90f5;
  transition: 0.3s;
  box-shadow: 3px 2px 10px 0px rgba(0, 136, 255);
  .info {
    .info-detail {
      .detail {
        color: #fff;
      }
    }
  }
}
</style>
