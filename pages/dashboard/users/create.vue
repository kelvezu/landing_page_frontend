<template>
  <v-container>
    <v-snackbar
      v-model="snackbawr"
      app
      top
      timeout="3000"
      outlined
      :color="snackbarColor"
    >
      <p>{{ snackbarText }}</p>
    </v-snackbar>
    <v-card elevation="5" max-width="800" class="mx-auto">
      <v-card-title class="indigo white--text headline pa-2">
        <p class="text-h6">
          <v-icon color="white" v-text="'$vuetify.icons.register'"></v-icon> Add
          User
        </p>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="addUserForm"
          @submit.prevent="addUser"
          v-model="isValid"
          lazy-validation
        >
          <v-row>
            <v-col>
              <v-text-field
                label="Firstname"
                placeholder="Enter your firstname"
                type="text"
                autocomplete="false"
                :rules="[rules.fieldRequired, rules.min, rules.max]"
                v-model="firstname"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Lastname"
                placeholder="Enter your lastname"
                type="text"
                autocomplete="false"
                :rules="[rules.fieldRequired, rules.min, rules.max]"
                v-model="lastname"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-text-field
            label="Email"
            placeholder="Enter your email"
            type="email"
            autocomplete="false"
            v-model="email"
            :rules="[rules.validateEmail]"
          ></v-text-field>

          <v-text-field
            label="Password"
            placeholder="Enter your password"
            type="password"
            autocomplete="false"
            v-model="password"
            :rules="[rules.fieldRequired, rules.passwordMin, rules.passwordMax]"
          ></v-text-field>

          <v-text-field
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            autocomplete="false"
            v-model="confirm_password"
            :rules="[
              rules.fieldRequired,
              rules.passwordMin,
              rules.passwordMax,
              (val) => password == val || 'Password didnt matched!',
            ]"
          ></v-text-field>

          <v-btn
            :disabled="!isValid"
            :loading="btnLoading"
            type="submit"
            depressed
            color="primary"
          >
            Submit
          </v-btn>
          <v-btn type="reset" depressed color="secondary"> Reset </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { getSet } from '@/utils'
import {
  fieldRequired,
  min,
  max,
  validateEmail,
  passwordMin,
  passwordMax,
  password_match,
} from '@/utils/validations'

export default {
  layout: 'dashboard',
  data() {
    return {
      isValid: true,
      btnLoading: false,
      isValidated: true,
      snackbawr: false,
      snackbarText: '',
      snackbarColor: null,
      rules: {
        fieldRequired,
        min,
        max,
        validateEmail,
        passwordMin,
        passwordMax,
      },
    }
  },

  computed: {
    firstname: getSet('users/GET_FIRSTNAME', 'users/SET_FIRSTNAME'),
    lastname: getSet('users/GET_LASTNAME', 'users/SET_LASTNAME'),
    email: getSet('users/GET_EMAIL', 'users/SET_EMAIL'),
    password: getSet('users/GET_PASSWORD', 'users/SET_PASSWORD'),
    confirm_password: getSet(
      'users/GET_CONFIRM_PASSWORD',
      'users/SET_CONFIRM_PASSWORD'
    ),
  },

  methods: {
    ...mapActions({
      addUsers: 'users/addUsers',
    }),
    // async addUser() {
    //   this.btnLoading = true
    //   if (this.$refs.userForm.validate()) {
    //     try {
    //       const response = await this.$axios.$post('/v1/users/register',
    //         this.form
    //       )
    //       // clear the form
    //       this.$refs.userForm.reset()
    //       console.log(response)
    //       this.snackbawr = true
    //       this.snackbarText = 'User has been added'
    //       this.snackbarColor = 'success'
    //     } catch (error) {
    //       console.log(error.response.data)
    //       this.snackbawr = true
    //       this.snackbarText = 'Failed to add user.'
    //       this.snackbarColor = 'red darken-3'
    //     } finally {
    //       this.btnLoading = false
    //     }
    //   }

    //   this.btnLoading = false
    // },

    async addUser() {
      try {
         const response =  await this.addUsers(this.$refs.addUserForm)
      } catch (error) {
        console.error('failed to add a user');
      }
     
    },
    isFormValidated() {
      if (this.$refs.addUserForm.validate()) {
        this.isValidated = true
      }
    },
  },
}
</script>
