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
              <div class="num win">
                  <p>
                    {{ '00' }}회 당첨결과:
                      <span v-for="(num, i) in [1,10,20,30,40,45]" v-bind:key="i"
                          style="transform: scale( .6 );"
                          class="ball_645 lrg ball1 mr-10"
                          :class="{
                            ball1: getBallType(num) == 1,
                            ball2: getBallType(num) == 2,
                            ball3: getBallType(num) == 3,
                            ball4: getBallType(num) == 4,
                            ball5: getBallType(num) == 5,
                          }"
                      >
                        {{ num }}
                        <span v-if="i === 6" class="badge badge-pill badge-warning">보너스</span>
                      </span>
                  </p>
              </div>
              <!-- <div class="num bonus">
                  <strong>보너스</strong>
                  <p><span v-for="(num, i) in getWinNumbers[0]" v-bind:key="i"
                      class="ball_645 lrg ball2">
                      {{ num }}
                    </span></p>
              </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
// import VueNumericInput from 'vue-numeric-input'

import * as CommonUtils from '@/components/com/utils/CommonUtils'

export default Vue.extend({
  name: 'lotto',
  components: {

  },
  data() {
    return {
      isShowConfig: false,
      latelySize: 10,
      winNumbers: [],
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
    },
    onRecommand() {
      console.log('--- onRecommand')
    },
    getBallType(num: number) {
      return Math.floor((num - 1/* 1~10 */) / 10) + 1
    },
  },
  computed: {

  },
  watch: {

  },
})
</script>