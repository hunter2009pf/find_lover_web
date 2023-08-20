import axios from "axios";
import { Message } from "element-ui";
export const ERROR_MESSAGES = {
  0: "成功",
  1: "参数为空",
  2: "用户已存在",
  3: "账号密码不匹配",
  4: "创建文件失败",
  5: "复制文件失败",
  6: "照片名称为空",
  7: "个人信息为空",
  8: "更新信息失败",
  9: "随机查找失败",
  10: "解码文件失败",
  11: "编码文件失败",
  12: "登录信息为空",
  13: "删除照片失败",
  14: "照片过多",
  15: "无效的token",
  16: "无效的页码",
  17: "无jwt Token ",
  18: "请求次数达到最大",
};
//全局参数，自定义参数可在发送请求时设置
axios.defaults.timeout = 300000000; //超时时间ms
axios.defaults.withCredentials = true;
// 请求时的拦截
//回调里面不能获取错误信息
axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");

    if (token) {
      // 如果存在 token，将其添加到请求头部
      config.headers.token = token;
    }

    return config;
  },
  function (error) {
    // 当请求异常时做一些处理
    console.log("请求异常：" + JSON.stringify(error));
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    if (response?.data?.data?.token) {
      window.localStorage.setItem("token", response.data?.data?.token);
    }

    // console.log(response);
    // if (data.code != 0) {
    //   // token过期
    //   window.localStorage.removeItem("userInfo");
    //   window.localStorage.removeItem("token");
    //   window.location.href = "/login";
    //   return;
    // }
    if (response.data && response.data.code != 0) {
      Message.error(ERROR_MESSAGES[response.data.code]);
      return response;
    }

    return response;
  },

  function (error) {
    // Do something with response error
    console.log("响应出错：" + error);
    return Promise.reject(error);
  }
);

const base = {
  axios: axios,
  // baseUrl: 'http://localhost:8080'
  baseUrl: "http://47.98.116.66:26888",
  chatUrl: "http://47.98.116.66:26999",
  chatIP: "47.98.116.66",
  chatPort: "26999",
};

export default base;
