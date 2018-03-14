<template>
    <div>
        <h1>Create</h1>
        <TokenForm :onValidSubmit="onSubmit" ></TokenForm>
        <pre>{{errors}}</pre>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component';
    import VueForm from 'vue-form';
    import {request} from '../core/http-request'
    import TokenForm from './TokenForm.vue';

    @Component({
        components: {
            TokenForm,
        },
    })
    export default class TokenItem extends mixins(VueForm) {
        // @Prop()
        // public $router: any;

        errors: any = '';

        goBack () {
            // @TODO - how to declare this property from the parent?
            this.$router.push({path: '/tokens'});
        };

        onSubmit (newModel: any) {
            return request({method: "POST", url: "/tokens", data: newModel})
                .then(({data: newToken}: { data: any[] }) => {
                    console.log(newToken);
                    this.goBack();
                }).catch(({data}) => {
                    if(data && data.length) {
                        this.errors = data[0];
                    }
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
