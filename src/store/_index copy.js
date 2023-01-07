import { createStore } from 'vuex';
import gasApi from '../api/gasApi';

// const state = () => ({
//   settings: {
//     apiUrl: '',
//     authToken: '',
//   },
//   tasks: [],
//   dependencies: [],
//   resources: [],
//   resourceAssignments: [],
// });
const state = {
  settings: {
    apiUrl: '',
    authToken: '',
  },
  //   tasks: [],
  //   dependencies: [],
  //   resources: [],
  //   resourceAssignments: [],
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
  //   setTasksMutation(state, { tasks }) {
  //     console.log('setTasksMutation');
  //     state.tasks = tasks;
  //   },
  //   setDependenciesMutation(state, { dependencies }) {
  //     console.log('setDependenciesMutation');
  //     state.dependencies = dependencies;
  //   },
  //   setResourcesMutation(state, { resources }) {
  //     console.log('setResourcesMutation');
  //     state.resources = resources;
  //   },
  //   setResourceAssignmentsMutation(state, { resourceAssignments }) {
  //     console.log('setResourceAssignmentsMutation');
  //     state.resourceAssignments = resourceAssignments;
  //   },
  //   addTaskMutation(state, { task }) {
  //     console.log('addTaskMutation');
  //     console.log(task);
  //     const tasks = state.tasks;
  //     if (tasks) {
  //       tasks.push(task);
  //     }
  //   },
  //   /**
  //    *
  //    * @param {*} task
  //    * @returns
  //    */
  //   updateTaskMutation(state, { task }) {
  //     console.log('updateTaskMutation');
  //     console.log(task);
  //     // const tasks = state.tasks;
  //     if (state.tasks) {
  //       const index = state.tasks.findIndex(function (v) {
  //         // console.log(v);
  //         // console.log('v.id:' + v.id);
  //         // console.log('task.id:' + task.id);
  //         return v.id === task.id;
  //       });
  //       if (index == -1) {
  //         console.log('updateTaskMutation-insert');
  //         state.tasks.splice(task.length + 1, 0, task);
  //         state.tasks.push(task);
  //         return;
  //       }
  //       console.log('updateTaskMutation-update');
  //       state.tasks.splice(index, 1, task);
  //       //   tasks[index] = task;
  //     }
  //   },
  //   addResourceMutation(state, { resource }) {
  //     console.log('addResourceMutation');
  //     const resources = state.resources;
  //     if (resource) {
  //       resources.push(resource);
  //     }
  //   },
  //   onResourceAssignedMutation(state, { resourceAssignment }) {
  //     console.log('onResourceAssignedMutation');
  //     // const resourceAssignments = state.resourceAssignments;
  //     console.log(state.resourceAssignments);
  //     if (state.resourceAssignments.length > 0) {
  //       //   const index = resourceAssignments.findIndex(
  //       const index = state.resourceAssignments.findIndex((v) => {
  //         // console.log(v);
  //         // console.log(resourceAssignment.id);
  //         v.id === resourceAssignment.id;
  //       });
  //       if (index == -1) {
  //         // state.resourceAssignments.push(resourceAssignment);
  //         state.resourceAssignments.splice(
  //           resourceAssignment.length + 1,
  //           0,
  //           resourceAssignment
  //         );
  //         return;
  //       }
  //       state.resourceAssignments.splice(index, 1, resourceAssignment);
  //       //   resourceAssignments[index] = resourceAssignment;
  //     }
  //   },
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
  /**
   *
   * @param {*} param0
   */
  async fetchDataAction() {
    // { commit }
    console.log('fetchDataAction');
    const { apiUrl, authToken } = state.settings;
    // console.log(apiUrl);
    gasApi.setUrl(apiUrl);
    gasApi.setAuthToken(authToken);
    try {
      //   const res = await gasApi.fetch();
      return await gasApi.fetch();
      //   console.log(res);
      //   commit('setTasksMutation', { tasks: res.data['tasks'] });
      //   commit('setDependenciesMutation', {
      //     dependencies: res.data['dependencies'],
      //   });
      //   commit('setResourcesMutation', { resources: res.data['resources'] });
      //   commit('setResourceAssignmentsMutation', {
      //     resourceAssignments: res.data['resourceAssignments'],
      //   });
    } catch (e) {
      //   commit('setTasksMutation');
      console.log('error at fetchDataAction');
    }
  },
  /**
   * add task action.
   * @param {*} param0
   * @param {*} event
   */
  async addTaskAction(
    // { commit },
    event
  ) {
    console.log('addTaskAction');
    const { apiUrl, authToken } = state.settings;

    gasApi.setUrl(apiUrl);
    gasApi.setAuthToken(authToken);

    try {
      //   const res = await gasApi.addTask(event.key, event.values);
      await gasApi.addTask(event.key, event.values);

      //   console.log(res);
      //   console.table(res);
      //   commit('addTaskMutation', { task: res.data['task'] });
      //   commit('addTaskMutation', { task: res.data });
    } catch (e) {
      console.log(e);
    }
  },
  /**
   *
   * @param {*} param0
   * @param {*} event
   */
  async taskUpdateAction(
    // { commit },
    task
  ) {
    console.log('taskUpdateAction');
    const { apiUrl, authToken } = state.settings;

    gasApi.setUrl(apiUrl);
    gasApi.setAuthToken(authToken);

    try {
      console.log(task);
      //   const res = await gasApi.updateTask(task);
      await gasApi.updateTask(task);
      //   console.log(res);
      //   commit('updateTaskMutation', { task: res.data['task'] });
      //   commit('updateTaskMutation', { task: res.data });
    } catch (e) {
      console.log(e);
    }
  },
  /**
   * add resource action.
   * @param {*} param0
   * @param {*} event
   */
  async addResourceAction(
    // { commit },
    event
  ) {
    console.log('addResourceAction');
    const { apiUrl, authToken } = state.settings;

    gasApi.setUrl(apiUrl);
    gasApi.setAuthToken(authToken);
    try {
      //   const res = await gasApi.addResource(event.key, event.values);
      await gasApi.addResource(event.key, event.values);
      //   commit('addResourceMutation', { resource: res.data['resource'] });
      //   commit('addResourceMutation', { resource: res.data });
    } catch (e) {
      console.log(e);
    }
  },
  /**
   *
   * @param {*} param0
   * @param {*} event
   */
  async onResourceAssignedAction(
    // { commit },
     event) {
    console.log('onResourceAssignedAction');
    const { apiUrl, authToken } = state.settings;

    gasApi.setUrl(apiUrl);
    gasApi.setAuthToken(authToken);
    try {
      const res = await gasApi.onResourceAssigned(event.key, event.values);
      //   commit('onResourceAssignedMutation', {
      //     resourceAssignments: res.data['resourceAssignments'],
      //   });
      //   console.table(res.data);
      //   console.log(res.data.id);
      commit('onResourceAssignedMutation', {
        resourceAssignment: res.data,
      });
    } catch (e) {
      console.log(e);
    }
  },
};

const store = createStore({
  state,
  mutations,
  actions,
});

export default store;
