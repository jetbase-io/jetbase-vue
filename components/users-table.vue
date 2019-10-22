<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">
            id
          </th>
          <th scope="col">
            Username
          </th>
          <th scope="col">
            First name
          </th>
          <th scope="col">
            Last name
          </th>
          <th scope="col">
            E-mail
          </th>
          <th scope="col">
            Role
          </th>
          <th scope="col">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <users-table-row v-for="user in users" :key="user.id" :user="user" @deleted="$emit('deleted', $event) " />
      </tbody>
    </table>
  </div>
</template>

<script>
import UsersTableRow from './users-table-row'

export default {
  components: { UsersTableRow },
  props: {
    users: {
      type: Array,
      required: true
    }
  }
}
</script>
