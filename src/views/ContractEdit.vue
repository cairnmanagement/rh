<template>
    <AppModal :title="titleModal" size="lg" @submit="record()" @modal-hide="routeToParent()" :submitBtn="true" :cancelBtn="true" :pending="pending.contrat">

        <contract-form-2 
            v-model:type="contratItem.type"
            v-model:temps_travail="contratItem.temps_travail"
            v-model:dentree="contratItem.dentree"
            v-model:dsortie="contratItem.dsortie"
            v-model:qualification="contratItem.qualification"
            v-model:statut="contratItem.statut"
            v-model:periode_essai="contratItem.periode_essai"
            v-model:salaire_horaire="contratItem.salaire_horaire"
            v-model:forfait_jour="contratItem.forfait_jour"
            v-model:nb_par_semaine="contratItem.nb_par_semaine"
            v-model:nb_par_mois="contratItem.nb_par_mois"
            v-model:nb_par_an="contratItem.nb_par_an" 
        />
    </AppModal>
</template>

<script>
import { mapState } from 'vuex';
import ContractForm2 from '../components/ContractForm2.vue';
import date from 'date-and-time';

// import ContractForm from '../components/ContractForm.vue';
import AppModal from '../components/pebble-ui/AppModal.vue';

export default {
    components: { AppModal, ContractForm2, },

    data() {
        return {
            pending: {
                contrat: false
            },
            contratItem: {
                type: 0,                 /** Obligatoire **/
                temps_travail: 0,        /** Obligatoire **/
                dentree: '',              /** Obligatoire **/
                dsortie: '',
                qualification: 0,        /** Obligatoire **/
                statut: 0,               /** Obligatoire **/
                periode_essai: 0,
                salaire_horaire: 0,
                forfait_jour: false,
                nb_par_semaine: 0,
                nb_par_mois: 0,
                nb_par_an: 0
            },
        }
    },
    
    computed: {
        ...mapState(['openedContrats']),

        /**
         * Check si un id de contrat a été fourni dans l'url
         * 
         * @return {boolean}
         */
         contratExist() {
            if (this.$route.params.idContrat == '0') {
                return false;
            }

            this.getContrat();

            return true;
        },

        /**
         * Rtourne le titre de la modal en fonction si un contrat est fourni ou pas
         * 
         * @return {string}
         */
         titleModal() {
            if (this.contratExist) {
                return `Modifier le contrat de travail n°${this.$route.params.idContrat}`;
            }

            return 'Nouveau contrat de travail';
        },  
    },
    

    methods: {
        /**
         * retourne à la route précédente
         */
        routeToParent() {
            this.$router.go(-1);
        },

        /**
         * Retourne le contrat chargé via l'ID de l'URL
         * 
         * @return {object}
         */
        getContrat() {
            let contrat = this.openedContrats.find(e => e.id == this.$route.params.idContrat);

            if (contrat) {
                this.setContratItem(contrat);
            } else {
                this.setContratItemDate();
            }
        },

        /**
         * Initialise contratItem avec les information du contrat trouvé 
         * 
         * @param {Object} Contrat      Un contrat de travail
         */
         setContratItem(contrat) {
            this.contratItem.type = contrat.type;
            this.contratItem.temps_travail = contrat.temps_travail;
            this.contratItem.dentree = contrat.dentree;

            this.contratItem.qualification = contrat.qualification;
            this.contratItem.status = contrat.status;
            this.contratItem.periode_essai = contrat.periode_essai;
            this.contratItem.salaire_horaire = contrat.salaire_horaire;
            this.contratItem.forfait_jour = contrat.forfait_jour == 'OUI' ? true : false;
            this.contratItem.nb_par_semaine = contrat.nb_par_semaine;
            this.contratItem.nb_par_mois = contrat.nb_par_mois;
            this.contratItem.nb_par_an = contrat.nb_par_an;

            if (contrat.dsortie && contrat.dsortie != "0000-00-00 00:00:00") {
                this.contratItem.dsortie = contrat.dsortie;
            } else if (contrat.dsortie_reelle && contrat.dsortie_reelle != "0000-00-00 00:00:00") {
                this.contratItem.dsortie = contrat.dsortie_reelle;
            } else {
                this.contratItem.dsortie = "0000-00-00 00:00:00";
            }
        },

        /**
         * Initialise les date entree et sortie de contratItem
         */
         setContratItemDate() {
            let dentree = new Date();
            let dsortie = new Date();

            this.contratItem.dentree = date.format(dentree, 'YYYY-MM-DD HH:mm:ss');
            this.contratItem.dsortie = date.format(dsortie, 'YYYY-MM-DD HH:mm:ss');
            this.contratItem.dsortie = date.addDays(this.contratItem.dsortie, 1);
        },

        /**
         * Enregistre ou met a jours un contrat via le formulaire fourni
         */
        record() {
            this.pending.contrat = true;

            let url = `structurePersonnel/POST/${this.$route.params.id}/contrat/${this.$route.params.idContrat}`;

            this.$app.apiPost(url, this.contratItem).then((data) => {
                console.log(data);
            })
            .catch(this.$app.cactchError)
            .finally(() => this.pending.contrat = false);
        }
    },
}
</script>