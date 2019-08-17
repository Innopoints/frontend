import products from '@/constants/store.js';

const colors = ['#000000', '#0000FF', '#00FF00', '#FF0000', '#FFFFFF'];

export default {
  state() {
    return {
      products,
      filters: {
        search: '',
        minPrice: 0,
        maxPrice: 0,
        colors: colors.map(color => ({color, checked: true})),
      },
    };
  },
  mutations: {
    addProduct(state, payload) {
      state.products.push(payload);
    },
    changeFilter(state, {type, value}) {
      state.filters[type] = value;
    },
    toggleColor(state, color) {
      const index = state.filters.colors.findIndex(item => item.color === color);
      if(index === -1)
        throw 'Cannot find color in store ';
      state.filters.colors[index].checked = !state.filters.colors[index].checked;
    },
  },
  actions: {
    async addProduct({commit}, payload) {
      // TODO: send to server
      commit('addProduct', payload);
    },
    clearFilters({commit}) {
      commit('changeFilter', {type: 'search', value: ''});
      commit('changeFilter', {type: 'minPrice', value: 0});
      commit('changeFilter', {type: 'maxPrice', value: 0});
      commit('changeFilter', {type: 'colors', value: colors.map(color => ({color, checked: true}))});
    },
  },
  getters: {
    products: (state, getters) => state.products.filter(product =>
      product.name.toLowerCase().includes(state.filters.search.toLowerCase())
      && product.price >= state.filters.minPrice
      && (product.price <= state.filters.maxPrice
          || state.filters.maxPrice == 0)  // uninitialized
      && product.varieties.map(v => v.color).some(color => getters.selectedColors.includes(color))
    ),
    selectedColors: state => state.filters.colors
        .filter(color => color.checked)
        .map(item => item.color),
  },
};
