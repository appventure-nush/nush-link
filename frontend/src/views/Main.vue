<template>
  <v-container fluid style="height: 66vh" align="center" justify="center">
    <v-card style="padding: 20px">
      <v-card-title>
        Create a NUSH.link!
        <v-spacer/>
      </v-card-title>

      <v-form
        ref="form"
        v-model="valid"
        style="padding-bottom:30px"
        lazy-validation>
        <v-row
          align="center"
          justify="center"
          class="ma-12"
        >
          <v-col
            cols="12"
            sm="4"
          >
            <h3>Original URL</h3>
            <v-text-field
              :disabled="!user"
              x-large
              v-model="url_original"
              placeholder="Original URL"
              :rules="[rules.original]"
              required>
            </v-text-field>
            <v-spacer/>
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <h3>Customized URL</h3>
            <v-text-field
              :disabled="!user"
              x-large
              v-model="url_new"
              placeholder="New URL"
              prefix="https://nush.link/"
              :rules="[rules.new]"
              required>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row
          align="center"
          justify="center"
          class="ma-12"
        >
          <!--  Users can only create links when signed in -->
          <v-btn
            v-if="user"
            :disabled="!valid"
            color="primary"
            x-large
            @click="create">
            Create
          </v-btn>
          <!--  Redirect user to sign in if they are not signed in -->
          <v-btn
            v-else
            :disabled="!valid"
            color="primary"
            x-large
            @click="signIn">
            Sign in to create link
          </v-btn>
        </v-row>
      </v-form>

    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Main",
  data: function () {
    return {
      rules: {
        original: (value: string | undefined) => {
          if (value === undefined || value === "") return true;
          try {
            const url = new URL(value);
            return (url.protocol === "http:" || url.protocol === "https:") || "URL is not valid";
          } catch (_) {
            return "URL is not valid";
          }
        },
        new: (input: string | undefined) => {
          if (input === undefined || input === "") return true;
          return input.trim().toLowerCase().match(/^[a-z0-9_-]+$/) !== null || "Invalid Alias for the New URL";
        }
      },
      valid: true,
      url_original: "",
      url_new: "",
    };
  },
  computed: {
    width() {
      return window.innerWidth;
    },
    height() {
      return window.innerHeight;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    create() {
      fetch(`/api/create?alias=${this.url_new}&original=${this.url_original}`, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"}
      }).then(response => response.json()).then((data) => {
        if (data.success) console.log("Success!"); else if (typeof data.message !== "undefined") console.log(data.message);
      });
    },
    signIn() {
      location.href = `https://login.microsoftonline.com/d72a7172-d5f8-4889-9a85-d7424751592a/oauth2/authorize?` +
        `client_id=2f4b388c-143a-42b2-b69c-ff8531d58cda&` +
        `redirect_uri=${location.origin}/api/auth/login&` +
        `response_type=id_token&nonce=nush-link&response_mode=form_post`;
    }
  },
});
</script>
<style scoped>
.v-btn:before {
  opacity: 0 !important;
}

.v-ripple__container {
  opacity: 0 !important;
}

.v-input .v-label {
  font-size: 1.2em;
}

.v-input {
  font-size: 1.2em;
}

.v-input input {
  font-size: 1.2em;
}
</style>
