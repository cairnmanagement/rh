<template>
    <app-modal
        :title="titleModal"
        size="lg"
        @submit="record()"
        @modal-hide="routeToParent()"
        :submit-btn="true"
        :cancel-btn="true"
        :pending="pending.endContrat">
            <contract-delete-form
                v-model:motif_fin_id = "endContratItem.motif_fin_id"
                v-model:dsortie_reelle = "endContratItem.dsortie_reelle"/>
    </app-modal>
</template>

<script>
import ContractDeleteForm from '../components/ContractDeleteForm.vue';
import AppModal from '../components/pebble-ui/AppModal.vue';
import date from 'date-and-time';

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
                motif_fin_id: 0
            }
        }
    },

    computed: {
        /**
         * Renvoie le titre de la modal avec le numero de contrat spécifié dans l'url
         */
        titleModal() {
            return `Mettre fin au contrat n°${this.$route.params.idContrat}`;
        },

        avenant() {

            if ("Avenant" === this.$route.name) {

                this.avenantPossibleIfDsortie();

                return true;
            }

            return false;
        },

        contrat() {
            const contrat = this.openedContrats.find(e => e.id == this.$route.params.idContrat);
            return contrat;
        }
    },

    methods: {
        /**
         * check si le contrat a une date de fin et si il est possible de faire un avanent (j+1 de la fin de cotnrat)
         */
         avenantPossibleIfDsortie() {
            if (this.contrat.dsortie || this.contrat.dsortie_reelle) {
                let now = new Date();
                let endContrat = this.contrat.dsortie_reelle ?? this.dsortie;
                
                if (date.addDays(new Date(endContrat), +1) < now) {
                    this.$router.push({name:'EditContrat', params:{id: this.$route.params.id, idContrat: 0}});
                }
            }
        },

        /**
         * retourne à la route précédente
         */
        routeToParent() {
            this.$router.go(-1);
        },

        /**
         * Enregistre la fin du contrat avec sont motifs de cloture
         */
        record() {
            this.pending.endContrat = true;

            const apiUrl = `v2/contrat/${this.$route.params.idContrat}/stop`;

            this.$app.api.post(apiUrl, this.endContratItem).then(() => {
                if (this.avenant) {
                    this.$router.push({name:'EditContrat', params:{id: this.$route.params.id, idContrat: 0}});
                }
                this.$router.push({name:'Personnel', params: {id: this.$route.params.id}});
            })
            .catch(this.$app.catchError)
            .finally(() => this.pending.endContrat = false);
        }
    }
}

</script>