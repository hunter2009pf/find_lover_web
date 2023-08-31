<template>
  <div class="page">
    <div
      class="photo-show"
      v-if="
        typeof personData.photo_urls !== 'undefined' &&
        personData.photo_urls.length > 0
      "
    >
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
    <div
      class="card"
      v-if="personData.show_type === 1 || personData.show_type === 2"
    >
      <div class="flex-item">
        <div class="avatar-and-name">
          <HeadPortrait
            :imgUrl="getAvatarUrl(personData.avatar_url)"
          ></HeadPortrait>
          <h2 style="padding-left: 16px">
            {{ personData.nick_name || "无名客" }}
          </h2>
        </div>
        <p class="personal-info-left">年龄：{{ personData.age }}</p>
        <p class="personal-info-left">
          性别：{{ personData.is_boy ? "男" : "女" }}
        </p>
        <p class="personal-info-left">身高：{{ personData.height }}cm</p>
        <p class="personal-info-left">体重：{{ personData.weight }}kg</p>
        <p class="personal-info-left">职业：{{ personData.job }}</p>
        <p class="personal-info-left">
          婚姻状况：{{ personData.marry_status }}
        </p>
      </div>
      <div class="flex-item">
        <p style="padding-top: 16px">出生地：{{ personData.birth_place }}</p>
        <p style="padding-top: 16px">居住地：{{ personData.current_place }}</p>
        <p style="padding-top: 16px">车辆情况：{{ personData.car_status }}</p>
        <p style="padding-top: 16px">学历：{{ personData.degree }}</p>
        <p style="padding-top: 16px">房屋情况：{{ personData.house_status }}</p>
        <p style="padding-top: 16px">
          是独生子女？ {{ personData.unique_child_status }}
        </p>
        <p style="padding-top: 16px">微信号：{{ personData.wechat }}</p>
        <p class="long-text-shown">自我介绍：{{ personData.introduction }}</p>
        <p class="long-text-shown">期待的ta：{{ personData.expectation }}</p>
      </div>
    </div>
    <div v-else-if="personData.show_type === 0">
      <h2 class="home-button-left">{{ personData.nick_name || "无名客" }}</h2>
    </div>
    <button class="home-button" @click="goBack">返回</button>
  </div>
</template>

<script>
import HeadPortrait from "../../../components/HeadPortrait.vue";
import base from "../../../api/index";
let baseUrl = base.baseUrl;

export default {
  components: {
    HeadPortrait,
  },
  data() {
    return {
      personData: {},
    };
  },
  mounted() {
    this.personData = this.$route.params.data;
    console.log("personal data: ", this.personData);
  },
  methods: {
    // 获取头像链接
    getAvatarUrl(route) {
      console.log(route);
      if (route == "") {
        return route;
      } else {
        return baseUrl + route;
      }
    },
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

.carousel-image {
  height: 100%;
  object-fit: fill;
  display: block;
  margin: 0 auto;
}

.card {
  flex: 1;
  display: flex;
  justify-content: space-between; /* Distribute items evenly along the main axis */
  background-color: Violet;
  padding: 16px;
  margin: 16px;
  border-radius: 32px;
}

.flex-item {
  flex-basis: 50%; /* Set each item to occupy 50% width */
  /* Add any additional styling for your flex items */
}

.avatar-and-name {
  display: flex;
  justify-content: center; /* Align items horizontally to the center */
  align-items: center;
}

.personal-info-left {
  padding-top: 16px;
  padding-left: 50%;
}

.long-text-shown {
  padding-top: 16px;
  word-wrap: break-word; /* Wrap long words onto the next line */
  white-space: pre-line; /* Preserve line breaks and wrap text onto the next line */
}
.home-button-left {
  position: absolute;
  top: 16px;
  right: 112px;
  padding: 10px 20px;
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
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
