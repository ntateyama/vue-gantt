<template>
  <!-- データ追加／編集ダイアログ -->
  <v-dialog v-model="show" scrollable persistent max-width="1030px" eager>
    <v-card>
      <v-card-title>App Settings</v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <!-- API URL -->
          <v-text-field
            label="API URL"
            v-model="settings.apiUrl"
            :counter="120"
          />
          <!-- :rules="[stringRule]" -->
          <!-- Auth Token -->
          <v-text-field
            label="Auth Token"
            v-model="settings.authToken"
            :counter="120"
          />
          <v-text-field
            label="Scale Type Range"
            v-model="settings.scaleTypeRange"
            :counter="50"
          />

          <!-- :rules="[stringRule]" -->
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="grey darken-1"
          text
          :disabled="loading"
          @click="onClickClose"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          :disabled="!valid"
          :loading="loading"
          @click="onClickSave"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'AppSettings',

  data() {
    return {
      show: false,
      valid: false,
      loading: false,
      /** settings */
      settings: { ...this.$store.state.settings },
    };
  },

  methods: {
    open() {
      this.show = true;
    },
    onClickClose() {
      this.show = false;
    },
    onClickSave() {
      this.$store.dispatch({
        type: 'saveSettingsAction',
        settings: this.settings,
      });
      this.show = false;
    },
  },
};
</script>

<style>
.form-wrapper {
  max-width: 500px;
  margin: auto;
}
</style>
