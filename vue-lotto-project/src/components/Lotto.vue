<template>

  <div>
    <ul class="list-group">
    <li class="list-group-item list-group-item-success">
    <div class="nums">
        <div class="num win">
            <p>
              <strong>({{ getWinSize }}) 최근</strong>
              <!-- <input v-model.number="latelySize" style="width: 80px;" class="ta-c"
                  v-on:change="doInit"> -->
              <vue-numeric-input class="mr-10 ta-c fw-b" style="width: 80px;"
                  v-model.number="latelySize" :min="5" :max="23" :step="1">
              </vue-numeric-input>
              <strong>회차 기준</strong>
            </p>

            <strong>추천번호</strong>
            <!-- <button type="button" class="btn btn-link"
                v-on:click="doRecommand"
                data-container="body" data-toggle="popover" data-placement="bottom"
                data-content="선택된 번호에서 추천번호를 받습니다."
            > -->
            <button type="button" class="btn btn-link"
                v-on:click="doRecommand"
            >
              추천받기
            </button>
            <input type="checkbox" id="isEveryChange" v-model="isEveryChange">
            <label for="isEveryChange">
              매번새로선택
            </label>

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

    </div>
    </li>
    <li class="list-group-item list-group-item-success">
    <div class="nums">
        <div>
            <strong>선택된 번호</strong>
            <button type="button" class="btn btn-link"
                v-on:click="getSelectedNumbers"
            >
              가중치로 선택된 번호받기
            </button>
            <p v-if="selectedNumbers.length === 0">
              선택된 번호가 없습니다.
            </p>
            <p v-else>
                <span v-for="(num, i) in selectedNumbers" v-bind:key="i" class="ball_645 lrg ball1"
                    style="transform: scale( .6 );"
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
    </li>

    <li class="list-group-item" v-for="(seed, i) in seeds" :key="i">
    <div class="nums">

        <div class="num win">
            <p>
              <strong v-if="i === 0">최근 {{ latelySize }}회 동안 한 번도 안 나온 숫자</strong>
              <strong v-else>최근 {{ latelySize }}회 동안 {{ i }}회 나온 숫자</strong>
            </p>
            <p>
              가중치:
              <vue-numeric-input class="mr-10 ta-c fw-b" style="width: 80px;"
                  v-model="weights[i]" :min="0" :max="seed.length" :step="1">
              </vue-numeric-input>
            </p>
            <p>
                <span v-for="(num, j) in seed" v-bind:key="j" class="ball_645 lrg"
                 style="transform: scale( .6 );"
                    :class="{
                      ball0: weights[i] === 0,
                      ball1: weights[i] > 0 && getBallType(num) == 1,
                      ball2: weights[i] > 0 && getBallType(num) == 2,
                      ball3: weights[i] > 0 && getBallType(num) == 3,
                      ball4: weights[i] > 0 && getBallType(num) == 4,
                      ball5: weights[i] > 0 && getBallType(num) == 5,
                    }"
                >
                  {{ num }}
                </span>
            </p>
        </div>

    </div>
    </li>
    </ul>
  </div>

</template>

<script>
/* eslint-disable */
import VueNumericInput from 'vue-numeric-input'
import { mapGetters, mapMutations, mapActions } from 'vuex'

function getRandomSubarray(arr, size) {
  // console.log('arr', arr)
  var shuffled = arr.slice(0)
  var i = arr.length
  var temp, index

  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(0, size);
}

/**
 * from, to 사이의 난수를 반환
 */
function getRandomValue(from, to) {

  if (from === to) return from

  return Math.floor((to + 1 - from) * Math.random()) + from
}

export default {
  name: 'lotto',
  components: {
    VueNumericInput
  },
  data() {
    return {
      latelySize: 10,
      winNumbers: [],
      // weights: [4,0,1,2,0,],
      // weights: [2,1,3,1,0,],
      // weights: [6,1,4,3,0,],
      weights: Array(45).fill(0).map((v, i) => i === 0 ? 1 : 0),    // (45) [0,0,...,0]
      seeds: [
        /* 0 */ [1,9,10,25,41,44],
        /* 1 */ [3,4,11,12,13,15,17,24,27,29,31,32,33,34,40,42,43],
        /* 2 */ [5,6,8,14,19,22,23,26,30,35,36,37,38,39,45],
        /* 3 */ [2,7,16,18,28],
        /* 4 */ [20,21],
      ],
      selectedNumbers: [],
      isEveryChange: true,
    };
  },
  created() {
    console.log('--- created');
  },
  mounted() {
    console.log('--- mounted');
    this.weights = this.recommandWeights
    this.doInit()

    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
      $('[data-toggle="popover"]').popover()
    })
  },
  updated() {
    console.log('--- updated');
  },
  methods: {
    ...mapMutations({

    }),
    ...mapActions({
      analysis: 'analysis'
    }),

    doInit() {
      console.log('--- doInit')
      this.analysis(this.latelySize)
      this.seeds = this.getCountList
    },
    doRecommand() {
      console.log('--- doRecommand')
      // this.getSelectedNumbers()
      var { selectedNumbers } = this
      if (this.isEveryChange || !selectedNumbers || selectedNumbers.length === 0) {
        selectedNumbers = this.getSelectedNumbers()
      }
      // this.winNumbers = buff.slice(0)
      this.winNumbers = getRandomSubarray(selectedNumbers, 6).sort(function (a, b) { return a - b })
    },
    getSelectedNumbers() {
      console.log('--- getSelectedNumbers')
      // console.log(this.weights)

      var buff = []
      for (var i in this.weights) {
        var weight = this.weights[i]
        if (weight > 0) {
          var sample = getRandomSubarray(this.seeds[i], weight)
          // console.log('sample', sample)
          buff = buff.concat(sample).sort(function (a, b) { return a - b })
          // console.log('buff', buff)
        }
        // console.log(`i = {{i}}`, i)
      }
      this.selectedNumbers = buff.slice(0)

      return this.selectedNumbers
    },
    getBallType(number) {
      return Math.floor((number - 1/* 1~10 */) / 10) + 1
    },
  },
  computed: {
    ...mapGetters({
      getWinSize: 'getWinSize',
      getWinNumbers: 'getWinNumbers',
      getCountList: 'getCountList',
    }),
    recommandWeights() {
      // weights: [4,0,1,2,0,]
      // weights: [2,1,3,1,0,]
      var recommands = [
        // 최근 노출 빈도 범위의 난수를 가중치로 적용 
        getRandomValue(1, 4),
        getRandomValue(0, 1),
        getRandomValue(1, 3),
        getRandomValue(1, 2),
        getRandomValue(0, 0),
      ]

      // 최소 선택개수 미만일 때, 가중치를 조정
      var minCount = 10
      var sum = recommands.reduce((accumulator, x) => accumulator + x)
      console.log('sum', sum)

      var loop = minCount - sum
      while (loop --) {
        var index = getRandomValue(0, recommands.length)
        recommands[index] += 1
        console.log('[', loop, '] ', index, 'increased!!'
            , recommands.reduce((accumulator, x) => accumulator + x))
      }
      // for (var i in recommands) {
      //   // console.log('i', i) // 0 1 2 ... 4
      //   var val = recommands[i]

      // }

      var { weights } = this
      for (var i = 0; i < recommands.length; i++) {
        weights[i] = recommands[i]
      }

      return weights
    },
  },
  watch: {
    latelySize: function(newVal, oldVal) {
      console.log('newVal, oldVal', newVal, oldVal)
      this.doInit()
    },
  },
};
</script>
