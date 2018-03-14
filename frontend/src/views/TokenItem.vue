<template>
  <div class="hello">
    hello Item!
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component'
import VueForm from 'vue-form';
import {request} from '../core/http-request'

@Component({})
export default class TokenItems extends mixins(VueForm) {
    @Prop()
    private tokenId: string;

    token: any; // @TODO: define interface

    created() {
        request({method: "GET", url: "/tokens/" + this.tokenId}).then(({data}: { data: any[] }) => {
            this.token = data;
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
