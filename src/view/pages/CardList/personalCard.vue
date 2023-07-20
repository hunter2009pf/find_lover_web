<template>
  <div class="card-container">
    <div class="card">
      <div
        v-show="personData.showType === 0 || personData.showType === 2"
        class="image-container"
      >
        <img :src="personData.photoList[0]" alt="人物图片" class="card-image" />
      </div>

      <div v-show="personData.showType === 1 || 2" class="details-container">
        <h3 class="card-title">{{ personData.nickName }}</h3>
        <el-divider></el-divider>
        <div class="card-details">
          <p><span class="detail-label">年龄:</span> {{ personData.age }}</p>
          <p><span class="detail-label">身高:</span> {{ personData.height }}</p>
          <p><span class="detail-label">体重:</span> {{ personData.weight }}</p>
          <p>
            <span class="detail-label">职业:</span>
            {{ personData.marriageStatus }}
          </p>
          <p>
            <span class="detail-label">自我介绍:</span>
            {{ personData.introduction }}
          </p>
          <p>
            <span class="detail-label">希望的她:</span>
            {{ personData.expectation }}
          </p>
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

  background-color: #f5f7fa;
}

.card {
  width: 400px;
  height: 700px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  overflow: hidden;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.image-container {
  text-align: center;
  padding: 20px;
}
.buttons-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}

.details-container {
  padding-top: 20px;
  text-align: center;
}

.card-title {
  font-size: 24px;
  margin: 10px 0;
}

.card-details {
  margin-top: 10px;
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
</style>
