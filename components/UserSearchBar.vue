<template>
  <v-container fluid>
    <v-form class="mx-2" @submit.prevent="searchUsers">
      <v-row>
        <v-col cols="8"
          ><v-text-field
          v-model="searchKeyword"
            dense
            label="Search"
            placeholder="Search for firstname or lastname"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-btn type="submit" color="indigo" class="white--text">Submit</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: ''
    }
  },

  methods: {
    async searchUsers() {
      await this.$store.dispatch('users/searchUsers', this.searchKeyword);
    }
  }
}
</script>