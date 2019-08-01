import items from '../constants/shop';

export default {
  state() {
    return {
      open: false,
      product: null,
    };
  },
  mutations: {
    changeOpen(state, value) {
      state.open = value;
    },
    changeProduct(state, value) {
      state.product = value;
    },
  },
  actions: {
    toggleOpen({commit, state}) {
      commit('changeOpen', !state.open);
    },
    load({commit}, value) {
      const product = items.find(x => x.id === parseInt(value));
      commit('changeProduct', product);
    },
  },
};
