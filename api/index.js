export default class Api {
  constructor ($axios) {
    this.$axios = $axios
  }

  call (method, endpoint, data = {}) {
    return this.$axios.$request({
      method,
      url: endpoint,
      data
    })
  }

  post (endpoint, data = {}) {
    return this.call('POST', endpoint, data)
  }
}
