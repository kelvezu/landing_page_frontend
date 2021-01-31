<template>
  <div>
    <v-dialog v-model="addDialog" width="70%" persistent>
      <v-form @submit.prevent="formFunction">
        <form-slot>
          <rich-text-editor />
          <template v-slot:form-icons> $vuetify.icons.accountVoice </template>

          <template v-slot:form-headline> {{ formType.headline }} </template>

          <template v-slot:form-actions>
            <v-btn
              :loading="$store.getters['announcement/GET_LOADING']"
              type="submit"
              color="primary"
            >
              Submit
            </v-btn>
            <v-btn color="secondary" @click="$store.commit('announcement/SET_ADD_DIALOG', false)"> Cancel </v-btn>
          </template>
        </form-slot>
      </v-form>
    </v-dialog>
    <v-btn @click.stop="openDialog" color="primary">
      {{ formType.buttonText }}
    </v-btn>
  </div>
</template>

<script>
import { getSet } from '~/utils'
export default {
  methods: {
    openDialog() {
      this.$store.commit('announcement/SET_ADD_DIALOG', true)
    }
  },
  props: {
    formFunction: {
      type: [Function, Promise],
    },
    formType: {
      type: Object,
      default: () => ({
        headline: 'Create Announcement',
        buttonText: 'Add Announcement',
      }),
    },
  },
  computed: {
    addDialog: getSet('announcement/GET_ADD_DIALOG', 'announcement/SET_ADD_DIALOG')
  }
}
</script>