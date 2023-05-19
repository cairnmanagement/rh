<template>

    <div class="card-body">

        <personnel-identity :personnel="openedPersonnel" display="vertical" size="xl" :useTitle="true" :showMatricule="true" />

        <contrat-status :contrat="openedPersonnel.oContrat" />

    </div>

</template>


<script>
import { mapState } from 'vuex'

import PersonnelIdentity from './personnel/PersonnelIdentity.vue';
import ContratStatus from './personnel/ContratStatus.vue';

export default {
    computed: {
        ...mapState(['openedPersonnel']),
    },

    components: { PersonnelIdentity, ContratStatus }

}

</script>