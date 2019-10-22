import _set from 'lodash/set'

export const state = () => ({
  users: [],
  count: 0,
  params: {
    limit: 10,
    offset: 0,
    email: '' // search term
  }
})

export const getters = {
  userById: state => (id) => {
    return state.users.find(u => u.id === id)
  }
}

export const actions = {
  async loadUsers ({ state, commit }) {
    const { items: users, count } = await this.$api.get('users', state.params)
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
  },
  setParam (state, { param, value }) {
    _set(state, 'params.' + param, value)
  }
}
