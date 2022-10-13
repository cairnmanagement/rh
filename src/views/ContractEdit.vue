<template>
    <AppModal :title="'Contrat de travail' " size="lg" @modal-hide="routeToParent()" :submitBtn="true" :cancelBtn="true" >
            <contract-form/>
    </AppModal>
</template>
<script>
import ContractForm from '../components/ContractForm.vue';
import AppModal from '../components/pebble-ui/AppModal.vue';
export default {
    components: { AppModal, ContractForm,  },
    methods: {
        /**
         * retourne à la route précédente
         */
        routeToParent() {
            this.$router.go(-2);
        }
    }
}
</script>