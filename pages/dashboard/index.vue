<template>
  <v-container fluid>
    <p class="headline">Dashboard</p>
    <div>
      <count-card />
    </div>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  asyncData() {
    // console.log(context)
  },
  middleware: 'auth',
}
</script>
