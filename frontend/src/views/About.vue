<template>
  <v-container fluid style="height: 100vh;margin-top: 60px">
    <v-card>
      <v-card-title>
        About NUSH.link
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
  name: "About",
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
