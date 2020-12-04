<template>
  <v-container class="mt-10 fluid">
    <v-card elevation="5" max-width="800" class="mx-auto">
      <v-card-title class="indigo white--text headline pa-2">
        <p class="text-h6">
          <v-icon color="white" v-text="'$vuetify.icons.login'"> </v-icon> Login
        </p>
      </v-card-title>
      <v-card-text class="pa-5">
        <v-form
          v-model="isValid"
          lazy-validation
          @submit.prevent="login"
          ref="loginForm"
        >
          <v-text-field
            label="Email"
            placeholder="Enter your registered email"
            type="email"
            autocomplete="false"
            v-model="form.email"
            :rules="[rules.validateEmail]"
          >
          </v-text-field>
          <v-text-field
            label="Password"
            placeholder="Enter your password"
            type="password"
            autocomplete="false"
            v-model="form.password"
            :rules="[rules.fieldRequired]"
          >
          </v-text-field>

          <v-btn type="submit" color="primary"> Submit </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { fieldRequired, validateEmail, passwordMin, passwordMax } from '@/utils'
export default {

  data() {
    return {
      isValid: true,
      form: {
        email: 'mastermon@test.com',
        password: 'water123master',
      },
      rules: {
        fieldRequired,
        validateEmail,
        passwordMin,
        passwordMax,
      },
    }
  },
  methods: {
    async login() {
      if (this.$refs.loginForm.validate()) {
        try {
          const response = await this.$auth.loginWith('local', {
            data: this.form,
          })
          this.$store.commit('roles/SET_ROLES', this.$auth.user.roles)
        } catch (error) {
          console.error(error)
        }
      }
      console.log('login')
    },
  },
}
</script>

<style>
</style>