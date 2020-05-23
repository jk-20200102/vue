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
        source: '{"a": ["1"], "b": ["2"], "c": "string..."}',
        converted: '',
        hasComma: true,
        isInterface: false,
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
        const parsed = JSON.parse(src);
        console.log('--2', parsed);
        // const stringify = JSON.stringify(parsed);
        // console.log('--3', stringify);
        // return stringify;

        const keys = Object.keys(parsed);
        console.log(keys);
        const buff: any[] = [];
        // const tabspace =
        if (keys) {
          keys.map((key, idx) => {
            const value = parsed[key];
            console.log(idx, key, typeof value, value instanceof Array);
            const { isInterface } = this.form;
            if (isInterface) {
              buff[idx] = `  ${key}?: ${this.convertValue(value, isInterface)}`
                + `${this.form.hasComma ? ',' : ''}`;
            } else {
              buff[idx] = `  ${key}: ${this.convertValue(value, isInterface)}`
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
    convertValue(value: any, isInterface: boolean) {
      const altString = isInterface ? 'string' : "''";
      const altValue = typeof value === 'string' ? altString : '';
      return value instanceof Array ? '[]' : altValue;
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
