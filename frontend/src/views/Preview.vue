<template>
  <v-container fluid style="height: 70vh">
    <v-card>
      <v-card-title>
        Link preview
        <v-spacer/>
      </v-card-title>
      <v-card-text>
        <span v-if="linkData" style="font-size: 1.5em">
          <a :href="'https://nush.link/'+ this.alias" target="_blank">nush.link/{{
              this.alias
            }}</a> points to
          <a :href="this.linkData.url" target="_blank">{{ this.linkData.url }}</a>
        </span><br><br>
        <span v-if="linkData">
          Created by <b>{{linkData.creator}}</b> on <b>{{ new Date(linkData.createdOn).toLocaleDateString() }}</b>
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
