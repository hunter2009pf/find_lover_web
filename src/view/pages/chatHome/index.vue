<template>
  <div class="chatHome">
    <div class="chatLeft">
      <div class="conv-list">
        <span class="chat-list-text-style">聊天列表</span>
        <div class="person-cards-wrapper">
          <div
            class="convList"
            v-for="personInfo in convList"
            :key="personInfo.chat_id"
            @click="clickPerson(personInfo)"
          >
            <PersonCard
              :personInfo="personInfo"
              :pcCurrent="pcCurrent"
            ></PersonCard>
          </div>
        </div>
      </div>
    </div>
    <div class="chatRight">
      <div v-if="showChatWindow">
        <ChatWindow
          :friendInfo="chatWindowInfo"
          :socket="socket"
          @personCardSort="personCardSort"
          @setLastMessage="setLastMessage"
        ></ChatWindow>
      </div>
      <div class="showIcon" v-else>
        <span class="iconfont icon-snapchat"></span>
        <!-- <img src="@/assets/img/snapchat.png" alt="" /> -->
      </div>
    </div>
    <!-- <el-col :span="4"><div class="grid-content bg-purple"></div></el-col> -->
  </div>
</template>

<script>
import PersonCard from "@/components/PersonCard.vue";
import ChatWindow from "./chatwindow.vue";
import { getAllConversations, getUserInfo } from "@/api/getData";
import base from "../../../api/index";

let chatIP = base.chatIP;
let chatPort = base.chatPort;

