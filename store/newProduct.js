function newVariety() {
  return {
    color: null,
    sizes: {
      XS:  0,
      S:   0,
      M:   0,
      L:   0,
      XL:  0,
      XXL: 0,
    },
    quantity: 0,
    images: [],
  };
}

export default {
  namespaced: true,
  state() {
    const initialSizes = false;
    return {
      name: '',
      type: '',
      description: '',
      price: 0,
      inSizes: initialSizes,
      quantity: 0,
      varieties: [newVariety()],
      varietiesCount: 1,
    };
  },
  mutations: {
    reset(state) {
      const initialSizes = false;
      state.name = '';
      state.type = '';
      state.description = '';
      state.price = 0;
      state.inSizes = initialSizes;
      if(initialSizes) state.quantity = 0;
      state.varieties.forEach(v => v.images.splice(0, v.images.length));  // to clear the old references
      state.varieties = [newVariety()];
      state.varietiesCount = 1;
    },
    setName(state, payload) {
      state.name = payload;
    },
    setType(state, payload) {
      state.type = payload;
    },
    setDescription(state, payload) {
      state.description = payload;
    },
    setPrice(state, payload) {
      state.price = parseInt(payload, 10);
    },
    toggleSizes(state) {
      state.inSizes = !state.inSizes;
    },
    addVariety(state) {
      state.varieties.push(newVariety());
      state.varietiesCount++;
    },
    removeVariety(state, payload) {
      state.varieties.splice(payload, 1);
      state.varietiesCount--;
    },
    setVarColor(state, {index, color}) {
      state.varieties[index].color = color;
    },
    setVarQuantity(state, {index, quantity}) {
      state.varieties[index].quantity = parseInt(quantity, 10);
    },
    setVarSizeQuantity(state, {index, size, quantity}) {
      state.varieties[index].sizes[size] = parseInt(quantity, 10);
    },
    setVarFiles(state, {index, files}) {
      state.varieties[index].images = files;
    },
  },
};
