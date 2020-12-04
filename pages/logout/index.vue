<template>
  <v-container> Logging out </v-container>
</template>

<script>
export default {
  async asyncData({ $auth }) {
    try {
      const response = await $auth.logout()
      console.log('You have logged out!')
    } catch (error) {
      console.error(`Failed to logout. Error: ${error}`)
    }
  },

  layout: 'dashboard',
}
</script>