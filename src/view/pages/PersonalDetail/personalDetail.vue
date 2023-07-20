<template>
  <div>个人资料</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
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
  methods: {},
};
</script>

<style scoped>
:deep(.el-carousel__container) {
  height: calc(100vh - 230px);
}
</style>
