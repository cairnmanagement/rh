+<template>
    <div class="container py-3">
        <contrat-type-consult v-if="'ContratType' == routeName"></contrat-type-consult>
        <contrat-qualification-item v-else-if="'ContratQualification' === routeName"></contrat-qualification-item>
        <contrat-statut-item v-else-if="'ContratStatut' === routeName"></contrat-statut-item>
    </div>
</template>

<script>

import ContratTypeConsult from '@/components/parametre/ContratTypeConsult.vue'
import ContratQualificationItem from '@/components/parametre/ContratQualificationItem.vue'
import ContratStatutItem from '@/components/parametre/ContratStatutItem.vue'

export default {
    name: 'ParametreConsult',

    components: {ContratTypeConsult, ContratQualificationItem, ContratStatutItem},

    computed: {
        /**
         * Retourne la nom de la route actuelle
         */
        routeName() {
            return this.$route.name;
        }
    }
    
}
</script>