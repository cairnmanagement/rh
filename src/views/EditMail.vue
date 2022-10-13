<template>
    <AppModal :title="this.$route.params.idMail ?'Modification de l\'adresse mail' :'Nouvelle adresse mail'" 
                size="md" @modal-hide="routeToParent()" :submitBtn="true" :cancelBtn="true">
            <FormMailAddress :mail="ressource"/>
    </AppModal>
</template>
<script>
import { mapState } from 'vuex';
import FormMailAddress from '../components/FormMailAddress.vue';
import AppModal from '../components/pebble-ui/AppModal.vue';
export default {

    components: { AppModal, FormMailAddress },

    methods: {
        /**
         * retourne à la route précédente
         */
        routeToParent() {
            this.$router.go(-1);
        }
    },

    computed: {
        ...mapState(['openedElement']),

        ressource() {
            let ressource = this.openedElement.oPersonne.emails.find(e => e.id == this.$route.params.idMail);
            return ressource;
        }
    },

    
}
</script>