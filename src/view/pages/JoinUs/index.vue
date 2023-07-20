<template>
  <div class="join-us-container">
    <h1 class="heading">欢迎加入我们</h1>
    <div class="chat-codes">
      <div class="chat-code">
        <div class="code-image">
          <img src="../../../assets/qrcode.jpg" alt="群聊一" />
        </div>
        <div class="code-info">
          <h3 class="code-title">群聊一</h3>
          <p class="code-description">扫描二维码加入群聊一</p>
        </div>
      </div>
      <div class="chat-code">
        <div class="code-image">
          <img src="../../../assets/qrcode.jpg" alt="群聊二" />
        </div>
        <div class="code-info">
          <h3 class="code-title">群聊二</h3>
          <p class="code-description">扫描二维码加入群聊二</p>
        </div>
      </div>
      <div class="chat-code">
        <div class="code-image">
          <img src="../../../assets/qrcode.jpg" alt="群聊三" />
        </div>
        <div class="code-info">
          <h3 class="code-title">群聊三</h3>
          <p class="code-description">扫描二维码加入群聊三</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    setHover(index) {
      this.hover = index;
    },
  },
};
</script>
<style scoped>
/* 略去其他样式 */

.code-image {
  width: 200px;
  height: 200px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.code-image img {
  max-width: 100%;
  max-height: 100%;
}
</style>
