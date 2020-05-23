<template>
  <div class="Convert">
    <div class="soruce">
      <textarea name="" id="" cols="30" rows="10"
        v-model="form.source"
      ></textarea>
    </div>
    <div>
      <label for="hasComma">
        <input type="checkbox" name="" id="hasComma" v-model="form.hasComma">
        콤마붙이기
      </label>
    </div>
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
        source: '{"a": ["1"], "b": ["2"]}',
        converted: '',
        hasComma: true,
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
        if (keys) {
          keys.map((key, idx) => {
            const value = parsed[key];
            console.log(idx, key, typeof value, value instanceof Array);
            buff[idx] = `${key}: ${value instanceof Array ? '[]' : value}`
                + `${this.form.hasComma ? ',' : ''}`;
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
        this.form.converted = buff.join('\n');
      } catch (e) {
        // console.log(e);
      }

      // return;
    },
  },
});
</script>

<style lang="sass" scoped>
div
  textarea
    width: 80em
</style>
