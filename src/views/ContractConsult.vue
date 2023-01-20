<template>
    
    <AppModal 
        :title="titleModal" 
        size="lg" 
        @submit="record()"
        @modal-hide="routeToParent()"
        :className="'modal-dialog-scrollable'"
        :cancelBtn="true"
        :submitBtn="submit">
        
        <contract-consultation v-if="contratExist" :contrat="contrat" />
        <contract-form-2 v-else />
        
    </AppModal>
    
</template>

<script>
import {mapState} from 'vuex';
import ContractConsultation from '../components/ContractConsultation.vue';
import ContractForm2 from '../components/ContractForm2.vue';
import AppModal from '../components/pebble-ui/AppModal.vue';


export default {
    components: { AppModal, ContractConsultation, ContractForm2},

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

        /**
         * Rtourne le titre de la modal en fonction si un contrat est fourni ou pas
         * 
         * @return {string}
         */
        titleModal() {
            if (this.contratExist) {
                return `Contrat de travail n°${this.$route.params.idContrat}`;
            }

            return 'Nouveau contrat de travail';
        },  

        /**
         * Check si un id de contrat a été fourni dans l'url
         * 
         * @return {boolean}
         */
        contratExist() {
            if (this.$route.params.idContrat == '0') {
                return false;
            }

            return true;
        },

        /**
         * Permet l'affichage du button submit de la modal si aucun contrat
         * ou un contrat en mode édition
         * 
         * @return {boolean}
         */
        submit() {
            return this.contratExist ? false : true;
        }
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