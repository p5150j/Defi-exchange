<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/tokens">Dashboard!!</router-link>
      <span v-if="!user">|
         <router-link  to="/login">Login</router-link>
      </span>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Ropa Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
