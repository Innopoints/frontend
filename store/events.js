import competences from '../constants/events/competences';
import events from '../constants/events/events';

export default {
  namespaced: true,
  state() {
    return {
      filters: {
        search: '',
        spots: 1,
        competences,
        startDate: null,
        endDate: null,
      },
      events: events,
    };
  },
  mutations: {
    changeFilter(state, value) {
      state.filters[value.type] = value.value;
    },
    changeField(state, value) {
      state[value.type] = value.value;
    },
    changeCompetence(state, payload) {
      state.filters.competences[payload.index].checked = payload.checked;
    },
  },
  actions: {
    changeSearch({commit}, value) {
      commit('changeFilter', {type: 'search', value: value});
    },
    changeSpots({commit}, value) {
      commit('changeFilter', {type: 'spots', value: value});
    },
    changeCompetence({commit, state}, value) {
      const index = state.filters.competences.findIndex(c => c.name == value.name);
      if(index === -1) return;
      commit('changeCompetence', {index, checked: value.checked});
    },
    clearCompetences({commit, state}) {
      state.filters.competences.forEach((c, index) => commit('changeCompetence', {index, checked: false}));
    },
  },
  getters: {
    events: state => {
      return state.events.filter(event => state.filters.spots <= event.spots);
    },
  },
};
