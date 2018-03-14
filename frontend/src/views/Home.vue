<template>
  <div class="home">
    <div v-if="user">
      <img :src="user.avatar.uri">
      <h1>Welcome {{user.name}}</h1>
    </div>
    <div v-if="!user">
      <h1>Welcome!</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {getUser} from '../core/authService';

@Component
export default class Home extends Vue {
    get user () {
        return getUser();
    }

}

</script>
