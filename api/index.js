export default class Api {
  constructor ($axios) {
    this.$axios = $axios
  }

  call (method, endpoint, data = {}, params = {}, cancelToken = null) {
    return this.$axios.$request({
      method,
      url: endpoint,
      data,
      params,
      cancelToken
    })
  }

  post (endpoint, data = {}, params = {}, cancelToken = null) {
    return this.call('POST', endpoint, data, params, cancelToken)
  }

  put (endpoint, data = {}, params = {}, cancelToken = null) {
    return this.call('PUT', endpoint, data, params, cancelToken)
  }

  get (endpoint, params = {}, cancelToken = null) {
    return this.call('GET', endpoint, {}, params, cancelToken)
  }
}
