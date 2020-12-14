<template>
  <div>
    <div class="d-flex my-3 mx-2">
      <user-form-dialog />
    </div>
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