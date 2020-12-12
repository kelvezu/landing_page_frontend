<template>
  <div>
    <v-card>
      <v-card-title> User's List </v-card-title>
      <user-search-bar />
      <users-table />
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
}
</script>