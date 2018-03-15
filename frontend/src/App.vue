<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/tokens">Dashboard</router-link>
      <router-link class="button" :to="{name: 'tokenNew'}" >Add New</router-link>

      <span v-if="!user">|
         <router-link  to="/login">Login</router-link>
      </span>
    </div>
    <router-view class="main-content"/>
  </div>
</template>

<style lang="scss">


  /* default light dark */
  body{
    margin:0;
    padding:0;
    background-color: #141414;
    font-family: 'Ropa Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

  }




  /* nav bar and background background dark */
  /*

  background-color: #2e2e2e;

  background-color: #141414;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
  weird green
  background-color: #3f9;
  non active before hover grey
  background-color: #7a7a7a;
  wiird yellow
  background-color: #ffa71a;
  https://fonts.google.com/specimen/Ropa+Sans
  h2
      font-size: 1.5rem;
      font-stretch: condensed;
      text-transform: uppercase; */

#app {
  text-align: center;
  color: #2c3e50;
}
#nav {
  width:100%;
  position:fixed;
  height:40px;
  background-color: #1f1e1e;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
  padding-top:20px;
  a {
    font-weight: bold;
    color: #2c3e50;
    margin:15px;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
  .main-content {
    padding-top: 100px; // fixed nav + some more
  }
</style>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import {getUser} from './core/authService';

    @Component
    export default class App extends Vue {
        get user () {
            const user = getUser();
            return user;
        }
    }

</script>
