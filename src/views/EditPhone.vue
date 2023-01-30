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
                v-if="checkPhoneToEdit"
                v-model:type = ressourceTelephone.type
                v-model:numero = ressourceTelephone.numero>
            </form-phone>

            <alert-message v-else variant="warning">Aucun élément trouvé</alert-message>
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
            checkPhoneToEdit: false
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
         */
        record() {
            // Verrouille le status de chargement
            this.pending.telephone = true;

            // Enregistre les informations
            this.$app.apiPost('structurePersonnel/POST/'+this.openedElement.id+'/telephone/'+this.$route.params.idPhone, {
                numero: this.ressourceTelephone.numero,
                type: this.ressourceTelephone.type
            })
            .then((data) => {
                // Met à jour le store avec les nouvelles informations
                this.updateRessource({
                    ressource: 'telephones',
                    data
                });
                console.log(data)
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
         * Si l'object telephone exite ou que le idPhone == 0, on passe la variable checkPhoneToEdit a true
         * 
         * @param {number} idPhone          id de la ressource telephone
         * 
         * @returns {Object}
         */
        getRessource(idPhone) {
                let oTelephone = this.openedElement.oPersonne.telephones.find(e => e.id == idPhone);

                if (oTelephone) {
                    this.checkPhoneToEdit = true;

                    this.ressourceTelephone.type = oTelephone.type;
                    this.ressourceTelephone.numero = oTelephone.numero
                }

                if (this.checkPhoneToEdit == false && this.$route.params.idPhone == 0) {
                    this.checkPhoneToEdit = true
                }
        }
    },

    beforeRouteUpdate(to) {
        this.getRessource(to.params.idPhone);
    },

    mounted() {
        this.getRessource(this.$route.params.idPhone);
    }
}
</script>