import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
// import Lotto from '@/views/com/lotto/Lotto.vue'
import lottoPragment from '@/views/com/lotto/LottoPragment.vue'

describe('lottoPragment.vue', () => {
  it('renders props.winNumbers when passed', () => {
    const winNumbers = [1,2,3,4,5,6]
    const wrapper = shallowMount(lottoPragment, {
      propsData: { winNumbers }
    })
    const vm = wrapper.vm
    console.log('---', wrapper)
    // expect(wrapper.text()).to.include(winNumbers)
  })
})
