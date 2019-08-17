import products from '@/constants/store.js';

export default {
  state() {
    return {
      products,
      filters: {

      },
    };
  },
  mutations: {
    addProduct(state, payload) {
      state.products.push(payload);
    },
  },
  actions: {
    async addProduct({commit}, payload) {
      // TODO: send to server
      commit('addProduct', payload);
    },
  },
  getters: {
    products: state => state.products,
  },
};
