<template>
    <AppModal 
        :title="titleModal" 
        size="lg" 
        :submitBtn="true" 
        :cancelBtn="true" 
        :pending="pending.contrat"
        
        @submit="record()" 
        @modal-hide="routeToParent()">

        <contrat-form 
            :contrat="contrat"
            @change="updateData"

            v-if="contrat"
        />
    </AppModal>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ContratForm from '../components/contrat/ContratForm.vue';
import date from 'date-and-time';

// import ContratForm from '../components/ContratForm.vue';
import AppModal from '../components/pebble-ui/AppModal.vue';

export default {
    components: { AppModal, ContratForm, },

    data() {
        return {
            pending: {
                contrat: false
            },
            contrat: null,
            editableData: [
                'id',
                'dentree', 
                'dsortie', 
                'duree_indeterminee', 
                'periode_essai', 
                'salaire_horaire', 
                'forfait_jour', 
                'nb_par_semaine', 
                'nb_par_mois', 
                'nb_par_an', 
                'pourcentage_temps_partiel', 
                'classe', 
                'cotation', 
                'infos_autre_employeur', 
                'infos_engagement', 
                'projet_id', 
                'type_id', 
                'qualification_id', 
                'statut_id', 
                'niveau_id', 
                'position_id', 
                'coeficient_id', 
                'motif_fin_id',
                'dsortie_reelle'
            ]
        }
    },
    
    computed: {
        ...mapState(['openedContrats']),

        /**
         * Rtourne le titre de la modal en fonction si un contrat est fourni ou pas
         * 
         * @return {string}
         */
        titleModal() {
            if (!this.contrat) {
                return "Pas de contrat trouvé";
            }
            return this.contrat.id ? "Modifier le contrat "+this.contrat.id : "Nouveau contrat";
        },  
    },
    

    methods: {
        ...mapActions(['updateOpenedContrats']),

        /**
         * retourne à la route précédente
         */
        routeToParent() {
            this.$router.go(-1);
        },

        /**
         * Retourne le contrat chargé via l'ID de l'URL
         */
        async getContratById(idContrat) {

            idContrat = typeof idContrat === 'undefined' ? this.$route.params.idContrat : idContrat;

            if (!idContrat) {
                let dentree = new Date();
                let dsortie = new Date();
                dsortie.setDate(dsortie.getDate() + 1);

                this.setContrat({
                    id: 0,
                    dentree: date.format(dentree, 'YYYY-MM-DD HH:mm:ss'),
                    dsortie: date.format(dsortie, 'YYYY-MM-DD HH:mm:ss')
                });
            }
            else {

                let contratsCollection = this.$assets.getCollection('contrats');
                let contrat = await contratsCollection.getById(idContrat);

                if (contrat) {
                    this.setContrat(contrat);
                }
                else {
                    this.contrat = null;
                    alert('Impossible de trouver le contrat demandé.');
                }
            }

        },

        /**
         * Initialise les informations du contrat trouvé 
         * 
         * @param {object} contrat      Le contrat à lire
         */
        setContrat(contrat) {
            let output = {};

            this.editableData.forEach((key) => {
                output[key] = contrat[key] ?? null;
            });

            this.contrat = output;
        },

        /**
         * Met à jour les informations du contrat
         * 
         * @param {object} contrat Les informations à mettre à jour
         */
        updateData(contrat) {
            for (const key in contrat) {
                this.contrat[key] = contrat[key];
            }
        },

        /**
         * Enregistre ou met a jours un contrat via le formulaire fourni
         */
        record() {
            this.pending.contrat = true;

            let url = `v2/contrat/`;

            if (this.contrat.id) {
                url += this.contrat.id;
            } 
            
            this.contrat['structure__personnel_id'] = this.$route.params.id;

            this.$app.api.post(url, this.contrat, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            }).then((contrat) => {
                const collection = this.$assets.getCollection("contrats");
                collection.updateCollection([contrat]);

                this.updateOpenedContrats([contrat]);

                this.routeToParent();
            })
            .catch(this.$app.catchError)
            .finally(() => this.pending.contrat = false);
        },

        /**
         * Initalise les données
         */
        init() {
            this.getContratById();
        }
    },

    mounted() {
        this.init();
    }
}
</script>