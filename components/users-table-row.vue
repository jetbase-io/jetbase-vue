<template>
  <tr>
    <th scope="row">
      <nuxt-link :to="userRoute">
        {{ user.id }}
      </nuxt-link>
    </th>
    <td>
      <!--todo username-->
      <span class="text-danger">TODO username</span>
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
      {{ user.email }}
    </td>
    <td>
      <!--todo role-->
      <span class="text-danger">TODO role</span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    userRoute () {
      return {
        name: 'users-id',
        params: { id: this.user.id }
      }
    }
  }
}
</script>
