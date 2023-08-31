<template>
  <div class="join-us-container">
    <div class="group-wrap">
      <QRCode
        v-if="freeGroup != null"
        :qrcodeSrc="freeGroup.photo_url"
        :description="freeGroup.description"
      />
      <QRCode
        v-if="vipGroup != null"
        :qrcodeSrc="vipGroup.photo_url"
        :description="vipGroup.description"
      />
    </div>
    <div class="hongniang-wrap">
      <h1>合肥红娘</h1>
      <div style="width: 60%; height: 80%; padding-left: 20%">
        <el-carousel :interval="2000" height="1000px" direction="vertical">
          <el-carousel-item v-for="item in hongniangs" :key="item.photo_url">
            <QRCode
              :qrcodeSrc="item.photo_url"
              :description="item.description"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { getQrCode } from "../../../api/getData";
import base from "../../../api/index";
import QRCode from "../../../components/QRCode.vue"; // 导入二维码组件

export default {
  data() {
    return {
      base,
      freeGroup: null,
      vipGroup: null,
      hongniangs: [],
    };
  },
  methods: {
    setHover(index) {
      this.hover = index;
    },
  },
  mounted() {
    getQrCode().then((res) => {
      console.log(res);
      this.freeGroup = res.data.freeGroup;
      this.vipGroup = res.data.vipGroup;
      this.hongniangs = res.data.hongniangs;
    });
  },
  components: {
    QRCode, // 注册二维码组件
  },
};
</script>

/* 样式仅适用于当前页面 */
<style scoped>
.join-us-container {
  display: flex;
}

h1 {
  text-align: center;
}
.qr-img {
  height: 300px;
}
.group-wrap {
  display: flex;
  width: 50%;
  height: 100%;
}
.hongniang-wrap {
  align-items: center;
  width: 50%;
  height: 100%;
  justify-content: center;
}
</style>
