import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    versions: null,
  },
  mutations: {
    setVersions(state, versions) {
      state.versions = versions;
    },
  },
  actions: {

  },
});
