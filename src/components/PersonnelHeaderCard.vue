<template>
    <div class="card mb-3">
        <div class="card-body">
            <div class="position-relative">
                <user-image :name="openedElement.oPersonne.nom" size="xl"></user-image>
                <span v-if="openedElement.matricule" class="badge bg-secondary position-absolute" style="top:0px;">{{openedElement.matricule}}</span>
            </div>
            <h3>{{openedElement.oPersonne.prenom}} {{openedElement.oPersonne.nom}}</h3>
            <div v-if="openedElement.oContrat" class="align-items-center justify-content-between" >
                <div class="d-flex align-items-center justify-content-center">
                    <span v-if="!openedElement.oContrat.duree_indeterminee">pas de contrat</span>
                    <span v-if="openedElement.oContrat.duree_indeterminee == 'OUI'">CDI depuis le {{formatDateFr(openedElement.dentree)}}</span>
                    <span v-if="openedElement.oContrat.duree_indeterminee == 'NON'">CDD jusqu'au {{formatDateFr(openedElement.dsortie)}}</span>
                </div>
            </div>
            <div v-else>
                Cette personne n'a jamais fait partie des effectifs de la société
            </div>
            
            
        </div>
    </div>
</template>


<script>

import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['openedElement'])
    }

}

</script>