<!--suppress HtmlFormInputWithoutLabel -->
<template>
  <div class="card mb-3">
    <form class="user-form" @submit.prevent="submit">
      <div class="card-header">
        <i class="far fa-edit text-muted" />{{ cardTitle }}
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
          <a ref="generatePassword" href="#" class="float-right" @click.prevent="generatePassword">Generate</a>
          <password-wrap :visible.sync="showPassword">
            <input
              :id="inputPrefix('password')"
              ref="password"
              v-model="form.password"
              v-tooltip="{content: 'Copied!', placement: 'bottom', trigger: 'manual', show: showPasswordCopied }"
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
          <i :class="submitting ? 'fas fa-spinner fa-spin' : 'far fa-dot-circle'" />
          {{ isUpdate ? 'Update' : 'Create' }}
        </button>
        <a href="/users" class="btn btn-danger btn-sm" @click.prevent="cancel">
          <i class="fas fa-ban" /> Cancel
        </a>
      </div>
    </form>
  </div>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep'
import { validationMixin } from 'vuelidate'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import { CancelToken } from 'axios'
import ClipboardJS from 'clipboard'
import { generatePassword } from '../lib/helpers'
import { PASSWORD_MIN_LENGTH } from '../config'
import PasswordWrap from './password-wrap'

export default {
  components: { PasswordWrap },
  mixins: [validationMixin],
  props: {
    inputIdPrefix: {
      type: String,
      default: 'user-form-'
    },
    passwordMinLength: {
      type: Number,
      default: PASSWORD_MIN_LENGTH
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
      showPasswordCopied: false,
      submitting: false,
      cancelXhr: null,
      clipboard: null
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
    },
    cardTitle () {
      return this.isUpdate ? `Edit User: ${this.updateUser.id}` : 'New User'
    }
  },
  mounted () {
    if (!this.isUpdate) {
      this.createPasswordClipboard()
    }
  },
  beforeDestroy () {
    this.clipboard && this.clipboard.destroy()
  },
  created () {
    if (this.isUpdate) {
      // clone update user object into form
      this.form = _cloneDeep(this.updateUser)
      // optional: delete unused fields, anyway server ignore they on update request
      delete this.form.id
      delete this.form.password
      delete this.form.password_confirmation
    }
  },
  methods: {
    createPasswordClipboard () {
      this.clipboard = new ClipboardJS(this.$refs.generatePassword, {
        target: () => {
          return this.$refs.password
        }
      })
      this.clipboard.on('success', (e) => {
        e.clearSelection()
        this.showPasswordCopied = true
        setTimeout(() => {
          this.showPasswordCopied = false
        }, 1000)
      })
    },
    inputPrefix (id) {
      return this.inputIdPrefix + id
    },
    generatePassword () {
      const password = generatePassword()
      this.form.password = password
      this.form.password_confirmation = password
      this.showPassword = true
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
          // update user
          const res = await this.$api.put('users/' + this.updateUser.id, this.form, {}, new CancelToken((cancel) => {
            this.cancelXhr = cancel // uses for cancel xhr
          }))
          this.cancelXhr = null
          this.$toasted.success('User successfully updated')
          this.$emit('updated', res)
        } else {
          // create new user
          const res = await this.$api.post('users', this.form, {}, new CancelToken((cancel) => {
            this.cancelXhr = cancel // uses for cancel xhr
          }))
          this.cancelXhr = null
          this.$toasted.success('User successfully created')
          this.$emit('created', res)
        }
      } catch (e) {
        let errorHandled = false

        // handle server validation errors
        if (e.response && [400].includes(e.response.status)) {
          const message = e.response.data.message || e.response.statusText || 'Server Error'
          alert(message)
          errorHandled = true
        }
        if (!errorHandled) {
          throw e
        }
      } finally {
        this.submitting = false
      }
    },
    cancel () {
      this.cancelXhr && this.cancelXhr()
      this.$router.back()
    }
  }
}
</script>
