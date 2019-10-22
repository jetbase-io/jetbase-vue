<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">
            id
          </th>
          <th scope="col">
            username
          </th>
          <th scope="col">
            first name
          </th>
          <th scope="col">
            last name
          </th>
          <th scope="col">
            email
          </th>
          <th scope="col">
            status
          </th>
        </tr>
      </thead>
      <tbody>
        <users-table-row v-for="user in users" :key="user.id" :user="user" />
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
