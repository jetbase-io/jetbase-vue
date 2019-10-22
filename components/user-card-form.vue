<template>
  <div class="card mb-3">
    <form class="user-form">
      <div class="card-header">
        <i class="far fa-edit" />New user
      </div>
      <div class="card-body">
        <div class="position-relative form-group">
          <label for="username">Username</label>
          <input id="username" placeholder="Enter username" type="text" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="first_name">First name</label>
          <input id="first_name" placeholder="Enter first name" type="text" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="last_name">Last name</label>
          <input id="last_name" placeholder="Enter last name" type="text" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="email">E-mail</label>
          <input id="email" placeholder="Enter e-mail" type="email" class="form-control">
        </div>
      </div>
      <div class="card-footer">
        <button type="submit" class="btn btn-primary btn-sm">
          <i class="fa fa-dot-circle-o" /> Create
        </button>
        <a href="/users" class="btn btn-danger btn-sm" @click.prevent="cancel">
          <i class="fa fa-ban" /> Cancel
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
      }
    }
  },
  methods: {
    cancel () {
      // todo cancel xhr
      this.$router.back()
    }
  }
}
</script>
