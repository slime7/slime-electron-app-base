import Vue from 'vue';
import Vuex from 'vuex';
import toast from '@/store/moduleToast';
import dialog from '@/store/moduleDialog';

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
  modules: {
    toast,
    dialog,
  },
});
