<template>
  <div class="wrap">
    <div v-if="!editing">
      <div class="card">
        <div class="card-left">
          <div class="base-detail">
            <div class="base-info">
              <HeadPortrait
                :imgUrl="getAvatarUrl(personDetail.avatar_url)"
              ></HeadPortrait>
              <h2 style="margin-bottom: 6px">
                {{ personDetail.nick_name || "无名客" }}
              </h2>
              <ul>
                <li>年龄: {{ personDetail.age }}</li>
                <li>性别：{{ personDetail.is_boy ? "男" : "女" }}</li>
                <li>身高：{{ personDetail.height }}</li>
                <li>婚姻状况：{{ personDetail.marry_status }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="card-middle">
          <li>是否有车: {{ personDetail.car_status }}</li>
          <li>是否有房: {{ personDetail.house_status }}</li>
          <li>工作: {{ personDetail.job }}</li>
          <li>学历：{{ personDetail.degree }}</li>
          <li>出生地：{{ personDetail.birth_place }}</li>
          <li>当前住址: {{ personDetail.current_place }}</li>
          <li>是否独孩：{{ personDetail.unique_child_status }}</li>
          <li>微信: {{ personDetail.wechat }}</li>
          <li>展示类型：{{ showType[personDetail.show_type] }}</li>
          <p style="margin: 6px 0">期望类型：{{ personDetail.expectation }}</p>
          <p style="margin: 6px 0">自我介绍：{{ personDetail.introduction }}</p>
        </div>

        <div class="card-right">
          <el-carousel :autoplay="false">
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
    <div v-else>
      <editDetail
        @cancelEditing="cancelEditing"
        @doneUpload="doneUpload"
        :initialFormData="personDetail"
      />
    </div>
  </div>
</template>

<script>
import editDetail from "./editDetail.vue";
import { showType } from "../../../constant/index";
import { getMyInfo } from "../../../api/getData";
import base from "../../../api/index";
import HeadPortrait from "../../../components/HeadPortrait.vue";

let baseUrl = base.baseUrl;

export default {
  components: {
    editDetail,
    HeadPortrait,
  },
  data() {
    return {
      showType,
      personDetail: {},
      base,
      editing: false, // 编辑表单
      character: {
        images: [
          {
            id: 1,
            url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201702%2F16%2F20170216095255_cBu3A.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693400418&t=67d822ff58b3cfafc0a84ef44b486dfe",
            alt: "Image 1",
          },
          {
            id: 2,
            url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201702%2F16%2F20170216095255_cBu3A.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693400418&t=67d822ff58b3cfafc0a84ef44b486dfe",
            alt: "Image 2",
          },
          {
            id: 3,
            url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201702%2F16%2F20170216095255_cBu3A.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693400418&t=67d822ff58b3cfafc0a84ef44b486dfe",
            alt: "Image 3",
          },
        ],
      },
    };
  },

  methods: {
    handleEdit() {
      this.editing = true;
    },
    cancelEditing() {
      this.editing = false;
      console.log("触发");
      console.log(this.editing);
    },
    doneUpload() {
      getMyInfo().then((res) => {
        this.personDetail = res.data;
      });
      this.editing = false;
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
  width: 100%;
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
  width: 560px;
  height: 720px;
  padding-top: 16px;
}
.card-middle {
  border-right: 2px dashed rgb(188, 144, 144);
  flex: 1;
  width: 560px;
  height: 720px;
  padding: 12px 20px;
  position: relative;
}
.card-right {
  flex: 1;
  padding: 16px 16px;
  position: relative;
  width: 560px;
  height: 720px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 5px;
}
.edit-btn {
  position: absolute;
  right: 12px;
  bottom: 20px;
}

.carousel-image {
  width: 280px;
  height: 280px;
  object-fit: contain;
  border-radius: 25px;
}
.card-left >>> .el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-left >>> .el-carousel__indicators {
  display: none;
}
</style>
