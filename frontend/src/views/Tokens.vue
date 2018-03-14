<template>
  <div class="hello">
      <router-link class="button" :to="{name: 'tokenNew'}" >New</router-link>
      <span>Filter</span><input type="text" v-model="search" />
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
    columns: string[] = ["name", "symbol", "active"];
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
    table {
        border: 2px solid #42b983;
        border-radius: 3px;
        background-color: #fff;
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
        background-color: #f9f9f9;
    }

    th, td {
        min-width: 120px;
        padding: 10px 20px;
    }

    th.active {
        color: #fff;
    }

    th.active .arrow {
        opacity: 1;
    }

    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;
    }

    .arrow.asc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #fff;
    }

    .arrow.dsc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #fff;
    }
</style>
