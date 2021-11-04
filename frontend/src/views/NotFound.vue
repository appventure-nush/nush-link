<template>
  <v-container fluid style="height: 70vh">
    <v-card>
      <v-card-title>
        <!-- TODO: beautify -->
        This nush.link does not exist!
        <v-spacer/>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {LinkData} from "@/types/LinkData";
import {getLinkData} from "@/api/links";

export default Vue.extend({
  name: "NotFound",
});
</script>
