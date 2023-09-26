const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  devServer: {
    hot: true, //自动保存
    proxy: {
      "^/chatv1": {
        // target: "http://10.1.201.79:10088", // 代理的目标地址
        target: "https://www.hefeilove.top",
        changeOrigin: true, // 是否跨域
        secure: false,
        pathRewrite: {
          "^/chatv1": "", // 重写路径，将/api开头的请求去掉/api
        },
      },
      "^/basev1": {
        // target: "http://10.1.201.79:10088", // 代理的目标地址
        target: "https://www.hefeilove.top",
        changeOrigin: true, // 是否跨域
        secure: false,
        pathRewrite: {
          "^/basev1": "", // 重写路径，将/api开头的请求去掉/api
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      // Work around for Buffer is undefined:
      // https://github.com/webpack/changelog-v5/issues/10
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    resolve: {
      fallback: {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        util: require.resolve("util"),
        buffer: require.resolve("buffer"),
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "合肥交友";
      return args;
    });
  },
});
