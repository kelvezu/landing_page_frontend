<template>
  <div>
    <v-dialog v-model="dialog" width="70%">
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
            <v-btn color="secondary" @click="dialog = false"> Cancel </v-btn>
          </template>
        </form-slot>
      </v-form>
    </v-dialog>
    <v-btn @click.stop="dialog = !dialog" color="primary">
      {{ formType.buttonText }}
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
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
}
</script>

<style>
</style>