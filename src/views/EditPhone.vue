<template>
    <AppModal :title="this.$route.params.idPhone ?'Modification numéro' :'Nouveau numéro'" size="md" @modal-hide="routeToParent()" :submitBtn="true" :cancelBtn="true">
        <FormPhone :telephone="ressource"></FormPhone>
    </AppModal>
</template>
<script>
import { mapState } from 'vuex';
import AppModal from '../components/pebble-ui/AppModal.vue';
import FormPhone from '../components/FormPhone';

export default {
    components: { AppModal, FormPhone },

    computed: {

        ...mapState(['openedElement']),

        ressource() {
            let ressource = this.openedElement.oPersonne.telephones.find(e => e.id == this.$route.params.idPhone);
            console.log(this.$route.params.idPhone, ressource);
            console.log(this.openedElement);
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