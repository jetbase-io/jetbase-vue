<template>
  <div class="card mb-3">
    <form class="user-form" @submit.prevent="submit">
      <div class="card-header">
        <i class="far fa-edit text-muted" />New User
      </div>
      <div class="card-body">
        <div class="position-relative form-group">
          <label for="username">Username</label>
          <input id="username" v-model.trim="form.username" placeholder="Enter username" type="text" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="first_name">First name</label>
          <input id="first_name" v-model.trim="form.first_name" placeholder="Enter first name" type="text" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="last_name">Last name</label>
          <input id="last_name" v-model.trim="form.last_name" placeholder="Enter last name" type="text" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="email">E-mail</label>
          <input id="email" v-model.trim="form.email" placeholder="Enter e-mail" type="email" class="form-control">
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
export default {
  data () {
    return {
      form: {
        username: null,
        first_name: null,
        last_name: null,
        email: null,
        role_id: null
      },
      submitting: false
    }
  },
  methods: {
    submit () {
      // todo
    },
    cancel () {
      // todo cancel xhr
      this.$router.back()
    }
  }
}
</script>
