<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template #activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          <v-icon left>$vuetify.icons.register</v-icon>
          Add User
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="indigo white--text">
          <v-icon left color="white">$vuetify.icons.register</v-icon>
          <span class="headline">Add User</span>
        </v-card-title>
        <v-form
          ref="addUserForm"
          lazy-validation
          v-model="isValid"
          @submit.prevent="addUserData"
        >
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    autocomplete="false"
                    label="Firstname"
                    required
                    v-model="firstname"
                    :rules="[rules.fieldRequired, rules.min, rules.max]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    autocomplete="false"
                    label="Lastname"
                    v-model="lastname"
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
                    v-model="email"
                    :rules="[rules.validateEmail]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    autocomplete="false"
                    label="Password*"
                    type="password"
                    required
                    v-model="password"
                    :rules="[
                      rules.fieldRequired,
                      rules.passwordMin,
                      rules.passwordMax,
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    autocomplete="false"
                    label="Confirm password*"
                    type="password"
                    required
                    v-model="confirm_password"
                    :rules="[
                      rules.fieldRequired,
                      rules.passwordMin,
                      rules.passwordMax,
                      (val) => password == val || 'Password didnt matched!',
                    ]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn
              :loading="isLoading"
              :disabled="!isValid"
              outlined
              type="submit"
              color="purple darken-4"
              text
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { getSet } from '~/utils'
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
  data: () => ({
    dialog: false,
    isValid: true,
    rules: {
      fieldRequired,
      min,
      max,
      validateEmail,
      passwordMin,
      passwordMax,
    },
  }),

  methods: {
    async addUserData() {
      await this.$store.dispatch('users/addUserData')
      this.$refs.addUserForm.resetValidation()
    },
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
    isLoading: {
      get() {
        return this.$store.getters['users/GET_LOADING']
      },
    },
  },
}
</script>