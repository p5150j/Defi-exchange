import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Tokens from './views/Tokens.vue';
import TokenItem from './views/TokenItem.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/tokens',
      name: 'tokens',
      component: Tokens,
    },
    {
      path: '/tokens/:tokenId',
      name: 'tokenItem',
      component: TokenItem,
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});
