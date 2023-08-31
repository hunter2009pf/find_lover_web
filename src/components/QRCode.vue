<template>
  <div class="qrcode-component">
    <div class="qrcode-image">
      <el-image
        :src="generateCompletePhotolUrl()"
        fit="cover"
        style="height: 80%"
        alt="QR Code"
      />
    </div>
    <div class="qrcode-description">
      {{ description }}
    </div>
  </div>
</template>

<script>
import base from "../api/index";
let baseUrl = base.baseUrl;

export default {
  props: {
    qrcodeSrc: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  methods: {
    generateCompletePhotolUrl() {
      return baseUrl + this.qrcodeSrc;
    },
  },
};
</script>

<style scoped>
.qrcode-component {
  text-align: center;
}

.qrcode-image {
  margin-bottom: 10px;
}

.qrcode-description {
  font-size: 14px;
}
</style>
