<template>
  <v-dialog v-model="deleteDialog" max-width="80%">
    <v-card>
      <v-card-title>
        <v-icon left v-text="'$vuetify.icons.deleteUser'"> </v-icon>
        Delete Announcement?
      </v-card-title>
      <v-card-text>
        <p v-html="announcement.description"></p>
      </v-card-text>
      <v-card-actions>
        <v-form @submit.prevent="formFunction">
          <v-btn color="red white--text" type="submit">Delete</v-btn>
        </v-form>

        <v-btn class="ml-2" @click="deleteDialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getSet } from '~/utils'
export default {
  props: {
    formFunction: {
      type: Function,
      required: true
    }
  },
  computed: {
    deleteDialog: getSet(
      'announcement/GET_DELETE_DIALOG',
      'announcement/SET_DELETE_DIALOG'
    ),
     announcement: {
      get() {
        return this.$store.getters['announcement/GET_DELETE_FORM']
      }
    }
   
  },
}
</script>

<style>
</style>