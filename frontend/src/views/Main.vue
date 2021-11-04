<template>
  <v-container fluid fill-height fill-width align="center" justify="center">
    <v-row>
      <v-col align="center" justify="center">
        <span style="font-size: 2em">
          Create a NUSH.link!
        </span>
        <v-form
          ref="form"
          v-model="valid"
          style="padding-bottom:30px"
          lazy-validation>
          <v-row
            align="center"
            justify="center"
            class="ma-4"
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
                @input="resetState"
                required>
              </v-text-field>
              <v-spacer/>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <h3>Customized URL</h3>
              <v-tooltip
                v-model="copied"
                right
              >
                <!-- eslint-disable-next-line vue/no-unused-vars-->
                <template v-slot:activator="{on}">
                  <v-text-field
                    :disabled="!user"
                    x-large
                    v-model="url_new"
                    placeholder="New URL"
                    prefix="nush.link/"
                    :rules="[rules.new]"
                    @input="resetState"
                    @change="checkAvailability"
                    append-outer-icon="mdi-content-copy"
                    @click:append-outer="copyLink"
                    :error="url_new_error.length > 0"
                    :error-messages="url_new_error"
                    required>
                  </v-text-field>
                </template>
                Copied!
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row
            align="center"
            justify="center"
            class="ma-12"
          >
            <!--  Redirect user to sign in if they are not signed in -->
            <v-btn
              v-if="!user"
              :disabled="!valid"
              color="primary"
              x-large
              @click="signIn">
              Sign in to create link
            </v-btn>
            <!--  Users can only create links when signed in -->
            <v-btn
              v-else-if="!success"
              :disabled="!valid"
              color="primary"
              x-large
              @click="create">
              Create
            </v-btn>
            <!-- Success -->
            <v-btn v-else-if="success"
                   color="success"
                   x-large>
              Link created!
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
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
          if (input.trim().toLowerCase().match(/^[a-z0-9_-]+$/) !== null) {
            return true;
          }
          this.$data.url_new_error = "";
          return "Invalid Alias for the New URL";
        }
      },
      valid: true,
      url_original: "",
      url_new: "",
      success: false,

      copied: false,
      copyTimer: -1,

      url_new_error: ""
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
      fetch(`/api/create`, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
          alias: this.url_new,
          original: this.url_original
        })
      }).then(response => response.json()).then((data) => {
        if (data.success) {
          this.success = true;
        } else if (typeof data.message !== "undefined") {
          console.log(data.message);
        }
      });
    },
    checkAvailability() {
      fetch(`/api/create/check`, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
          alias: this.url_new,
        })
      }).then(response => response.json()).then((data) => {
        if (data.success) {
          if (data.result) {
            this.url_new_error = "This alias has already been taken.";
            return;
          }
        } else if (typeof data.message !== "undefined") {
          // Regex handled client side
          if (data.message.includes("this must match")) {
            return;
          }
          this.url_new_error = "Invalid alias";
        }
        this.url_new_error = "";
      });
    },
    resetState() {
      this.copied = false;
      this.success = false;
    },
    copyLink() {
      navigator.clipboard.writeText("https://nush.link/" + this.url_new).then(() => {
        this.copied = true;
        if (this.copyTimer != -1) {
          clearTimeout(this.copyTimer);
        }
        this.copyTimer = setTimeout(() => {
          this.copied = false;
        }, 750);
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
