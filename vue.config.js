const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  devServer: {
    hot: true, //自动保存
    proxy: {
      "/v1": {
        // target: "http://10.1.201.79:10088", // 代理的目标地址
        target: "http://47.98.116.66:26888",
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/v1": "", // 重写路径，将/api开头的请求去掉/api
        },
      },
    },
  },
});
