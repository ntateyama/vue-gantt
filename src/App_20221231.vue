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
// import axios from 'axios';
import {
  // mapState,
  mapActions,
} from 'vuex';
import AppSettings from './components/AppSettings.vue';
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
      currentTime: new Date(2019, 1, 26),
    };
  },

  computed: {
    // ...mapState({
    // tasks() {
    //   console.log('computed-tasks');
    //   return this.$store.state.tasks;
    // },
    // dependencies() {
    //   console.log('computed-dependencies');
    //   return this.$store.state.dependencies;
    // },
    // resources() {
    //   console.log('computed-resources');
    //   return this.$store.state.resources;
    // },
    // resourceAssignments() {
    //   console.log('computed-resourceAssignments');
    //   return this.$store.state.resourceAssignments;
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
      if (
        this.tasks ||
        this.dependencies ||
        this.resources ||
        this.resourceAssignments
      ) {
        const ret = await this.fetchDataAction();

      }
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
      console.log(e);
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
    async onTaskInserted(e) {
      console.log('onTaskInserted');
      await this.addTaskAction(e);
      notify('task inserted.');
    },
    /**
     * A function that is executed when a task is updated.
     * @param {*} e
     */
    async onTaskUpdated(e) {
      console.log('onTaskUpdated');
      console.log(e);
      // console.log(e.values);
      const updated = Object.assign(e.values, e.newValues);
      console.log(updated);
      await this.taskUpdateAction(updated);
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
      await this.addResourceAction(e);
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
      await this.onResourceAssignedAction(e);
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
  beforeCreate() {
    console.log('beforeCreated');
    // this.$store.dispatch('loadSettingsAction');
    this.loadSettingsAction();
  },

  created() {
    console.log('created');
    // locale(navigator.language);
    this.fetch();
    // this.test();
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
