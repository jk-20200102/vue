<template>
  <div class="Convert">
    <h3>
      입/출력 파라미터:
    </h3>
    <div class="soruce">
      <textarea name="" id="" cols="30" rows="10"
        v-model="form.source"
      ></textarea>
    </div>
    <!-- -->

    <div class="option">
      <label for="isInterface">
        <input type="checkbox" name="" id="isInterface" v-model="form.isInterface">
        인터페이스형식
      </label>
      <label for="hasComma">
        <input type="checkbox" name="" id="hasComma" v-model="form.hasComma">
        콤마붙이기
      </label>
      <label for="isAlignment">
        <input type="checkbox" name="" id="isAlignment" v-model="form.isAlignment">
        줄맞추기
      </label>
    </div>
    <h3>
      코드변환:
    </h3>
    <div class="target">
      <textarea name="" id="" cols="30" rows="10"
        v-model="form.converted"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue';

// const _ = require('lodash');

export default Vue.extend({
  name: 'Convert',
  data() {
    return {
      form: {
        source: `
{'agencyId':['DA04', 'DA04'],
'mannum':['00', '00'],
'dealer':['00', '00'],
'div':['0', '0'],
'crntno':['1031660239', '1031670002'],
'proName':['SMT-1300', 'SMT-1300'],
'inAmtDate':['20190101', '20190101'],
'payAmt':['123720', '123720'],
'phonno':['0', '0'],
'openDate':['20160706', '20160804'],
'payMon':['201609', '201610'],
'telecom':['', ''],
'callplan':['', ''],
'orderType':['1', '1']}
        `.trim(),
        converted: '',
        hasComma: true,
        isInterface: false,
        isAlignment: true,
      },
    };
  },

  created() {
    console.log('created');
    // _.words('');
  },
  mounted() {
    console.log('mounted');
    this.onConverted();
  },
  watch: {
    form: {
      deep: true,
      handler() {
        console.log('');
        this.onConverted();
      },
    // form(newVal, oldVal) {
    //   console.log(newVal, oldVal);
    // },
    },
  },
  methods: {
    onConverted(): void {
      try {
        const src = this.form.source;
        if (src === '') {
          return;
        }
        console.log('--1', src);
        const parsed = JSON.parse(src.replace(/'/g, '"'));
        console.log('--2', parsed);
        // const stringify = JSON.stringify(parsed);
        // console.log('--3', stringify);
        // return stringify;

        const keys = Object.keys(parsed);
        console.log(keys);
        const buff: any[] = [];
        // const tabspace =
        const { isInterface, isAlignment } = this.form;
        if (keys) {
          let keyWidth = 0;
          if (isAlignment) {
            const widths = keys.map((x) => x.length);
            keyWidth = widths.reduce((a, b) => (a > b ? a : b));
          }
          keys.map((key, idx) => {
            const value = parsed[key];
            console.log(idx, key, typeof value, value instanceof Array);

            if (isInterface) {
              buff[idx] = `  ${this.convertKey(key, keyWidth)}?: ${this.convertValue(value, isInterface)}`
                + `${this.form.hasComma ? ',' : ''}`;
            } else {
              buff[idx] = `  ${this.convertKey(key, keyWidth)}: ${this.convertValue(value, isInterface)}`
                + `${this.form.hasComma ? ',' : ''}`;
            }
            return key;
          });
          // for (let i = 0; i < keys.length; i = i + 1) {
          //   console.log(i);
          // }
        }
        // for (const key of keys) {    // iterators/generators require regenerator-runtime,
        // which is too heavyweight for this guide to allow them. Separately,
        // loops should be avoided in favor of array iterations
        //   console.log(key);
        // }
        this.form.converted = ['{', ...buff, '}'].join('\n');
      } catch (e) {
        // console.log(e);
      }

      // return;
    },
    convertValue(value: any, isInterface: boolean): string {
      const altString = isInterface ? 'string' : "''";
      const altValue = typeof value === 'string' ? altString : '';
      return value instanceof Array ? '[]' : altValue;
    },
    convertKey(key: string, keyWidth: number) {
      const fills = keyWidth > 0 ? Array(keyWidth - key.length).fill(' ').join('') : '';
      return `${key}${fills}`;
    },
  },
});
</script>

<style lang="sass" scoped>
h3
  text-align: left
  padding-left: 5em
div
  textarea
    width: 80em
div.option
  position: relative
  top: 3em
</style>
