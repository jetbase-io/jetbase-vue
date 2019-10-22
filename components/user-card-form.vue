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
            <template v-if="!$v.form.first_name.required">
              Please enter first name
            </template>
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
            <template v-if="!$v.form.last_name.required">
              Please enter last name
            </template>
          </div>
        </div>

        <!--email-->
        <div class="form-group">
          <label :for="inputPrefix('email')">E-mail</label>
          <input
            :id="inputPrefix('email')"
            v-model.trim="form.email"
            placeholder="Enter e-mail"
            type="email"
            class="form-control"
          >
        </div>

        <!--todo password-->
        <!--todo password confirmation-->

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
import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  props: {
    inputIdPrefix: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      form: {
        // username: null, // todo username
        first_name: null,
        last_name: null,
        email: null,
        role_id: null
      },
      submitting: false
    }
  },
  validations: {
    form: {
      first_name: { required },
      last_name: { required },
      email: { required, email }
    }
  },
  methods: {
    inputPrefix (id) {
      return this.inputIdPrefix + id
    },
    submit () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        return // invalid form
      }
      console.log('send xhr') // todo
    },
    cancel () {
      // todo cancel xhr
      this.$router.back()
    }
  }
}
</script>
