<template>
  <div class="chat-window">
    <div class="top">
      <div class="info-detail">
        <div class="chat_name">{{ friendInfo.chat_name || "无名客" }}</div>
      </div>
      <div class="other-fun">
        <span class="iconfont icon-shipin" @click="video"> </span>
        <span class="iconfont icon-gf-telephone" @click="telephone"></span>
        <label for="docFile">
          <span class="iconfont icon-wenjian"></span>
        </label>
        <label for="imgFile">
          <span class="iconfont icon-tupian"></span>
        </label>
        <input
          type="file"
          name=""
          id="imgFile"
          @change="sendImg"
          accept="image/*"
        />
        <input
          type="file"
          name=""
          id="docFile"
          @change="sendFile"
          accept="application/*,text/*"
        />
      </div>
    </div>

    <div class="botom">
      <div class="chat-content" ref="chatContent">
        <div class="chat-wrapper" v-for="item in chatList" :key="item.mid">
          <div class="chat-friend" v-if="item.sender !== myInfo.user_id">
            <span style="padding-top: 12px">
              <HeadPortrait
                :imgUrl="getAvatarUrl(friendInfo.chat_avatar)"
              ></HeadPortrait>
            </span>
            <span style="padding-left: 16px">
              <div class="info-time">
                {{ showMessageSendingTime(item.timestamp) }}
              </div>
              <div class="chat-text" v-if="item.type == 0">
                {{ item.content }}
              </div>
              <div class="chat-img" v-if="item.type == 1">
                <img
                  :src="item.content"
                  alt="表情"
                  style="width: 100px; height: 100px"
                />
              </div>
              <div class="chat-img" v-if="item.chatType == 2">
                <div class="word-file">
                  <FileCard
                    :fileType="item.extend.fileType"
                    :file="item.msg"
                  ></FileCard>
                </div>
              </div>
            </span>
          </div>
          <div class="chat-me" v-else>
            <span>
              <div class="info-time">
                {{ showMessageSendingTime(item.timestamp) }}
              </div>
              <div class="chat-text" v-if="item.type == 0">
                {{ item.content }}
              </div>
              <div class="chat-img" v-if="item.type == 1">
                <img
                  :src="item.content"
                  alt="表情"
                  style="width: 100px; height: 100px"
                />
              </div>
              <div class="chat-img" v-if="item.chatType == 2">
                <div class="word-file">
                  <FileCard
                    :fileType="item.extend.fileType"
                    :file="item.msg"
                  ></FileCard>
                </div>
              </div>
            </span>
            <span style="padding-left: 16px; padding-top: 16px">
              <HeadPortrait
                :imgUrl="getAvatarUrl(myInfo.avatar_url)"
              ></HeadPortrait>
            </span>
          </div>
        </div>
      </div>
      <div class="chatInputs">
        <div class="emoji boxinput" @click="clickEmoji">
          <img src="@/assets/img/emoji/smiling-face.png" alt="" />
        </div>
        <div class="emoji-content">
          <Emoji
            v-show="showEmoji"
            @sendEmoji="sendEmoji"
            @closeEmoji="clickEmoji"
          ></Emoji>
        </div>
        <input class="inputs" v-model="inputMsg" @keyup.enter="sendText" />
        <div class="send boxinput" @click="sendText">
          <img src="@/assets/img/emoji/rocket.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { animation } from "@/util/util";
import { getChatMessages } from "@/api/getData";

import HeadPortrait from "@/components/HeadPortrait";
import Emoji from "@/components/Emoji";
import FileCard from "@/components/FileCard.vue";
import base from "../../../api/index";

let baseUrl = base.baseUrl;

