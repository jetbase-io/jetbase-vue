import _set from 'lodash/set'

export const state = () => ({
  users: [],
  count: 0,
  loading: false,
  params: {
    limit: 1,
    offset: 0,
    email: '' // search term
  }
})

export const getters = {
  userById: state => (id) => {
    return state.users.find(u => u.id === id)
  },
  page (state) {
    return Math.floor(state.params.offset / state.params.limit) + 1
  }
}

export const actions = {
  async loadUsers ({ state, commit }) {
    try {
      commit('setLoading', true)
      const { items: users, count } = await this.$api.get('users', state.params)
      commit('receiveUsers', { users, count })
    } catch (e) {
      throw e
    } finally {
      commit('setLoading', false)
    }
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
  },
  setParams (state, params) {
    state.params = params
  },
  setLoading (state, flag) {
    state.loading = flag
  }
}
