<template>
  <div class="card-container">
    <div class="card">
      <div
        v-show="personData.showType === 0 || personData.showType === 2"
        class="image-container"
      >
        <img :src="personData.photoList[0]" alt="人物图片" class="card-image" />
      </div>

      <div v-show="personData.showType === 1 || 2">
        <h3 class="card-title">{{ personData.nickName }}</h3>
        <el-divider></el-divider>
        <div class="card-details">
          <div class="describe">
            <p><span class="detail-label">年龄:</span> {{ personData.age }}</p>
            <p>
              <span class="detail-label">身高:</span> {{ personData.height }}
            </p>
            <!-- <p>
                <span class="detail-label">体重:</span> {{ personData.weight }}
              </p> -->
            <p>
              <span class="detail-label">职业:</span>
              {{ personData.job }}
            </p>
            <!-- <p>
                <span class="detail-label">自我介绍:</span>
                {{ personData.introduction }}
              </p>
              <p>
                <span class="detail-label">希望的她:</span>
                {{ personData.expectation }}
              </p> -->
          </div>
          <div class="motto">
            <div class="divider"></div>
            <div class="border-wrap"></div>
            <div class="motto-content">
              <span
                >理想中的人：这是测试测试删删除测试测试纯输出测试测试测试测试测试纯输出测试测试测试菜市场上厕所菜市场上厕所</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="buttons-container">
        <el-button
          size="small"
          class="like-button"
          icon="el-icon-thumb"
          :class="{ liked: liked }"
          @click="toggleLike"
        >
          点赞
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
export default {
  props: {
    personData: {
      userID: 0,
      nickName: "kjhdh",
      isBoy: false,
      age: 12,
      height: 120,
      weight: 10,
      job: "软件开发工程师",
      diploma: "",
      marriageStatus: "",
      introduction: "",
      expectation: "",
      photoList: [
        "https://stylesatlife.com/wp-content/uploads/2022/01/Handsome-Ranveer-Singh.jpg.webp",
      ],
      showType: 0,
    },
  },
  data() {
    return {
      liked: false,
    };
  },
  methods: {
    toggleLike() {
      this.liked = !this.liked;
    },
    openChat() {},
    showDetails() {},
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f5f7fa;
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
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.image-container {
  text-align: center;
}
.buttons-container {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.liked {
  color: red;
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
/* .divider {
  height: 100px;
  position: absolute;
  left: -12px;
  border: 1px solid black;
} */
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
  height: 93px;
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
