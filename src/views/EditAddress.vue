<template>
    <AppModal :title="this.$route.params.idAdress ?'Modifier l\'adresse postale' :'Ajouter une adresse postale'" size="md" @modal-hide="routeToParent()" :submitBtn="true" :cancelBtn="true">
        <FormPostalAddress :adresse="ressource"></FormPostalAddress>
    </AppModal>
</template>
<script>

import AppModal from '../components/pebble-ui/AppModal.vue';
import FormPostalAddress from '../components/FormPostalAddress.vue';
import { mapState } from 'vuex';

export default {
    components: { AppModal, FormPostalAddress },

    computed: {

        ...mapState(['openedElement']),

        ressource() {
            let ressource = this.openedElement.oPersonne.adresses.find(e => e.id == this.$route.params.idAdress);
            return ressource;
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