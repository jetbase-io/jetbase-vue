export const state = () => ({
  users: [],
  count: 0
})

export const actions = {
  async loadUsers ({ commit }) {
    const { items: users, count } = await this.$api.get('users')
    commit('receiveUsers', { users, count })
  }
}

export const mutations = {
  receiveUsers (state, { users, count }) {
    state.users = users
    state.count = count
  }
}
