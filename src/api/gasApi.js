import axios from 'axios';

const gasApi = axios.create({
  headers: { 'content-type': 'text/plain' },
});

gasApi.interceptors.response.use(
  (res) => {
    if (res.data.error) {
      return Promise.reject(res.data.error);
    }
    return Promise.resolve(res);
  },
  (err) => {
    return Promise.reject(err);
  }
);

/**
 * set API URL.
 * @param {String} url
 */
const setUrl = (url) => {
  gasApi.defaults.baseURL = url;
};

/**
 * set authToken.
 * @param {String} token
 */
let authToken = '';
const setAuthToken = (token) => {
  authToken = token;
};

/**
 *
 * @returns
 */
const fetch = () => {
  console.log('fetch');
  return gasApi.post('', {
    method: 'GET',
    authToken,
  });
};

/**
 *
 * @param {*} key
 * @param {*} task
 * @returns
 */
const addTask = (key, task) => {
  console.log('addTask');
  return gasApi.post('', {
    method: 'PUT_TASK',
    authToken,
    params: {
      key,
      task,
    },
  });
};

/**
 *
 * @param {*} key
 * @param {*} dependency
 * @returns
 */
const addDependeny = (key, dependency) => {
  console.log('addDependecy');
  return gasApi.post('', {
    method: 'PUT_DEPENDENCY',
    authToken,
    params: {
      key,
      dependency,
    },
  });
};

/**
 *
 * @param {*} key
 * @returns
 */
const deleteTask = (key) => {
  console.log('deleteTask');
  return gasApi.post('', {
    method: 'DEL_TASK',
    authToken,
    params: {
      key,
    },
  });
};
/**
 *
 * @param {*} key
 * @returns
 */
const deleteDependency = (key) => {
  console.log('deleteDependecy');
  return gasApi.post('', {
    method: 'DEL_DEPENDENCY',
    authToken,
    params: {
      key,
    },
  });
};

const deleteResource = (key) => {
  console.log('deleteResource');
  return gasApi.post('', {
    method: 'DEL_RESOURCE',
    authToken,
    params: {
      key,
    },
  });
};

/**
 *
 * @param {*} key
 * @returns
 */
const deleteResourceAssignments = (key) => {
  console.log('deleteResourceAssignments');
  return gasApi.post('', {
    method: 'DEL_RESOURCEASSIGNMENTS',
    authToken,
    params: {
      key,
    },
  });
};

/**
 *
 * @param {*} task
 * @returns
 */
const updateTask = (task) => {
  console.log('updateTask');
  console.log(task);
  return gasApi.post('', {
    method: 'UPDATE_TASK',
    authToken,
    params: {
      task,
    },
  });
};

/**
 *
 * @param {*} key
 * @param {*} resource
 * @returns
 */
const addResource = (key, resource) => {
  console.log('addTask');

  return gasApi.post('', {
    method: 'PUT_RESOURCE',
    authToken,
    params: {
      key,
      resource,
    },
  });
};

/**
 *
 * @param {*} key
 * @param {*} resourceAssignment
 * @returns
 */
const onResourceAssigned = (key, resourceAssignment) => {
  console.log('onResourceAssigned');

  return gasApi.post('', {
    method: 'RESOURCE_ASSIGNED',
    authToken,
    params: {
      key,
      resourceAssignment,
    },
  });
};

export default {
  setUrl,
  setAuthToken,
  fetch,
  addTask,
  addDependeny,
  addResource,
  updateTask,
  deleteTask,
  deleteDependency,
  deleteResource,
  deleteResourceAssignments,
  onResourceAssigned,
};
