<!--suppress HtmlFormInputWithoutLabel -->
<template>
  <div class="card mb-3">
    <form class="user-form" @submit.prevent="submit">
      <div class="card-header">
        <i class="fas fa-key text-muted" />Change User Password: {{ user.id }}
      </div>
      <div class="card-body">

        <!--old password-->
        <div class="form-group">
          <label :for="inputPrefix('password_old')">Old Password</label>
          <password-wrap :visible.sync="showPassword">
            <input
              :id="inputPrefix('password_old')"
              v-model="form.password_old"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="`Enter old password`"
              class="form-control"
              :class="{'is-invalid': $v.form.password_old.$error}"
              autocomplete="off"
            >
            <div v-if="$v.form.password_old.$error" class="invalid-feedback">
              <template v-if="!$v.form.password_old.required">Please enter old password</template>
            </div>
          </password-wrap>
        </div>

        <!--password-->
        <div class="form-group">
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
        <div class="form-group">
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
      </div>
      <div class="card-footer">
        <button type="submit" class="btn btn-primary btn-sm" :disabled="submitting">
          <i :class="submitting ? 'fas fa-spinner fa-spin' : 'far fa-dot-circle'" />
          Change Password
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
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { CancelToken } from 'axios'
import { PASSWORD_MIN_LENGTH } from '../config'
import PasswordWrap from './password-wrap'

export default {
  components: { PasswordWrap },
  mixins: [validationMixin],
  props: {
    user: {
      type: Object,
      required: true
    },
    inputIdPrefix: {
      type: String,
      default: 'user-password-form-'
    },
    passwordMinLength: {
      type: Number,
      default: PASSWORD_MIN_LENGTH
    }
  },
  data () {
    return {
      form: {
        password_old: null,
        password: null,
        password_confirmation: null
      },
      showPassword: false,
      submitting: false,
      cancelXhr: null
    }
  },
  validations () {
    return {
      form: {
        password_old: { required },
        password: { required, minLength: minLength(this.passwordMinLength) },
        password_confirmation: { required, sameAsPassword: sameAs('password') }
      }
    }
  },
  computed: {
    submitData () {
      return {
        old_password: this.form.password_old,
        new_password: this.form.password
        // todo password confirmation
      }
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
        // change user's password
        const uri = 'users/' + this.user.id + '/password'
        const res = await this.$api.put(uri, this.submitData, {}, new CancelToken((cancel) => {
          this.cancelXhr = cancel // uses for cancel xhr
        }))
        this.cancelXhr = null
        this.$toasted.success('Password successfully changed')
        this.$emit('changed', res)
      } catch (e) {
        let errorHandled = false

        // handle server validation errors
        if (e.response && [400, 403].includes(e.response.status)) {
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
