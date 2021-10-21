<template>
  <v-container fluid style="margin-top: 60px">
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
          "name": "Hari Raya Haji",
          "start": "2021-07-20",
          "details": "<p><strong>20<sup>th</sup> Jul 2021</strong></p>\n",
          color: "orange"
        },
        {
          "name": "AAP III",
          "start": "2021-08-02 15:00",
          "end": "2021-08-02 16:00",
          "details": "<p><strong>2<sup>nd</sup> Aug 2021</strong></p>\n<p><strong>1500</strong> - <strong>1600</strong></p>\n",
          color: "green"
        },
        {
          "name": "Research Congress",
          "start": "2021-02-24 07:40",
          "end": "2021-02-24 12:30",
          "details": "<p><strong>24<sup>th</sup> Feb 2021</strong></p>\n<p><strong>0740</strong> - <strong>1230</strong></p>\n<p>Students from Year 5 and 6, and selected students from Year 3 and 4, will be involved in the NUS High School Research Congress on 24 February.</p>\n<p>Students are to arrive in school by 7.40 am, and the poster session is expected to commence from 9.25 am onwards, after the morning keynote guest lecture by Dr Lim Khiang Wee, Executive Director, CREATE, National Research Foundation, Prime Minister&#39;s Office. The keynote lecture will be about the research ongoing at CREATE (Campus for Research Excellence and Technological Enterprise).</p>\n<p>The following is the schedule for the Research Congress:</p>\n<table>\n<thead>\n<tr>\n<th>Time</th>\n<th>Event</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>0740 hrs</td>\n<td>Students arrive in school, proceed to mentor classrooms</td>\n</tr>\n<tr>\n<td>0810 hrs</td>\n<td>Welcome Address by Ms Soh Lai Leng, Principal of NUS High School</td>\n</tr>\n<tr>\n<td>0820 hrs</td>\n<td>Keynote Lecture by Dr Lim Khiang Wee, Executive Director, CREATE, National Research Foundation, Prime Minister&#39;s Office about the research ongoing at CREATE (Campus for Research Excellence and Technological Enterprise).</td>\n</tr>\n<tr>\n<td>0850 hrs</td>\n<td>Oral Presentation by selected by NUS High School students (4 projects, about 8 mins/proj)</td>\n</tr>\n<tr>\n<td>0925 hrs</td>\n<td>Start of poster sessions at the 8 venues</td>\n</tr>\n<tr>\n<td>1030 hrs</td>\n<td>Start of grading at the 8 venues</td>\n</tr>\n</tbody>\n</table>\n<p>There will be a total of 370+ students at the Research Congress:</p>\n<ul>\n<li>Year 6: 172</li>\n<li>Year 5: 174</li>\n<li>Year 3 - 4: 20+</li>\n</ul>\n<p>About 220 students will be presenting at the poster sessions, amounting to a total of ~ 120 posters. 150 students will be audience members.</p>\n<p>Students will be distributed across 8 venues as part of Safe Management Measures. The following are these venues:</p>\n<ul>\n<li>Hall - 2 venues</li>\n<li>Indoor Sports Hall - 2 venues</li>\n<li>Library - 2 venues (Electron and Event Horizon)</li>\n<li>Concourse - 2 venues</li>\n</ul>\n<p>These venues will be partitioned by chairs. At each venue, a maximum of 50 people can be present at a time, consisting of about 30 presenters and 20 audience members. One poster can have 1-3 presenters, and at any one time, up to 8 students, including presenters, are allowed to gather at one panel of 2 posters to view posters. These panels will be 4m apart.</p>\n<p>However, in the concourse, panels will be shaped in an X-shape for a maximum of 8 posters. In each quadrant of this X-shape, 8 students, including presenters, are allowed to gather.</p>\n",
          color: "blue"
        },
        {
          "name": "W@W Festival",
          "start": "2021-02-24 13:30",
          "end": "2021-02-24 18:00",
          "details": "<p><strong>24<sup>th</sup> Feb 2021</strong></p>\n<p><strong>1330</strong> - <strong>1800</strong></p>\n<p>Students from Year 1 to 4 will be involved in the Wonderment@Work (W@W) Learning Festival. The project grading during this festival will commence from 1.30 pm onwards. Students should should have their lunch before reporting to school for this event.</p>",
          color: "blue"
        },
        {
          name: "March Holidays",
          start: "2021-03-13",
          end: "2021-03-21",
          details: "First Term Break of the Year! How's about that?",
          color: "orange"
        },
        {
          "name": "National Day Celebration",
          "start": "2021-08-06 08:00",
          "end": "2021-08-06 12:00",
          "details": "Celebrations start from 10.30 am.",
          color: "deep-purple"
        },
        {
          "name": "National Day Holidays",
          "start": "2021-08-09",
          "end": "2021-08-10",
          "details": "National Day Holidays to mug for exams after the holidays.",
          color: "orange"
        },
        {
          "name": "HBL Day",
          "start": "2021-08-16",
          "details": "Day 1 of HBL in the HBL Week",
          color: "grey darken-1"
        },
        {
          "name": "HBL Day",
          "start": "2021-08-20",
          "details": "Day 2 of HBL in the HBL Week",
          color: "grey darken-1"
        },
        {
          "name": "SDYC 2021",
          "start": "2021-08-20",
          "end": "2021-08-21",
          "details": "<p><ul></p>\n<p><li><strong>20<sup>th</sup> Aug 2021</strong></li></p>\n<p><li><strong>21<sup>st</sup> Aug 2021</strong></li>\n</ul></p>\n<p>\nThe Sustainable Development Youth Conference or SDYC, is a branch of our school&#39;s humanities interest group. SDYC began in 2015 as a means for NUSH students to engage with humanities and politics and reflects our students&#39; passion in advocating sustainable development through critical analysis and sustainable methods. Organized by youths, for youths, participants engage themselves in a 3-day Model United Nations conference and enjoy the academic rigour of the discussions held. SDYC is open to all secondary and high school students across Singapore, allowing friendships and strong inter-school bonds to be formed.</p>\n",
          color: "green"
        },
        {
          "name": "StAR Day Celebration",
          "start": "2021-09-02 08:00",
          "end": "2021-09-02 12:00",
          "details": "",
          color: "deep-purple"
        },
        {
          "name": "Teacher's Day Holiday",
          "start": "2021-09-03",
          "details": "",
          color: "orange"
        },
        {
          name: "September Holidays",
          start: "2021-09-04",
          end: "2021-09-12",
          details: "Third Term Break of the Year! How's about that?",
          color: "orange"
        },
        {
          name: "Y4 School Leaders' Dialogue",
          start: "2021-08-04 13:00",
          end: "2021-08-04 14:00",
          details: "I'm sorry I only know of this one",
          color: "green"
        },
        {
          name: "2021 University Modules Talk",
          start: "2021-08-04 14:00",
          end: "2021-08-04 14:20",
          details: "Meet with Mr Ng on Teams, given you are taking University Modules in 2021.",
          color: "blue"
        },
        {
          name: "HMT O Level Oral Examination",
          start: "2021-08-11",
          end: "2021-08-13",
          details: "Good Luck with that.",
          color: "blue"
        },
        {
          name: "HMT O Level Oral Examination",
          start: "2021-08-16",
          end: "2021-08-17",
          details: "Good Luck with that.",
          color: "blue"
        },
        {
          name: "CA Period",
          start: "2021-08-11 08:00",
          end: "2021-08-11 15:00",
          details: "<p><strong>11<sup>th</sup> Aug 2021</strong></p>\n<p><strong>0800</strong> - <strong>1500</strong></p>\n<table>\n<thead>\n<tr>\n<th>Year</th>\n<th>Time</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Y1,Y2</td>\n<td>8am to 10am</td>\n</tr>\n<tr>\n<td>Y3,Y4</td>\n<td>10am to 1pm</td>\n</tr>\n<tr>\n<td>Y5,Y6</td>\n<td>12pm to 3pm</td>\n</tr>\n</tbody>\n</table>\n",
          color: "blue"
        },
        {
          name: "Y4 CA Period",
          start: "2021-08-25 14:00",
          end: "2021-08-25 16:00",
          color: "blue",
          details: "<p><strong>25<sup>th</sup> Aug 2021</strong></p>\n<p><strong>1400</strong> - <strong>1800</strong></p>\n<table>\n<thead>\n<tr>\n<th>Year</th>\n<th>Time</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Y4</td>\n<td>2pm to 6pm</td>\n</tr>\n</tbody>\n</table>\n"
        },
        {
          name: "CA Period",
          start: "2021-08-26 08:00",
          end: "2021-08-26 16:00",
          color: "blue",
          details: "<p><strong>26<sup>th</sup> Aug 2021</strong></p>\n<p><strong>0800</strong> - <strong>1600</strong></p>\n<table>\n<thead>\n<tr>\n<th>Year</th>\n<th>Time</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Y1,Y5,Y6</td>\n<td>11.30am to 4pm</td>\n</tr>\n<tr>\n<td>Y2,Y3</td>\n<td>8am to 12pm</td>\n</tr>\n</tbody>\n</table>\n"
        },
        {
          name: "Y2-4 CA Period",
          start: "2021-08-31 12:00",
          end: "2021-08-31 16:00",
          color: "blue",
          details: "<p><strong>31<sup>st</sup> Aug 2021</strong></p>\n<p><strong>1200 - 1600</strong></p>\n<table>\n<thead>\n<tr>\n<th>Year</th>\n<th>Time</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Y2-Y4</td>\n<td>12pm to 4pm</td>\n</tr>\n</tbody>\n</table>\n"
        },
        {
          name: "Y5-6 CA Period",
          start: "2021-08-31 08:00",
          end: "2021-08-31 09:30",
          color: "blue",
          details: "<p><strong>31<sup>st</sup> Aug 2021</strong></p>\n<p><strong>0800 - 0930</strong></p>\n<table>\n<thead>\n<tr>\n<th>Year</th>\n<th>Time</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Y5,Y6</td>\n<td>8am to 9.30am</td>\n</tr>\n</tbody>\n</table>\n"
        },
        {
          name: "Colourfusion VI",
          start: "2021-09-17 19:00",
          end: "2021-09-17 21:00",
          color: "green",
          details: ""
        },
        {
          name: "NUSH HACK 2021",
          start: "2021-08-27 19:00",
          end: "2021-08-28 20:00",
          color: "blue",
          details: "A team-based competition with 1 to 3 participants per team, Hackathon 2021 will be held from 27 August 7.00 pm to 28 August 8.00 pm. The judges will decide on and release the theme of the competition during the administrative briefing at the start of the hackathon. An example of the theme is “software that alleviates the COVID-19 crisis”. Participants will have to create a software based on the theme and submit their source code, along with instructions to run them, by 28 August 4.00pm, together with a video and PowerPoint slides for judging. Hackathon teams will be allocated a presentation and online judging slot between 4pm to 7pm via Microsoft Teams. The final winners of NUSH HACK 2021 will be unveiled at the prize presentation in mid-September (T4W1)."
        },
        {
          name: "SMO Junior 2021",
          start: "2021-09-06 09:30",
          end: "2021-09-06 12:00",
          color: "blue",
          details: "<p><strong>2<sup>nd</sup> Jun 2021</strong></p>\n<p><strong>0900</strong> - <strong>1300</strong></p>\n<h2 id=\"objective\">Objective</h2>\n<p>The objective of the Singapore Mathematical Olympiad 2021 (SMO 2021) (Junior Section) (hereafter called the “Competition”) organized by the Singapore Mathematical Society (hereafter called “SMS”) is to test the ingenuity and mathematical problem-solving ability of the participants, and to discover and encourage mathematical talents in secondary schools in Singapore.</p>\n<h2 id=\"eligibility\">Eligibility</h2>\n<p>The Junior Round Competition is open to all full time Express Course students who were born on or after 2 January 2007 and full time Normal(Academic)/(Technical) Course students who were born on or after 2 January 2006, and who have never attended any tertiary level educational institution on a full time basis.</p>\n<h2 id=\"format\">Format</h2>\n<p>Round 1 of the Competition will be a two-and-a-half hour written paper consisting of multiple choice and short questions. All questions will carry equal weight. The language of the Competition will be English.</p>\n<h2 id=\"topics\">Topics</h2>\n<p>The topics covered by the questions would normally be within the curriculum of Secondary One and Two mathematics education for the Express Course (or equivalently up to Secondary Three Normal (Academic) Course). There will be a significant number of questions based on school mathematics syllabus.</p>\n"
        },
        {
          name: "SMO Senior 2021",
          start: "2021-09-06 09:30",
          end: "2021-09-06 12:00",
          color: "blue",
          details: "<p><strong>2<sup>nd</sup> Jun 2021</strong></p>\n<p><strong>0900</strong> - <strong>1300</strong></p>\n<h2 id=\"objective\">Objective</h2>\n<p>The objective of the Singapore Mathematical Olympiad 2021 (SMO 2021) (Senior Section) (hereafter called the “Competition”) organized by the Singapore Mathematical Society (hereafter called “SMS”) is to test the ingenuity and mathematical problem-solving ability of the participants, and to discover and encourage mathematical talents in secondary schools in Singapore.</p>\n<h2 id=\"eligibility\">Eligibility</h2>\n<p>The Competition is open to all full time Express Course students who were born on or after 2 January 2005 and full time Normal(Academic)/(Technical) Course students who were born on or after 2 January 2004, and who have never attended any tertiary level educational institution on a full time basis.</p>\n<h2 id=\"format\">Format</h2>\n<p>Round 1 of the Competition will be a two-and-a-half hour written paper consisting of multiple choice and short questions. All questions will carry equal weight. The language of the Competition will be English.</p>\n<h2 id=\"topics\">Topics</h2>\n<p>The topics covered by the questions would normally be within the curriculum of Secondary One and Two mathematics education for the Express Course (or equivalently up to Secondary Three Normal (Academic) Course). There will be a significant number of questions based on school mathematics syllabus.</p>\n"
        },
        {
          name: "SMO Open 2021",
          start: "2021-09-07 09:30",
          end: "2021-09-07 12:00",
          color: "blue",
          details: "<p><strong>3<sup>rd</sup> Jun 2021</strong></p>\n<p><strong>0900</strong> - <strong>1300</strong></p>\n<h2 id=\"objective\">Objective</h2>\n<p>The objective of the Singapore Mathematical Olympiad 2021 (SMO 2021) (Open Section) (hereafter called the “Competition”) organized by the Singapore Mathematical Society (hereafter called “SMS”) is to test the ingenuity and mathematical problem-solving ability of the participants, and to discover and encourage mathematical talents in secondary schools in Singapore.</p>\n<h2 id=\"eligibility\">Eligibility</h2>\n<p>The Competition is open to all full time students who have never attended any tertiary level educational institution on a full time basis.</p>\n<h2 id=\"format\">Format</h2>\n<p>Round 1 of the Competition will be a two-and-a-half hour written paper consisting of short questions. All questions will carry equal weight. The language of the Competition will be English.</p>\n<h2 id=\"topics\">Topics</h2>\n<p>The topics covered by the questions would normally be within the curriculum of a pre-university education. There will be significant number of questions based on school mathematics syllabus.</p>\n"
        },
        {
          name: "Y1-Y5 Reading Day",
          start: "2021-10-20",
          color: "blue",
        },
        {
          name: "'A' Level MT Yr End Exam",
          start: "2021-11-10",
          color: "cyan",
          details: "<p><strong>10<sup>th</sup> Nov 2021</strong></p>\n"
        },
        {
          name: "'O' Level MT Yr End Exam",
          start: "2021-11-10",
          color: "cyan",
          details: "<p><strong>10<sup>th</sup> Nov 2021</strong></p>\n"
        },
        {
          name: "Deepavali Holiday",
          start: "2021-11-04",
          color: "orange",
          details: "<p><strong>4<sup>th</sup> Nov 2021</strong></p>\n"
        },
        {
          name: "Deepavali Celebration",
          start: "2021-11-08",
          color: "deep-purple",
          details: "<p><strong>8<sup>th</sup> Nov 2021</strong></p>\n"
        },
        {
          name: "Research Development Experience Programme (RDEP) 1",
          start: "2021-11-18",
          end: "2021-11-29",
          color: "blue",
          details: "RDEP is a specially curated 8- day programme held at Science Centre Singapore. The aim of the programme is to enable students to gain hands-on experience in experimentation, design, prototyping and data-analysis. Students will work in small groups of 2-3 to complete a small-scale Science or Engineering project. Students will also have a chance to showcase their projects in our youth project showcase to be held on 18th March 2022."
        },
        {
          name: "Research Development Experience Programme (RDEP) 2",
          start: "2021-12-02",
          end: "2021-12-13",
          color: "blue",
          details: "RDEP is a specially curated 8- day programme held at Science Centre Singapore. The aim of the programme is to enable students to gain hands-on experience in experimentation, design, prototyping and data-analysis. Students will work in small groups of 2-3 to complete a small-scale Science or Engineering project. Students will also have a chance to showcase their projects in our youth project showcase to be held on 18th March 2022."
        },
        {
          name: "December Holidays",
          start: "2021-11-20",
          end: "2022-01-02",
          color: "orange",
          details: "The last term break of the year!"
        },
        {
          name: "Convocation 2021",
          start: "2021-11-17",
          color: "green",
          details: "Graduation for the Y6s!"
        },
        {
          name: "IRC-SET 2021",
          start: "2021-08-07",
          color: "blue",
          details: "International Researchers Club (IRC) was set up in Singapore in 2001 (www.irc.org.sg). As an established society, IRC’s vision is to create a vibrant and innovative research community for Singapore. IRC organizes the IRC Conference on Science, Engineering and Technology (IRC-SET), an annual event, to provide a platform for young and talented researchers to share fresh results, obtain comments, and exchange innovative ideas of leading-edge research in the multi-disciplinary areas. You are cordially invited to submit your recent research work to the IRC-SET conference. Students from universities, polytechnics and junior colleges are warmly welcome to present your research and projects in our academic environment. The IRC-SET Conference is free to IRC members."
        },
        {
          name: "Cyber Wellness Week",
          start: "2021-07-12",
          end: "2021-07-16",
          color: "green",
          details: "Cyber Wellness Week 2021 - T3W3"
        },
        {
          name: "Mr Clifton Koh's Address to Senior High",
          start: "2021-08-18 13:00",
          end: "2021-08-18 14:00",
          details: "Coming soon.",
          color: "green"
        },
        {
          name: "House Meet (B Div)",
          start: "2021-08-23 13:00",
          end: "2021-08-23 14:00",
          details: "SMM still applies.",
          color: "green"
        },
        {
          name: "Building BloCS 2021 June Conference",
          start: "2021-06-02",
          end: "2021-06-04",
          details: "BuildingBloCS’s annual flagship conference will be happening from 2nd to 4th June. The conference is held in tandem with CTE-STEM 2021 Conference. Hence, the theme for the conference is “Computational Thinking & AI Education”.\n\nOn the first two days of the conference, participants will be engaged in a series of activities ranging from keynote speeches by ex-computing students and industry professionals from Google, AI Singapore, etc. to workshops focusing on applications of AI. On the third day of the conference, BuildingBloCS is organising a AI Winpetition where students will form their own teams and be given various themes to choose from. The teams would then need to maximise their creative thinking and computational skills to come up with an innovative application of AI relating to the theme. Finally, various teams will be awarded titles, theme prizes and even some special awards!",
          color: "blue"
        },
        {
          name: "CodeCombat 2021",
          start: "2021-06-01",
          details: "CodeCombat is an educational video game for students to learn through type coding. Various programming concepts and languages are explored such as the fundamentals of computer science, JavaScript, Python, HTML and CoffeeScript. Overall, CodeCombat has 11 units - three game development units, two web development units, and six computer science units.\n\nHeld on 1st June, with a workshop on the 30th of May, the tournament will have several rounds as described below:",
          color: "blue"
        },
        {
          name: "AppVenture Workshop - Machine Learning with Neural Networks",
          start: "2021-06-07 14:00",
          end: "2021-06-07 16:00",
          color: "blue"
        },
        {
          name: "AppVenture Workshop - Scientific Computing using Python",
          start: "2021-05-31 14:00",
          end: "2021-05-31 16:00",
          color: "blue"
        },
        {
          name: "GYSTB 2021",
          start: "2021-06-19",
          end: "2021-06-20",
          color: "blue"
        },
        {
          name: "Math Seminar 2021",
          start: "2021-07-21 15:00",
          end: "2021-07-21 17:30",
          color: "blue"
        },
        {
          name: "CS1010S Placement Test",
          start: "2021-07-08 14:00",
          end: "2021-07-08 16:00",
          color: "blue"
        },
        {
          name: "PTM",
          start: "2021-07-07",
          color: "green"
        },
        {
          name: "Youth Day",
          start: "2021-07-05",
          color: "orange"
        },
        {
          name: "Y1 PLD Onboarding",
          start: "2021-07-28 11:00",
          end: "2021-07-28 13:00",
          color: "green"
        },
        {
          name: "Y2 PLD Onboarding",
          start: "2021-07-28 12:30",
          end: "2021-07-28 15:00",
          color: "green"
        },
        {
          name: "Y3 PLD Onboarding",
          start: "2021-07-28 15:00",
          end: "2021-07-28 17:00",
          color: "green"
        },
        {
          name: "Fleming Week",
          start: "2021-08-02",
          end: "2021-08-06",
          color: "green"
        },
        {
          name: "Fibonacci Week",
          start: "2021-08-11",
          end: "2021-08-13",
          color: "green"
        },
        {
          name: "Y1 CA",
          start: "2021-08-11 08:00",
          end: "2021-08-11 10:00",
          color: "blue"
        },
        {
          name: "Y3 CA",
          start: "2021-08-11 10:00",
          end: "2021-08-11 12:00",
          color: "blue"
        },
        {
          name: "Y6 CA",
          start: "2021-08-11 14:00",
          end: "2021-08-11 16:00",
          color: "blue"
        },
        {
          name: "Y4 CA",
          start: "2021-08-13 14:00",
          end: "2021-08-13 16:00",
          color: "blue"
        },
        {
          name: "Y1 CA",
          start: "2021-08-18 12:00",
          end: "2021-08-18 16:30",
          color: "blue"
        },
        {
          name: "Y5-6 CA",
          start: "2021-08-18 14:00",
          end: "2021-08-18 16:00",
          color: "blue"
        },
        {
          name: "OSAP 2022 Briefing",
          start: "2021-08-30 15:00",
          end: "2021-08-30 16:00",
          color: "green",
          details: "Briefing on overseas trips application for 2022 - Year 3,4,5 (Assembly Slot)"
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