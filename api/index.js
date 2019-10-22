export default class Api {
  constructor ($axios) {
    this.$axios = $axios
  }

  call (method, endpoint, data = {}, params = {}) {
    return this.$axios.$request({
      method,
      url: endpoint,
      data,
      params
    })
  }

  post (endpoint, data = {}) {
    return this.call('POST', endpoint, data)
  }

  get (endpoint, params = {}) {
    return this.call('GET', endpoint, {}, params)
  }
}
