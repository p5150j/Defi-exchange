<template>
    <div class="hello">
        <vue-form :state="formstate" @submit.prevent="onSubmit" class="myForm">

            <!--"address", "name", "symbol", "decimals", "deprecated", "quote", "active", "zeroex_official", "created_date"-->
            <validate tag="label">
                <span>Name *</span>
                <input v-model="model.name" required name="name"/>
                <field-messages name="name">
                    <div slot="required">Value is required</div>
                </field-messages>
            </validate>

            <validate tag="label">
                <span>Address *</span>
                <input v-model="model.address" required name="address"/>
                <field-messages name="address">
                    <div slot="required">Value is required</div>
                </field-messages>
            </validate>

            <validate tag="label">
                <span>Symbol *</span>
                <input v-model="model.symbol" required name="symbol"/>
                <field-messages name="symbol">
                    <div slot="required">Value is required</div>
                </field-messages>
            </validate>

            <validate tag="label">
                <span>Decimals *</span>
                <input v-model="model.decimals" required name="decimals" type="number"/>
            </validate>

            <validate tag="label">
                <span>Quote *</span>
                <input v-model="model.quote" name="quote" type="checkbox"/>
            </validate>
            <validate tag="label">
                <span>Deprecated *</span>
                <input v-model="model.deprecated" name="deprecated" type="checkbox"/>
            </validate>

            <validate tag="label">
                <span>Zeroex Official *</span>
                <input v-model="model.zeroex_official" name="zeroex_official" type="checkbox"/>
            </validate>

            <span>Created date </span>
            <span>{{model.created_date || 'n/a'}}</span>

            <div class="messages">
                <h3 v-if="loading">Loading</h3>
                <h3 v-if="error">{{error}}</h3>
            </div>
            <button type="submit" :disabled="formstate.$invalid">Submit</button>
            <button @click="goBack">Back</button>
        </vue-form>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import VueForm from 'vue-form';
    import {request} from '../core/http-request'

    @Component({})
    export default class TokenItems extends mixins(VueForm) {
        @Prop()
        private tokenId: string;
        @Prop()
        public $router: any;

        formstate: any = {};
        loading: boolean = false;
        model: any = {};
        error: any = '';

        token: any; // @TODO: define interface

        created() {
            this.loading = true;

            request({method: "GET", url: "/tokens/" + this.tokenId})
                .then(({data}: { data: any[] }) => {
                    this.model = data;
                    this.loading = false;
                })
                .catch(error => {
                    this.error = error;
                })
        }

        goBack(){
            // something else?
            this.$router.push({path: '/tokens'});
        }

        onSubmit() {
            if (this.formstate.$invalid) {
                // alert user and exit early
                return;
            }
            this.loading = true;
            request({method: "PUT", url: "/tokens/" + this.tokenId, data: this.model})
                .then(() => {
                    this.loading = false;
                })
                .catch(error=> {
                    this.error = error;
                })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .myForm {
        text-align: left;
        width: 300px;
        margin: auto;

        label {
            display: block;
            padding: 5px;
        }
        input {
            width: 100%;
        }
        span {
            display: block;
        }
    }
    .messages {
        padding: 3px 10px;
        min-height: 50px;
    }
</style>
