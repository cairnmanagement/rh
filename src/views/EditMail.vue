<template>
    <AppModal 
        :title="this.$route.params.idMail == 0 ?'Nouvelle adresse mail' :' Modification adresse mail'" 
        size="md"
        @submit="record()" 
        @modal-hide="routeToParent()" 
        :submitBtn="true" 
        :cancelBtn="true">
            <FormMailAddress 
                :mail="ressource" 
                @edit-type="editType" 
                @edit-adresse="editAdresse" 
                v-if="ressource">
            </FormMailAddress>
            
            <div class="alert alert-warning" v-else>Aucun élement trouvé</div>
    </AppModal>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import AppModal from '../components/pebble-ui/AppModal.vue';
import FormMailAddress from '../components/FormMailAddress.vue';

export default {

    components: { AppModal, FormMailAddress },

    data() {
        return {
            pending: {
                mail: false
            },
            ressource: null,

            defaultRessource: {
                type: '',
                adresse: ''
            }
        }
    },

    computed: {
        ...mapState(['openedElement']),

        // ressource() {
        //     let ressource = this.openedElement.oPersonne.emails.find(e => e.id == this.$route.params.idMail);
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
         * Affecte la valeur de l'adresse mail  à la ressource stockée dans data
         * 
         * @param {String} val Nouvelle adresse mail
         */
        editAdresse(val) {
            this.ressource.adresse = val;
        },


        /**
         *  Enregistre les informations soumises sur la base de données
         */
        record() {
            // Verrouille le status de chargement
            this.pending.mail = true;

            // Enregistre les informations
            this.$app.apiPost('structurePersonnel/POST/'+this.openedElement.id+'/email/'+this.ressource.id, {
                adresse: this.ressource.adresse,
                type: this.ressource.type,
            })
            .then((data) => {
                // Met à jour le store avec les nouvelles informations
                console.log('avantupdateRessource', this.ressource, this.ressource.id)
                this.updateRessource({
                    ressource: 'emails',
                    data
                });
                console.log('aprèsUpdateDataetressource',data,this.ressource, data.id);
                
                this.routeToParent();
            })
            
            .catch(this.$app.catchError)
            .finally(() => {
                // Déverouille le status de chargement
                this.pending.mail = false;
            });
            console.log('ressources finally update',this.ressource, this.ressource.id)

        },

        /**
         * Récupère les informations de la ressource au niveau du store depuis l'idMail passé dans l'URL.
         * 
         * @returns {Object}
         */
        getRessource(idMail) {
            if(!this.openedElement.oPersonne.emails){
                this.ressource = this.defaultRessource;
                alert('pas d\'emails')
            }
            else { 
                let ressource = this.openedElement.oPersonne.emails.find(e => e.id == idMail);
                this.ressource = ressource ? JSON.parse(JSON.stringify(ressource)) : this.defaultRessource;
                console.log('getRessource', idMail, this.ressource)
            }
        }
    },

    beforeRouteUpdate(to) {
        this.getRessource(to.params.idMail);
    },

    mounted() {
        this.getRessource(this.$route.params.idMail);
    }
}
</script>