<template>
  <v-card>
    <!--    Loading -->
    <v-card-title v-if="!success && !error">
      Creating link...
      <v-spacer/>
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </v-card-title>
    <!--  Link created -->
    <v-card-title v-if="success">
      Link created!
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
    <v-card-text>
      <v-row>
        <v-col align="center">
          <span style="font-size: 1.5em">
            nush.link/{{ this.alias }}
            <v-icon>mdi-arrow-right</v-icon>
            {{ this.original }}
          </span>
        </v-col>
      </v-row>
      <v-row v-if="!error.length">
        <v-col align="center">
          <v-btn
            color="primary"
            @click="copyLink"
            :disabled="!success || copied"
          >
            {{ copied ? "Link copied!" : "Copy Link" }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-else style="font-size: 1.25em">
        <v-col align="center" class="error--text">
          {{ error }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    copied: false,
  }),
  props: {
    alias: String,
    original: String,
    success: Boolean,
    error: String,
  },
  methods: {
    copyLink() {
      navigator.clipboard.writeText("https://nush.link/" + this.alias).then(() => {
        this.copied = true;
      });
    },
  },
  watch: {
    success: function () {
      this.copied = false;
    }
  }
});
</script>
