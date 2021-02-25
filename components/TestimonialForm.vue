<template>
  <FormSlot>
    <template v-slot:form-icons> $vuetify.icons.commentAccount </template>
    <template v-slot:form-headline> Add Testimonial </template>
    <v-form @submit.prevent="sample">
      <TextField label="Customer Name" />
      <TextArea label="Testimonial" />
      <SubmitButton />
    </v-form>
  </FormSlot>
</template>

<script>
export default {
  methods: {
    sample() {
      alert('submitted')
    },
  },
}
</script>
