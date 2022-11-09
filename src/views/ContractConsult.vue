<template>
    <AppModal 
        :title="'Contrat de travail'" 
        size="lg" 
        @modal-hide="routeToParent()"
        
        
        :cancelBtn="true">
        <contract-consultation/>
    </AppModal>
</template>
<script>
import ContractConsultation from '../components/ContractConsultation.vue';
import AppModal from '../components/pebble-ui/AppModal.vue';
export default {
    components: { AppModal, ContractConsultation,  },
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