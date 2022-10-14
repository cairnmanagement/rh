<template>
    <AppModal
        :title="this.$route.params.idAdress ?'Modifier l\'adresse postale' :'Ajouter une adresse postale'"
        size="md"
        @submit="record()"
        @modal-hide="routeToParent()"
        :submitBtn="true"
        :cancelBtn="true"
        :pending="pending.adresse">
            <FormPostalAddress 
                :adresse="ressource"
                @edit-voie="editVoie"
                @edit-complement="editComplement"
                @edit-cp="editCP"
                @edit-localite="editLocalite"
                @edit-type="editType"
                >
            </FormPostalAddress>
        <div class="alert alert-warning" >Aucun élément trouvé</div>
    </AppModal>
</template>
<script>

import AppModal from '../components/pebble-ui/AppModal.vue';
import FormPostalAddress from '../components/FormPostalAddress.vue';
import { mapActions, mapState } from 'vuex';

export default {
    components: { AppModal, FormPostalAddress },

    data() {
        return {
            pending: {
                adresse : false
            },
            ressource: null
        }
    },

    computed: {

        ...mapState(['openedElement']),

        // ressource() {
        //     let ressource = this.openedElement.oPersonne.adresses.find(e => e.id == this.$route.params.idAdress);
        //     return ressource;
        // }
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
         * Affecte la valeur de la voie à la ressource stockée dans data
         * 
         * @param {String} val Nouveau numéro de téléphone
         */
        editVoie(val) {
            this.ressource.voie = val;
        },
        /**
         * Affecte la valeur du complément d'adresse à la ressource stockée dans data
         * 
         * @param {String} val Nouveau complement
         */
        editComplement(val) {
            this.ressource.complement = val;
        },
        /**
         * Affecte la valeur du code postal à la ressource stockée dans data
         * 
         * @param {String} val Nouveau code postal
         */
        editCP(val) {
            this.ressource.cp= val;
        },
        /**
         * Affecte la valeur de la localité à la ressource stockée dans data
         * 
         * @param {String} val Nouvelle localite
         */
        editLocalite(val) {
            this.ressource.localite= val;
        },
        // /**
        //  * Affecte la valeur du pays à la ressource stockée dans data
        //  * 
        //  * @param {String} val Nouveau numéro de téléphone
        //  */
        // // editPays(val) {
        // //     this.ressource.pays= val;
        // // },
        record() {
            // Verrouille le status de chargement
            this.pending.adresse = true;

            // Enregistre les informations
            this.$app.apiPost('structurePersonnel/POST/'+this.openedElement.id+'/adresse/'+this.ressource.id, {
                type: this.ressource.type,
                voie: this.ressource.voie,
                complement: this.ressource.complement,
                cp: this.ressource.cp,
                localite: this.ressource.localite,

            })
            .then((data) => {
                // Met à jour le store avec les nouvelles informations
                this.updateRessource({
                    ressource: 'adresses',
                    data
                });
                console.log('adresse',data)
                this.routeToParent();
            })
            .catch(this.$app.catchError)
            .finally(() => {
                // Déverouille le status de chargement
                this.pending.adresse = false;
            });

        },

        /**
         * Récupère les informations de la ressource au niveau du store depuis l'idPhone passé dans l'URL.
         * 
         * @returns {Object}
         */
        getRessource(idAdress) {
            let ressource = this.openedElement.oPersonne.adresses.find(e => e.id == idAdress);
            this.ressource = ressource ? JSON.parse(JSON.stringify(ressource)) : null;
        },
        
        beforeRouteUpdate(to) {
        this.getRessource(to.params.idAdress);
        },

        mounted() {
            this.getRessource(this.$route.params.idAdress);
        }

        
    }
}
</script>