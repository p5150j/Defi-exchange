import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Tokens from './views/Tokens.vue';
import TokenEdit from './views/TokenEdit.vue';
import TokenNew from './views/TokenNew.vue';
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
            path: '/tokens/new',
            name: 'tokenNew',
            component: TokenNew,
            props: true,
        },
        {
            path: '/tokens/:tokenId',
            name: 'tokenItem',
            component: TokenEdit,
            props: true,
        },
        {
            path: '/tokens/new',
            name: 'tokenNew',
            component: Login,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
    ],
});
