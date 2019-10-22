<template>
  <div class="card mb-3">
    <div class="card-header">
      <i class="fas fa-info-circle text-muted" />User id: {{ user.id }}
      <div class="card-header-actions">
        <nuxt-link
          :to="{name: 'users-id-edit', params: {id: user.id}}"
          class="card-header-action btn-setting btn btn-link"
          aria-label="Edit user"
        >
          <i class="far fa-edit" />
        </nuxt-link>
        <button type="button" class="card-header-action btn-setting btn btn-link" aria-label="Delete user" @click="askDelete">
          <i class="far fa-trash-alt" />
        </button>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <tbody>
            <tr>
              <th scope="row">
                Username
              </th>
              <td>
                <!--todo username-->
                <code>TODO username</code>
                <!--{{ user.username }}-->
              </td>
            </tr>
            <tr>
              <th scope="row">
                First name
              </th>
              <td>{{ user.first_name }}</td>
            </tr>
            <tr>
              <th scope="row">
                Last name
              </th>
              <td>{{ user.last_name }}</td>
            </tr>
            <tr>
              <th scope="row">
                E-mail
              </th>
              <td>{{ user.email }}</td>
            </tr>
            <tr>
              <th scope="row">
                Role
              </th>
              <td>
                <!--todo role-->
                <code>TODO role</code>
                <!--{{ user.role }}-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    async askDelete () {
      if (confirm('Are you sure?')) {
        const res = await this.$api.delete('users/' + this.user.id)
        this.$toasted.success('User successfully deleted')
        this.$emit('deleted', res)
      }
    }
  }
}
</script>
