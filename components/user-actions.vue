<template>
  <div class="user-actions">
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
