<template>
    <AppModal 
    :title="this.$route.params.id ?'Modification Contact' : 'Nouveau Contact'" 
    size="lg" 
    @submit="record()"
    @modal-hide="routeToParent()" 
    :submitBtn="true" 
    :cancelBtn="true"
    :pending="pending.contact"
    >
        <ContactForm
        :contact="personnel"
        @edit-nom="editNom"
        @edit-prenom="editPrenom"
        @edit-civilite="editCivilite"
        @edit-dn="editDn"
        @edit-lieu-naissance="editlieuNaissance"
        @edit-nss="editNss"
        @edit-nationalite="editNationalite"
        v-if="personnel"></ContactForm>
    </AppModal>
</template>
<script>
import { mapState } from 'vuex';

import AppModal from '../components/pebble-ui/AppModal.vue';
import ContactForm from '../components/ContactForm.vue';

export default {
    components: { AppModal, ContactForm },

    data() {

        return {

            pending: {
                contact : false
            },
            personnel: null,

            defaultPersonnel: {

                nom:'',
                prenom:'',
                civilite:'',
                dn:'',
                lieuNaissance:'',
                nss:'',
                nationalite:'',
            }

        }

    },
    computed: {
        ...mapState(['openedElement']),
    },

    methods: {
        /**
         * retourne à la route précédente
         */
        routeToParent() {
            this.$router.go(-1);
        },

        /**
         * Affecte la valeur du nom au personnel stocké dans data
         * 
         * @param {String} val Nouveau nom
         */
        editNom(val) {
            this.personnel.nom = val;
            console.log('editnom', this.personnel.nom);
        },
        /**
         * Affecte la valeur du prénom au personnel stocké dans data
         * 
         * @param {String} val Nouveau prénom
         */
        editPrenom(val) {
            this.personnel.prenom = val;
            console.log('editprenom', this.personnel.prenom);
        },
        /**
         * Affecte la valeur de la civilite au personnel stocké dans data
         * 
         * @param {String} val Nouvelle civilite
         */
        editCivilite(val) {
            this.personnel.civilite = val;
            console.log('editcivilite', this.personnel.civilite);
        },
        /**
         * Affecte la valeur de la date de naissance au personnel stocké dans data
         * 
         * @param {String} val Nouvelle date de naissance
         */
        editDn(val) {
            this.personnel.dn = val;
            console.log('editdn', this.personnel.dn);
        },
        /**
         * Affecte la valeur du lieu de naissance au personnel stocké dans data
         * 
         * @param {String} val Nouveau lieu de naissance
         */
        editlieuNaissance(val) {
            this.personnel.lieuNaissance = val;
            console.log('editlieuNaissance', this.personnel.lieuNaissance);
        },
        /**
         * Affecte la valeur de la nationalité au personnel stocké dans data
         * 
         * @param {String} val Nouvelle nationalité
         */
        editNationalite(val) {
            this.personnel.nationalite = val;
            console.log('editnationalite', this.personnel.nationalite);
        },
        /**
         * Affecte la valeur du numéro de sécurité sociale au personnel stocké dans data
         * 
         * @param {String} val Nouveau numéro de sécurité sociale
         */
        editNss(val) {
            this.personnel.nss = val;
            console.log('editnss', this.personnel.nss);
        },

        /**
         * Enregistre les informations d'un personnel
         */
        record() {
            //verrouille le statu de chargement
            this.pending.contact = true;
            alert('vous souhaitez enregistrer ces modifications')
            this.$app.apiPost('structurePersonnel/POST/'+this.openedElement.id, {
                nom: this.personnel.nom,
                prenom: this.personnel.prenom,
                civilite: this.personnel.civilite,
                dn: this.personnel.dn,
                lieuNaissance: this.personnel.lieuNaissance,
                nationalite: this.personnel.nationalite,
                nss: this.personnel.nss,

            })
            .then ((data) => {
                console.log(data)
            })
            .catch(this.$app.catchError)
            .finally(() => {
                this.pending.contact = false;
            })
        },
        /**
         * Récupère les informations du contact au niveau du store depuis l'idPersonnel passé dans l'URL.
         * 
         * @returns {Object}
         */
        getContact() {
            if(!this.openedElement){
                this.personnel = this.defaultPersonnel;
            }
            else { 
            
                this.personnel = this.openedElement.oPersonne;
                // this.personnel.prenom = this.openedElement.oPersonne.prenom;
                console.log('getContact', this.personnel)
            }
        }
    },
    beforeRouteUpdate(to) {
        this.getContact(to.params.id);
    },

    mounted() {
        this.getContact(this.$route.params.id);
        console.log('route params id', this.$route.params.id)
        console.log('personnel mounted', this.personnel)
    }


}
</script>