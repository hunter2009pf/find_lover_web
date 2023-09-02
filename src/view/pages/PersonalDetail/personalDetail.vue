<template>
  <div class="wrap">
    <div v-if="!editing">
      <div class="card">
        <div class="card-left">
          <div class="base-detail">
            <div class="base-info">
              <HeadPortrait
                :imgUrl="getAvatarUrl(personDetail.avatar_url)"
                :canUpload="true"
                :diameter="200"
                @updateAvatarUrl="updateAvatarUrl"
              ></HeadPortrait>
              <h2 style="margin-top: 16px">
                {{ personDetail.nick_name || "无名客" }}
              </h2>
              <ul>
                <li>年龄: {{ personDetail.age }}</li>
                <li>性别：{{ personDetail.is_boy ? "男" : "女" }}</li>
                <li>身高：{{ personDetail.height }} cm</li>
                <li>体重：{{ personDetail.weight }} kg</li>
                <li>婚姻状况：{{ personDetail.marry_status }}</li>
                <li>车辆情况: {{ personDetail.car_status }}</li>
                <li>房屋情况: {{ personDetail.house_status }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="card-middle">
          <li>工作: {{ personDetail.job }}</li>
          <li>学历：{{ personDetail.degree }}</li>
          <li>出生地：{{ personDetail.birth_place }}</li>
          <li>当前住址: {{ personDetail.current_place }}</li>
          <li>是否独孩：{{ personDetail.unique_child_status }}</li>
          <li>微信: {{ personDetail.wechat }}</li>
          <li>展示类型：{{ showType[personDetail.show_type] }}</li>
          <p class="long-text-style">
            期望的ta：{{ personDetail.expectation }}
          </p>
          <p class="long-text-style">
            自我介绍：{{
              personDetail.introduction ||
              "简单介绍一下自己，更容易找到另一半呦~"
            }}
          </p>
        </div>

        <div class="card-right">
          <el-empty
            description="期待您上传生活照呦~"
            v-if="personDetail.photo_urls?.length == 0"
          ></el-empty>
          <el-carousel :autoplay="false" v-else>
            <el-carousel-item
              v-for="image in personDetail.photo_urls"
              :key="image.id"
            >
              <img
                :src="`${base.baseUrl}${image}`"
                :alt="image.alt"
                class="carousel-image"
              />
            </el-carousel-item>
          </el-carousel>
          <div class="edit-btn">
            <el-button type="warning" plain @click="handleEdit">编辑</el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else style="width: 100%; height: 100%">
      <editDetailNew
        @cancelEditing="cancelEditing"
        @doneUpload="doneUpload"
        :personInfo="personDetail"
      ></editDetailNew>
    </div>
  </div>
</template>

<script>
import { showType } from "../../../constant/index";
import { getMyInfo } from "../../../api/getData";
import base from "../../../api/index";
import HeadPortrait from "../../../components/HeadPortrait.vue";
import editDetailNew from "./editDetailNew.vue";

let baseUrl = base.baseUrl;

export default {
  components: {
    editDetailNew,
    HeadPortrait,
  },
  data() {
    return {
      showType,
      personDetail: {},
      base,
      editing: false, // 编辑表单
    };
  },

  methods: {
    handleEdit() {
      this.editing = true;
    },
    cancelEditing() {
      getMyInfo().then((res) => {
        this.personDetail = res.data;
      });
      this.editing = false;
    },
    doneUpload() {
      getMyInfo().then((res) => {
        this.personDetail = res.data;
      });
      this.editing = false;
      console.log("is editing mode? ", this.editing);
    },
    updateAvatarUrl(newAvatarRoute) {
      console.log("new avatar route is ", newAvatarRoute);
      this.personDetail.avatar_url = newAvatarRoute;
      window.localStorage.setItem(
        "user_info",
        JSON.stringify(this.personDetail)
      );
    },
    getAvatarUrl(route) {
      if (route == "") {
        return route;
      } else {
        return baseUrl + route;
      }
    },
  },

  mounted() {
    getMyInfo().then((res) => {
      console.log("==", res);
      this.personDetail = res.data;
    });
  },
};
</script>

<style scoped>
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);

  background-color: #ffebcd3e;
}
.card {
  height: 100%;
  min-width: 850px;
  width: calc(100vw - 200px);
  margin: 0 auto;
  display: flex;
  padding: 10px;
  border-radius: 44px;
  background: linear-gradient(145deg, #d6d0d0, #fff7f7);
  box-shadow: 17px 17px 34px #cfc9c9, -17px -17px 34px #ffffff;
}
.card:hover {
  transition: all cubic-bezier(0.39, 0.575, 0.565, 1) 0.3s;
}
.base-info {
  flex: 1;
  padding: 12px 50px;
}
.card-left {
  border-right: 2px dashed rgb(188, 144, 144);
  width: 30%;
  height: calc(100vh - 200px);
  padding-top: 16px;
}
.card-middle {
  border-right: 2px dashed rgb(188, 144, 144);
  flex: 1;
  width: 30%;
  height: calc(100vh - 200px);
  padding: 12px 20px;
  position: relative;
}
.card-right {
  width: 30%;
  height: calc(100vh - 200px);
  padding: 16px 16px;
  position: relative;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin-top: 24px;
  font-size: x-large;
}
.edit-btn {
  position: absolute;
  bottom: 40px;
  left: 45%;
}

.carousel-image {
  width: 100%;
  object-fit: contain;
  border-radius: 16px;
}
.card-left >>> .el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-left >>> .el-carousel__indicators {
  display: none;
}
.long-text-style {
  margin-top: 40px;
  font-size: large;
}
</style>
