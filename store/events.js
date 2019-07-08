import competences from '../constants/events/competences';

export default {
  namespaced: true,
  state() {
    return {
      spots: 1,
      competences
    };
  },
  mutations: {
    changeSpots(state, value) {
      state.spots = value;
    },
    changeCompetency(state, value) {
      state.competences = value;
    },
    clearCompetences(state) {
      state.competences = state.competences.map(x => ({name: x.name, checked: false}));
    }
  },
  actions: {
    changeSpots({commit}, value) {
      commit('changeSpots', value);
    },
    changeCompetency({commit, state}, value) {
      commit('changeCompetency', state.competences.map(x => {
        if(x.name === value.name) return {name: x.name, checked: !value.checked};
        return x;
      }));
    },
    clearCompetences({commit}) {
      commit('clearCompetences');
    }
  }
};
