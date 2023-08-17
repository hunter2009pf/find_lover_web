<template>
  <div class="join-us-container">
    <div class="group-wrap">
      <div class="vip">
        <h1>vip群</h1>
        <div>
          <img
            :src="`${base.baseUrl}${data.vipGroup?.photo_url}`"
            alt=""
            class="qr-img"
          />
        </div>
      </div>
      <div class="free">
        <h1>免费群</h1>
        <div>
          <img
            :src="`${base.baseUrl}${data.freeGroup?.photo_url}`"
            alt=""
            class="qr-img"
          />
        </div>
      </div>
    </div>
    <div class="matchmaker">
      <h1>合肥红娘</h1>
      <div class="matchmaker-wrap">
        <div v-for="item in data.hongniangs">
          <img
            :src="`${base.baseUrl}${item.photo_url}`"
            alt=""
            class="matchmaker-img"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getQrCode } from "../../../api/getData";
import base from "../../../api/index";
export default {
  data() {
    return {
      data: {},
      base,
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
      this.data = res.data;
    });
  },
};
</script>
<style scoped>
/* 略去其他样式 */
h1 {
  text-align: center;
}
.qr-img {
  height: 300px;
}
.group-wrap {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
.matchmaker-wrap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  padding: 0 150px;
}
.matchmaker-img {
  height: 200px;
}
</style>
