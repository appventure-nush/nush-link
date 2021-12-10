<template>
  <v-container>
    <!-- TODO: Make this more user friendly -->
    <v-data-table
      :headers="table.headers"
      :items="links"
    >
      <template v-slot:item.url="{ item }">
        <a :href="item.url" target="_blank">{{ item.url }}</a>
      </template>
      <template v-slot:item.createdOn="{ item }">
        {{ new Date(item.createdOn).toLocaleDateString() }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {getUserLinks} from "@/api/me";

export default Vue.extend({
  data() {
    return {
      links: [],
      table: {
        headers: [
          {
            text: "Link Alias",
            value: "alias"
          },
          {
            text: "URL",
            value: "url"
          },
          {
            text: "Created On",
            value: "createdOn"
          },
        ]
      }
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    getUserLinks().then(links => {
      this.$data.links = links;
    });
  }
});
</script>
