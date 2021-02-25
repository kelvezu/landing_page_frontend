<template>
  <v-btn type="submit" color="primary"> {{ buttonName }} </v-btn>
</template>

<script>
export default {
  props: {
    buttonName: {
      type: String,
      default: 'Submit',
    },
  },
}
</script>
