export const state = () => ({
  users: [],
  count: 0
})

export const getters = {
  userById: state => (id) => {
    return state.users.find(u => u.id === id)
  }
}

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
  },
  deleteUser (state, id) {
    const index = state.users.findIndex(u => u.id === id)
    if (~index) {
      state.users.splice(index, 1)
      state.count--
    }
  }
}
