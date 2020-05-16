<template>
  <div>
    <div class="row row-cols-1 row-cols-md-2">
      <div class="col mb-1">
        <div class="card text-black bg-light">
          <div class="card-header">
            <h2>{{ 'document.title' }}</h2>
          </div>
          <div class="mt-3 mb-3">
            최근 당첨번호를 분류하여 로또 번호를 추천해 드립니다.
          </div>
          <div class="nums">
            <lotto-pragment
                ref="winNumbers"
                :winNumbers="winNumbers"
            >
            </lotto-pragment>
            <button
                id="btn1"
                v-on:click="clickButton"
            >
              버튼
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import { mapGetters, mapMutations, mapActions } from 'vuex'
// import VueNumericInput from 'vue-numeric-input'

// import * as CommonUtils from '@/components/com/utils/CommonUtils'
import lottoPragment from '@/views/com/lotto/LottoPragment.vue'

export default Vue.extend({
  name: 'lotto',
  components: {
    lottoPragment,
  },
  data() {
    return {
      winNumbers: [0,0,0,0,0,0],
      isShowConfig: false,
      latelySize: 10,
      // winNumbers: [],
      weights: Array(45).fill(0).map((v, i) => i === 0 ? 1 : 0),    // (45) [0,0,...,0]
      seeds: [],
      selectedNumbers: [],
      isKeepNumber: !true,
    }
  },
  /**  */
  created() {
    console.log('--- created')
  },
  mounted() {
    console.log('--- mounted')
  },
  updated() {
    console.log('--- updated')
  },
  /** */
  methods: {
    onInit() {
      console.log('--- onInit')
      this.winNumbers = [1,2,3,4,5,6]
    },
    onRecommand() {
      console.log('--- onRecommand')
    },
    clickButton() {
      console.log('--- clickButton')
      this.winNumbers = [10,20,30,40,5,6]
      // this.$refs.winNumbers.setWinNumbers([1,2,3,4,5,6])
    },
    // getBallType(num: number) {
    //   return Math.floor((num - 1/* 1~10 */) / 10) + 1
    // },
  },
  computed: {

  },
  watch: {

  },
})
</script>