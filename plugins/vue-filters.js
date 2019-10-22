import Vue from 'vue'

export function highlight (string, query) {
  if (!string || !query) {
    return string
  }
  const regEx = new RegExp(query, 'ig')

  return ('' + string).replace(regEx, function (str) {
    return `<span class="highlight">${str}</span>`
  })
}

Vue.filter('highlight', highlight)
