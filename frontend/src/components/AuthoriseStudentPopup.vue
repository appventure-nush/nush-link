<template>
  <v-card>
    <!--    Loading -->
    <v-card-title v-if="!success && !error">
      Authorising...
      <v-spacer/>
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </v-card-title>
    <!--  Link created -->
    <v-card-title v-if="success">
      Student Authorised!
      <v-spacer/>
      <v-btn icon color="primary" @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <!--  Error occurred -->
    <v-card-title v-if="!success && error.length">
      Oops, an error occurred!
      <v-spacer/>
      <v-btn icon color="primary" @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text v-if="!success && error.length">
      <v-row style="font-size: 1.25em">
        <v-col align="center" class="error--text">
          {{ error }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import QrcodeVue from "qrcode.vue";

export default Vue.extend({
  props: {
    success: Boolean,
    error: String,
  },
  components: {
    QrcodeVue
  }
});
</script>
