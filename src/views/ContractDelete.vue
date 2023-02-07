<template>
    <app-modal
        :title="titleModal"
        size="lg"
        @submit="record()"
        @modal-hide="routeToParent()"
        :submit-btn="true"
        :cancel-btn="true"
        :pending="pending.endContrat" >
            <contract-delete-form
                v-if="motifsList"
                :motifsList = "motifsList"
                v-model:motif = "endContratItem.motif"
                v-model:dsortie_reelle = "endContratItem.dsortie_reelle"/>
    </app-modal>
</template>

<script>
import ContractDeleteForm from '../components/ContractDeleteForm.vue';
import AppModal from '../components/pebble-ui/AppModal.vue';

export default {
    components: { AppModal, ContractDeleteForm },

    data() {
        return {
            pending: {
                endContrat: false,
                motifCloture: true
            },
            endContratItem: {
                dsortie_reelle: '',
                motif: 0
            },
            motifsList: null
        }
    },

    computed: {
        /**
         * Renvoie le titre de la modal avec le numero de contrat spécifié dans l'url
         */
        titleModal() {
            return `Mettre fin au contrat n°${this.$route.params.idContrat}`;
        }
    },

    methods: {
        /**
         * retourne à la route précédente
         */
         routeToParent() {
            this.$router.go(-1);
        },

        /**
         * Récupère la liste des motifs de cloture de contrat
         */
        getMotifsCloture() {
            this.pending.motifCloture = true
            ;
            let apiUrl = `structurePersonnelContrat/GET/listMotifsCloture`;

            this.$app.apiGet(apiUrl).then(response => {
                this.motifsList = response;
            })
            .catch(this.$app.catchError)
            .finally(() => this.pending.motifCloture = false);
        } ,

        /**
         * Enregistre la fin du contrat avec sont motifs de cloture
         */
        record() {
            this.pending.endContrat = true;

            let apiUrl = `structurePersonnel/POST/${this.$route.params.id}/contrat/${this.$route.params.idContrat}/stop`;

            this.$app.apiPost(apiUrl, this.endContratItem).then(resp => {
                console.log('resp', resp);
            })
            .catch(this.$app.catchError)
            .finally(() => this.pending.endContrat = false);
        }
    },

    mounted() {
        this.getMotifsCloture();
    }
}

</script>