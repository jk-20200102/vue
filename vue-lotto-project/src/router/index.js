import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Lotto from '@/components/Lotto';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'lotto',
      component: Lotto,
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    // },
  ],
});
