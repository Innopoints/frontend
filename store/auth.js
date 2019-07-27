export default {
  state() {
    return {
      isAuth: false,
    };
  },
  mutations: {
    changeAuth(state, value) {
      state.isAuth = value;
    },
  },
  actions: {
    toggleAuth({commit, state}) {
      commit('changeAuth', !state.isAuth);
    },
  },
};
