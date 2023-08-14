import base from "./index";
let axios = base.axios;
let baseUrl = base.baseUrl;

// 获取好友
export const getFriend = (params) => {
  return axios({
    method: "post",
    baseURL: `${baseUrl}/friend/friendList`,
    data: params,
  }).then((res) => res.data);
};

// 获取聊天信息
export const getChatMsg = (params) => {
  return axios({
    method: "post",
    baseURL: `${baseUrl}/friend/chatMsg`,
    data: params,
  }).then((res) => res.data);
};
// 注册
export const getRegister = (params) => {
  return axios({
    method: "post",
    baseURL: `${baseUrl}/v1/user/onRegister`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: params,
  }).then((res) => res.data);
};
// 登录
export const login = (params) => {
  return axios({
    method: "get",
    baseURL: `${baseUrl}/v1/user/onLogin`,
    params, // 使用params属性传递参数
  }).then((res) => res.data);
};
// 根据userid获得个人信息
export const getUserInfo = (params) => {
  return axios({
    method: "get",
    baseURL: `${baseUrl}/v1/person/getInfo`,
    params, // 使用params属性传递参数
  }).then((res) => res.data);
};
// 获得我的个人信息
export const getMyInfo = () => {
  return axios({
    method: "get",
    baseURL: `${baseUrl}/v1/person/getMyInfo`,
  }).then((res) => res.data);
};
// 上传生活照
export const postPhotos = (params) => {
  return axios({
    method: "post",
    baseURL: `${baseUrl}/v1/person/uploadPhoto`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: params,
  }).then((res) => res.data);
};
// 移除生活照
export const delPhoto = (params) => {
  return axios({
    method: "delete",
    baseURL: `${baseUrl}/v1/person/uploadPhoto`,
    params,
  }).then((res) => res.data);
};
