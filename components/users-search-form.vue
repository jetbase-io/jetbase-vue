<template>
  <form class="search-form users-search-form" @submit.prevent="search">
    <div class="input-group input-group-sm flex-nowrap m-0">
      <label for="search-email" class="sr-only">Search users by E-mail</label>

      <input
        id="search-email"
        v-model.trim="email"
        type="search"
        class="form-control"
        placeholder="Search users by E-mail"
        aria-label="Search users by E-mail"
        aria-describedby="search-email-addon"
        spellcheck="false"
      >

      <div class="input-group-append">
        <button id="search-email-addon" class="btn btn-outline-secondary" type="submit">Search</button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  computed: {
    email: {
      get () {
        return this.$store.state.users.params.email
      },
      set (value) {
        this.setParam({ param: 'email', value })
      }
    },
    offset: {
      get () {
        return this.$store.state.users.params.offset
      },
      set (value) {
        this.setParam({ param: 'offset', value })
      }
    }
  },
  methods: {
    ...mapMutations('users', ['setParam']),
    ...mapActions('users', ['loadUsers']),
    search () {
      this.offset = 0
      return this.loadUsers()
    }
  }
}
</script>
