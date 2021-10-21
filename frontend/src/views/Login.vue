<template>
    <v-container fluid style="margin-top:60px">
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
    validate () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fetch("/auth/login",{
        method: "POST" ,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.name,
          password: this.password,
        })
      }).then(res => {
        if(res.status === 404 || res.status === 200){
          this.$store.commit("login",this.name);
          console.log(res);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.$refs.form.validate();
          router.push("/home");
        } else {
          this.formAlert = true;
          console.log("Unauthorized login");
        }
      });
    },
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