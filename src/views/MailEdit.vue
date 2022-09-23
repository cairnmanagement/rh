<template>
    <AppModal title="Ajouter une adresse mail" size="md" @modal-hide="routeToParent()" :submitBtn="true" :deleteBtn="true">
        <add-mail-address/>
    </AppModal>
</template>
<script>
import AddMailAddress from '../components/AddMailAddress.vue';
import AppModal from '../components/pebble-ui/AppModal.vue';
export default {
    components: { AppModal, AddMailAddress },
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