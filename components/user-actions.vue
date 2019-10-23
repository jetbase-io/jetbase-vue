<template>
  <div class="user-actions">
    <nuxt-link
      v-tooltip="'Edit user'"
      :to="{name: 'users-id-edit', params: {id: user.id}}"
      class="card-header-action btn-setting btn btn-link"
      aria-label="Edit user"
    >
      <i class="far fa-edit" />
    </nuxt-link>
    <nuxt-link
      v-tooltip="'Change password'"
      :to="{name: 'users-id-password', params: {id: user.id}}"
      class="card-header-action btn-setting btn btn-link"
      aria-label="Change password"
    >
      <i class="fas fa-key" />
    </nuxt-link>
    <button
      v-tooltip="'Delete user'"
      type="button"
      class="card-header-action btn-setting btn btn-link"
      aria-label="Delete user"
      @click="askDelete"
    >
      <i class="far fa-trash-alt" />
    </button>
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
  computed: {
    isMe () {
      return this.$auth.loggedIn && this.$auth.user.id === this.user.id
    }
  },
  methods: {
    async askDelete () {
      const message = this.isMe ? 'Are you sure you want to delete yourself?' : 'Are you sure?'
      if (confirm(message)) {
        const res = await this.$api.delete('users/' + this.user.id)
        if (this.isMe) {
          this.$auth.reset() // clear token and redirect to /login
        } else {
          this.$toasted.success('User successfully deleted')
          this.$emit('deleted', res)
        }
      }
    }
  }
}
</script>
