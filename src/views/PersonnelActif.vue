<template>
<div class="container">
    <div class="card mb-3">
        <h3> personnel actif: zone de test et affichage</h3>
    </div>
    <div class="card mb-3">
        <button @click.prevent="testRoute()"   class="btn btn-lg btn-light">test router</button>

        <router-link :to="{name:'Contacts'}" v-slot="{navigate,href}" custom>
            <a :href="href" @click="navigate" class="btn btn-lg btn-light">test router2</a>
        </router-link>
            
            <div> pour récupérer le paramètre passé dans l'URL:
                this.$route.params.id
            </div>
    </div>
    <div class="mb-3">
        <structure-contrat-form></structure-contrat-form>
    </div>
    <div class="mb-3">
        <structure-personnel-form></structure-personnel-form>
        </div>

        
</div>  
</template>
<script>
import StructureContratForm from '../components/StructureContratForm.vue';
import StructurePersonnelForm from '../components/StructurePersonnelForm.vue';
export default {
    methods: {
        testRoute() {
            console.log("testRoute1");
            this.$router.push({ name: "DocsComplements", params: { id: 250 } });
        }
    },
    components: { StructureContratForm, StructurePersonnelForm }
}
    
</script>