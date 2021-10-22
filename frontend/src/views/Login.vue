<template>
    <v-container fluid>
      <v-img src="@/../public/assets/logo.png" alt="logo" max-width="400px" class="logo-img">
      </v-img>
      <h1 style="margin-bottom:20px">NUSH.link Login</h1>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation>

        <v-text-field
            v-model="name"
            label="Name"
            required>
        </v-text-field>
        <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required>
        </v-text-field>
        <v-alert
            :value="formAlert"
            type="warning">
          Invalid Credentials
        </v-alert>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate">
          Login
        </v-btn>

      </v-form>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import router from "@/plugins/router";

export default Vue.extend({
  data() {
    return  {
      valid: true,
      name: "",
      password: "",
      formAlert: false
    };
  },
  methods: {
    validate () { return true; },
  }
});
</script>

<style scoped lang="scss">
.logo-img {
  margin-left: auto;
  margin-right: auto;
  margin-top: 4rem;
}
</style>