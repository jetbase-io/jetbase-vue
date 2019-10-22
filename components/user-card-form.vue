<!--suppress HtmlFormInputWithoutLabel -->
<template>
  <div class="card mb-3">
    <form class="user-form" @submit.prevent="submit">
      <div class="card-header">
        <i class="far fa-edit text-muted" />New User
      </div>
      <div class="card-body">
        <!--username-->
        <div class="form-group">
          <label>Username</label>
          <!--todo username-->
          <code class="d-block">TODO username</code>
          <!--<input id="username" v-model.trim="form.username" placeholder="Enter username" type="text" class="form-control">-->
        </div>

        <!--first name-->
        <div class="form-group">
          <label :for="inputPrefix('first_name')">First name</label>
          <input
            :id="inputPrefix('first_name')"
            v-model.trim="form.first_name"
            placeholder="Enter first name"
            class="form-control"
            :class="{'is-invalid': $v.form.first_name.$error}"
          >
          <div v-if="$v.form.first_name.$error" class="invalid-feedback">
            <template v-if="!$v.form.first_name.required">Please enter first name</template>
          </div>
        </div>

        <!--last name-->
        <div class="form-group">
          <label :for="inputPrefix('last_name')">Last name</label>
          <input
            :id="inputPrefix('last_name')"
            v-model.trim="form.last_name"
            placeholder="Enter last name"
            class="form-control"
            :class="{'is-invalid': $v.form.last_name.$error}"
          >
          <div v-if="$v.form.last_name.$error" class="invalid-feedback">
            <template v-if="!$v.form.last_name.required">Please enter last name</template>
          </div>
        </div>

        <!--email-->
        <div class="form-group">
          <label :for="inputPrefix('email')">E-mail</label>
          <input
            :id="inputPrefix('email')"
            v-model.trim="form.email"
            type="email"
            placeholder="Enter e-mail"
            class="form-control"
            :class="{'is-invalid': $v.form.email.$error}"
          >
          <div v-if="$v.form.email.$error" class="invalid-feedback">
            <template v-if="!$v.form.email.required">Please enter E-mail</template>
            <template v-if="!$v.form.email.email">Invalid E-mail format</template>
          </div>
        </div>

        <!--password-->
        <div v-if="!isUpdate" class="form-group">
          <label :for="inputPrefix('password')">Password</label>
          <!--todo generate link-->
          <password-wrap :visible.sync="showPassword">
            <input
              :id="inputPrefix('password')"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="`Enter password, min ${passwordMinLength} symbols`"
              class="form-control"
              :class="{'is-invalid': $v.form.password.$error}"
              autocomplete="off"
            >
            <div v-if="$v.form.password.$error" class="invalid-feedback">
              <template v-if="!$v.form.password.required">Please enter password</template>
              <template v-if="!$v.form.password.minLength">Password minimum length {{ passwordMinLength }} symbols</template>
            </div>
          </password-wrap>
        </div>

        <!--password confirmation-->
        <div v-if="!isUpdate" class="form-group">
          <label :for="inputPrefix('password_confirmation')">Confirm Password</label>
          <password-wrap :visible.sync="showPassword">
            <input
              :id="inputPrefix('password_confirmation')"
              v-model="form.password_confirmation"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="`Repeat password again`"
              class="form-control"
              :class="{'is-invalid': $v.form.password_confirmation.$error}"
              autocomplete="off"
            >
            <div v-if="$v.form.password_confirmation.$error" class="invalid-feedback">
              <template v-if="!$v.form.password_confirmation.required">Please repeat password</template>
              <template v-if="!$v.form.password_confirmation.sameAsPassword">Passwords are different</template>
            </div>
          </password-wrap>
        </div>

        <!--role-->
        <div class="form-group">
          <label>Role</label>
          <!--todo role-->
          <code class="d-block">TODO role</code>
        </div>
      </div>
      <div class="card-footer">
        <button type="submit" class="btn btn-primary btn-sm" :disabled="submitting">
          <i :class="submitting ? 'fas fa-spinner fa-spin' : 'far fa-dot-circle'" /> Create
        </button>
        <a href="/users" class="btn btn-danger btn-sm" @click.prevent="cancel">
          <i class="fas fa-ban" /> Cancel
        </a>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import PasswordWrap from './password-wrap'

export default {
  components: { PasswordWrap },
  mixins: [validationMixin],
  props: {
    inputIdPrefix: {
      type: String,
      default: ''
    },
    passwordMinLength: {
      type: Number,
      default: 8
    },
    updateUser: {
      default: null,
      validator: prop => typeof prop === 'object' || prop === null
    }
  },
  data () {
    return {
      form: {
        // username: null, // todo username
        first_name: null,
        last_name: null,
        email: null,
        role_id: null,
        password: null,
        password_confirmation: null
      },
      showPassword: false,
      submitting: false
    }
  },
  validations () {
    const formValidations = {
      first_name: { required },
      last_name: { required },
      email: { required, email }
    }

    // only for create new user
    if (!this.isUpdate) {
      formValidations.password = { required, minLength: minLength(this.passwordMinLength) }
      formValidations.password_confirmation = { required, sameAsPassword: sameAs('password') }
    }
    return {
      form: formValidations
    }
  },
  computed: {
    isUpdate () {
      return !!this.updateUser
    }
  },
  methods: {
    inputPrefix (id) {
      return this.inputIdPrefix + id
    },
    async submit () {
      // client validation
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        return // invalid form
      }

      try {
        this.submitting = true

        if (this.isUpdate) {
          // todo update user
        } else {
          const res = await this.$api.post('users', this.form)
          this.$toasted.success('User successfully created')
          this.$emit('created', res)
        }
      } catch (e) {
        throw e
      } finally {
        this.submitting = false
      }
    },
    cancel () {
      // todo cancel xhr
      this.$router.back()
    }
  }
}
</script>
