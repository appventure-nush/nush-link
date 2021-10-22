<template>
  <v-container fluid style="height: 100vh">
    <v-card>
      <v-card-title>
        Your profile
        <v-spacer/>
      </v-card-title>

      <v-form
        ref="form"
        v-model="valid"
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
        <h3>Enter Original URL:</h3>
        <v-text-field
            v-model="url_original"
            label="Original URL"
            :rules="original_url_rules"
            required>
        </v-text-field>
        <v-spacer />
      </v-col>
      <v-col
        cols="12"
        sm="4"
        align="center"
      >
        <h3>Enter Customized URL:</h3>
        <v-row no-gutters align="center">
          <v-col cols="12" sm="3" margin-bottom="20px">
        https://nush.link/
          </v-col>
          <v-col cols="12" sm="9">
        <v-text-field
            v-model="url_new"
            label="New URL"
            :rules="new_url_rules"
            required>
        </v-text-field>
        </v-col>
        </v-row>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4">
          Create
        </v-btn>
      </v-col>
    </v-row>
      </v-form>
                        <!-- <h2>Enter Original URL:</h2>
                        <TextField id="standard-basic"
                        label="Original URL"
                        inputProps={{style: {fontSize: '2em'}}}
                        InputLabelProps={{style: {fontSize: '2em'}}}
                        onChange={getOriLink}
                        error={errorVisibility}
                        helperText={errorMsg}
                        /> -->

    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Main",
  data: function () {
    return {
      original_url_rules: [(value: any) => {
        if(value === undefined || value === "") return true;
        if(value.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/gi) === null && value.match(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i) === null) return "URL is not valid";
        try { let url; url = new URL(value); return (url.protocol === "http:" || url.protocol === "https:")|| "URL is not valid"; } catch (_) { return "URL is not valid"; }
      }],
      new_url_rules: [(input: any) => {
        if(input === undefined || input === "") return true;
        let value = `https://nush.link/${input}`;
        try { let url; url = new URL(value); return (url.protocol === "http:" || url.protocol === "https:")|| "URL is not valid"; } catch (_) { return "URL is not valid"; }
      }],
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
    isURL: function(str: string) {
      let url;

      try {
        url = new URL(str);
      } catch (_) {
        return false;
      }

      return url.protocol === "http:" || url.protocol === "https:";
    },
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
</style>