export default {
  name: "chatIndex",
  components: {
    PersonCard,
    ChatWindow,
  },
  data() {
    return {
      pcCurrent: "",
      convList: [],
      showChatWindow: false,
      chatWindowInfo: {},
      socket: null,
      createChatTarget: {}, // 主动新建聊天的对象
    };
  },
  mounted() {
    console.log("加载了");
    var params = {
      page_size: 9999,
    };
    getAllConversations(params).then((res) => {
      if (res.code == 0) {
        this.convList = res.data;
        this.createChatTarget = this.$route.params.data;
        if (this.$route.params) {
          // 如果有路由传参，说明要开始聊天
          if (
            this.convList.some(
              // 如果历史列表里有，则把聊天置顶
              (item) => item.chat_id === this.createChatTarget.user_id
            )
          ) {
            this.personCardSort(this.createChatTarget.user_id);
          } else {
            // 没有历史聊天，则新建对话
            var params = {
              user_id: this.createChatTarget.user_id,
            };
            getUserInfo(params).then((res) => {
              if (res.code == 0) {
                console.log("user info: ", res);
                var newPerson = res.data;
                var newConv = {
                  chat_avatar: newPerson.avatar_url,
                  chat_id: newPerson.user_id,
                  chat_name: newPerson.nick_name,
                  is_group: false,
                  last_message: "",
                  order_key: new Date().getTime(),
                  unread: 0,
                };
                this.convList.unshift(newConv);
              }
            });
          }
        }
      }
    });

    // ws建连
    if (this.socket == null || this.socket.readyState !== WebSocket.OPEN) {
      const token = localStorage.getItem("token");

      this.socket = new WebSocket(
        "ws://" + chatIP + ":" + chatPort + "/v1/websocket/connect/" + token
      );

      this.socket.onopen = function (e) {
        // alert("[open] Connection established");
        console.log("websocket connected successfully");
      };

      let that = this;
      this.socket.onmessage = async function (event) {
        var jsonData = JSON.parse(event.data);
        if (jsonData.main_type == "message") {
          var newMsg = jsonData.body;
          if (newMsg.sender == that.pcCurrent) {
            console.log("当前展示会话层，只更新最后一条消息，不更新未读数");
            for (let i = 0; i < that.convList.length; i++) {
              if (that.convList[i].chat_id == newMsg.sender) {
                that.convList[i].last_message = newMsg;
                break;
              }
            }
            // 收到新消息，会话层移动到顶部
            that.personCardSort(newMsg.sender);
          } else {
            console.log("未展开会话层，更新最后一条消息，未读数+1");
            var isFound = false;
            for (let i = 0; i < that.convList.length; i++) {
              if (that.convList[i].chat_id == newMsg.sender) {
                that.convList[i].last_message = newMsg;
                that.convList[i].unread++;
                isFound = true;
                break;
              }
            }
            if (!isFound) {
              // 会话层不存在，说明是新人给我发消息
              var params = {
                user_id: newMsg.sender,
              };
              var res = await getUserInfo(params);
              if (res.code == 0) {
                console.log("user info: ", res);
                var newPerson = res.data;
                var newConv = {
                  chat_avatar: newPerson.avatar_url,
                  chat_id: newPerson.user_id,
                  chat_name: newPerson.nick_name,
                  is_group: false,
                  last_message: newMsg,
                  order_key: newMsg.timestamp,
                  unread: 1,
                };
                that.convList.unshift(newConv);
              } else {
                console.log("没找到人，只能忽略新消息了");
              }
            } else {
              // 收到新消息，会话层移动到顶部
              that.personCardSort(newMsg.sender);
            }
          }
        }
      };

      this.socket.onclose = function (event) {
        console.log("websocket close code: ", event.code, "   ", event.reason);
        if (event.wasClean) {
          // alert(
          //   `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
          // );
          console.log(
            `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
          );
        } else {
          // e.g. server process killed or network down
          // event.code is usually 1006 in this case
          // alert("[close] Connection died");
        }
      };

      this.socket.onerror = function (error) {
        console.log(error);
        that.$message({
          message: "websocket连接错误",
          type: "error",
          duration: 1000,
        });
      };
    }
  },

  methods: {
    clickPerson(info) {
      console.log("click person:");
      console.log(info);
      this.showChatWindow = true;
      this.chatWindowInfo = info;
      this.personInfo = info;
      this.pcCurrent = info.chat_id;
    },
    setLastMessage(msg) {
      for (let i = 0; i < this.convList.length; i++) {
        if (this.convList[i].chat_id == msg.receiver) {
          this.convList[i].last_message = msg;
          this.convList[i].order_key = msg.timestamp;
          break;
        }
      }
    },
    personCardSort(chat_id) {
      // 移动会话层到顶部
      if (chat_id !== this.convList[0].chat_id) {
        let nowPersonInfo;
        for (let i = 0; i < this.convList.length; i++) {
          if (this.convList[i].chat_id == chat_id) {
            nowPersonInfo = this.convList[i];
            this.convList.splice(i, 1);
            break;
          }
        }
        this.convList.unshift(nowPersonInfo);
      }
    },
  },
  beforeDestroy() {
    console.log(this.socket, "=======");
    this.socket.close();
  },
};
</script>

<style lang="scss" scoped>
.chatHome {
  // margin-top: 20px;
  display: flex;
  .chatLeft {
    width: 280px;
    background-color: rgb(50, 54, 68);
    border-radius: 25px 0 0 25px;
    .title {
      color: #fff;
      padding-left: 10px;
      padding-top: 10px;
    }
    .conv-list {
      margin-top: 100px;
      .chat-list-text-style {
        padding-left: 64px;
        font-size: large;
        color: aquamarine;
      }
      .person-cards-wrapper {
        padding-left: 10px;
        height: 65vh;
        margin-top: 20px;
        overflow: hidden;
        overflow-y: scroll;
        box-sizing: border-box;
        &::-webkit-scrollbar {
          width: 0; /* Safari,Chrome 隐藏滚动条 */
          height: 0; /* Safari,Chrome 隐藏滚动条 */
          display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
        }
      }
    }
  }

  .chatRight {
    flex: 1;
    padding-right: 30px;
    background-color: rgb(50, 54, 68);
    border-radius: 0 25px 25px 0;
    .showIcon {
      position: absolute;
      top: calc(50% - 150px); /*垂直居中 */
      left: calc(50% - 50px); /*水平居中 */
      .icon-snapchat {
        width: 300px;
        height: 300px;
        font-size: 300px;
        // color: rgb(28, 30, 44);
      }
    }
  }
}
</style>
