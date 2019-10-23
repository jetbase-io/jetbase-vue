import { mount } from '@vue/test-utils'
import AppFooter from '../components/app-footer.vue'

describe('Logo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(AppFooter)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})