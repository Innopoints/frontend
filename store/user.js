const balance = 1488;

export default {
  state() {
    return {
      isAuth: false,
      balance: balance,
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
