<template>
    <AppModal title="Ajouter un numéro de téléphone" size="md" @modal-hide="routeToParent()" :submitBtn="1" :deleteBtn="1">
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
            this.$router.push('/');
        }
    }
}
</script>