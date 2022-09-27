<template>
    <AppModal :title="'contrat numéro:this.route.params.id'" size="lg" @modal-hide="routeToParent()" >
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