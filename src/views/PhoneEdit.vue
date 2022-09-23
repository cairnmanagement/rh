<template>
    <AppModal title="Ajouter un numéro de téléphone" size="md" @modal-hide="routeToParent()" :submitBtn="true" :deleteBtn="true">
        <AddPhoneNumber></AddPhoneNumber>
    </AppModal>
</template>
<script>
import AddPhoneNumber from '../components/AddPhoneNumber.vue';
import AppModal from '../components/pebble-ui/AppModal.vue';
export default {
    components: { AppModal, AddPhoneNumber },
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