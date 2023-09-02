<template>
  <div
    class="head-portrait"
    @click="openFilePicker"
    :style="{ width: diameter + 'px', height: diameter + 'px' }"
  >
    <img
      :style="{ width: diameter + 'px', height: diameter + 'px' }"
      v-if="imgUrl == ''"
      src="@/assets/img/head_portrait.jpg"
      alt=""
    />
    <img
      :style="{ width: diameter + 'px', height: diameter + 'px' }"
      v-else
      :src="imgUrl"
      alt=""
    />
  </div>
</template>

<script>
import { uploadAvatar } from "../api/getData";

export default {
  props: {
    imgUrl: { default: require("@/assets/img/head_portrait.jpg") },
    canUpload: {
      type: Boolean,
      default: false,
    },
    diameter: {
      type: Number,
      default: 48,
    },
  },
  methods: {
    openFilePicker() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/jpeg image/png image/webp";
      input.addEventListener("change", this.handleFileSelect);
      input.click();
    },
    handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
        // 上传图片
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", file);
        uploadAvatar(avatarFormData)
          .then((response) => {
            if (response.code === 0) {
              this.$emit("updateAvatarUrl", response.data);
              // this.imgUrl = `${baseUrl}${response.data}`;
              // this.$forceUpdate();
              this.$message({
                message: "上传成功",
                type: "success",
                duration: 1000,
              });
            }
          })
          .catch((error) => {
            console.log(error);
            this.$message({
              message: "上传头像失败",
              type: "warning",
              duration: 1000,
            });
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.head-portrait {
  // width: 50px;
  // height: 50px;
  border-radius: 50%;
  // border: 2px solid rgb(137,140,151);
  border: 2px solid rgb(255, 255, 255);
  position: relative;
  // &::before {
  //   content: "2";
  //   width: 15px;
  //   height: 15px;
  //   z-index: 1;
  //   display: block;
  //   border-radius: 50%;
  //   background-color: rgb(144, 225, 80);
  //   position: absolute;
  //   right: 0;
  // }
  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    // padding: 2px;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    vertical-align: middle;
  }
}
</style>
