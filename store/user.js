const balance = 1488,
      hours = 111,
      rating = 3.8,
      name = 'Zeus',
      surname = 'Rozhdestvenskiy',
      telegram = 'TheGod',
      id = 1;

export default {
  state() {
    return {
      isAuth: false,
      id,
      telegram,
      name,
      surname,
      balance: balance,
      volunteeringHours: hours,
      rating,
    };
  },
  mutations: {
    changeAuth(state, value) {
      state.isAuth = value;
    },
    changeField(state, {value, field}) {
      state[field] = value;
    },
  },
  actions: {
    toggleAuth({commit, state}) {
      commit('changeAuth', !state.isAuth);
    },
    changeField({commit}, {field, value}) {
      commit('changeField', {field: field, value: value});
    },
  },
};
