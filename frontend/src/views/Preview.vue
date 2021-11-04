<template>
  <v-container fluid style="height: 70vh">
    <v-card>
      <v-card-title>
        Link preview
        <v-spacer/>
      </v-card-title>
      <v-card-text>
        <!--  TODO: Improve layout and display more information (creator name, creation time and date) -->
        <span v-if="linkData">
          nush.link/{{ this.alias }} points to {{ this.linkData.url }}
        </span>
        <span v-if="error">
          {{ error }}
        </span>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {LinkData} from "@/types/LinkData";
import {getLinkData} from "@/api/links";

type PreviewData = {
  linkData: LinkData | null;
  alias: string | null;
  error: string | null;
};

export default Vue.extend({
  name: "Preview",
  data: function (): PreviewData {
    return {
      linkData: null,
      alias: null,
      error: null,
    };
  },
  mounted() {
    this.$data.alias = this.$route.params.alias;
    getLinkData(this.$data.alias).then(linkData => {
      this.$data.linkData = linkData;
    }).catch(err => {
      this.$data.error = err.message;
      this.$data.linkData = null;
    });
  },
  methods: {},
});
</script>
