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
      projects,
      mobileCollapsed: true,
      orderBy: '',
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
    resetCompetences({commit, state}) {
      state.filters.competences.forEach((c, index) => commit('changeCompetence', {index, checked: true}));
    },
    clearCompetences({commit, state}) {
      state.filters.competences.forEach((c, index) => commit('changeCompetence', {index, checked: false}));
    },
    clearFilters({commit, dispatch}) {
      dispatch('clearCompetences');
      commit('changeFilter', {type: 'search', value: ''});
      commit('changeFilter', {type: 'spots', value: 1});
      dispatch('clearCompetences');
      commit('changeFilter', {type: 'startDate', value: null});
      commit('changeFilter', {type: 'endDate', value: null});
    },
  },
  getters: {
    projects: state => {
      const filters = state.filters;
      const excludedCompetences = filters.competences
          .filter(comp => comp.checked === false)
          .map(comp => comp.name);
      let projects = state.projects
          .filter(project => project.title.toLocaleLowerCase().includes(filters.search))
          .filter(project => filters.spots <= project.spots)
          .filter(project => !project.competences.every(c => excludedCompetences.includes(c)));

      if(filters.startDate) {
        projects = projects.filter(project => project.date.start >= filters.startDate);
      }
      if(filters.endDate) {
        projects = projects.filter(project => project.date.end <= filters.endDate);
      }
      if(state.orderBy) {
        projects.sort((event1, event2) => {
          switch(state.orderBy) {
            case 'most recent':
              return event2.date.start - event1.date.start;
            case 'least recent':
              return event1.date.start - event2.date.start;
            case 'most valuable':
              return event2.points - event1.points;   // TODO: confirm property name
            case 'least valuable':
              return event1.points - event2.points;   // TODO: same ^^
            default:
              return 0;
          }
        });
      }

      return projects;
    },
  },
};
