<template>
  <v-dialog v-model="editDialog" width="80%" persistent>
    <v-form @submit.prevent="formFunction">
      <form-slot>
        <rich-text-editor />
        <template v-slot:form-icons> $vuetify.icons.accountVoice </template>
        <template v-slot:form-headline> Update Announcement </template>
        <template v-slot:form-actions>
          <v-btn
            :loading="loading"
            type="submit"
            color="primary"
          >
            Submit
          </v-btn>
          <v-btn color="secondary" @click="cancelDialog"> Cancel </v-btn>
        </template>
      </form-slot>
    </v-form>
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
    editDialog: getSet(
      'announcement/GET_EDIT_DIALOG',
      'announcement/SET_EDIT_DIALOG'
    ),
    loading: {
        get() {
            return this.$store.getters['announcement/GET_LOADING']
        }
    }
  },
  methods: {
    cancelDialog() {
      this.$store.commit('announcement/SET_EDIT_DIALOG', false)
      this.$store.commit('richTextEditor/SET_CONTENT')
    },
  },
}
</script>

<style>
</style>