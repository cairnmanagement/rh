<template>
    <AppModal :title="this.$route.params.id ?'Modification Contact' :'Nouveau Contact'" size="lg" @modal-hide="routeToParent()" :submitBtn="true" :cancelBtn="true">
        <ContactForm></ContactForm>
    </AppModal>
</template>
<script>
import AppModal from '../components/pebble-ui/AppModal.vue';
import ContactForm from '../components/ContactForm.vue';
export default {
    components: { AppModal, ContactForm },
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