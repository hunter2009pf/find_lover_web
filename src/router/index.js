import VueRouter from "vue-router";
import LoginView from "@/view/login.vue";
import Home from "@/view/home.vue";
import ChatHome from "../view/pages/chatHome/index.vue";
import Video from "../view/pages/video.vue";
import Lingting from "../view/pages/lingting.vue";
import Setting from "../view/pages/setting.vue";
import CardList from "../view/pages/CardList/cardList.vue";
import JoinUs from "../view/pages/JoinUs/index.vue";
import PersonalDetail from "../view/pages/PersonalDetail/personalDetail.vue";
export default new VueRouter({
  // mode: "hash",
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        {
          path: "/CardList",
          name: "CardList",
          component: CardList,
        },
        {
          path: "/ChatHome",
          name: "ChatHome",
          component: ChatHome,
        },
        {
          path: "/PersonalDetail",
          name: "PersonalDetail",
          component: PersonalDetail,
        },
        {
          path: "/JoinUs",
          name: "JoinUs",
          component: JoinUs,
        },
      ],
    },

    {
      path: "/Video",
      name: "Video",
      component: Video,
    },
    {
      path: "/Lingting",
      name: "Lingting",
      component: Lingting,
    },
    {
      path: "/Setting",
      name: "Setting",
      component: Setting,
    },
  ],
});
