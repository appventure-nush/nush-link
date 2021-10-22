<template>
  <v-container fluid style="height: 70vh">
    <template>
    <v-card class="card">
      <v-menu
      v-model="menu"
      nudge-right="20"
      :close-on-content-click="false"
      offset-x>
        <template v-slot:activator="{ on, attrs }">
          <v-img class="center profile-img" max-width="200px" :src="src"
                 v-bind="attrs"
                 v-on="on"
          ></v-img>
        </template>
        <v-card width="400px" class="popover">
          <v-list>
            <v-text-field
              label="Image link"
              placeholder="Replace profile picture"
            v-model="imageLink">
            </v-text-field>
            <p>You can use <a>catbox.moe</a></p>
            <v-btn
                v-on:click="updatePfp">
              Update
            </v-btn>
          </v-list>
        </v-card>
      </v-menu>
        <h3> Name: </h3> <p>{{ user.name }}</p>
        <h3> Class: </h3> <p>{{ user.class }}</p>
    </v-card>
    </template>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data()  {
    return {
      user: {},
      menu: false,
      imageLink: "",
      src: "@/../public/assets/logo.png",
      admin: true,
    };
  },
  methods : {
    getUser() {
      return fetch("/api/student").then(res => res.json()).then(res => {
        if(res.length > 1){
          return "admin";
        }
        this.admin = false;
        return res[0];
      });
    },
    updatePfp() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fetch(`/api/student/${this.user._id}`,{
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profilePicture: this.imageLink,
          })
        });
    }
  },
  async mounted() {
    this.user = await this.getUser();
    console.log(this.user);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if(this.user.profilePicture) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.src = this.user.profilePicture;
      this.menu=false;
    }
  }
});
</script>

<style scoped lang="scss">
.profile-img {
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}
.card {
  padding: 2rem;
}
.popover {
  padding: 2rem;
}
</style>