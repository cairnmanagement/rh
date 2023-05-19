<template>
    
    <AppModal 
        :title="`Contrat n°${this.$route.params.idContrat}`" 
        size="lg" 
        @modal-hide="routeToParent()"
        :className="'modal-dialog-scrollable'"
        :cancelBtn="true">
        
        <overview :contrat="contrat" />
    </AppModal>

</template>

<script>
import {mapState} from 'vuex';
import Overview from '../components/contrat/Overview.vue';
import AppModal from '../components/pebble-ui/AppModal.vue';


export default {
    components: { AppModal, Overview},

    computed: {
        ...mapState(['openedContrats']),

        /**
         * Retourne le contrat chargé via l'ID de l'URL
         * 
         * @return {object}
         */
        contrat() {
            let contrat = this.openedContrats.find(e => e.id == this.$route.params.idContrat);

            return contrat;
        },

    },


    methods: {
        /**
         * retourne à la route précédente
         */
        routeToParent() {
            this.$router.go(-1);
        },
    }
}
</script>