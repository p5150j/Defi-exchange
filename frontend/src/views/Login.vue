<template>
    <div class="home">
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {login, getUser} from '../core/authService';

    @Component
    export default class Login extends Vue {

        created() {
            if (!getUser()) {
                login()
                    .then(() => {
                        this.$router.push('/');
                    })
            }
        }
    }
</script>
