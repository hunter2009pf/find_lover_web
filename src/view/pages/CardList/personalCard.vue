<template>
  <div class="card-container">
    <div class="card">
      <div v-if="this.personData.show_type == 0">
        <div class="image-container">
          <img :src="photoUrl" alt="人物图片" class="card-image" />
        </div>
        <div>
          <div class="no-info">
            <img
              src="../../../assets/img/default-img.png"
              alt=""
              style="height: 100px; width: 100px"
            />
            <div style="color: #80808099">对方隐藏了信息哦</div>
          </div>
        </div>
      </div>
      <div v-else-if="personData.show_type == 1">
        <div style="margin-top: 160px">
          <h3 class="card-title">{{ personData.nick_name }}</h3>
          <el-divider></el-divider>
          <div class="card-details">
            <div class="describe">
              <p>
                <span class="detail-label">年龄:</span> {{ personData.age }}
              </p>
              <p>
                <span class="detail-label">身高:</span>
                {{ personData.height }}
              </p>

              <p>
                <span class="detail-label">职业:</span>
                {{ personData.job }}
              </p>
            </div>
            <div class="motto">
              <div class="divider"></div>
              <div class="border-wrap"></div>
              <div class="motto-content">
                <span
                  >自我介绍：{{
                    personData.introduction || "这个人很神秘，快来聊天了解他吧~"
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="personData.show_type == 2">
        <div class="image-container">
          <img :src="photoUrl" alt="人物图片" class="card-image" />
        </div>
        <div>
          <h3 class="card-title">{{ personData.nick_name }}</h3>
          <el-divider></el-divider>
          <div class="card-details">
            <div class="describe">
              <p>
                <span class="detail-label">年龄:</span> {{ personData.age }}
              </p>
              <p>
                <span class="detail-label">身高:</span>
                {{ personData.height }}
              </p>

              <p>
                <span class="detail-label">职业:</span>
                {{ personData.job }}
              </p>
            </div>
            <div class="motto">
              <div class="divider"></div>
              <div class="border-wrap"></div>
              <div class="motto-content">
                <span>自我介绍：{{ personData.introduction }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="buttons-container">
        <el-button
          size="small"
          class="like-button"
          icon="el-icon-star-off"
          :class="liked ? 'like-status' : ''"
          @click="toggleLike"
        >
          喜欢
        </el-button>
        <el-button
          size="small"
          class="chat-button"
          icon="el-icon-chat-dot-round"
          @click="openChat"
        >
          聊天
        </el-button>
        <el-button
          size="small"
          class="details-button"
          icon="el-icon-info"
          @click="showDetails"
        >
          详情
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { likePeople, dislikePeople } from "../../../api/getData";
import base from "../../../api/index";
export default {
  props: {
    personData: {},
    idolList: [],
  },
  data() {
    return {
      liked: false,
      base,
    };
  },
  computed: {
    photoUrl() {
      return `${this.base.baseUrl}${
        this.personData?.photo_urls[0] ? this.personData?.photo_urls[0] : ""
      }`;
    },
  },
  methods: {
    toggleLike() {
      if (this.liked) {
        dislikePeople({ idol_id: this.personData.user_id }).then(() => {
          this.liked = false;
        });
      } else {
        const formData = new FormData();
        formData.append("idol_id", this.personData.user_id);
        likePeople(formData).then(() => {
          this.liked = true;
        });
      }
    },
    openChat() {
      console.log(this.personData);
      this.$router.push({
        name: "ChatHome",
        params: {
          data: this.personData, // 携带的参数
        },
      });
    },
    showDetails() {
      this.$router.push({
        name: "LoverDetail",
        params: {
          data: this.personData, // 携带的参数
        },
      });
    },
  },
  mounted() {
    console.log(this.personData.user_id, this.idolList);
    if (this.idolList) {
      this.liked = this.idolList.some(
        (item) => item.user_id === this.personData.user_id
      );
    }
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* background-color: #f5f7fa; */
}

.card {
  width: 400px;
  height: 90%;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 13px 13px 20px 5px rgb(107 70 70 / 10%);
  transition: box-shadow 0.3s;
  overflow: hidden;
  border-radius: 16px;
  background-image: url("../../../assets/img/card-bg.jpeg");
  background-size: cover;
  background-position: center;
  position: relative;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.image-container {
  height: 185px;
  width: 185px;
  text-align: center;
  margin: 0 auto;
}
.buttons-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  bottom: 60px;
}

.like-status {
  background-color: pink;
  color: green;
}

.like-button,
.chat-button,
.details-button {
  margin: 0 10px;
  padding: 0 15px;
  height: 30px;
}

.card-image {
  width: 185px;
  height: 185px;
  object-fit: cover;
  border-radius: 50%;
}

.card-title {
  font-size: 24px;
  margin: 10px 0;
  text-align: center;
}

.card-details {
  height: 120px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.describe {
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 20px;
}
.describe p {
  margin-bottom: 6px;
}
.no-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}
.border-wrap {
  position: absolute;
  width: 35px;
  height: 75px;
  top: -12px;
  left: -10px;
  border: 3px solid rgb(124, 196, 198);
}
.motto-content {
  padding: 6px;
  position: absolute;
  width: 170px;
  min-height: 80px;
  top: 0px;
  left: 0px;
  border: 3px solid rgb(124, 136, 198);
  background-color: white;
  font-size: 14px;
  text-align: left;
  text-overflow: ellipsis;
}
.motto {
  width: 45%;
  position: relative;
}

.detail-label {
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active,
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter,
.fade-leave-to,
.slide-enter,
.slide-leave-to {
  opacity: 0;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(20px);
}
/* .col-detail {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(90% - 300px);
} */
</style>
