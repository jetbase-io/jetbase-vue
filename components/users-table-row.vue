<template>
  <tr>
    <th scope="row">
      <nuxt-link :to="userRoute">
        {{ user.id }}
      </nuxt-link>
    </th>
    <td>
      <!--todo username-->
      <code>TODO username</code>
    </td>
    <td>
      <nuxt-link :to="userRoute">
        {{ user.first_name }}
      </nuxt-link>
    </td>
    <td>
      <nuxt-link :to="userRoute">
        {{ user.last_name }}
      </nuxt-link>
    </td>
    <td>
      <!--eslint-disable-next-line vue/no-v-html-->
      <span v-html="$options.filters.highlight(user.email, searchEmail)" />
    </td>
    <td>
      <!--todo role-->
      <code>TODO role</code>
    </td>
    <td>
      <user-actions :user="user" @deleted="$emit('deleted', user.id)" />
    </td>
  </tr>
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
  },
  computed: {
    searchEmail () {
      return (this.$store.state.users.params.email || '').trim()
    },
    userRoute () {
      return {
        name: 'users-id',
        params: { id: this.user.id }
      }
    }
  }
}
</script>
