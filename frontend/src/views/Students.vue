<template>
    <v-container>
      <v-data-table :headers="table.headers" :items="students">
        <template v-slot:item.actions="{ item }">
          <v-row>
            <v-icon @click="showDeleteDialog(item)" color="error">
              mdi-delete
            </v-icon>
            <v-icon
              @click=""
              color="blue">
              mdi-arrow-right
            </v-icon>
          </v-row>
        </template>
  
        <!--       Alias slot -->
        <template v-slot:item.studentEmail="{ item }">
          <span>{{ item.studentEmail }}</span>
        </template>
  
        <!--    URL slot -->
        <template v-slot:item.url="{ item }">
          <span>{{ item.reason }}</span>
        </template>
        <template v-slot:item.createdOn="{ item }">
          {{ new Date(item.createdOn).toLocaleDateString() }}
        </template>
      </v-data-table>
      <!-- delete dialog -->
      <v-dialog v-model="dialogDelete" max-width="500px" v-if="this.itemToDelete">
        <v-card>
          <v-card-title>Delete</v-card-title>
          <v-card-text>Are you sure you want to unauthorize {{ itemToDelete.studentEmail }}?</v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="dialogDelete = false">Cancel</v-btn>
            <v-btn color="error" text @click="deleteItem()">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- delete selected dialog -->
    </v-container>
  </template>
  
  <script lang="ts">
  import Vue from "vue";
  import {
    getUserStudents
  } from "@/api/me"
  import {
    StudentData
  } from "@/types/StudentData";
  import {deleteStudent} from "@/api/students";
  
  export default Vue.extend({
    data(): {
      students: StudentData[],
      dialogDelete: boolean,
      itemToDelete: StudentData | null,
      table: any
      } {
      return {
        students: [],
        dialogDelete: false,
        itemToDelete: null,
        table: {
          headers: [
            {
              text: "Student Email",
              value: "studentEmail"
            },
            {
              text: "Reason",
              value: "reason",
            },
            {
              text: "Created On",
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
      async deleteItem() {
        if (!this.itemToDelete) return;
        const index = this.students.indexOf(this.itemToDelete);
        this.students.splice(index, 1);
        await deleteStudent(this.itemToDelete.studentEmail);
        this.loadUserStudents();
        this.dialogDelete = false;
      },
      loadUserStudents() {
        getUserStudents().then(students => {
          this.$data.students = students;
        });
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
      ,
  
    }
    ,
    mounted() {
      this.loadUserStudents();
    }
  })
  ;
  </script>
  