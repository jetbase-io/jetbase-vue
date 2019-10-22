<template>
  <form @submit.prevent="submit">
    <h1>Login</h1>
    <p class="text-muted">
      Sign In to your account
    </p>
    <p v-if="error" class="text-danger">
      {{ error }}
    </p>
    <div class="mb-3 input-group">
      <div class="input-group-prepend">
        <span class="input-group-text"><i class="fas fa-user" /></span>
      </div>
      <label for="email" class="sr-only">E-mail</label>
      <input
        id="email"
        v-model="form.email"
        placeholder="E-mail"
        autocomplete="email"
        type="email"
        class="form-control"
        @keyup="error = null"
      >
    </div>
    <div class="mb-4 input-group">
      <div class="input-group-prepend">
        <span class="input-group-text"><i class="fas fa-lock" /></span>
      </div>
      <label for="password" class="sr-only">Password</label>
      <input
        id="password"
        v-model="form.password"
        placeholder="Password"
        autocomplete="current-password"
        type="password"
        class="form-control"
        @keyup="error = null"
      >
    </div>
    <div class="row">
      <div class="col-6">
        <button class="px-4 btn btn-primary ld-ext-right" :disabled="submitting" :class="{running:submitting}">
          Login
          <span class="ld ld-ring ld-spin" />
        </button>
      </div>
      <div class="text-right col-6">
        <button class="px-0 btn btn-link">
          Forgot password?
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  head: {
    title: 'Login'
  },
  mixins: [validationMixin],
  data () {
    return {
      form: {
        email: null,
        password: null
      },
      error: null,
      submitting: false
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required }
    }
  },
  methods: {
    async submit () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        return // invalid form
      }

      this.error = null

      try {
        this.submitting = true
        await this.$auth.login({ data: this.form })
      } catch (e) {
        if (e.response && [400].includes(e.response.status)) {
          this.error = 'Invalid E-mail or Password'
        } else {
          throw e
        }
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>
