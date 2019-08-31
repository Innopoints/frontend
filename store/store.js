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
      orderBy: '',
    };
  },
  mutations: {
    addProduct(state, payload) {
      state.products.push(payload);
    },
    changeField(state, {type, value}) {
      state[type] = value;
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
    products: (state, getters) => {
      let products = state.products;
      const query = state.filters.search.toLowerCase();
      const minPrice = state.filters.minPrice;
      const maxPrice = state.filters.maxPrice;
      products = products
          .filter(product => product.name.toLowerCase().includes(query))
          .filter(product => product.price >= minPrice)
          .filter(product => product.varieties.map(v => v.color).some(color => getters.selectedColors.includes(color)));
      if (maxPrice > 0)
        products = products.filter(product => product.price <= maxPrice);
      if(state.orderBy)
        products.sort((product1, product2) => {
          const purchaseDiff = product1.purchases - product2.purchases;
          const priceDiff = product1.price - product2.price;

          switch(state.orderBy) {
            case 'most popular':
              return -purchaseDiff;
            case 'least popular':
              return purchaseDiff;
            case 'cheapest':
              return priceDiff;
            case 'most expensive':
              return -priceDiff;
            default:
              return 0;
          }
        });
      return products;
    },
    selectedColors: state => state.filters.colors
        .filter(color => color.checked)
        .map(item => item.color),
  },
};
