<template>

    <div class="nums">
        <div class="num win">
            <p>
              <button v-on:click="doRecommand">
                추천받기
              </button>
            </p>

            <strong>추천번호</strong>
            <p v-if="winNumbers.length === 0">
              추천 번호가 없습니다.
            </p>
            <p v-else>
                <span v-for="(item, i) in winNumbers" v-bind:key="i" class="ball_645 lrg ball1"
                    :class="{
                      ball1: Math.floor(item / 10) +1 == 1,
                      ball2: Math.floor(item / 10) +1 == 2,
                      ball3: Math.floor(item / 10) +1 == 3,
                      ball4: Math.floor(item / 10) +1 == 4,
                      ball5: Math.floor(item / 10) +1 == 5,
                    }"
                >
                  {{ item }}
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
                  v-model="weights[i]" :min="1" :max="10" :step="1">
              </vue-numeric-input>
              <!-- <input v-model.number="weights[i]"
                  type="input" style="width: 40px;" class="mr-10 ta-c fw-b" /> -->
              <strong v-if="i === 0">최근 10회 동안 한 번도 안 나온 숫자</strong>
              <strong v-else>최근 10회 동안 {{ i }}회 나온 숫자</strong>
            </p>
            <p>
                <span v-for="(item, j) in seed" v-bind:key="j" class="ball_645 lrg ball1"
                    :class="{
                      ball1: Math.floor(item / 10) +1 == 1,
                      ball2: Math.floor(item / 10) +1 == 2,
                      ball3: Math.floor(item / 10) +1 == 3,
                      ball4: Math.floor(item / 10) +1 == 4,
                      ball5: Math.floor(item / 10) +1 == 5,
                    }"
                >
                  {{ item }}
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
      weights: [ 4, 1, 1, 2, 1, ],
      seeds: [
        [1, 3, 4, 9, 10, 27, 31, 32, 40, 41, 44], /* 한 번도 안 나옴 */
        [11, 13, 14, 15, 17, 24, 25, 29, 33, 34, 42, 43],  /* 최근 1회 나옴 */
        [2, 5, 6, 8, 12, 16, 19, 20, 22, 28, 30, 35, 36, 37, 38, 39],  /* 최근 2회 나옴 */
        [7, 18, 23, 26, 45], /* 최근 3번 나옴 */
        [21], /* 최근 4번 나옴 */
      ],
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

      // this.winNumbers = buff.slice(0)
      this.winNumbers = getRandomSubarray(buff, 6).sort(function (a, b) { return a - b })
    },
  }
};
</script>
