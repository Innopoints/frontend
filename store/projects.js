import competences from '../constants/projects/competences';
import projects from '../constants/projects/projects';

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
      projects: projects,
      mobileCollapsed: true,
    };
  },
  mutations: {
    changeFilter(state, value) {
      state.filters[value.type] = value.value;
    },
    changeField(state, value) {
      state[value.type] = value.value;
    },
  },
  actions: {
    toggleMobileCollapsed({commit, state}) {
      commit('changeField', {type: 'mobileCollapsed', value: !state.mobileCollapsed});
    },
    changeSearch({commit}, value) {
      commit('changeFilter', {type: 'search', value: value});
    },
    changeSpots({commit}, value) {
      commit('changeFilter', {type: 'spots', value: value});
    },
    changeCompetence({commit, state}, value) {
      commit('changeFilter', {type: 'competences', value: state.filters.competences.map(x => {
          if(x.name === value.name) return {name: x.name, checked: !value.checked};
          return x;
        })});
    },
    clearCompetences({commit, state}) {
      commit('changeFilter', {type: 'competences', value: state.filters.competences.map(x => ({name: x.name, checked: false})) });
    },
  },
  getters: {
    projects: state => {
      return state.projects.filter(event => {
        return state.filters.spots <= event.spots;
      });
    },
  },
};
