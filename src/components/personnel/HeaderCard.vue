<template>

    <div class="card-body">

        <div class="position-absolute end-0 top-0 p-2">
            <actions-menu :personnel="openedPersonnel" @updated="updatePersonnel" />
        </div>

        <personnel-identity :personnel="openedPersonnel" display="vertical" size="xl" :useTitle="true" :showMatricule="true" />

        <div class="text-center my-2 text-muted" v-if="isArchived">
            <i class="bi bi-archive"></i>
            Ce personnel est archivé. Par défaut, il est masqué dans la recherche.
        </div>

        <div class="text-center my-2">
            <contrat-status :contrat="openedPersonnel.oContrat" @updated="updatePersonnel" />
        </div>


    </div>

</template>


<script>
import { mapActions, mapState } from 'vuex'

import PersonnelIdentity from './PersonnelIdentity.vue';
import ContratStatus from '../contrat/ContratStatus.vue';
import ActionsMenu from './actions/ActionsMenu.vue';

export default {
    
    components: { PersonnelIdentity, ContratStatus, ActionsMenu },

    computed: {
        ...mapState(['openedPersonnel']),

        /**
         * Retourne true si le personnel est archivé
         */
        isArchived() {
            return this.openedPersonnel.archived === "OUI" ? true : false;
        }
    },

    methods: {
        ...mapActions(['refreshOpened']),

        /**
         * Met à jour les informations du personnel dans le store.
         * 
         * @param {object} personnel Nouvelles informations sur le personnel
         */
        updatePersonnel(personnel) {
            this.refreshOpened(personnel);
        }
    }

}

</script>