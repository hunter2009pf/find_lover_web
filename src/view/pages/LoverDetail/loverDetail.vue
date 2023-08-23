<template>
  <div class="page">
    <div class="photo-show" v-if="personData.photo_urls.length > 0">
      <el-carousel :interval="2000" arrow="always">
        <el-carousel-item
          style="align-items: center"
          v-for="item in personData.photo_urls"
          :key="item"
        >
          <img
            :src="generateCompletePhotolUrl(item)"
            class="carousel-image"
            alt="photo during daily life"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="card" v-if="personData.show_type !== 1">
      <div class="card-info">
        <h2>{{ personData.nick_name || "无名客" }}</h2>
        <p style="padding-top: 16px">年龄：{{ personData.age }}</p>
        <p style="padding-top: 16px">
          性别：{{ personData.is_boy ? "男" : "女" }}
        </p>
        <p style="padding-top: 16px">身高：{{ personData.height }}cm</p>
        <p style="padding-top: 16px">体重：{{ personData.weight }}kg</p>
        <p style="padding-top: 16px">出生地：{{ personData.birth_place }}</p>
        <p style="padding-top: 16px">居住地：{{ personData.current_place }}</p>
        <p style="padding-top: 16px">车辆情况：{{ personData.car_status }}</p>
        <p style="padding-top: 16px">学历：{{ personData.degree }}</p>
        <p style="padding-top: 16px">期待的ta：{{ personData.expectation }}</p>
        <p style="padding-top: 16px">房屋情况：{{ personData.house_status }}</p>
        <p style="padding-top: 16px">职业：{{ personData.job }}</p>
        <p style="padding-top: 16px">婚姻状况：{{ personData.marry_status }}</p>
        <p style="padding-top: 16px">
          是独生子女？ {{ personData.unique_child_status }}
        </p>
        <p style="padding-top: 16px">微信号：{{ personData.wechat }}</p>
      </div>
    </div>
    <button class="home-button" @click="goBack">返回</button>
  </div>
</template>

<script>
import base from "../../../api/index";
let baseUrl = base.baseUrl;

export default {
  data() {
    return {
      personData: {},
    };
  },
  mounted() {
    this.personData = this.$route.params.data;
    this.currentPerson = this.people[0];
  },
  methods: {
    generateCompletePhotolUrl(photo_url) {
      return baseUrl + photo_url;
    },
    goBack() {
      this.$router.go(-1); // This will pop out one page in the history stack
    },
    selectPerson(index) {
      this.currentPerson = this.people[index];
    },
  },
};
</script>

<style scoped>
.page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding-top: 80px;
}

.photo-show {
  flex: 1;
  overflow: hidden;
}

.slideshow-container {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-image {
  width: 80%;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card {
  flex: 1;
  background-color: #f2f2f2;
  padding: 20px;
}

.card-info {
  text-align: start;
  padding-left: 80px;
}

.home-button {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
}
</style>
