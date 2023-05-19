<template>
    <AppModal 
    :title="titleModal" 
    size="lg" 
    @submit="record()"
    @modal-hide="routeToParent()" 
    :submitBtn="true" 
    :cancelBtn="true"
    :pending="pending.personnel"
    >
        <ContactForm
            v-if="personnelExists"
            v-model:nom = "ressourcePersonnel.nom"
            v-model:prenom = "ressourcePersonnel.prenom"
            v-model:civilite = "ressourcePersonnel.civilite"
            v-model:dn = "ressourcePersonnel.dn"
            v-model:lieu-naissance = "ressourcePersonnel.lieuNaissance"
            v-model:nss = "ressourcePersonnel.nss"
            v-model:nationalite = "ressourcePersonnel.nationalite">
        </ContactForm>

        <alert-message v-else variant="warning">Aucun élément trouvé</alert-message>
    </AppModal>
</template>
<script>
import { mapActions, mapState } from 'vuex';

import AppModal from '../components/pebble-ui/AppModal.vue';
import ContactForm from '../components/ContactForm.vue';
import AlertMessage from '../components/pebble-ui/AlertMessage.vue';

export default {
    components: { AppModal, ContactForm, AlertMessage },

    data() {
        return {
            pending: {
                personnel : false
            },
            ressourcePersonnel: {
                nom:'',
                prenom:'',
                civilite:'',
                dn:'',
                lieuNaissance:'',
                nss:'',
                nationalite:'',
            },
            personnelExists: false

        }

    },
    computed: {
        ...mapState(['openedPersonnel']),

        /**
         * Retourne le titre de la modal
         */
        titleModal() {

            return this.openedPersonnel?.id ? 'Modifier un personnel' : 'Nouveau personnel';

        }
    },

    methods: {
        ...mapActions(['refreshOpened', 'newOpened']),

        /**
         * retourne à la route précédente
         */
        routeToParent() {
            this.$router.go(-1);
        },

        /**
         * Enregistre les informations d'un personnel
         */
        record() {
            this.pending.personnel = true;

            let idPersonnel = 0;

            if (this.openedPersonnel) {
                idPersonnel = this.openedPersonnel.id;
            } 

            if (confirm('Souaitez-vous enregistrer ces modifications ?')) {
                let apiUrl = `structurePersonnel/POST/${idPersonnel}?api_hierarchy=1`;

                let query = {
                    nom: this.ressourcePersonnel.nom,
                    prenom: this.ressourcePersonnel.prenom,
                    civilite: this.ressourcePersonnel.civilite,
                    dn: this.ressourcePersonnel.dn,
                    lieuNaissance: this.ressourcePersonnel.lieuNaissance,
                    nationalite: this.ressourcePersonnel.nationalite,
                    nss: this.ressourcePersonnel.nss,
                }

                this.$app.apiPost(apiUrl, query).then((data) => {
                    if (idPersonnel == 0) {
                        this.newOpened(data);
                    } else {
                        this.refreshOpened(data);
                    }

                    this.$router.push({name: 'Personnel', params: {id: data.id}});
                })
                .catch(this.$app.catchError)
                .finally(() => {
                    this.pending.personnel = false;
                })
            } else {
                this.pending.personnel = false;
            }

        },

        /**
         * Récupère les informations du contact au niveau du store depuis l'idPersonnel passé dans l'URL.
         * 
         * @returns {Object}
         */
        getContact() {
            if (this.openedPersonnel?.oPersonne) {
                this.personnelExists = true;

                this.ressourcePersonnel.nom = this.openedPersonnel.oPersonne.nom;
                this.ressourcePersonnel.prenom = this.openedPersonnel.oPersonne.prenom;
                this.ressourcePersonnel.civilite = this.openedPersonnel.oPersonne.civilite;
                this.ressourcePersonnel.dn = this.openedPersonnel.oPersonne.dn;
                this.ressourcePersonnel.lieuNaissance = this.openedPersonnel.oPersonne.lieuNaissance;
                this.ressourcePersonnel.nss = this.openedPersonnel.nss;
                this.ressourcePersonnel.nationalite = this.openedPersonnel.oPersonne.nationalite;
            }
        }
    },
    beforeRouteUpdate(to) {
        this.getContact(to.params.id);
    },

    mounted() {
        if (this.$route.params.id == 0 || this.$route.name == 'PersonnelNew') {
            this.personnelExists = true;
        } else {
            this.getContact();
        }
    }


}
</script>