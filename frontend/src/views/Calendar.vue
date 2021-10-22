<template>
  <v-container fluid style="height: 102vh">
    <v-card>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="700">
        <v-calendar
          v-model="focus"
          ref="calendar"
          color="primary"
          :type="type"
          @click:event="showEvent"
          :events="events"
        >
          <template v-slot:day-body="{ date, week }">
            <div
              class="v-current-time"
              :class="{ first: date === week[0].date }"
              :style="{ top: nowY }"
            ></div>
          </template>

        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text
              class="popover">
              <v-card-title :color="selectedEvent.color">
              <h1>
                <span v-text="colorsToNames[selectedEvent.color]"></span>
              </h1>
              </v-card-title>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
            </v-card-text>

          </v-card>
        </v-menu>
      </v-sheet>
    </v-card>
  </v-container>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "Calendar",
  data: function () {
    return {
      focus: "",
      name: "",
      mainOut: "",
      country: "Singapore",
      darkTheme: this.$vuetify.theme.dark,
      events: [
        {
          name: "December Holidays",
          start: "2021-11-20",
          end: "2022-01-02",
          color: "orange",
          details: "The last term break of the year!"
        },
      ],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      value: "",
      ready: false,
      type: "month",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day",
        "5day": "5 Days",
      },
      colors: ["blue", "deep-purple", "cyan", "green", "orange", "grey darken-1"],
      names: ["Academic Events", "Celebrations", "Exams", "Alternative Programs", "Holidays", "HBL"],
      colorsToNames: {}
    };
  },
  computed: {
    cal () {
      return this.ready ? this.$refs.calendar : null;
    },
    nowY () {
      return this.cal ? this.cal.timeToY(this.cal.times.now) + "px" : "-10px";
    },
  },
  mounted: function () {
    this.ready = true;
    this.cal.scrollToTime();
    this.updateTime();
    let i = 0;
    for(i in this.colors) {
      this.colorsToNames[this.colors[i]] = this.names[i];
    }
  },
  methods: {
    setToday () {
      this.focus = "";
    },
    prev () {
      this.cal.prev();
    },
    next () {
      this.cal.next();
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true));
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    getCurrentTime () {
      return this.cal ? this.cal.times.now.hour * 60 + this.cal.times.now.minute : 0;
    },
    scrollToTime () {
      const time = this.getCurrentTime();
      const first = Math.max(0, time - (time % 30) - 30);
      this.cal.scrollToTime(first);
    },
    updateTime () {
      setInterval(() => this.cal.updateTimes(), 60 * 1000);
    },
  }
});
</script>

<style lang="scss">
.v-current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;
  &.first::before {
    content: '';
    position: absolute;
    background-color: #ea4335;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
}
.popover {
  padding: 1rem;
}
</style>