<template>
    <div>
        <div class="border-bottom">
            <div class="position-relative">
                <user-image :name="openedElement.oPersonne.nom" size="xl"></user-image>
                <span v-if="openedElement.matricule" class="badge text-bg-secondary position-absolute" style="top:0px; left:50%">{{openedElement.matricule}}</span>
            </div>

            <h2 class="text-center">{{ openedElement.cache_nom }}</h2>
        </div>

        <form>
            <div class=" my-2 row g-2">
                <div class="col-md">
                    <label for="dateEntree" class="form-label">Entrée *</label>
                    <input type="datetime-local" class="form-control" id="dateEntree" name="dentree" v-model="searchDentree">
                </div>
    
                <div class="col-md" v-if="!searchDureeIndeterminee">
                    <label for="dateSortie" class="form-label">Sortie prévue <span v-if="!dsortieObligatory">*</span></label>
                    <input type="datetime-local" class="form-control" id="dateSortie" name="dsortie" v-model="searchDsortie">
                </div>
            </div>

            <div class="my-2 row g-2">
                <div class="form-check form-switch col-md ms-2">
                    <label class="form-check-label" for="duree_indeterminee">Contrat à durée indeterminée</label>
                    <input class="form-check-input" type="checkbox" role="switch" id="duree_indeterminee" v-model="searchDureeIndeterminee">
                </div>
            </div>

            <div class="my-2 row g-2">
                <div class="col-12 col-md">
                    <label for="typeContrat" class="form-label">Type de contrat</label>
                    <select class="form-select" id="typeContrat" v-model="searchTypeId">
                        <option v-if="contratType.length == 0" value="" disabled>Aucun type enregistré</option>
                        <option v-else value=""></option>
                        <option v-for="cType in contratType" :key="cType.id" :value="cType.id">{{ cType.label }}</option>
                    </select>
                </div>

                <div class="col-12 col-md-4">
                    <label for="periodedEssai" class="form-label">Période d'essai (jours)</label>
                    <input type="number" class="form-control" id="periodedEssai" name="periode_essai" v-model="searchPeriodeEssai">
                </div>

                <div class="col-12 col-md-3">
                    <label for="dureeTravail" class="form-label">Temps de travail(%)</label>
                    <input type="number" name="mls__contrat_duree_travail" min="0" max="100" step="1" id="duréeTravail" class="form-control" v-model="searchPourcentageTempsPartiel">
                </div>
            </div>

            <div class="row g-2 mt-2">
                <div class="col-md">
                    <label for="qualification" class="form-label">Qualification</label>
                    <select name="qualification" id="qualification" class="form-select" v-model="searchQualificationId">
                        <option v-if="contratQualification.length == 0" value="" disabled>Aucune qualification enregistrée</option>
                        <option v-else value=""></option>
                        <option v-for="qualification in contratQualification" :key="qualification.id" :value="qualification.id">{{ qualification.label }}</option>
                    </select>
                </div>

                <div class="col-md">
                    <label for="statut" class="form-label">Statut</label>
                    <select name="contrat_statut" id="statut" class="form-select" v-model="searchStatutId">
                        <option v-if="contratStatut.length == 0" value="" disabled>Aucun statut enregistré</option>
                        <option v-else value=""></option>
                        <option v-for="statut in contratStatut" :key="statut.id" :value="statut.id">{{ statut.label }}</option>
                    </select>
                </div>
            </div>

            <div class="form-check form-switch mt-3">
                <label class="form-check-label" for="forfaitJour">Contrat au forfait jour</label>
                <input class="form-check-input" type="checkbox" role="switch" id="forfaitJour" name="forfait_jour" v-model="searchForfaitJour">
            </div>

            <div class="row g-2 border-top mt-1" v-if="forfait_jour">
                <div class="col-md">
                    <label for="nbParSemaine" class="form-label">unité/semaine</label>
					<input type="number" class="form-control" id="nbParSemaine" name="nb_par_semaine" v-model="searchNbParSemaine">
                </div>

                <div class="col-md">
                    <label for="nbParMois" class="form-label">Nb unité mois</label>
					<input type="number" class="form-control" id="nbParMois" name="nb_par_mois" v-model="searchNbParMois">
                </div>

                <div class="col-md">
                    <label for="nbParAn" class="form-label">Nb unité an</label>
					<input type="number" class="form-control" id="nbParAn" name="nb_par_an" v-model="searchNbParAn">
                </div>
            </div>
        </form>


        <div class="fw-lighter mt-4 fs-7">
            * Champs obligatoire
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import UserImage from './pebble-ui/UserImage.vue';

