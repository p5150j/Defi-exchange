<template>
    <div>
        <h1>Edit</h1>
        <h3 v-if="!token">LOADING</h3>
        <div v-else >
            <TokenForm :token="token" :onValidSubmit="onSubmit" ></TokenForm>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component';
    import VueForm from 'vue-form';
    import {request} from '../core/http-request'
    import TokenForm from './TokenForm.vue';

    // export default Vue.component('token-edit', {
    //     components: {
    //         TokenForm,
    //     },
    //     mixins: [VueForm],
    //     props: {
    //         tokenId: String
    //     },
    //     data: () => ({
    //         loading: false,
    //         token: null,
    //         error:  ''
    //     }),
    //     created: function () {
    //         this.loading = true;
    //
    //         request({method: "GET", url: "/tokens/" + this.tokenId})
    //             .then(({data}: { data: any[] }) => {
    //                 this.token = data;
    //                 this.loading = false;
    //             })
    //             .catch(error => {
    //                 this.error = error;
    //             })
    //     },
    //     methods: {
    //         goBack: function () {
    //             this.$router.push({path: '/tokens'});
    //         },
    //
    //         onSubmit: function (newModel: any) {
    //             return request({method: "PUT", url: "/tokens/" + this.tokenId, data: newModel})
    //         }
    //     }
    // });

    @Component({
        components: {
            TokenForm,
        },
    })
    export default class TokenItem extends mixins(VueForm) {
        @Prop()
        private tokenId: string;
        // @Prop()
        // public $router: any;

        loading: boolean = false;
        token: any = null;
        error: any = '';

        created() {
            this.loading = true;

            request({method: "GET", url: "/tokens/" + this.tokenId})
                .then(({data}: { data: any[] }) => {
                    this.token = data;
                    this.loading = false;
                })
                .catch(error => {
                    this.error = error;
                })
        }

        goBack () {
            this.$router.push({path: '/tokens'});
        };

        onSubmit = (newModel: any) => {
            return request({method: "PUT", url: "/tokens/" + this.tokenId, data: newModel})
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
