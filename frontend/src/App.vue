<template>
  <v-app>
    <v-navigation-drawer
      v-if="user != null"
      v-model="drawerShown"
      temporary app>

      <v-list-item>
        <v-list-item-content>
          <v-icon size="100">mdi-account</v-icon>
          <v-list-item-title>
            Welcome, {{ user.name }}!
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list
        dense
        nav>
        <router-link v-for="item in routes"
                     :to="item.route"
                     @click="drawerShown = false"
                     style="text-decoration: none; color: inherit;"
                     :key="item.name">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider/>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <!--    Regular page -->
    <transition name="fade">
    <v-app-bar
      app
      color="primary"
      dark
      v-if="route.path !== '/'"
    >
      <v-app-bar-nav-icon v-if="user != null"
                          @click="drawerShown = !drawerShown"/>
      <v-toolbar-title>
        {{ route.name }}
      </v-toolbar-title>
    </v-app-bar>
    <!--    Show full page image on front page-->

    <v-app-bar
      v-else
      app
      dark
      shrink-on-scroll
      prominent
      fade-img-on-scroll
      :src="this.img"  alt class="icon"
        :key="this.img"
      :height="height"
    :class="imgIsLoaded ? 'show' : ''"
    loading="lazy"
    @load="imgLoadedMethod"
    >
      <v-app-bar-nav-icon v-if="user != null"
                          @click="drawerShown = !drawerShown"/>
      <v-container fill-width
                   :fill-height="!this.hideSubtitle"
                   fluid>
        <v-row align="center"
               justify="center">
          <v-col :align="(width < 1000 || this.hideSubtitle) ? 'left' : 'center'"
                 justify="center">
            <v-toolbar-title class="text-wrap"
                             :style="{padding: 0, color: 'white', 'font-weight':500}">
              <span :style="{'font-size':this.font+'em'}">{{
                  route.name
                }}</span>
              <span v-if="!this.hideSubtitle"
                    class="text-wrap"
                    :style="{'font-size':Math.min(1,this.font)+'em'}">
                <br>
                An AppVenture Project
              </span>
            </v-toolbar-title>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    </transition>

    <!--    Accommodate picture on main page-->
    <div :style="route.path === '/' ? {'margin-top': height + 'px'} : ''">
      <router-view/>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  components: {},
  data: () => ({
    drawerShown: false,
    user: {
      // TODO: Fetch user from backend API / decode frontend JWT
      name: "John",
    },
    font: window.innerWidth < 1000 ? 3 * 0.75 : 3,
    hideSubtitle: false,
    img: "",
    interval: 0,
    imgIsLoaded: false,
    imgList: ["ecogarden.jpg", "nushclose.jpg", "nushdiscover.jpg", "frontview.jpg", "nushconvo.jpg", "nushlibrary.jpg", "nushbig.jpg", "elig.jpg", "school-bg.png", "nush-generic.jpeg", "nushpeople.jpg", "boarding.jpg", "boarding-day.jpg", "concourse.jpg"].concat([1, 2, 3, 4, 5].map(function(n) { return `yuen${n}.jpg`})).map(function(name) { return `/sprites/${name}`; })
  }),
  computed: {
    routes(): Array<{
      name: string;
      route: string;
      icon: string;
    }> {
      // Add routes here to correspond to router.ts
      return [
        {
          name: "Dashboard",
          route: "/",
          icon: "mdi-file-table-box",
        },
      ];
    },
    route() {
      return this.$route;
    },
    height() {
      return window.innerHeight;
    },
    width() {
      return window.innerWidth;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    this.interval = setInterval(this.setImage, 20000);
    this.img = this.imgList[Math.floor(Math.random() * this.imgList.length)];
    console.log(this.img);
  },
  beforeDestroy () {
    clearInterval(this.interval);
},
  methods: {
    onScroll() {
      if (window.scrollY > this.height * 0.8) {
        this.font = 1;
        this.hideSubtitle = true;
      } else {
        this.font = 3;
        this.hideSubtitle = false;
      }
      if (this.width < 1000) {
        this.font *= 0.75;
      }
    },
    setImage() {
      this.img = this.imgList[Math.floor(Math.random() * this.imgList.length)];
    },
    imgLoadedMethod () {
      this.imgIsLoaded = true;
    }
  }
});
</script>
<style scoped>
img {
  opacity: 0;
  transition: 3s;
}

img.show {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity 1s ease-in-out;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter {
  opacity: 0;
}
</style>
