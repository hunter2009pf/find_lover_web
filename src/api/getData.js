import base from "./index";
let axios = base.axios;
let baseUrl = base.baseUrl;
let chatUrl = base.chatUrl;

// 获取单聊会话层列表
export const getAllConversations = (params) => {
  return axios({
    method: "get",
    baseURL: `${chatUrl}/v1/chat/conversation/query_list`,
    params,
  }).then((res) => res.data);
};

// 获取指定会话层的历史聊天信息（包含离线消息）
export const getChatMessages = (params) => {
  return axios({
    method: "get",
    baseURL: `${chatUrl}/v1/chat/message/history/query_list`,
    params,
  }).then((res) => res.data);
};

// 发送消息已读通知
export const readMessage = (params) => {
  return axios({
    method: "post",
    baseURL: `${chatUrl}/v1/chat/message/read`,
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
// 根据userId获得个人信息
export const getUserInfo = (params) => {
  return axios({
    method: "get",
    baseURL: `${baseUrl}/v1/person/getPersonalInfo`,
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
    method: "post",
    baseURL: `${baseUrl}/v1/person/deletePhoto`,
    params,
  }).then((res) => res.data);
};
// 随机查询几个人
export const getRandomUser = (params) => {
  return axios({
    method: "get",
    baseURL: `${baseUrl}/v1/person/randomGetPeople`,
    params,
  }).then((res) => res.data);
};
// 更新个人信息
export const updateInfo = (params) => {
  return axios({
    method: "post",
    baseURL: `${baseUrl}/v1/person/uploadInfo`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: params,
  }).then((res) => res.data);
};
// 喜欢某人
export const likePeople = (params) => {
  return axios({
    method: "post",
    baseURL: `${baseUrl}/v1/relation/like`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: params,
  }).then((res) => res.data);
};
// 取消喜欢
export const dislikePeople = (params) => {
  return axios({
    method: "post",
    baseURL: `${baseUrl}/v1/relation/dislike`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params,
  }).then((res) => res.data);
};
// 获得宣传二维码
export const getQrCode = (params) => {
  return axios({
    method: "get",
    baseURL: `${baseUrl}/v1/contact/qrcode/get_all`,
    params,
  }).then((res) => res.data);
};
// 查找我的喜欢
export const getMyIdols = (params) => {
  return axios({
    method: "get",
    baseURL: `${baseUrl}/v1/person/getPaginatedIdols`,
    params,
  }).then((res) => res.data);
};
