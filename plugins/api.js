import Api from '../api'

export default ({ $axios }, inject) => {
  const api = new Api($axios)
  inject('api', api)
}
