<template>
  <div class="wrap">
    <div v-if="!editing">
      <div class="card">
        <div class="card-left">
          <el-carousel :autoplay="false">
            <el-carousel-item v-for="image in character.images" :key="image.id">
              <img :src="image.url" :alt="image.alt" class="carousel-image" />
            </el-carousel-item>
          </el-carousel>
          <div class="base-detail">
            <div class="base-info">
              <h2 style="margin-bottom: 6px">
                {{ personDetail.nick_name || "快来完善信息吧" }}
              </h2>
              <ul>
                <li>年龄: {{ personDetail.age }}</li>
                <li>性别：{{ personDetail.is_boy ? "女" : "男" }}</li>
                <li>身高：</li>
                <li>婚姻状况：{{ personDetail.marry_status }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="card-right">
          <div class="info">
            <li>是否有车: {{ personDetail.car_status }}</li>
            <li>是否有房: {{ personDetail.house_status }}</li>
            <li>工作: {{ personDetail.job }}</li>
            <li>学历：{{ personDetail.degree }}</li>
            <li>出生地：{{ personDetail.birth_place }}</li>
            <li>当前住址: {{ personDetail.current_place }}</li>
            <li>是否独孩：{{ personDetail.unique_child_status }}</li>
            <li>微信: {{ personDetail.wechat }}</li>
            <li>展示类型：{{ showType[personDetail.show_type] }}</li>
            <p style="margin: 6px 0">
              期望类型：{{ personDetail.expectation }}
            </p>
            <p style="margin: 6px 0">
              自我介绍：{{ personDetail.introduction }}
            </p>
          </div>
          <div class="edit-btn">
            <el-button type="warning" plain @click="handleEdit">编辑</el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <editDetail
        @cancelEditing="cancelEditing"
        :initialFormData="personDetail"
      />
    </div>
  </div>
</template>

<script>
import editDetail from "./editDetail.vue";
import { showType } from "../../../constant/index";
import { getUserInfo, getMyInfo } from "../../../api/getData";
export default {
  components: {
    editDetail,
  },
  data() {
    return {
      showType,
      personDetail: {},
      editing: false, // 编辑表单
      character: {
        name: "John Doe",
        description: "A fearless adventurer",
        details: [
          { id: 1, label: "年龄", value: "30" },
          { id: 2, label: "性别", value: "Male" },
          { id: 3, label: "身高", value: "180cm" },
          { id: 8, label: "Status", value: "Active" },
        ],
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
  computed: {},
  created() {},
  methods: {
    handleEdit() {
      this.editing = true;
    },
    cancelEditing() {
      this.editing = false;
      console.log("触发");
      console.log(this.editing);
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
  height: 500px;
  width: 700px;
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
.card-right {
  flex: 1;
  padding: 12px 20px;
  position: relative;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 5px;
}
.card-left {
  border-right: 2px dashed rgb(188, 144, 144);
  width: 400px;
  padding-top: 14px;
}
.edit-btn {
  position: absolute;
  right: 12px;
  bottom: 20px;
}

.carousel-image {
  width: 300px;
  height: 300px;
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
