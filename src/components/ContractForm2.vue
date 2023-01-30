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
            <!-- <div class="my-2">
                <label for="typeContrat" class="form-label">Type de contrat *</label>
                <select class="form-select" id="typeContrat" required>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div> -->

            <div class=" my-2 row g-2">
                <div class="col-md">
                    <label for="dateEntree" class="form-label">Entrée *</label>
                    <input type="datetime-local" class="form-control" id="dateEntree" name="dentree" v-model="searchDentree" required>
                </div>

                <div class="col-md">
                    <label for="dateSortie" class="form-label">Sortie prévue</label>
                    <input type="datetime-local" class="form-control" id="dateSortie" name="dsortie" v-model="searchDsortie">
                </div>
            </div>

            <div class="row g-2">
                <div class="col-md">
                    <label for="periodedEssai" class="form-label">Période d'essai (jours)</label>
                    <input type="number" class="form-control" id="periodedEssai" name="periode_essai" v-model="searchPeriodeEssai">
                </div>

                <!-- <div class="col-md">
                    <label for="dureeTravail" class="form-label">Temps de travail(%) *</label>
                    <input type="number" name="mls__contrat_duree_travail" id="duréeTravail" class="form-control" required>
                </div> -->
            </div>

            <!-- <div class="row g-2">
                <div class="col-md">
                    <label for="qualification" class="form-label">Qualification</label>
					<select name="qualification" id="qualification" class="form-select">
						<option value="qu"></option>
						<option value="qu"></option>
						<option value="qu"></option>
						<option value="qu"></option>
					</select>
                </div>

                <div class="col-md">
                    <label for="statut" class="form-label">Statut *</label>
                    <select name="contrat_statut" id="statut" class="form-select" required>
                        <option value="val"></option>
                        <option value="val"></option>
                        <option value="val"></option>
                    </select>
                </div>
            </div> -->

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
        type: {
            type: Number,
            required: true,
            default: 0,
        },
        temps_travail: {
            type: Number,
            required: true,
            default: 0,
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
        qualification: {
            type: Number,
            required: true,
            default: 0,
        },
        statut: {
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
        'update:type',
        'update:temps_travail',
        'update:dentree',
        'update:dsortie',
        'update:qualification',
        'update:statut',
        'update:periode_essai',
        'update:salaire_horaire',
        'update:forfait_jour',
        'update:nb_par_semaine',
        'update:nb_par_mois',
        'update:nb_par_an',
    ],

    data() {
        return {
            searchType: null,
            searchTempsTravail: null,
            searchDentree: null,
            searchDsortie: null,
            searchQualification: null,
            searchStatut: null,
            searchPeriodeEssai: null,
            searchSalaireHoraire: null,
            searchForfaitJour: null,
            searchNbParSemaine: null,
            searchNbParMois: null,
            searchNbParAn: null,
        }
    },

    computed: {
        ...mapState(['openedElement']),
        
    },

    watch: {
        /**
         * Met à jour la varible à l'element parents
         */
        searchType() {
            this.updateValue('type', this.searchType);
        },

        searchTempsTravail() {
            this.updateValue('temps_travail', this.searchTempsTravail);
        },

        searchDentree() {
            this.updateValue('dentree', this.searchDentree);  
        },

        searchDsortie() {
            this.updateValue('dsortie', this.searchDsortie);
        },

        searchQualification() {
            this.updateValue('qualification', this.searchQualification);
        },

        searchStatut() {
            this.updateValue('statut', this.searchStatut);
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
            this.searchType = this.type;
            this.searchTempsTravail = this.temps_travail;
            this.searchDentree = this.dentree;
            this.searchDsortie = this.dsortie;
            this.searchQualification = this.qualification;
            this.searchStatut = this.statut;
            this.searchPeriodeEssai = this.periode_essai;
            this.searchSalaireHoraire = this.salaire_horaire;
            this.searchForfaitJour = this.forfait_jour;
            this.searchNbParSemaine = this.nb_par_semaine;
            this.searchNbParMois = this.nb_par_mois;
            this.searchNbParAn = this.nb_par_an;
        }

    },

    mounted() {
        this.loadSearchValues();
    }
}
</script>