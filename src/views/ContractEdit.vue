<template>
    <AppModal :title="'Contrat de travail n°'+contrat.id " size="lg" @modal-hide="routeToParent()" :submitBtn="true" :cancelBtn="true" >
        <!-- <contract-form :contrat="contrat"/> -->
        <contract-form-2></contract-form-2>
    </AppModal>
</template>

<script>
import { mapState } from 'vuex';

// import ContractForm from '../components/ContractForm.vue';
import AppModal from '../components/pebble-ui/AppModal.vue';

export default {
    components: { AppModal, },
    
    computed: {
        ...mapState(['openedContrats']),

        /**
         * Retourne le contrat chargé via l'ID de l'URL
         * 
         * @return {object}
         */
        contrat() {
            let contrat = this.openedContrats.find(e => e.id == this.$route.params.idContrat);

            return contrat;
        }
    },
    

    methods: {
        /**
         * retourne à la route précédente
         */
        routeToParent() {
            this.$router.go(-1);
        }
    }
}
</script>