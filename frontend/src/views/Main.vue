<template>
  <v-container fluid style="height: 100vh">
    <v-card>
      <v-card-title>
        Your profile
        <v-spacer/>
      </v-card-title>
      <v-card-text>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Main",
  data: function () {
    return {};
  },
  computed: {
    width() {
      return window.innerWidth;
    },
    height() {
      return window.innerHeight;
    },
  },
  methods: {},
});
</script>
