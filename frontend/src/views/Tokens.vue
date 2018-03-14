<template>
  <div class="hello">
    <table>
      <thead>
      <tr>
        <th v-for="key in columns">
          {{ key | capitalize }}
          <span class="arrow" >
          </span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="entry in tokens">
        <td v-for="key in columns">
          {{entry[key]}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import {request} from '../core/http-request'

@Component({
    filters: {
        "capitalize": (value: string) => {
            if (!value) return "";
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }
})
export default class Tokens extends Vue {
    @Prop()
    private msg!:string;


    tokens: any[] = []; // @TODO: define interface?
   columns: string[] = ['address', 'name', 'symbol', 'created_date', 'decimals', 'deprecated', 'quote', 'active', 'zeroex_official'];


    created() {
        console.log('yay')
        request({method: 'GET', url: '/tokens'}).then(({data}: { data: any[] }) => {
            this.tokens = data;
        })

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
