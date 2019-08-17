const balance = 1488,
      hours = 111,
      name = 'Zeus',
      surname = 'Rozhdestvenskiy',
      telegram = 'TheGod',
      id = 1;

export default {
  state() {
    return {
      isAuth: false,
      id: id,
      telegram: telegram,
      name: name,
      surname: surname,
      balance: balance,
      volunteeringHours: hours,
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
