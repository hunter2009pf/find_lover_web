<template>
  <div class="setting">
    <el-carousel
      indicator-position="outside"
      :autoplay="false"
      @change="handleCarouselChange"
      :initial-index="currentIndex"
      type="card"
    >
      <el-carousel-item
        v-for="person in personData"
        :key="person.user_id"
        ref="carousel"
      >
        <personalCardNew
          :personData="person"
          :idolList="idolList"
        ></personalCardNew>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getRandomUser, getMyIdols } from "../../../api/getData";

import personalCardNew from "./personalCardNew.vue";
export default {
  components: {
    personalCardNew,
  },
  data() {
    return {
      hover: false,
      params: { start_id: 0, is_boy: true, count: 10 },
      loading: true,
      personData: [],
      currentIndex: 0,
      idolList: [],
    };
  },
  methods: {
    setHover(isHover) {
      this.hover = isHover;
    },
    _getList() {
      this.loading = true;
      getRandomUser({ ...this.params }).then((res) => {
        const idolParams = { page_number: 1, page_size: 9999 };

        getMyIdols({ ...idolParams }).then((idolRes) => {
          console.log(idolRes, "===");
          this.idolList = idolRes.data;
          this.personData = this.personData.concat(res.data);
          this.personData = this.personData.filter((item, index, self) => {
            return index === self.findIndex((t) => t.user_id === item.user_id); // 每次拼接都去重
          });
        });
        this.loading = false;
      });
    },
    handleCarouselChange(index) {
      if (index === this.personData.length - 1) {
        this.currentIndex = index;
        this.params.start_id =
          this.personData[this.personData.length - 1].user_id; // 拿查到的最后一人的id当做起始id查找
        this._getList();
      }
    },
  },

  mounted() {
    this.params.is_boy = JSON.parse(
      window.localStorage.getItem("user_info")
    ).is_boy;
    this._getList();
  },
  watch: {
    loading(n, o) {},
  },
};
</script>

<style scoped>
:deep(.el-carousel__container) {
  height: calc(100vh - 130px);
  min-height: 590px;
}
:deep(.el-carousel__indicators--outside) {
  display: none;
}
:deep(.el-carousel__item:nth-child(2n)::after) {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f7fa6c;
  z-index: 1;
}
:deep(.el-carousel__item:nth-child(2n + 1)::after) {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f7fa6c;
  z-index: 1;
}

:deep(.el-carousel__container .is-active::after) {
  content: none;
  display: none;
}
</style>