export default {
  components: {
    HeadPortrait,
    Emoji,
    FileCard,
  },
  props: {
    friendInfo: {
      default: {},
    },
    socket: null,
    default() {
      return {};
    },
  },
  watch: {
    friendInfo() {
      this.getFriendChatMsg();
    },
  },
  data() {
    return {
      chatList: [],
      inputMsg: "",
      showEmoji: false,
      myInfo: {},
      srcImgList: [],
    };
  },
  mounted() {
    var userInfoStr = window.localStorage.getItem("user_info");
    this.myInfo = JSON.parse(userInfoStr);
    this.getFriendChatMsg();
    // 挂载消息监听
    // let that = this;
    this.socket.addEventListener("message", this.onMessage);
  },
  beforeDestroy() {
    this.socket.removeEventListener("message", this.onMessage);
  },
  methods: {
    onMessage(event) {
      console.log("收到消息:", event.data);
      var jsonData = JSON.parse(event.data);
      if (jsonData.body.sender == this.friendInfo.chat_id) {
        if (jsonData.main_type == "message") {
          var newMsg = jsonData.body;
          this.chatList.push(newMsg);
          this.scrollBottom();
        } else if (jsonData.main_type == "acknowledge") {
          // 服务器确认收到消息
          var ackMsg = jsonData.body;
          var length = this.chatList.length;
          for (let i = length - 1; i >= 0; i--) {
            if (this.chatList[i].mid == ackMsg.mid) {
              this.chatList[i].seq_id = ackMsg.seq_id;
              break;
            }
          }
        } else {
          console.log("unknown main type");
        }
      }
    },
    // 获取头像链接
    getAvatarUrl(route) {
      if (route == "") {
        return route;
      } else {
        return baseUrl + route;
      }
    },
    //获取聊天记录
    getFriendChatMsg() {
      let params = {
        chat_id: this.friendInfo.chat_id,
        seq_id: 0,
      };
      getChatMessages(params).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.chatList = res.data;
          this.scrollBottom();
        }
      });
    },

    showMessageSendingTime(timeInMilliSecond) {
      var date = new Date(timeInMilliSecond);
      var dateInMilliSecond = date.getTime();
      const curDate = new Date();
      var curDateInMilliSecond = curDate.getTime();

      if (
        date.getFullYear() == curDate.getFullYear() &&
        date.getMonth() == curDate.getMonth() &&
        date.getDate() == curDate.getDate()
      ) {
        return date.getHours() + ":" + date.getMinutes();
      } else if (curDateInMilliSecond - dateInMilliSecond < 24 * 3600) {
        return "昨天 " + date.getHours() + ":" + date.getMinutes();
      } else {
        return (
          date.getUTCMonth() +
          "月" +
          date.getDate() +
          "日 " +
          date.getHours() +
          ":" +
          date.getMinutes()
        );
      }
    },

    uuidv4() {
      return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },

    //发送信息
    sendMsg(msg) {
      if (this.socket != null) {
        this.socket.send(JSON.stringify(msg));
      }
      this.chatList.push(msg);
      this.scrollBottom();
    },
    //获取窗口高度并滚动至最底层
    scrollBottom() {
      this.$nextTick(() => {
        const scrollDom = this.$refs.chatContent;
        animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight);
      });
    },
    //关闭标签框
    clickEmoji() {
      this.showEmoji = !this.showEmoji;
    },
    //发送文字信息
    sendText() {
      console.log("hello");
      if (this.inputMsg) {
        let chatMsg = {
          content: this.inputMsg,
          mid: this.uuidv4(),
          sender: this.myInfo.user_id,
          receiver: this.friendInfo.chat_id,
          type: 0,
          timestamp: new Date().getTime(),
        };
        this.sendMsg(chatMsg);
        this.$emit("setLastMessage", chatMsg);
        this.$emit("personCardSort", this.friendInfo.chat_id);
        this.inputMsg = "";
      } else {
        this.$message({
          message: "消息不能为空哦~",
          type: "warning",
        });
      }
    },
    //发送表情
    sendEmoji(msg) {
      let chatMsg = {
        content: msg,
        mid: this.uuidv4(),
        sender: this.myInfo.user_id,
        receiver: this.friendInfo.chat_id,
        type: 1,
        timestamp: new Date().getTime(),
      };
      this.sendMsg(chatMsg);
      this.clickEmoji();
      this.$emit("setLastMessage", chatMsg);
      this.$emit("personCardSort", this.friendInfo.chat_id);
    },
    //发送本地图片
    sendImg(e) {
      this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
      // let _this = this;
      // console.log(e.target.files);
      // let chatMsg = {
      //   headImg: require("@/assets/img/head_portrait.jpg"),
      //   name: "大毛是小白",
      //   time: "09：12 AM",
      //   msg: "",
      //   chatType: 1, //信息类型，0文字，1图片, 2文件
      //   extend: {
      //     imgType: 2, //(1表情，2本地图片)
      //   },
      //   uid: "1001",
      // };
      // let files = e.target.files[0]; //图片文件名
      // if (!e || !window.FileReader) return; // 看是否支持FileReader
      // let reader = new FileReader();
      // reader.readAsDataURL(files); // 关键一步，在这里转换的
      // reader.onloadend = function () {
      //   chatMsg.msg = this.result; //赋值
      //   _this.srcImgList.push(chatMsg.msg);
      // };
      // this.sendMsg(chatMsg);
      // e.target.files = null;
    },
    //发送文件
    sendFile(e) {
      this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
      // let chatMsg = {
      //   headImg: require("@/assets/img/head_portrait.jpg"),
      //   name: "大毛是小白",
      //   time: "09：12 AM",
      //   msg: "",
      //   chatType: 2, //信息类型，0文字，1图片, 2文件
      //   extend: {
      //     fileType: "", //(1word，2excel，3ppt，4pdf，5zpi, 6txt)
      //   },
      //   uid: "1001",
      // };
      // let files = e.target.files[0]; //图片文件名
      // chatMsg.msg = files;
      // console.log(files);
      // if (files) {
      //   switch (files.type) {
      //     case "application/msword":
      //     case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      //       chatMsg.extend.fileType = 1;
      //       break;
      //     case "application/vnd.ms-excel":
      //     case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      //       chatMsg.extend.fileType = 2;
      //       break;
      //     case "application/vnd.ms-powerpoint":
      //     case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      //       chatMsg.extend.fileType = 3;
      //       break;
      //     case "application/pdf":
      //       chatMsg.extend.fileType = 4;
      //       break;
      //     case "application/zip":
      //     case "application/x-zip-compressed":
      //       chatMsg.extend.fileType = 5;
      //       break;
      //     case "text/plain":
      //       chatMsg.extend.fileType = 6;
      //       break;
      //     default:
      //       chatMsg.extend.fileType = 0;
      //   }
      //   this.sendMsg(chatMsg);
      //   e.target.files = null;
      // }
    },
    // 发送语音
    telephone() {
      this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
    },
    //发送视频
    video() {
      this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-window {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  position: relative;

  .top {
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 50px;
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    .head-pic {
      float: left;
    }
    .info-detail {
      float: left;
      margin: 5px 20px 0;
      .chat_name {
        font-size: 32px;
        font-weight: 600;
        color: #fff;
      }
      .detail {
        color: #9e9e9e;
        font-size: 12px;
        margin-top: 2px;
      }
    }
    .other-fun {
      float: right;
      margin-top: 20px;
      span {
        margin-left: 30px;
        cursor: pointer;
      }
      input {
        display: none;
      }
    }
  }
  .botom {
    width: 100%;
    height: 70vh;
    background-color: rgb(50, 54, 68);
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    .chat-content {
      width: 100%;
      height: 85%;
      overflow-y: scroll;
      padding: 20px;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        width: 0; /* Safari,Chrome 隐藏滚动条 */
        height: 0; /* Safari,Chrome 隐藏滚动条 */
        display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
      }
      .chat-wrapper {
        position: relative;
        word-break: break-all;
        .chat-friend {
          width: 100%;
          float: left;
          margin-bottom: 20px;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: flex-start;
          .chat-text {
            max-width: 90%;
            padding: 20px;
            border-radius: 20px 20px 20px 5px;
            background-color: rgb(56, 60, 75);
            color: #fff;
            &:hover {
              background-color: rgb(39, 42, 55);
            }
          }
          .chat-img {
            img {
              width: 100px;
              height: 100px;
            }
          }
          .info-time {
            margin: 10px 0;
            color: #fff;
            font-size: 14px;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 10px;
            }
            span:last-child {
              color: rgb(101, 104, 115);
              margin-left: 10px;
              vertical-align: middle;
            }
          }
        }
        .chat-me {
          width: 100%;
          float: right;
          margin-bottom: 20px;
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: flex-start;
          .chat-text {
            float: right;
            max-width: 90%;
            padding: 20px;
            border-radius: 20px 20px 5px 20px;
            background-color: rgb(29, 144, 245);
            color: #fff;
            &:hover {
              background-color: rgb(26, 129, 219);
            }
          }
          .chat-img {
            img {
              max-width: 300px;
              max-height: 200px;
              border-radius: 10px;
            }
          }
          .info-time {
            margin: 10px 0;
            color: #fff;
            font-size: 14px;
            display: flex;
            justify-content: flex-end;

            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-left: 10px;
            }
            span {
              line-height: 30px;
            }
            span:first-child {
              color: rgb(101, 104, 115);
              margin-right: 10px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .chatInputs {
      width: 90%;
      position: absolute;
      bottom: 0;
      margin: 3%;
      display: flex;
      .boxinput {
        width: 50px;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 1px solid rgb(80, 85, 103);
        position: relative;
        cursor: pointer;
        img {
          width: 30px;
          height: 30px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .emoji {
        transition: 0.3s;
        &:hover {
          background-color: rgb(46, 49, 61);
          border: 1px solid rgb(71, 73, 82);
        }
      }

      .inputs {
        width: 90%;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 2px solid rgb(34, 135, 225);
        padding: 10px;
        box-sizing: border-box;
        transition: 0.2s;
        font-size: 20px;
        color: #fff;
        font-weight: 100;
        margin: 0 20px;
        &:focus {
          outline: none;
        }
      }
      .send {
        background-color: rgb(29, 144, 245);
        border: 0;
        transition: 0.3s;
        box-shadow: 0px 0px 5px 0px rgba(0, 136, 255);
        &:hover {
          box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
        }
      }
    }
  }
}
</style>
