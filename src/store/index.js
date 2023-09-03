// store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    websocketInstance: null,
    cache: {}, // The cache object to store your data
  },
  mutations: {
    setWebSocketInstance(state, instance) {
      state.websocketInstance = instance;
    },
    setData(state, { key, value }) {
      state.cache[key] = value;
    },
    clearData(state, key) {
      delete state.cache[key];
    },
  },
  // Optional: Define getters to access the cache data
  getters: {
    getData: (state) => (key) => {
      return state.cache[key];
    },
  },
});

export default store;
