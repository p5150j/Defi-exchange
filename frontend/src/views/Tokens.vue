<template>
  <div class="hello">
      <input class="search" type="text" placeholder="Search" v-model="search" />
    <table width="100%">
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
      <router-link v-for="entry in
              filteredList" :to="{ name: 'tokenItem', params: { tokenId: entry.address }}"
              tag="tr"
              :key="entry.address"
      >
        <td v-for="key in columns">
          {{entry[key]}}
        </td>
      </router-link>
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
    search: string = '';
    tokens: any[] = []; // @TODO: define interface?
    columns: string[] = ["name", "symbol", "active", "zeroex_official"];
    // columns: string[] = ["address", "name", "symbol", "decimals", "deprecated", "quote", "active", "zeroex_official", "created_date"];

    // @TODO - server side filtering would be better.. currently 150 tokens for an admin page is ok (faster, simpler, admins have good computers)
    // computed
    get filteredList () {
        const lowerSearch = this.search.toLowerCase();
        return this.tokens.filter(token =>
            token.name.toLowerCase().indexOf(lowerSearch) >= 0 ||
            token.symbol.toLowerCase().indexOf(lowerSearch) >= 0
        );
    }

    created() {
        const params = {};

        request({method: "GET", url: "/tokens", params}).then(({data}: { data: any[] }) => {
            this.tokens = data;
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


    input:focus {
      outline:none;
    }
    .search{
      color:#eee;
      position: fixed;;
      border-radius: 40px;
      border: none;
      padding: 8px 12px 10px 12px;
      width: 300px;
      top:6px;
      right:10px;
      height: 30px;
      border: 1px solid rgba(0,0,0,.5);
      background: #2e2e2e;
    }
    table {
      padding:60px;
      border-radius: 3px;
      background-color: #1f1e1e;
      width: 100%;
      table-layout: fixed;
    }

    th {
        background-color: #42b983;
        color: rgba(255,255,255,0.66);
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    td {
      background-color: #2e2e2e!important;
      color:#fff;
      cursor: pointer;
    }

    th, td {
        min-width: 120px;
        padding: 10px 20px;
    }

  
</style>
