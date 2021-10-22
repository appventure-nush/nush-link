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
            x-large
            v-model="url_original"
            placeholder="Original URL"
            :rules="[rules.original]"
            required>
        </v-text-field>
        <v-spacer />
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
        <v-btn
          :disabled="!valid"
          color="primary"
          x-large
          @click="create">
          Create
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
        original: (value: string|undefined) => {
        if(value === undefined || value === "") return true;
        //if(value.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/gi) === null && value.match(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i) === null) return "URL is not valid";
        try { let url; url = new URL(value); return (url.protocol === "http:" || url.protocol === "https:")|| "URL is not valid"; } catch (_) { return "URL is not valid"; }
      },
      new: (input: string|undefined) => {
        if(input === undefined || input === "") return true;
        return input.trim().toLowerCase().match(/^[a-z0-9_-]+$/) !== null || "Invalid Alias for the New URL";
        // let value = `https://nush.link/${input}`;
        //try { let url; url = new URL(value); return (url.protocol === "http:" || url.protocol === "https:")|| "URL is not valid"; } catch (_) { return "URL is not valid"; }
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
  },
  methods: {
    create() {
      fetch(`http://localhost:5000/create?alias=${this.url_new}&original=${this.url_original}`, {method: "POST", headers: {"Content-type": "application/json; charset=UTF-8"}}).then(response => response.json()).then((data) => { if (data.success) console.log("Success!"); else if (typeof data.message !== "undefined") console.log(data.message); });
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