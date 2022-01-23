<template>
  <v-container fluid fill-height fill-width align="center" justify="center" id="intro">
    <v-row>
      <v-col align="center" justify="center">
        <span v-if="user && !isTeacher(user.email)">
          <span style="font-size: 2em"> NUSH.link is in beta!</span><br>
          Creating a NUSH.link is currently limited to teachers and staff with a @nus.edu.sg email address.<br>
          Check back soon!
        </span>
        <span v-else>
          <span v-if="user" style="font-size: 2em">
          Create a NUSH.link!
          </span>
          <span v-else style="font-size: 2em">
            Sign in to create a NUSH.link!
          </span><br>
          All NUSH.links are connected to a NUS High email account to prevent abuse.<br><br>
          Need help? Check out the <a href="https://github.com/appventure-nush/nush-link/wiki"
                                      target="_blank">wiki</a>!
        </span>
        <v-form
          v-if="user && isTeacher(user.email)"
          ref="form"
          v-model="valid"
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
                x-large
                v-model="url_new"
                placeholder="New URL"
                prefix="nush.link/"
                :rules="[rules.new]"
                @input="checkAvailability"
                :error="url_new_error.length > 0"
                :error-messages="url_new_error"
                :loading="checked_alias.length === 0 && url_new.length > 0 && !url_new_error.length"
                :append-icon="checked_alias === url_new && url_new.length > 0 ? 'mdi-check' : ''"
                required>
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-row
          align="center"
          justify="center"
          class="my-6"
        >
          <!--  Redirect user to sign in if they are not signed in -->
          <v-btn
            v-if="!user"
            :disabled="!valid"
            color="primary"
            x-large
            @click="signIn">
            Sign in
          </v-btn>
          <!--  Users can only create links when signed in -->
          <!-- Make the dialog persistent to prevent accidental closure -->
          <v-dialog
            v-if="user && isTeacher(user.email)"
            v-model="dialog"
            width="600px"
            height="500"
            persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                x-large
                :disabled="!valid || !url_new || url_original.length === 0 || checked_alias !== url_new.trim()"
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="create"
              >
                Create
              </v-btn>
            </template>
            <create-link-popup
              :alias="url_new"
              :original="url_original"
              :success="success"
              :error="dialog_error"
              @close="resetForm"
            />
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="user">
      <v-divider/>
    </v-row>
    <v-row
      v-if="user">
      <v-col align="center" justify="center">
        <span style="font-size: 2em">Already created a NUSH.link?</span><br>
        <v-btn
          @click="$router.push('/links')"
          class="ma-4"
          color="primary"
          x-large>
          View your links
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import CreateLinkPopup from "@/components/CreateLinkPopup.vue";

export default Vue.extend({
  name: "Main",
  components: {
    CreateLinkPopup
  },
  data: function () {
    return {
      rules: {
        original: (value: string | undefined) => {
          if (value === undefined || value === "") return true;
          if (value.trim().toLowerCase().match(/^(https?:\/\/)?[a-z0-9-]+\.\w+\/?/)) {
            return true;
          }
          return "Invalid URL";
        },
        new: (input: string | undefined) => {
          if (input === undefined || input === "") return true;
          if (input.trim().toLowerCase().match(/^[a-z0-9_-]+$/) !== null) {
            return true;
          }
          return "Invalid Alias for the New URL";
        }
      },
      valid: true,
      url_original: "",
      url_new: "",
      url_new_error: "",
      checked_alias: "",
      success: false,

      dialog: false,
      dialog_error: "",
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
      this.success = false;
      fetch(`/api/create`, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
          alias: this.url_new.trim(),
          original: this.url_original.trim()
        })
      }).then(response => response.json()).then((data) => {
        if (data.success) {
          this.success = true;
        } else if (typeof data.message !== "undefined") {
          this.dialog_error = data.message;
        }
      });
    },
    checkAvailability() {
      this.checked_alias = "";
      this.url_new_error = "";
      const alias = this.url_new.trim();
      fetch(`/api/create/check`, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
          alias,
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
        this.checked_alias = alias;
        this.url_new_error = "";
      });
    },
    resetState() {
      this.success = false;
      this.dialog = false;
      this.url_new_error = "";
      this.dialog_error = "";
    },
    resetForm() {
      this.url_new = "";
      this.url_original = "";
      this.resetState();
    },
    signIn() {
      location.href = `https://login.microsoftonline.com/d72a7172-d5f8-4889-9a85-d7424751592a/oauth2/authorize?` +
        `client_id=2f4b388c-143a-42b2-b69c-ff8531d58cda&` +
        `redirect_uri=${location.origin}/api/auth/login&` +
        `response_type=id_token&nonce=nush-link&response_mode=form_post`;
    },

    isTeacher(email: string) {
      const allowed = ["anhstjyl", "anhsevxm", "anhs.chm", "anhsloh", "anhsczm", "anhsipoh", "shawnteo", "anhsaksy", "appventure", "nhs"];
      if (!email.endsWith("@nushigh.edu.sg")) return false;
      for (const allowedEmail of allowed) {
        if (email.startsWith(allowedEmail)) return true;
      }
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
