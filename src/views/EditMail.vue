<template>
    <AppModal 
        :title="this.$route.params.idMail == 0 ?'Nouveau email' :' Modification de l\'email'" 
        size="md"
        @submit="record()" 
        @modal-hide="routeToParent()" 
        :submitBtn="true" 
        :cancelBtn="true"
        :pending="pending.email">
            <FormMailAddress 
                v-if="checkEmailEdit"
                v-model:type = ressourceEmail.type
                v-model:adresse = ressourceEmail.adresse>
            </FormMailAddress>
            
            <alert-message v-else variant="warning">Aucun email trouvé</alert-message>
    </AppModal>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import AppModal from '../components/pebble-ui/AppModal.vue';
import FormMailAddress from '../components/FormMailAddress.vue';
import AlertMessage from '../components/pebble-ui/AlertMessage.vue';

export default {
    components: { AppModal, FormMailAddress, AlertMessage },

    data() {
        return {
            pending: {
                email: false
            },
            ressourceEmail: {
                type: '',
                adresse: ''
            },
            checkEmailEdit: false
        }
    },

    computed: {
        ...mapState(['openedElement']),
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
            this.pending.email = true;

            let apiUrl = `structurePersonnel/POST/${this.openedElement.id}/email/${this.$route.params.idMail}`;

            let query = {
                type: this.ressourceEmail.type,
                adresse: this.ressourceEmail.adresse
            };
            
            // Enregistre les informations
            this.$app.apiPost(apiUrl, query).then((data) => {
                // Met à jour le store avec les nouvelles informations
                this.updateRessource({
                    ressource: 'emails',
                    data
                });
                
                this.routeToParent();
            })
            .catch(this.$app.catchError)
            .finally(() => {
                // Déverouille le status de chargement
                this.pending.email = false;
            });
        },

        /**
         * Récupère l'email au niveau du store en fonction de idMail.
         * 
         * @param {number} idMail           l'id de l'entité email
         */
        getRessource(idMail) {
            let oMail = this.openedElement.oPersonne.emails.find(e => e.id == idMail);

            if (oMail) {
                this.checkEmailEdit = true;

                this.ressourceEmail.type = oMail.type;
                this.ressourceEmail.adresse = oMail.adresse;
            }
        }
    },

    beforeRouteUpdate(to) {
        this.getRessource(to.params.idMail);
    },

    mounted() {
        if (0 == this.$route.params.idMail) {
            this.checkEmailEdit = true;
        }

        if (this.openedElement.oPersonne.emails) {
            this.getRessource(this.$route.params.idMail);
        }
    }
}
</script>