export default {
    components: { UserImage },

    props: {
        type_id: {
            type: Number,
            required: true,
            default: 0,
        },
        pourcentage_temps_partiel: {
            type: Number,
            required: true,
            default: 100,
        },
        dentree: {
            type: String,
            required: true,
            default: null,
        },
        dsortie: {
            type: String,
            default: null,
        },
        duree_indeterminee: {
            type: Boolean,
            default: false,
        },
        qualification_id: {
            type: Number,
            required: true,
            default: 0,
        },
        statut_id: {
            type: Number,
            required: true,
            default: 0,
        },
        periode_essai: {
            type: Number,
            default: 0,
        },
        salaire_horaire: {
            type: Number,
            default: 0,
        },
        forfait_jour: {
            type: Boolean,
            default: false,
        },
        nb_par_semaine: {
            type: Number,
            default: 0,
        },
        nb_par_mois: {
            type: Number,
            default: 0,
        },
        nb_par_an: {
            type: Number,
            default: 0,
        }  
    },

    emits: [
        'update:type_id',
        'update:pourcentage_temps_partiel',
        'update:dentree',
        'update:dsortie',
        'update:duree_indeterminee',
        'update:qualification_id',
        'update:statut_id',
        'update:periode_essai',
        'update:salaire_horaire',
        'update:forfait_jour',
        'update:nb_par_semaine',
        'update:nb_par_mois',
        'update:nb_par_an',
    ],

    data() {
        return {
            pending: {
                contratRessource: true,
            },

            contratRessource: ['type', 'qualification', 'statut'],

            searchTypeId: null,
            searchPourcentageTempsPartiel: null,
            searchDentree: null,
            searchDsortie: null,
            searchDureeIndeterminee: null,
            searchQualificationId: null,
            searchStatutId: null,
            searchPeriodeEssai: null,
            searchSalaireHoraire: null,
            searchForfaitJour: null,
            searchNbParSemaine: null,
            searchNbParMois: null,
            searchNbParAn: null,

            contratType: [],
            contratQualification: [],
            contratStatut: [],
        }
    },

    computed: {
        ...mapState(['openedElement']),

        /**
         * Retourne si la date de fin est obligatoire
         */
        dsortieObligatory() {
            if (this.searchDureeIndeterminee) {
                return true;
            }

            return false
        },        
    },

    watch: {
        /**
         * Met à jour la varible à l'element parents
         */
        searchTypeId() {
            this.updateValue('type_id', this.searchTypeId);
        },

        searchPourcentageTempsPartiel() {
            this.updateValue('pourcentage_temps_partiel', this.searchPourcentageTempsPartiel);
        },

        searchDentree() {
            this.updateValue('dentree', this.searchDentree);  
        },

        searchDsortie() {
            this.updateValue('dsortie', this.searchDsortie);
        },

        searchDureeIndeterminee() {
            this.updateValue('duree_indeterminee', this.searchDureeIndeterminee);
        },

        searchQualificationId() {
            this.updateValue('qualification_id', this.searchQualificationId);
        },

        searchStatutId() {
            this.updateValue('statut_id', this.searchStatutId);
        },

        searchPeriodeEssai() {
            this.updateValue('periode_essai', this.searchPeriodeEssai);
        },

        searchSalaireHoraire() {
            this.updateValue('salaire_horaire', this.searchSalaireHoraire);
        },

        searchForfaitJour() {
            this.updateValue('forfait_jour', this.searchForfaitJour);
        },

        searchNbParSemaine() {
            this.updateValue('nb_par_semaine', this.searchNbParSemaine);
        },

        searchNbParMois() {
            this.updateValue('nb_par_mois', this.searchNbParMois);
        },

        searchNbParAn() {
            this.updateValue('nb_par_an', this.searchNbParAn);
        }
    },

    methods: {
        /**
         * Inverse la valeur de forfait jour la renvoi au parent
         * 
         * @event forfait_jour
         */
        updateForfaitJour() {
            let newVal = !this.forfait_jour;

            this.$emit('update:forfait_jour', newVal);
        },

        /**
         * Renvoi a l'element parent la nouvelle valeur de la variable(props
         * 
         * @param {String} props        props name a changer
         * @param {*} newVal            la nouvelle valeur
         */
        updateValue(props,newVal) {
            this.$emit(`update:${props}`, newVal);
        },

        /**
         * Charge les different variables search avec les props renseigné correspondant
         */
        loadSearchValues() {
            this.searchTypeId = this.type_id;
            this.searchPourcentageTempsPartiel = this.pourcentage_temps_partiel;
            this.searchDentree = this.dentree;
            this.searchDsortie = this.dsortie;
            this.searchDureeIndeterminee = this.duree_indeterminee;
            this.searchQualificationId = this.qualification_id;
            this.searchStatutId = this.statut_id;
            this.searchPeriodeEssai = this.periode_essai;
            this.searchSalaireHoraire = this.salaire_horaire;
            this.searchForfaitJour = this.forfait_jour;
            this.searchNbParSemaine = this.nb_par_semaine;
            this.searchNbParMois = this.nb_par_mois;
            this.searchNbParAn = this.nb_par_an;
        },

        /***
         * Recupere les differents ressource nécessaire a un contrat
         * qualigication, statut, type ...
         */
        getContratRessources() {
            this.pending.contratRessource = true;

            for (let ressource in this.contratRessource) {
                let label = this.contratRessource[ressource];
                let urlApi = `v2/contrat/${label}`;
    
                this.$app.apiGet(urlApi).then(data => {
                    switch (label) {
                        case 'type':
                            this.contratType = data;
                            break;

                        case 'statut':
                            this.contratStatut = data;                            
                            break;

                        case 'qualification':
                            this.contratQualification = data;
                            break;
                    
                        default:
                            break;
                    }
                }).catch(this.$app.catchError)
                .finally(() => {this.pending.contratRessource = false})
            }

        }

    },

    mounted() {
        this.loadSearchValues();
        this.getContratRessources();
    }
}
</script>