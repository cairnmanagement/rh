<template>
    <AppModal title="Ajouter une adresse postale" size="md" @modal-hide="routeToParent()" :submitBtn="true" :cancelBtn="true">
        <add-postal-address></add-postal-address>
    </AppModal>
</template>
<script>
import AddPostalAddress from '../components/AddPostalAddress.vue';
import AppModal from '../components/pebble-ui/AppModal.vue';
export default {
    components: { AppModal, AddPostalAddress },
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