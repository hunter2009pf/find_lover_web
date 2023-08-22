<template>
  <div class="person-card" :class="{ activeCard: personInfo.id == current }">
    <div class="info">
      <HeadPortrait
        :imgUrl="getAvatarUrl(personInfo.chat_avatar)"
      ></HeadPortrait>
      <div class="info-detail">
        <div class="name">{{ personInfo.chat_name }}</div>
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
            {{ showHourAndMinute(personInfo.last_message.timestamp) }}
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
