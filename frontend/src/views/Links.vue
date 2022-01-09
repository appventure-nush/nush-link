<template>
  <v-container>
    <v-data-table v-model="selected" :headers="table.headers" :items="links" show-select>
      <template v-slot:item.actions="{ item }">
        <div class="text-truncate">
          <v-icon
            @click="editItem(item)"
            color="blue"
            :disabled="!!itemToEdit"
            v-if="!itemToEdit || (itemToEdit && item.id !== itemToEdit.id)">
            mdi-pencil
          </v-icon>
          <v-icon
            @click="saveItem(item)"
            color="success"
            v-if="itemToEdit && item.id === itemToEdit.id">
            mdi-check
          </v-icon>
          <v-icon @click="showDeleteDialog(item)" color="error">
            mdi-delete
          </v-icon>
        </div>
      </template>

      <!--       Alias slot -->
      <template v-slot:item.alias="{ item }">
        <span v-if="!itemToEdit || itemToEdit.id !== item.id">{{ item.alias }}</span>
        <v-text-field v-else
                      v-model="item.alias"
                      dense
        />
      </template>

      <!--    URL slot -->
      <template v-slot:item.url="{ item }">
        <a v-if="!itemToEdit || itemToEdit.id !== item.id" :href="item.url"
           target="_blank">{{ item.url }}</a>
        <v-text-field v-else
                      v-model="item.url"
                      dense
        />
      </template>
      <template v-slot:item.createdOn="{ item }">
        {{ new Date(item.createdOn).toLocaleDateString() }}
      </template>
    </v-data-table>
    <v-btn tile @click="showDeleteSelectedDialog()" color="error"
           :disabled="this.selected.length == 0">
      <v-icon left>
        mdi-delete
      </v-icon>
      Delete Selected
    </v-btn>
    <!-- delete dialog -->
    <v-dialog v-model="dialogDelete" max-width="500px" v-if="this.itemToDelete">
      <v-card>
        <v-card-title>Delete</v-card-title>
        <v-card-text>Are you sure you want to delete <a
          :href="'https://nush.link/'+itemToDelete.alias">nush.link/{{ itemToDelete.alias }}</a>?
        </v-card-text>
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
        <v-card-text>Are you sure you want to delete the following?</v-card-text>
        <v-data-table v-model="deletions" :headers="table.headers.slice(0, 2)"
                      :items="selected" show-select>
          <template v-slot:item.url="{ item }">
            <a :href="item.url" target="_blank">{{ item.url }}</a>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-btn color="primary" text @click="dialogDeleteAll = false">Cancel</v-btn>
          <v-btn color="error" text @click="deleteSelected()"
                 :disabled="this.deletions.length == 0">Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {
  getUserLinks
} from "@/api/me";
import {
  LinkData
} from "@/types/LinkData";
import {deleteLink} from "@/api/links";

export default Vue.extend({
  data(): {
    links: LinkData[],
    selected: LinkData[],
    deletions: LinkData[],
    dialogDelete: boolean,
    dialogDeleteAll: boolean,
    itemToDelete: LinkData | null,
    itemToEdit: LinkData | null,
    table: any
    } {
    return {
      links: [],
      selected: [],
      deletions: [],
      dialogDelete: false,
      dialogDeleteAll: false,
      itemToDelete: null,
      itemToEdit: null,
      table: {
        headers: [
          {
            text: "Link Alias",
            value: "alias"
          },
          {
            text: "URL",
            value: "url"
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
    showDeleteDialog(link: LinkData) {
      this.itemToDelete = link;
      this.dialogDelete = !this.dialogDelete;
    },
    showDeleteSelectedDialog() {
      this.deletions = this.selected;
      this.dialogDeleteAll = !this.dialogDeleteAll;
    },

    editItem(item: LinkData) {
      this.itemToEdit = item;
    },
    saveItem(item: LinkData) {
      console.log("save", item);
      this.itemToEdit = null;
    },

    async deleteItem() {
      if (!this.itemToDelete) return;
      const index = this.links.indexOf(this.itemToDelete);
      this.links.splice(index, 1);
      await deleteLink(this.itemToDelete.id);
      this.loadUserLinks();
      this.dialogDelete = false;
    },
    async deleteSelected() {
      for (const item of this.deletions) {
        const index = this.links.indexOf(item);
        this.links.splice(index, 1);
        await deleteLink(item.id);
        this.loadUserLinks();
      }
      this.dialogDeleteAll = false;
      this.selected = [];
      this.deletions = [];
    },
    loadUserLinks() {
      getUserLinks().then(links => {
        this.$data.links = links;
      });
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },

  },
  mounted() {
    this.loadUserLinks();
  }
});
</script>
