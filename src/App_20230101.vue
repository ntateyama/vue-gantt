<template>
  <DxGantt
    :task-list-width="500"
    :height="700"
    :first-day-of-week="1"
    scale-type="weeks"
    @dependency-deleted="onDependencyDeleted"
    @dependency-inserted="onDependencyInserted"
    @onInitialized="onInitialized"
    @resource-assigned="onResourceAssigned"
    @resource-deleted="onResourceDeleted"
    @resource-inserted="onResourceInserted"
    @resource-unassigned="onResourceUnassigned"
    @task-deleted="onTaskDeleted"
    @task-inserted="onTaskInserted"
    @task-updating="onTaskUpdated"
    :hoverStateEnabled="true"
    :activeStateEnabled="true"
  >
    <!-- @option-changed="handlePropertyChange" -->
    <!-- :show-row-lines="false" -->
    <!-- :focusStateEnabled="true" -->
    <!-- :start-date-range="startDateRange" -->
    <DxTasks :data-source="tasks" />
    <DxDependencies :data-source="dependencies" />
    <DxResources :data-source="resources" />
    <DxResourceAssignments :data-source="resourceAssignments" />
    <DxToolbar>
      <DxItem name="undo" />
      <DxItem name="redo" />
      <DxItem name="separator" />
      <DxItem name="collapseAll" />
      <DxItem name="expandAll" />
      <DxItem name="separator" />
      <DxItem name="addTask" />
      <DxItem name="deleteTask" />
      <DxItem name="resourceManager" />
      <DxItem name="taskDetails" />
      <DxItem name="separator" />
      <DxItem name="showResources" />
      <DxItem name="showDependencies" />
      <DxItem name="zoomIn" />
      <DxItem name="zoomOut" />
      <DxItem
        :options="settingsButtonOptions"
        locate-in-menu="always"
        widget="dxButton"
      />
    </DxToolbar>
    <DxEditing :enabled="true" />
    <DxStripLine
      :start="currentTime"
      title="Current Time"
      css-class="current-time"
    />
    <DxValidation
      :auto-update-parent-tasks="true"
      :validate-dependencies="true"
      :enable-predecessor-gap="true"
    />
    <DxColumn :width="300" data-field="title" caption="Subject" />
    <DxColumn data-field="start" caption="Start Date" />
    <DxColumn data-field="end" caption="End Date" />
    <DxFilterRow :visible="true" />
  </DxGantt>
  <AppSettings ref="AppSettings" />
