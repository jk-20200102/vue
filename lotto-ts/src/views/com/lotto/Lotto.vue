<template>
  <div>
    <div class="row row-cols-1 row-cols-md-2">
      <div class="col mb-1">
        <div class="card text-black bg-light">
          <div class="card-header">
            <h2>{{ documentTitle }}</h2>
          </div>
          <div class="mt-3 mb-3">
            최근 당첨번호를 분류하여 로또 번호를 추천해 드립니다.
          </div>
          <div class="nums">
            <lotto-pragment
                ref="winNumbers"
                :times="100"
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
import _ from 'lodash'
import {Component} from 'vue-property-decorator'
// import Component from 'vue-class-component'
// import { mapGetters, mapMutations, mapActions } from 'vuex'
// import VueNumericInput from 'vue-numeric-input'

// import * as CommonUtils from '@/components/com/utils/CommonUtils'
import LottoPragment from '@/views/com/lotto/LottoPragment.vue'

const name = 'Lotto'
// 데코레이터를 이용한 컴포넌트 정의
@Component({
  name: name,
  components: {
    LottoPragment,
  }
})
export default class Lotto extends Vue {

  /****************************************************************************
   * 
   ****************************************************************************/
  winNumbers = [0,0,0,0,0,0]
  isShowConfig = false
  latelySize = 10
  weights = Array(45).fill(0).map((v, i) => i === 0 ? 1 : 0)    // (45) [0,0,...,0]
  seeds = []
  selectedNumbers = []
  isKeepNumber = !true

  /****************************************************************************
   * 
   ****************************************************************************/
  created() {
    console.log(`${name} created`)
  }
  mounted() {
    console.log(`${name} mounted`)
  }

  /****************************************************************************
   * 
   ****************************************************************************/
  onInit() {
    console.log('--- onInit')
    this.winNumbers = [1,2,3,4,5,6]
  }
  onRecommand() {
    console.log('--- onRecommand')
  }
  clickButton() {
    console.log('--- clickButton')
    this.winNumbers = [10,20,30,40,5,6]
    // this.$refs.winNumbers.setWinNumbers([1,2,3,4,5,6])
  }
  // getBallType(num: number) {
  //   return Math.floor((num - 1/* 1~10 */) / 10) + 1
  // },
  /****************************************************************************
   * 
   ****************************************************************************/
  get documentTitle() {
    return document.title
  }
  /****************************************************************************
   * 
   ****************************************************************************/
}
</script>
