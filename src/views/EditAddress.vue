<template>
    <AppModal
        :title="this.$route.params.idAdress == 0 ?'Nouvelle adresse postale' :'Modification de l\'adresse postale'"
        size="md"
        @submit="record()"
        @modal-hide="routeToParent()"
        :submitBtn="true"
        :cancelBtn="true"
        :pending="pending.adress">
            <FormPostalAddress 
                v-if="checkAdressEdit"
                v-model:type = ressourceAdress.type
                v-model:voie = ressourceAdress.voie
                v-model:complement = ressourceAdress.complement
                v-model:cp = ressourceAdress.cp
                v-model:localite = ressourceAdress.localite>
            </FormPostalAddress>

            <alert-message v-else variant="warning">Aucune adresse postale trouvée</alert-message>
    </AppModal>
</template>

<script>
import AppModal from '../components/pebble-ui/AppModal.vue';
import FormPostalAddress from '../components/personnel/contact/FormPostalAddress.vue';
import { mapActions, mapState } from 'vuex';
import AlertMessage from '../components/pebble-ui/AlertMessage.vue';

export default {
    components: { AppModal, FormPostalAddress, AlertMessage },

    data() {
        return {
            pending: {
                adress : false
            },
            ressourceAdress: {
                type: '',
                voie: '',
                complement: '',
                cp: '',
                localite: '',
            },
            checkAdressEdit: false

        }
    },

    computed: {
        ...mapState(['openedPersonnel']),
    },

    methods: {
        ...mapActions(['updateRessource']),

        /**
         * retourne à la route précédente
         */
        routeToParent() {
            this.$router.go(-1);
        },
        
        /**
         * Enregistre les informations soumises dans la base de données 
         * Et met a jour le store
         */
        record() {
            // Verrouille le status de chargement
            this.pending.adress = true;

            let apiUrl = `structurePersonnel/POST/${this.openedPersonnel.id}/adresse/${this.$route.params.idAdress}`

            let query = {
                type: this.ressourceAdress.type,
                voie: this.ressourceAdress.voie,
                complement: this.ressourceAdress.complement,
                cp: this.ressourceAdress.cp,
                localite: this.ressourceAdress.localite,
            }

            // Enregistre les informations
            this.$app.apiPost(apiUrl, query).then((data) => {
                // Met à jour le store avec les nouvelles informations
                this.updateRessource({
                    ressource: 'adresses',
                    data
                });
                
                this.routeToParent();
            })
            .catch(this.$app.catchError)
            .finally(() => {
                // Déverouille le status de chargement
                this.pending.adress = false;
            });

        },

        /**
         * Récupère les informations de la ressource au niveau du store depuis l'idAdress passé dans l'URL.
         * 
         * @param {number} idAdress         l'id de l'entité adresse postal
         */
        getRessource(idAdress) {
            let oAdress = this.openedPersonnel.oPersonne.adresses.find(e => e.id == idAdress);

            if (oAdress) {
                this.checkAdressEdit = true;

                this.ressourceAdress.type = oAdress.type;
                this.ressourceAdress.voie = oAdress.voie;
                this.ressourceAdress.complement = oAdress.complement;
                this.ressourceAdress.cp = oAdress.cp;
                this.ressourceAdress.localite = oAdress.localite;
            }
        },
    },
        
    beforeRouteUpdate(to) {
        this.getRessource(to.params.idAdress);
    },

    mounted() {
        if (0 == this.$route.params.idAdress) {
            this.checkAdressEdit = true;
        }

        if (this.openedPersonnel.oPersonne.adresses) {
            this.getRessource(this.$route.params.idAdress);
        }
    }

        
    
}
</script>