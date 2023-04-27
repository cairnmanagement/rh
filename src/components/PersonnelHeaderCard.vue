<template>

    <div class="card-body">
        <div class="position-relative">
            <personnel-name :personnel="openedElement" display="vertical" size="xl" :useTitle="true" />
            <span v-if="openedElement.matricule" class="badge text-bg-secondary position-absolute" style="top:0px;">{{openedElement.matricule}}</span>
        </div>

        <div v-if="openedElement.oContrat" class="d-flex align-items-center justify-content-center">
            <span v-if="!openedElement.oContrat.duree_indeterminee">pas de contrat</span>
            <span v-if="openedElement.oContrat.duree_indeterminee == 'OUI'">CDI depuis le {{formatDate(startContrat)}}</span>
            <span v-if="openedElement.oContrat.duree_indeterminee == 'NON'">CDD jusqu'au {{formatDate(endContrat)}}</span>
        </div>

        <div v-else>
            Cette personne n'a jamais fait partie des effectifs de la société
        </div>
    </div>

</template>


<script>
import { mapState } from 'vuex'
import date from 'date-and-time';

import PersonnelName from './personnel/PersonnelName.vue';

export default {
    computed: {
        ...mapState(['openedElement']),

        /**
         * Retourne la date d'entrée exacte du contrat
         * 
         * @return {DateTime}
         */
        startContrat() {
            if (this.openedElement.dentree_relative && this.openedElement.dentree_relative != "0000-00-00 00:00:00") {
                return this.openedElement.dentree_relative;
            }

            return this.openedElement.dentree;
        },

        /**
         * Retourne la date de sortie exacte du contrat
         * 
         * @return {DateTime}
         */
        endContrat() {
            if(this.openedElement.dsortie_reelle && this.openedElement.dsortie_reelle != "0000-00-00 00:00:00") {
                return this.openedElement.dsortie_reelle;
            }
                        
            return this.openedElement.dsortie;
        },
    },

    components: { PersonnelName },

    methods: {
        /**
         * Formate la date au format DD/MM/YYYY
         * 
         * @param {DateTime}
         * 
         * @returns {String}
         */
        formatDate(contratDate) {
            return date.format(new Date(contratDate), 'DD/MM/YYYY');
        }
    }

}

</script>