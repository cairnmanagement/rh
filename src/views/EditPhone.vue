<template>
    <AppModal 
        :title="this.$route.params.idPhone == 0 ?'Nouveau téléphone' :'Modification téléphone'"
        size="md" 
        @submit="record()" 
        @modal-hide="routeToParent()" 
        :submitBtn="true" 
        :cancelBtn="true" 
        :pending="pending.telephone">
            <form-phone
                v-if="checkPhoneEdit"
                v-model:type = ressourceTelephone.type
                v-model:numero = ressourceTelephone.numero>
            </form-phone>

            <alert-message v-else variant="warning">Aucun téléphone trouvé</alert-message>
    </AppModal>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppModal from '../components/pebble-ui/AppModal.vue';
import FormPhone from '../components/FormPhone';
import AlertMessage from '../components/pebble-ui/AlertMessage.vue';

export default {
    components: { AppModal, FormPhone, AlertMessage },

    data() {
        return {
            pending: {
                telephone: false
            },
            ressourceTelephone: {
                type: '',
                numero: ''
            },
            checkPhoneEdit: false
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
         * Enregistre les informations soumises sur la base de données 
         * Et met a jour le store
         */
        record() {
            // Verrouille le status de chargement
            this.pending.telephone = true;

            let apiUrl = `structurePersonnel/POST/${this.openedElement.id}/telephone/${this.$route.params.idPhone}`

            let query = {
                type: this.ressourceTelephone.type,
                numero: this.ressourceTelephone.numero
            }

            // Enregistre les informations
            this.$app.apiPost(apiUrl, query).then((data) => {
                // Met à jour le store avec les nouvelles informations
                this.updateRessource({
                    ressource: 'telephones',
                    data
                });
                this.routeToParent();
            })
            .catch(this.$app.catchError)
            .finally(() => {
                // Déverouille le status de chargement
                this.pending.telephone = false;
            });

        },

        /**
         * Récupère les informations de la ressource au niveau du store depuis l'idPhone passé dans l'URL.
         * Si l'object telephone exite ou que le idPhone == 0, on passe la variable checkPhoneEdit a true
         * 
         * @param {number} idPhone          id de la ressource telephone
         * 
         * @returns {Object}
         */
        getRessource(idPhone) {
                let oTelephone = this.openedElement.oPersonne.telephones.find(e => e.id == idPhone);

                if (oTelephone) {
                    this.checkPhoneEdit = true;

                    this.ressourceTelephone.type = oTelephone.type;
                    this.ressourceTelephone.numero = oTelephone.numero
                }
        }
    },

    beforeRouteUpdate(to) {
        this.getRessource(to.params.idPhone);
    },

    mounted() {
        if (this.$route.params.idPhone == 0) {
            this.checkPhoneEdit = true;
        }

        if (this.openedElement.oPersonne.telephones) {
            this.getRessource(this.$route.params.idPhone);
        }
    }
}
</script>