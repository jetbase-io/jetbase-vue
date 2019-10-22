<script>
export default {
  async asyncData ({ store, app, params }) {
    const userId = parseInt(params.id)

    // try get user from vuex
    let user = store.getters['users/userById'](userId)

    // or from server
    if (!user) {
      user = await app.$api.get('users/' + userId)
    }

    return {
      user
    }
  }
}
</script>
