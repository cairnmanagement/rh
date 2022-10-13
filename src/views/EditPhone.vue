<template>
    <AppModal :title="this.$route.params.idPhone ?'Modification numéro' :'Nouveau numéro'" size="md" @submit="record()" @modal-hide="routeToParent()" :submitBtn="true" :cancelBtn="true" :pending="pending.telephone">
        <FormPhone :telephone="ressource" @edit-type="editType" @edit-numero="editNumero" v-if="ressource"></FormPhone>
        <div class="alert-alert-warning" v-else>Aucun élément trouvé</div>
    </AppModal>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import AppModal from '../components/pebble-ui/AppModal.vue';
import FormPhone from '../components/FormPhone';

export default {
    components: { AppModal, FormPhone },

    data() {
        return {
            pending: {
                telephone: false
            },
            ressource: null
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
         * Affecte la valeur du type à la ressource stockée dans data
         * 
         * @param {String} val Nouveau type
         */
        editType(val) {
            this.ressource.type = val;
        },

        /**
         * Affecte la valeur du numéro de téléphone à la ressource stockée dans data
         * 
         * @param {String} val Nouveau numéro de téléphone
         */
        editNumero(val) {
            this.ressource.numero = val;
        },

        /**
         * Enregistre les informations sur la base de données
         */
        record() {
            // Verrouille le status de chargement
            this.pending.telephone = true;

            // Enregistre les informations
            this.$app.apiPost('structurePersonnel/POST/'+this.openedElement.id+'/telephone/'+this.ressource.id, {
                numero: this.ressource.numero,
                type: this.ressource.type
            })
            .then((data) => {
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
         * 
         * @returns {Object}
         */
        getRessource(idPhone) {
            let ressource = this.openedElement.oPersonne.telephones.find(e => e.id == idPhone);
            this.ressource = ressource ? JSON.parse(JSON.stringify(ressource)) : null;
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