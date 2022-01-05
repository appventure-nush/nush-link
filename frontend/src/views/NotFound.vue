<template>
  <v-container fluid style="height: 70vh">
    <v-card>
      <v-card-title>
        <!-- TODO: beautify -->
        This nush.link does not exist! Have you checked that the link you entered is correct, including casing?
        <v-spacer/>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NotFound",
});
</script>
