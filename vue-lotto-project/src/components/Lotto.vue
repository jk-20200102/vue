<template>

  <div>
    <div class="row row-cols-1 row-cols-md-2">
      <div class="col mb-1">
        <div class="card text-black bg-light">
          <div class="card-header">
            <h2>로또645 번호 추천</h2>
          </div>
          <div class="row">
            <ol>
              <li>{{ getWinSize }}회차 당첨번호부터
                  {{ getWinSize - latelySize - 1 }}회차 당첨번호까지 노출수로 분류하고</li>
              <li>분류된 그룹별로 선택수를 지정하여 랜덤하게 번호를 선택하여 모은 후</li>
              <li>마지막으로 선택된 번호에서 6개의 추천번호를 제공함.</li>
            </ol>
          </div>
        </div>

      <div class="card text-black bg-success">
        <div class="card-header">
          <h3>추천번호</h3>
        </div>
        <div class="card-body">
          <div class="nums">
              <div class="num win">
                  <p v-if="winNumbers.length === 0">
                    추천 번호가 없습니다.
                  </p>
                  <p v-else>
                      <span v-for="(num, i) in winNumbers" v-bind:key="i"
                          style="transform: scale( .9 );"
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
                      </span>
                  </p>
              </div>
              <!-- <div class="num bonus">
                  <strong>보너스</strong>
                  <p><span class="ball_645 lrg ball2">20</span></p>
              </div> -->
          </div>
            <p>
              <button type="button" class="btn btn-primary"
                  v-on:click="doRecommand"
              >
                다른번호 추천받기
              </button>
              <br/>
            </p>

        </div>
      </div>

      <div class="card text-white bg-info">
        <div class="card-header">
            <strong>{{ getWinSize }}회차 부터 최근</strong>
            <!-- <input v-model.number="latelySize" style="width: 80px;" class="ta-c"
                v-on:change="doInit"> -->
            <vue-numeric-input class="mr-10 ta-c fw-b" style="width: 80px;"
                v-model.number="latelySize" :min="5" :max="23" :step="1">
            </vue-numeric-input><strong>회 기준</strong>

            <strong>선택된 번호</strong>
            <span class="badge badge-success">{{ selectedNumbers.length }}</span>개
            <!-- <button type="button" class="btn btn-primary btn-sm mr-10"
                v-on:click="getSelectedNumbers"
                :disabled="isKeepNumber"
            >
              새로번호받기
            </button> -->

            (<span class="ml-10">
              <input type="checkbox" id="isKeepNumber" v-model="isKeepNumber">
              <label for="isKeepNumber">
                번호유지
              </label>
            </span>)
        </div>
        <div class="card-body">
          <div class="nums">
              <p v-if="selectedNumbers.length === 0">
                선택된 번호가 없습니다.
              </p>
              <p v-else>
                <span v-for="(num, i) in selectedNumbers" v-bind:key="i">
                  <span class="ball_645 lrg"
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

                </span>
              </p>
          </div>

          <div class="row row-cols-1 row-cols-md-2"
              v-for="(seed, i) in seeds" :key="i"
          >
            <div class="col mb-1">
            <div class="card text-black bg-secondary">
              <div class="card-header">
                <strong v-if="i === 0">한 번도 안 나온 숫자</strong>
                <strong v-else>{{ i }}회 나온 숫자</strong>
                <span class="badge badge-success">{{ seed.length }}</span>개
              </div>
              <div class="card-body clearfix">
                <span class="card-title float-left">
                  {{ seed.length }}개 중
                  <vue-numeric-input class="mr-10 ta-c fw-b" style="width: 80px;"
                      v-model="weights[i]" :min="0" :max="seed.length" :step="1">
                  </vue-numeric-input>개 선택
                </span>
              </div>
              <div class="card-body">
                <div class="nums">
                    <div class="num win">
                        <span v-for="(num, j) in seed" v-bind:key="j">
                          <span class="ball_645 sml mr-10"
                            style="transform: scale( 1.2 );"
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
                        </span>
                    </div>
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
      </div>
    </div>


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
      isKeepNumber: !true,
    };
  },
  created() {
    console.log('--- created');
    // console.log('--- ', this.$route.params)
    const { size } = this.$route.params
    console.log('size', size)
    if (size) {
      this.latelySize = Number(size)
      console.log('latelySize', this.latelySize)
    }
  },
  mounted() {
    console.log('--- mounted');
    this.doInit()
    this.doRecommand()

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
      this.weights = this.recommandWeights
    },
    doRecommand() {
      console.log('--- doRecommand')
      // this.getSelectedNumbers()
      var { selectedNumbers } = this
      if (!this.isKeepNumber || !selectedNumbers || selectedNumbers.length === 0) {
        selectedNumbers = this.getSelectedNumbers()
      }
      // this.winNumbers = buff.slice(0)
      this.winNumbers = getRandomSubarray(selectedNumbers, 6).sort(function (a, b) { return a - b })
    },
    getSelectedNumbers() {
      console.log('--- getSelectedNumbers')
      const { seeds, weights } = this
      console.log('seeds', seeds)
      console.log('weights', weights)

      var buff = []
      for (var i in seeds) {
        // 시드 갯수 이상이면 중단
        // if (i >= seeds.length) break

        var weight = weights[i]
        if (weight > 0) {
          var sample = getRandomSubarray(seeds[i], weight)
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
      const { seeds } = this
      var recommands = [
        // 최근 노출 빈도 범위의 난수를 가중치로 적용 
        getRandomValue(1, 4),
        getRandomValue(0, 1),
        getRandomValue(1, 3),
        getRandomValue(1, 2),
        getRandomValue(0, 0),
        0,0,0,0,0,
      ]

      // 최소 선택개수 미만일 때, 가중치를 조정
      var minCount = 10
      var sum = recommands.reduce((accumulator, x) => accumulator + x)
      console.log('sum', sum)

      var loop = minCount - sum
      while (loop --) {
        var index = getRandomValue(0, seeds.length - 1)
        // console.log(recommands[index])
        recommands[index] += 1
        // console.log(recommands[index])
        console.log('[', loop, '] ', 'index', index, 'increased!!'
            , recommands[index], 'sum:'
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
