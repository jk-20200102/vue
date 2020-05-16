<template>
  <div>
    <div class="num win">
      <p>
        <span v-if="!!times">
        {{ times }}회 당첨결과:
        </span>
        <span v-for="(num, i) in sortedWinNumbers()" v-bind:key="i"
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
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class LottoPragment extends Vue {

  @Prop() private times!: number | undefined
  @Prop() private winNumbers!: number[]

  /**  */
  created() {
    console.log('=== created')
  }
  mounted() {
    console.log('=== mounted')
  }
  updated() {
    console.log('=== updated')
  }

  /**  */
  // methods: {
  getBallType(num: number) {
    return Math.floor((num - 1/* 1~10 */) / 10) + 1
  }
  // public setWinNumbers(winNumbers: number[]) {
  //   this.winNumbers = winNumbers
  // }
  sortedWinNumbers() {
    const { winNumbers } = this
    const sorted = winNumbers.sort((a, b) => {
      return a - b
    })
    return sorted
  }
}
</script>
