<template>
  <v-data-table
    :headers="headers"
    :items="usersData"
    :server-items-length="usersTotal"
    :items-per-page="10"
    :loading="isLoading"
    loading-text="Fetching Users. Please wait."
    dense
    :options.sync="options"
    disable-sort
    :footer-props="{
      itemsPerPageOptions: [5, 10, 15, 20],
    }"
  >
    <template #progress>
      <v-progress-linear
        color="purple"
        :height="10"
        indeterminate
      ></v-progress-linear>
    </template>
  </v-data-table>
</template>

<script>
import { getSet } from '~/utils'
export default {
  data() {
    return {
      pageNum: null,
      headers: [
        {
          text: 'Fullname',
          value: 'data.attributes.fullname',
          align: 'start',
        },
          {
          text: 'Email',
          value: 'data.attributes.email',
        },
        {
          text: 'Date Registered',
          value: 'data.attributes.date_registered',
        },
      ],
      options: null,
    }
  },

  methods: {
    async fetchAllUsers(options) {
      try {
        await this.$store.dispatch('users/fetchUsers', options)
      } catch (error) {
        console.error(error)
      }
    },
  },

  mounted() {
    this.fetchAllUsers({})
  },

  watch: {
    options: {
      handler() {
        this.fetchAllUsers(this.options)
      },
      deep: true,
    },
  },

  computed: {
    usersData: {
      get() {
        return this.$store.getters['users/GET_USERS_DATA']
      },
    },
    usersTotal: {
      get() {
        return this.$store.getters['users/GET_META_TOTAL']
      },
    },

    isLoading: {
      get() {
        return this.$store.getters['users/GET_LOADING']
      },
    },
  },
}
</script>