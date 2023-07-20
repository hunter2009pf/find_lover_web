<template>
  <div class="setting">
    <el-carousel indicator-position="outside" :autoplay="false">
      <el-carousel-item v-for="person in 5" :key="person">
        <personalCard :personData="personData"></personalCard>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import personalCard from "./personalCard.vue";
export default {
  components: {
    personalCard,
  },
  data() {
    return {
      hover: false,
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
    };
  },
  methods: {
    setHover(isHover) {
      this.hover = isHover;
    },
  },
};
</script>

<style scoped>
:deep(.el-carousel__container) {
  height: calc(100vh - 230px);
}
</style>
