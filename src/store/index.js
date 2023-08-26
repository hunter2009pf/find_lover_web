// store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    websocketInstance: null,
  },
  mutations: {
    setWebSocketInstance(state, instance) {
      state.websocketInstance = instance;
    },
  },
});

export default store;
