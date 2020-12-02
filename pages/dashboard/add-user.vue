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
          ref="userForm"
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
                :rules="[rules.required, rules.min, rules.max]"
                v-model="form.firstname"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Lastname"
                placeholder="Enter your lastname"
                type="text"
                autocomplete="false"
                :rules="[rules.required, rules.min, rules.max]"
                v-model="form.lastname"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-text-field
            label="Email"
            placeholder="Enter your email"
            type="email"
            autocomplete="false"
            v-model="form.email"
            :rules="[rules.validateEmail]"
          ></v-text-field>

          <v-text-field
            label="Password"
            placeholder="Enter your password"
            type="password"
            autocomplete="false"
            v-model="form.password"
            :rules="[rules.required, rules.password_min, rules.password_max]"
          ></v-text-field>

          <v-text-field
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            autocomplete="false"
            v-model="form.confirm_password"
            :rules="[
              rules.required,
              rules.password_min,
              rules.password_max,
              () =>
                form.password === form.confirm_password ||
                'Password didnt matched',
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
export default {
  layout: 'dashboard',
  data() {
    return {
      isValid: true,
      btnLoading: false,
      submitButton: 'Submit',
      isValidated: true,
      snackbawr: false,
      snackbarText: '',
      snackbarColor: null,
      form: {
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        confirm_password: null,
      },
      rules: {
        required: (val) => !!val || 'Required',
        min: (val) =>
          (val && val.length >= this.$store.state.constants.MIN_CHAR) ||
          `Minimum of ${this.$store.state.constants.MIN_CHAR} characters`,
        max: (val) =>
          (val && val.length <= this.$store.state.constants.MAX_CHAR) ||
          `Maximum of ${this.$store.state.constants.MAX_CHAR} characters`,
        validateEmail: (val) =>
          !val ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
          'E-mail must be valid',
        password_min: (val) =>
          (val && val.length >= this.$store.state.constants.MIN_PASSWORD) ||
          `Minimum of ${this.$store.state.constants.MIN_PASSWORD} characters`,
        password_max: (val) =>
          (val && val.length <= this.$store.state.constants.MAX_PASSWORD) ||
          `Maximum of ${this.$store.state.constants.MAX_PASSWORD} characters`,
      },
    }
  },

  methods: {
    async addUser() {
      this.btnLoading = true
      if (this.$refs.userForm.validate()) {
        try {
          const response = await this.$axios.$post('/v1/users/register',
            this.form
          )
          // clear the form
          this.$refs.userForm.reset()
          console.log(response)
          this.snackbawr = true
          this.snackbarText = 'User has been added'
          this.snackbarColor = 'success'
        } catch (error) {
          console.log(error.response.data)
          this.snackbawr = true
          this.snackbarText = 'Failed to add user.'
          this.snackbarColor = 'red darken-3'
        } finally {
          this.btnLoading = false
        }
      }

      this.btnLoading = false
    },
    isFormValidated() {
      if (this.$refs.userForm.validate()) {
        this.isValidated = true
      }
    },
  },
}
</script>
