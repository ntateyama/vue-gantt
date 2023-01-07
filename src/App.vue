<template>
  <DxGantt
    :ref="ganttRef"
    :task-list-width="500"
    :height="700"
    :first-day-of-week="1"
    scale-type="weeks"
    :hoverStateEnabled="true"
    :activeStateEnabled="true"
    :focusStateEnabled="true"
    :show-row-lines="true"
    @dependency-deleted="onDependencyDeleted"
    @dependency-inserted="onDependencyInserted"
    @onInitialized="onInitialized"
    @resource-assigned="onResourceAssigned"
    @resource-deleted="onResourceDeleted"
    @resource-inserted="onResourceInserted"
    @resource-unassigned="onResourceUnassigned"
    @task-deleted="onTaskDeleted"
    @task-inserted="onTaskInserted"
    @task-inserting="onTaskInserting"
    @task-updating="onTaskUpdating"
    @task-updated="onTaskUpdated"
    @content-ready="onContentReady"
  >
    <!-- :start-date-range="startDateRange" -->
    <!-- @task-edit-dialog-showing="onTaskEditDialogShowing" -->
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
    <DxColumn data-field="term" caption="Term" />
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
import { mapActions } from 'vuex';
import AppSettings from './components/AppSettings.vue';
const ganttRef = 'gantt';
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
          this.$refs.AppSettings.open();
        },
      },
      // startDateRange: new Date(),
      currentTime: new Date(),
      tasks: [],
      dependencies: [],
      resources: [],
      resourceAssignments: [],
      holidays: [],
      ganttRef,
    };
  },
  computed: {
    gantt: function () {
      return this.$refs[ganttRef].instance;
    },
    holidayYYYYMMDD: function () {
      const tmp = [];
      this.holidays.forEach((holiday) => {
        tmp.push(this.getYYYYMMDD(new Date(holiday)));
      });
      return tmp;
    },
  },

  methods: {
    ...mapActions(['loadSettingsAction']),
    formatDate,
    async fetch() {
      const res = await gasApi.fetch();
      // console.log(res.data['tasks']);
      ({
        tasks: this.tasks,
        dependencies: this.dependencies,
        resources: this.resources,
        resourceAssignments: this.resourceAssignments,
        holidays: this.holidays,
      } = res.data);
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
     * A function that is executed when a resource is unassigned from a task.
     * @param {*} e
     */
    async onResourceUnassigned(event) {
      console.log('onResourceUnassigned');
      await gasApi.deleteResourceAssignments(event.key);
      notify('Resource Unassigned.');
    },

    /**
     *
     * @param {*} event
     */
    async onTaskInserting(event) {
      console.log('onTaskInserting');
      console.log(event);
      event.values.term = this.getTerm(event.values);
      console.log(event.values.term);
    },

    /**
     * A function that is executed when a task is inserted.
     * @param {*} e
     */
    async onTaskInserted(event) {
      console.log('onTaskInserted');
      event.values.parentId = event.values.parentId || 0;
      gasApi.addTask(event.key, event.values);
      // await this.gantt.showTaskDetailsDialog(event.key, {
      //   title: event.values.title,
      // });
      notify('task inserted.');
    },

    /**
     *
     * @param {*} event
     */
    onTaskEditDialogShowing(event) {
      console.log('onTaskEditDialogShowing');
      console.log(event);
      event.readOnlyFields.push('term');
      // gasApi.addTask(event.key, event.values);
    },

    /**
     *
     * @param {*} event
     */
    async onTaskUpdating(event) {
      console.log('onTaskUpdating');
      const updatedTask = Object.assign(event.values, event.newValues);
      updatedTask.term = this.getTerm(event.values);
      event.values = updatedTask;
      console.log(event.values);
      await gasApi.updateTask(event.values);
    },

    /**
     * A function that is executed when a task is updated.
     * @param {*} e
     */
    async onTaskUpdated(event) {
      console.log('onTaskUpdated');
      console.log(event);
      const index = this.tasks.findIndex((task) => task.id == event.key);
      if (index !== -1) {
        Object.assign(this.tasks[index], event.values);
        this.tasks[index].term = this.getTerm(this.tasks[index]);
        console.log('object assigned');
        console.log(this.tasks[index]);
      }
      // this.gantt.updateTask(event.key, event.values);
      notify('task updated.');
    },

    /**
     * A function that is executed when a task is deleted.
     * @param {*} event
     */
    async onTaskDeleted(event) {
      console.log('onTaskDeleted');
      await gasApi.deleteTask(event.key);
      notify('task deleted.');
    },

    /**
     *
     * @param {*} event
     */
    async onDependencyInserted(event) {
      console.log('onDependencyInserted');
      await gasApi.addDependeny(event.key, event.values);
      notify('dependency inserted.');
    },

    /**
     * A function that is executed when a resource is inserted.
     * @param {*} e
     */
    async onResourceInserted(e) {
      console.log('onResourceInserted');
      console.log(e);
      console.log(e.values);
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
      await gasApi.onResourceAssigned(e.key, e.values);
      notify('resource updated.');
    },

    /**
     *
     * @param {*} event
     */
    async onDependencyDeleted(event) {
      console.log('onDependencyDeleted');
      console.log(event);
      await gasApi.deleteDependency(event.key);
      notify('dependency deleted.');
    },

    /**
     * A function that is executed when a resource is deleted.
     * @param {*} event Information about the event.
     */
    async onResourceDeleted(event) {
      console.log('onResourceDeleted');
      await gasApi.deleteResource(event.key);
    },

    /**
     *
     * @param {*} date
     */
    getYYYYMMDD(date) {
      const year_str = date.getFullYear();
      //月だけ+1すること
      const month_str = (1 + date.getMonth()).toString().padStart(2, '0');
      const day_str = date.getDate().toString().padStart(2, '0');
      // const hour_str = date.getHours().toString().padStart(2, '0');
      // const minute_str = date.getMinutes().toString().padStart(2, '0');
      // const second_str = date.getSeconds().toString().padStart(2, '0');
      let format_str = '';
      // format_str = 'YYYY-MM-DDThh:mm:ss.000Z';
      format_str = 'YYYY-MM-DD';
      format_str = format_str.replace(/YYYY/g, year_str);
      format_str = format_str.replace(/MM/g, month_str);
      format_str = format_str.replace(/DD/g, day_str);
      // format_str = format_str.replace(/hh/g, hour_str);
      // format_str = format_str.replace(/mm/g, minute_str);
      // format_str = format_str.replace(/ss/g, second_str);

      return format_str;
    },

    /**
     *
     * @param {*} e
     */
    onContentReady(e) {
      console.log('onContentReady');
      console.log(e);
      this.gantt.scrollToDate(new Date());
    },

    /**
     *
     * @param {*} task
     */
    getTerm(task) {
      console.log('getTerm');
      const SUNDAY = 0;
      const SATURDAY = 6;
      const startYYYYMMDD = this.getYYYYMMDD(new Date(task.start));
      const endYYYYMMDD = this.getYYYYMMDD(new Date(task.end));

      const tmpArray = [];
      let tmp = startYYYYMMDD;
      while (tmp < endYYYYMMDD) {
        const week = new Date(tmp).getDay();
        if (
          week !== SUNDAY &&
          week !== SATURDAY &&
          this.holidayYYYYMMDD.indexOf(tmp) == -1
        ) {
          tmpArray.push(tmp);
        }
        const tmpDate = new Date(tmp);
        tmpDate.setDate(tmpDate.getDate() + 1);
        tmp = this.getYYYYMMDD(tmpDate);
      }
      console.log(tmpArray.length);
      return tmpArray.length;
    },
  },

  /**
   *
   */
  async beforeCreate() {
    console.log('beforeCreated');
    await this.$store.dispatch('loadSettingsAction');
    await this.fetch();
    console.log(this.tasks);
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
