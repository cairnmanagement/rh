<template>
    <AppModal :title="titleModal" size="lg" @submit="record()" @modal-hide="routeToParent()" :submitBtn="true" :cancelBtn="true" :pending="pending.contrat">

        <contract-form 
            v-model:type_id="contratItem.type_id"
            v-model:pourcentage_temps_partiel="contratItem.pourcentage_temps_partiel"
            v-model:dentree="contratItem.dentree"
            v-model:dsortie="contratItem.dsortie"
            v-model:duree_indeterminee="contratItem.duree_indeterminee"
            v-model:qualification_id="contratItem.qualification_id"
            v-model:statut_id="contratItem.statut_id"
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
import ContractForm from '../components/ContractForm.vue';
import date from 'date-and-time';

// import ContractForm from '../components/ContractForm.vue';
import AppModal from '../components/pebble-ui/AppModal.vue';

export default {
    components: { AppModal, ContractForm, },

    data() {
        return {
            pending: {
                contrat: false
            },
            contratItem: {
                type_id: 0,                                 /** Obligatoire **/
                pourcentage_temps_partiel: 100,             /** Obligatoire if duree indeterminee true**/
                dentree: '',                                
                dsortie: '',
                duree_indeterminee: false,                  
                qualification_id: 0,                        
                statut_id: 0,                               
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
            console.log('get', contrat);
            this.contratItem.type_id = contrat.type_id ? contrat.type_id : 0;
            this.contratItem.temps_travail = contrat.temps_travail;
            this.contratItem.dentree = contrat.dentree;
            this.contratItem.duree_indeterminee = contrat.duree_indeterminee == 'OUI' ? true : false;
            this.contratItem.qualification_id = contrat.qualification_id ? contrat.qualification_id : 0;
            this.contratItem.statut_id = contrat.statut_id ? contrat.statut_id : 0;
            this.contratItem.pourcentage_temps_partiel = contrat.pourcentage_temps_partiel;
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

            let url = `v2/contrat/`;

            if (this.$route.params.idContrat != '0') {
                url = 'v2/contrat/' + this.$route.params.idContrat;
            } 
            
            this.contratItem['structure__personnel_id'] = this.$route.params.id;

            this.$app.apiPost(url, this.contratItem).then(() => {
                this.routeToParent();
            })
            .catch(this.$app.catchError)
            .finally(() => this.pending.contrat = false);
        }
    },
}
</script>