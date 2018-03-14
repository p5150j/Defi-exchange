<template>
    <div class="home">
        <img src="../assets/logo.png">
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Connect, SimpleSigner} from 'uport-connect'

    @Component
    export default class Login extends Vue {

        created() {
            const uport = new Connect('Patrick\'s new app', {
                clientId: '2ofUkSiGDtNFnfaKAdLLmS7pkF8Bwz1YkaK',
                signer: SimpleSigner('3b09893901749e3a760baf6a401fca1df62daa321ee64a7fd50809f34763e9cf')
            });
            uport.requestCredentials({
                requested: ['name', 'avatar', 'phone', 'country'],
                notifcations: true
            })
                .then((credentials: any) => {
                    console.log('credentials', credentials);
                    this.$router.push('/')
                })

        }
    }
</script>
