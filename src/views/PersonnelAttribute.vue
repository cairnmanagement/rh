<template>
    <app-modal
        :title="titleModal"
        size="lg"
        @modal-hide="routeToParent()"
        :submit-btn="false"
        :cancel-btn="false"
        :footer="false">

        <attribute-form 
            @cancel="routeToParent()" 
            @updated="updatePersonnelAndClose" 
            :personnel="openedPersonnel" 
            :attributeConfig="attributeConfig" />
            
    </app-modal>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import AppModal from '../components/pebble-ui/AppModal.vue';
import AttributeForm from '../components/personnel/AttributeForm.vue';

export default {

    components: { AppModal, AttributeForm },

    data() {
        return {
            attributeConfigs: [
                {
                    type: "secteur",
                    title: "Affecter un secteur",
                    collectionName: "personnelSecteurs"
                },
                {
                    type: "fonction",
                    title: "Affecter une fonction",
                    collectionName: "personnelFonctions"
                }
            ]
        }
    },

    computed: {
        ...mapState(["openedPersonnel"]),

        /**
         * Retourne le titre de la modale
         */
        titleModal() {
            return this.attributeConfig?.title ?? "Modifier un attribut";
        },

        /**
         * Retourne la configuration du type d'attribut actif
         */
        attributeConfig() {
            const type = this.$route.name.replace(/Attribute/, "").toLowerCase();
            return this.attributeConfigs.find(e => e.type === type);
        }
    },

    methods: {
        ...mapActions(["refreshOpened"]),

        updatePersonnelAndClose(personnel) {
            this.refreshOpened(personnel);
            this.routeToParent();
        },

        /**
         * Retrourne à la vue précédente
         */
        routeToParent() {
            this.$router.go(-1);
        },
    }
}

</script>