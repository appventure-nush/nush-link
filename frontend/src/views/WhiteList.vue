<template>
    <v-container fill-width>
        <v-row
          align="center"
          justify="center"
          class="my-6"
        >
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation>
        <h3>Add a Student!</h3>
        <v-text-field
          x-large
          placeholder="xxx0xxx"
          prefix="h"
          suffix="@nushigh.edu.sg"
          required>
        </v-text-field>
      </v-form>
        </v-row>
        <v-row
          align="center"
          justify="center"
          class="my-6"
        >

      <v-btn
        color="primary"
        large>
        Add Student
      </v-btn>
        </v-row>
        <!-- TODO: Make this more user friendly -->
        <v-data-table v-model="selected" :headers="table.headers" :items="students" show-select>
            <template v-slot:item.actions="{ item }">
                <div class="text-truncate">
                    <v-icon @click="showDeleteDialog(item)" color="error">
                        mdi-delete
                    </v-icon>
                </div>
            </template>
            <template v-slot:item.url="{ item }">
                <a :href="item.url" target="_blank">{{ item.url }}</a>
            </template>
            <template v-slot:item.createdOn="{ item }">
                {{ new Date(item.createdOn).toLocaleDateString() }}
            </template>
        </v-data-table>
        <v-btn tile @click="showDeleteSelectedDialog()" color="error" :disabled="this.selected.length == 0">
            <v-icon left>
                mdi-delete
            </v-icon>
            Delete Selected
        </v-btn>
        <!-- delete dialog -->
        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title>Delete</v-card-title>
                <v-card-text>Are you sure you want to blacklist {{itemToDelete.studentEmail}}?</v-card-text>
                <v-card-actions>
                    <v-btn color="primary" text @click="dialogDelete = false">Cancel</v-btn>
                    <v-btn color="error" text @click="deleteItem()">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete selected dialog -->
        <v-dialog v-model="dialogDeleteAll" max-width="500px">
            <v-card>
                <v-card-title>Delete Selected</v-card-title>
                <v-card-text>Are you sure you want to blacklist the following?</v-card-text>
                <v-data-table v-model="deletions" :headers="table.headers.slice(0, 2)" :items="selected" show-select>
                  <template v-slot:item.studentEmail="{ item }">
                    <a :href="'mailto:'+item.studentEmail" target="_blank">{{ item.studentEmail }}</a>
                  </template>
                </v-data-table>
                <v-card-actions>
                    <v-btn color="primary" text @click="dialogDeleteAll = false">Cancel</v-btn>
                    <v-btn color="error" text @click="deleteSelected()" :disabled="this.deletions.length == 0">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {
  StudentData
} from "@/types/StudentData";

export default Vue.extend({
  data() {
    return {
      students: Array <StudentData> (
        new StudentData(0, "h1810124@nushigh.edu.sg", "", "", "2022-02-01"),
        new StudentData(1, "h1810166@nushigh.edu.sg", "", "", "2022-01-01")
      ),
      selected: Array <StudentData> (),
      deletions: Array<StudentData>(),
      itemToDelete: new StudentData(0, "", "", "", ""),
      dialogDelete: false,
      dialogDeleteAll: false,
      table: {
        headers: [
          {
            text: "Student's Email ID",
            value: "studentEmail"
          },
          {
            text: "Added On",
            value: "createdOn"
          },
          {
            text: "Action",
            value: "actions",
            sortable: false
          },
        ]
      }
    };
  },
  methods: {
    showDeleteDialog(student: StudentData) {
      this.itemToDelete = student;
      this.dialogDelete = !this.dialogDelete;
    },
    showDeleteSelectedDialog() {
      this.deletions = this.selected;
      this.dialogDeleteAll = !this.dialogDeleteAll;
    },
    async deleteItem() {
      const index = this.students.indexOf(this.itemToDelete);
      this.students.splice(index, 1);
      // await deleteLink(this.itemToDelete.id);
      this.loadUserStudents();
      this.dialogDelete = false;
    },
    async deleteSelected() {
      for (const item of this.deletions) {
        const index = this.students.indexOf(item);
        this.students.splice(index, 1);
        // await deleteLink(item.id);
        this.loadUserStudents();
      }
      this.dialogDeleteAll = false;
      this.selected = [];
      this.deletions = [];
    },
    loadUserStudents() {
      // getUserStudents().then(students => {
      //   this.$data.students = students;
      // });
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },

  },
  mounted() {
    // this.loadUserLinks();
  }
});
</script>
