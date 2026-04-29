<template>
    <v-app>
        <!--    Regular page -->
        <transition name="fade">
            <v-app-bar app dense fixed color="primary" dark v-if="route.path !== '/'">
                <v-icon
                  class="mr-4"
                  v-if="route.path !== '/'"
                  @click="$router.push('/')"
                >
                  mdi-arrow-left
                </v-icon>
                <v-toolbar-title>
                    {{ route.name }}
                </v-toolbar-title>
            </v-app-bar>

            <!--    Show full page image on front page-->
            <v-app-bar v-else app dense fixed dark shrink-on-scroll prominent fade-img-on-scroll :height="height" :src="img" alt class="icon" :key="img" :class="imgIsLoaded ? 'show,display' : 'display'" loading="lazy" @load="imgLoadedMethod">
                <v-container fill-width :fill-height="!hideSubtitle" fluid>
                    <v-row align="center" justify="center">
                        <v-col :align="(hideSubtitle) ? 'left' : 'center'" justify="center">
                            <v-toolbar-title class="text-wrap" :style="{padding: 0, color: 'white', 'font-weight':500}">
                                <span :style="{'font-size':Math.max((width < 333?0.75:1)*font,1)+'em'}">{{route.name}}</span>
                                <span v-if="!hideSubtitle" class="text-wrap" :style="{'font-size':Math.min(1,font)+'em'}">
                                    <br>
                                    An AppVenture Project
                                </span>
                            </v-toolbar-title>
                            <a v-if="!hideSubtitle" href="#" v-scroll-to="'#intro'" class="back-to-top"><v-icon>mdi-arrow-down</v-icon></a>
                        </v-col>
                    </v-row>
                </v-container>
            </v-app-bar>
        </transition>

        <!--    Accommodate picture on main page-->
        <div :style="route.path === '/' ? {'margin-top': height + 'px', minHeight: height+'px'} : {'margin-top':  '60px', minHeight: height+'px'}">
            <router-view />
        </div>
        <v-footer :padless="true">
            <v-card dark flat tile width="100%" class="text-center lighten-1">
                <v-card-text>
                    <v-btn class="mx-4" icon href="https://nush.app/" target="_blank" v-ripple="false">
                        <img src="/sprites/appventure-logo.svg" height="40px" />
                    </v-btn>
                    <v-btn class="mx-4" icon href="https://www.nushigh.edu.sg/" target="_blank" v-ripple="false">
                        <img src="/sprites/nushigh_logo.svg" height="40px" />
                    </v-btn>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text class="white--text">
                    Developed by David Goh Zhe Kai, James Chin Jia Jun, Lam Jun Rong, Oliver Su Zhengchong,
                    Kai Wen Khoo, Prannaya Gupta, Devon Lim and Raghav Kumar
                </v-card-text>
            </v-card>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import {
  getUserData,
  TimeoutError
} from "./api/me";

export default Vue.extend({
  name: "App",
  components: {},
  data: () => ({
    drawerShown: false,
    font: window.innerWidth < 1000 ? 3 * 0.75 : 3,
    hideSubtitle: false,
    img: "/sprites/ecogarden.webp",
    interval: 0,
    imgIsLoaded: false,
    imgList: [
      "ecogarden.webp", "DE.webp", "nushdiscover.webp", "frontview.webp", "nushconvo.webp",
      "Lib.webp", "nushbig.webp", "2019Year1s.webp", "school-bg.png", "nush-generic.webp",
      "nushpeople.webp", "boarding.webp", "boarding-day.webp", "concourse.webp","bio.webp",
      ...([1, 3].map(n => `yuen${n}.webp`))
    ].map(name => `/sprites/${name}`)
  }),
  computed: {
    route() {
      return this.$route;
    },
    user() {
      return this.$store.state.user;
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
    
    // Handle token recovery from backup domain redirect
    this.handleTokenFromQuery();
    
    getUserData().then(data => {
      this.$store.commit("user", data);
      if (data === null && this.shouldFallbackToBackup()) {
        this.fallbackToBackupDomain();
      }
    }).catch((error) => {
      if (error instanceof TimeoutError || this.shouldFallbackToBackup()) {
        this.fallbackToBackupDomain();
      }
    });
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    shouldFallbackToBackup() {
      const host = window.location.hostname.toLowerCase();
      const onPrimaryDomain = host === "nush.link" || host === "www.nush.link";
      return onPrimaryDomain && !!this.getCookie("token");
    },
    handleTokenFromQuery() {
      // Check if token is passed as query parameter (from backup domain redirect)
      const urlParams = new URLSearchParams(window.location.search);
      const tokenParam = urlParams.get("token");
      
      if (tokenParam) {
        // Set the token as a cookie with the same settings as the server
        document.cookie = `token=${encodeURIComponent(tokenParam)}; path=/; SameSite=Lax; max-age=${30 * 24 * 60 * 60}`;
        
        // Remove token from query parameters for cleanliness
        urlParams.delete("token");
        const newUrl = window.location.pathname + (urlParams.toString() ? "?" + urlParams.toString() : "");
        window.history.replaceState({}, document.title, newUrl);
      }
    },
    fallbackToBackupDomain() {
      if (!this.shouldFallbackToBackup()) {
        return;
      }

      // Get the token cookie value
      const token = this.getCookie("token");
      const backupDomain = "backup.nush.link";
      
      if (token) {
        // Redirect to backup domain with token as query parameter
        // The backup domain can read this and set it as a cookie
        window.location.href = `https://${backupDomain}?token=${encodeURIComponent(token)}`;
      } else {
        // If no token found, just redirect to backup domain
        window.location.href = `https://${backupDomain}`;
      }
    },
    getCookie(name: string): string | null {
      const nameEQ = name + "=";
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(nameEQ) === 0) {
          return decodeURIComponent(cookie.substring(nameEQ.length));
        }
      }
      return null;
    },
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
    imgLoadedMethod() {
      this.imgIsLoaded = true;
    },
  }
});
</script>
<style scoped>
    img.display {
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

    .v-btn:before {
        opacity: 0 !important;
    }

    .v-ripple__container {
        opacity: 0 !important;
    }

    .back-to-top {
        position: fixed;
        right: 15px;
        bottom: 15px;
        z-index: 996;
        /* background: #0078ff; */
        background: #00a8a9;
        width: 40px;
        height: 40px;
        border-radius: 50px;
        /* transition: all 0.4s; */
        align-items: center!important;
        justify-content: center!important;
        display: flex!important;
        box-sizing: border-box;
        text-decoration: none;
    }
</style>
