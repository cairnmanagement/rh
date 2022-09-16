<template>
<div class="container">

Zone de test
    <div>
        <button @click.prevent="testRoute()"   class="btn btn-lg btn-light">test router</button>

        <router-link :to="{name:'Contacts'}" v-slot="{navigate,href}" custom>
            <a :href="href" @click="navigate" class="btn btn-lg btn-light">test router2</a>
        </router-link>
            *
            <div> pour recup
                this.$route.params.id
            </div>

    </div>
</div>  
</template>
<script>
export default {

    methods: {
        testRoute() {
            console.log('testRoute1');
            this.$router.push({name:'DocsComplements',params:{id:250}})
        }
    }

}
    
</script>