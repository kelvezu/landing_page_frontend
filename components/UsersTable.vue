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
    <template #top>
      <v-dialog v-model="editDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline"> Edit Form </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="updateUser">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      autocomplete="false"
                      label="Firstname"
                      required
                      v-model="editForm.firstname"
                      :rules="[rules.fieldRequired, rules.min, rules.max]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      autocomplete="false"
                      label="Lastname"
                      v-model="editForm.lastname"
                      :rules="[rules.fieldRequired, rules.min, rules.max]"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      autocomplete="false"
                      label="Email*"
                      type="email"
                      required
                      v-model="editForm.email"
                      :rules="[rules.validateEmail]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-card-actions>
                  <v-btn :loading="editLoading" color="primary" type="submit"
                    >Submit</v-btn
                  >
                  <v-btn @click="editDialog = false">Cancel</v-btn>
                </v-card-actions>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="deleteDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <v-icon left v-text="'$vuetify.icons.deleteUser'"> </v-icon>
            Delete User
          </v-card-title>
          <v-card-text>
            <p>
              Do you want to delete <b>{{ deleteForm.fullname }}</b> from the
              database?
            </p>
          </v-card-text>
          <v-card-actions>
            <v-form @submit.prevent="deleteUser">
              <v-btn color="red white--text" type="submit">Delete</v-btn>
            </v-form>

            <v-btn class="ml-2"  @click="deleteDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template #progress>
      <v-progress-linear
        color="purple"
        :height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click.stop="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click.stop="deleteItem(item, usersData.indexOf(item))"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { getSet } from '~/utils'
import { fieldRequired, min, max, validateEmail } from '@/utils/validations'

export default {
  data() {
    return {
      editDialog: false,
      editLoading: false,
      editForm: {
        user_id: null,
        firstname: null,
        lastname: null,
        email: null,
      },
      deleteDialog: false,
      deleteUserIndex: null,
      deleteForm: {
        user_id: null,
        fullname: null,
      },
      rules: {
        fieldRequired,
        min,
        max,
        validateEmail,
      },
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
        {
          text: 'Actions',
          value: 'actions',
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
    editItem(item) {
      this.editDialog = true
      this.editForm.user_id = item.data.user_id
      this.editForm.firstname = item.data.attributes.firstname
      this.editForm.lastname = item.data.attributes.lastname
      this.editForm.email = item.data.attributes.email
    },
    async updateUser() {
      this.editLoading = true
      try {
        await this.$store.dispatch('users/updateUserData', {
          userId: this.editForm.user_id,
          formData: this.editForm,
        })
        this.editDialog = false
      } catch (error) {
        console.error(error)
      } finally {
        this.editLoading = false
      }
    },
    deleteItem(item, index) {
      this.deleteDialog = true
      this.deleteUserIndex = index
      this.deleteForm.user_id = item.data.user_id
      this.deleteForm.fullname = item.data.attributes.fullname
    },
    async deleteUser() {
      try {
        await this.$store.dispatch('users/deleteUserData', {
          userId: this.deleteForm.user_id,
          userIndex: this.deleteUserIndex
        })
       
      } catch (error) {
        console.error(error)
      } finally {
        this.deleteDialog = false
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