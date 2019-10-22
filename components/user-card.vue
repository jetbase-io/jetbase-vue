<template>
  <div class="card mb-3">
    <div class="card-header">
      <i class="fas fa-info-circle text-muted" />User id: {{ user.id }}
      <user-actions class="card-header-actions" :user="user" @deleted="$emit('deleted', $event)" />
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
import UserActions from './user-actions'

export default {
  components: { UserActions },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