</template>
<script>
import {
  DxGantt,
  DxTasks,
  DxDependencies,
  DxResources,
  DxResourceAssignments,
  DxColumn,
  DxEditing,
  DxValidation,
  DxToolbar,
  DxItem,
  DxFilterRow,
  DxStripLine,
} from 'devextreme-vue/gantt';
import notify from 'devextreme/ui/notify';
import { formatDate } from 'devextreme/localization';
import gasApi from './api/gasApi';
// import axios from 'axios';
import {
  // mapState,
  mapActions,
  // Store,
} from 'vuex';
// import store from './store';
import AppSettings from './components/AppSettings.vue';
// import { tasks } from './data';
// import { locale } from 'devextreme/localization';
export default {
  name: 'App',
  components: {
    DxGantt,
    DxTasks,
    DxDependencies,
    DxResources,
    DxResourceAssignments,
    DxColumn,
    DxEditing,
    DxValidation,
    DxToolbar,
    DxItem,
    DxFilterRow,
    DxStripLine,
    AppSettings,
  },

  data() {
    return {
      settingsButtonOptions: {
        text: 'Settings',
        onClick: () => {
          // notify('Settings option has been clicked!')
          this.$refs.AppSettings.open();
        },
      },
      startDateRange: new Date(),
      currentTime: new Date(),
      tasks: [],
      dependencies: [],
      resources: [],
      resourceAssignments: [],
    };
  },

  computed: {
    // ...mapState({
    // tasks: function () {
    //   console.log('computed-tasks');
    //   return this.$store.state.tasks;
    // },
    // dependencies: function () {
    //   console.log('computed-dependencies');
    //   return this.$store.state.dependencies;
    // },
    // resources: function () {
    //   console.log('computed-resources');
    //   return this.$store.state.resources;
    // },
    // resourceAssignments: function () {
    //   console.log('computed-resourceAssignments');
    //   return this.$store.state.resourceAssignments;
    // },
    // ),
    // },
  },

  methods: {
    ...mapActions([
      'fetchDataAction',
      'addTaskAction',
      'addResourceAction',
      'onResourceAssignedAction',
      'taskUpdateAction',
      'loadSettingsAction',
    ]),
    formatDate,
    async fetch() {
      // if (
      //   this.tasks ||
      //   this.dependencies ||
      //   this.resources ||
      //   this.resourceAssignments
      // ) {
      //   // console.log(res.data['tasks']);
      //   // console.log(this.tasks);
      //   // console.log(this.resources);
      //   // console.log(this.resourceAssignments);
      // }
      const res = await this.fetchDataAction();
      // this.tasks = res.data['tasks'];
      // this.dependencies = res.data['dependencies'];
      // this.resources = res.data['resources'];
      // this.resourceAssignments = res.data['resourceAssignments'];
      ({
        tasks: this.tasks,
        dependencies: this.dependencies,
        resources: this.resources,
        resourceAssignments: this.resourceAssignments,
      } = res.data);
    },
    onDependencyDeleted(e) {
      console.log('onDependencyDeleted');
      console.log(e);
    },
    onDependencyInserted(e) {
      console.log('onDependencyInserted');
      console.log(e);
    },
    /**
     * A function used in JavaScript frameworks to save the UI component instance.
     * @param {*} e
     */
    onInitialized(e) {
      console.log('onInitialized');
      console.log(e.values);
    },
    /**
     * A function that is executed after a UI component property is changed.
     * @param {*} e
     */
    // handlePropertyChange(e) {
    //   console.log('handlePropertyChange');
    //   if (e.value) {
    //     // console.log(e.name);
    //     // console.log(e.value);
    //     // console.log(e.previousValue);
    //   }
    // },
    /**
     * A function that is executed when a resource is unassigned from a task.
     * @param {*} e
     */
    onResourceUnassigned(e) {
      console.log('onResourceUnassigned');
      console.log(e.values);
      if (e.key != 0) {
        // your code
        console.log(e);
      }
    },
    /**
     * A function that is executed when a task is deleted.
     * @param {*} e
     */
    onTaskDeleted(e) {
      console.log('onTaskDeleted');
      console.log(e.values);
      if (e.key != 0) {
        // your code
      }
    },
    /**
     * A function that is executed when a task is inserted.
     * @param {*} e
     */
    async onTaskInserted(event) {
      console.log('onTaskInserted');
      console.log(event);
      console.log(event.key);
      console.log(event.values);
      // await this.addTaskAction(event);
      console.table(event.values);
      event.values.parentId = event.values.parentId || 0;
      await gasApi.addTask(event.key, event.values);
      notify('task inserted.');
    },
    /**
     * A function that is executed when a task is updated.
     * @param {*} e
     */
    async onTaskUpdated(event) {
      console.log('onTaskUpdated');
      console.log(event);
      // console.log(e.values);
      const updatedTask = Object.assign(event.values, event.newValues);
      console.log(updatedTask);
      // await this.taskUpdateAction(updated);
      await gasApi.updateTask(updatedTask);
      notify('task updated.');
    },
    /**
     * A function that is executed when a resource is inserted.
     * @param {*} e
     */
    async onResourceInserted(e) {
      console.log('onResourceInserted');
      console.log(e);
      console.log(e.values);
      // await this.addResourceAction(e);
      await gasApi.addResource(e.key, e.values);
      notify('resource inserted.');
    },
    /**
     * A function that is executed when a resource is assigned to a task.
     * @param {*} e
     */
    async onResourceAssigned(e) {
      console.log('onResourceAssigned');
      console.log(e);
      console.log(e.values);
      // await this.onResourceAssignedAction(e);
      await gasApi.onResourceAssigned(e.key, e.values);
      notify('resource updated.');
    },
    /**
     * A function that is executed when a resource is deleted.
     * @param {*} e Information about the event.
     */
    onResourceDeleted(e) {
      console.log('onResourceDeleted');
      console.log(e.values);
      if (e.key == 0) {
        // your code
        console.log(e);
      }
    },
    // test() {
    //   for (let obj of this.tasks) {
    //     for (let tmp in obj) {
    //       console.log(tmp);
    //     }
    //   }
    // },
  },
  async beforeCreate() {
    console.log('beforeCreated');
    await this.$store.dispatch('loadSettingsAction');
    // await this.loadSettingsAction();
    await this.fetch();
    console.table(this.tasks);
    console.log(typeof this.tasks[0].start);
  },

  created() {
    console.log('created');
    // locale(navigator.language);
    // this.fetch();
    // this.test();
  },
  watch: {
    // tasks(values) {
    //   console.log('watch tasks');
    //   console.log(values);
    //   // store.commit('setTasksMutation', values);
    // },
    // dependencies(values) {
    //   console.log('watch dependencies');
    //   // store.commit('setDependenciesMutation', values);
    //   console.log(values);
    // },
    // resources(values) {
    //   console.log('watch resources');
    //   console.log(values);
    //   // store.commit('setResourcesMutation', values);
    // },
    // resourceAssignments(values) {
    //   console.log('watch assignments');
    //   console.log(values);
    //   // store.commit('setResourceAssignmentsMutation', values);
    // },
  },
};
</script>
<style>
#gantt {
  height: 700px;
}
.dx-gantt .dx-gantt-tm.current-time {
  border-left: 1px solid red;
}
</style>
