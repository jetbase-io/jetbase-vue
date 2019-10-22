<template>
  <form class="search-form users-search-form d-flex flex-nowrap align-items-center" @submit.prevent="search">
    <div class="input-group input-group-search input-group-sm flex-nowrap m-0 mr-2">
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
    <div class="results">
      <transition name="fade300" mode="out-in">
        <span v-if="loading" key="loading" class="ld ld-ring ld-spin text-info" />
        <span v-else key="count">{{ count === 1 ? '1 user' : count + ' users' }}</span>
      </transition>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('users', ['loading', 'count']),
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

      // update browser url
      this.$router.replace({ name: this.$route.name, query: { email: this.email } })

      // run xhr
      return this.loadUsers()
    }
  }
}
</script>

<style lang="scss">
.search-form {
  .input-group-search {
    width: 320px;
    max-width: 100%;
  }
}
</style>
