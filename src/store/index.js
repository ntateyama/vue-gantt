import { createStore } from 'vuex';
import gasApi from '../api/gasApi';

const state = {
  settings: {
    apiUrl: '',
    authToken: '',
    scaleTypeRange: '',
  },
};
const mutations = {
  /**
   * save settings in localStorage.
   * @param {*} state
   * @param {*} param1
   */
  saveSettingsMutation(state, { settings }) {
    console.log('saveSettingsMutation');
    state.settings = { ...settings };
    const { apiUrl, authToken } = state.settings;
    gasApi.setUrl(apiUrl);
    gasApi.setAuthToken(authToken);

    localStorage.setItem('settings', JSON.stringify(settings));
  },
  loadSettingsMutation(state) {
    console.log('loadSettingsMutation');
    const settings = JSON.parse(localStorage.getItem('settings'));
    if (settings) {
      state.settings = Object.assign(state.settings, settings);
    }
    const { apiUrl, authToken } = state.settings;
    gasApi.setUrl(apiUrl);
    gasApi.setAuthToken(authToken);
  },
};

const actions = {
  /**
   * save settings.
   * @param {*} param0
   * @param {*} param1
   */
  saveSettingsAction({ commit }, { settings }) {
    console.log('saveSettingsAction');
    commit('saveSettingsMutation', { settings });
  },
  /**
   *
   * @param {*} param0
   */
  loadSettingsAction({ commit }) {
    console.log('loadSettingsAction');
    commit('loadSettingsMutation');
  },
};

const store = createStore({
  state,
  mutations,
  actions,
});

export default store;
