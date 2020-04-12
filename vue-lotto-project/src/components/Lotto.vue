<template>

    <div class="nums">
        <div class="num win">
            <p>
              <button type="button" class="btn btn-primary"
                  v-on:click="doRecommand"
              >
                추천받기
              </button>
            </p>

            <strong>추천번호</strong>
            <p v-if="winNumbers.length === 0">
              추천 번호가 없습니다.
            </p>
            <p v-else>
                <span v-for="(num, i) in winNumbers" v-bind:key="i" class="ball_645 lrg ball1"
                    :class="{
                      ball1: getBallType(num) == 1,
                      ball2: getBallType(num) == 2,
                      ball3: getBallType(num) == 3,
                      ball4: getBallType(num) == 4,
                      ball5: getBallType(num) == 5,
                    }"
                >
                  {{ num }}
                </span>
            </p>
        </div>
        <!-- <div class="num bonus">
            <strong>보너스</strong>
            <p><span class="ball_645 lrg ball2">20</span></p>
        </div> -->

        <hr class="mt-50"/>

        <div class="num win" v-for="(seed, i) in seeds" :key="i">
            <p>
              가중치:
              <vue-numeric-input class="mr-10 ta-c fw-b" style="width: 80px;"
                  v-model="weights[i]" :min="0" :max="seed.length" :step="1">
              </vue-numeric-input>
              <!-- <input v-model.number="weights[i]"
                  type="input" style="width: 40px;" class="mr-10 ta-c fw-b" /> -->
              <strong v-if="i === 0">최근 10회 동안 한 번도 안 나온 숫자</strong>
              <strong v-else>최근 10회 동안 {{ i }}회 나온 숫자</strong>
            </p>
            <p style="transform: scale( .6 );">
                <span v-for="(num, j) in seed" v-bind:key="j" class="ball_645 lrg ball1"
                    :class="{
                      ball1: getBallType(num) == 1,
                      ball2: getBallType(num) == 2,
                      ball3: getBallType(num) == 3,
                      ball4: getBallType(num) == 4,
                      ball5: getBallType(num) == 5,
                    }"
                >
                  {{ num }}
                </span>
            </p>
        </div>

        <hr class=""/>

        <div>
            <strong>선택된 번호</strong>
            <p v-if="winNumbers.length === 0">
              선택된 번호가 없습니다.
            </p>
            <p style="transform: scale( .6 );" v-else>
                <span v-for="(num, i) in buff" v-bind:key="i" class="ball_645 lrg ball1"
                    :class="{
                      ball1: getBallType(num) == 1,
                      ball2: getBallType(num) == 2,
                      ball3: getBallType(num) == 3,
                      ball4: getBallType(num) == 4,
                      ball5: getBallType(num) == 5,
                    }"
                >
                  {{ num }}
                </span>
            </p>
        </div>
    </div>

</template>

<script>
/* eslint-disable */
import VueNumericInput from 'vue-numeric-input'

function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

export default {
  name: 'lotto',
  components: {
    VueNumericInput
  },
  data() {
    return {
      winNumbers: [],
      weights: [ 10, 2, 1, 5, 10, ],
      seeds: [
        [1,9,10,25,31,32,41,44], /* 한 번도 안 나옴 */
        [3,4,5,11,12,13,14,15,17,24,27,29,33,34,40,42,43],  /* 최근 1회 나옴 */
        [2,6,8,19,22,23,26,28,30,35,36,37,38,39,45],  /* 최근 2회 나옴 */
        [7,16,18,20], /* 최근 3번 나옴 */
        [21], /* 최근 4번 나옴 */
      ],
      buff: [],
    };
  },
  created() {
    console.log('--- created');
  },
  mounted() {
    console.log('--- mounted');

  },
  updated() {
    console.log('--- updated');
  },
  methods: {
    doRecommand() {
      console.log('--- doRecommand')
      console.log(this.weights)
      var buff = []
      for (var i in this.weights) {
        var weight = this.weights[i]
        if (weight > 0) {
          var sample = getRandomSubarray(this.seeds[i], weight)
          // console.log('sample', sample)
          buff = buff.concat(sample).sort(function (a, b) { return a - b })
          console.log('buff', buff)
        }
        // console.log(`i = {{i}}`, i)
      }
      this.buff = buff.slice(0)

      // this.winNumbers = buff.slice(0)
      this.winNumbers = getRandomSubarray(buff, 6).sort(function (a, b) { return a - b })
    },
    getBallType(number) {
      return Math.floor((number - 1/* 1~10 */) / 10) + 1
    },
  },
};
</script>
