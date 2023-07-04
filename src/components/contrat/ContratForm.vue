<template>
    <div v-if="tmpContrat">
        <div class="border rounded p-2 bg-light">
            <personnel-identity :personnel="openedPersonnel" display="horizontal" size="lg" :useTitle="false " :showMatricule="true" />
        </div>

        <div class=" my-2 row g-2">
            <div class="col-md">
                <label for="dateEntree" class="form-label">Entrée *</label>
                <input type="datetime-local" class="form-control" id="dateEntree" name="dentree" v-model="tmpContrat.dentree">
            </div>

            <div class="col-md" v-if="!tmpContrat.duree_indeterminee">
                <label for="dateSortie" class="form-label">Sortie prévue <span v-if="!dsortieObligatory">*</span></label>
                <input type="datetime-local" class="form-control" id="dateSortie" name="dsortie" v-model="tmpContrat.dsortie">
            </div>
        </div>

        <div class="my-2 row g-2">
            <div class="form-check form-switch col-md ms-2">
                <label class="form-check-label" for="duree_indeterminee">Contrat à durée indeterminée</label>
                <input class="form-check-input" type="checkbox" role="switch" id="duree_indeterminee" v-model="tmpContrat.duree_indeterminee">
            </div>
        </div>

        <div class="my-2">
            <label for="salaire_horaire" class="form-label">Salaire horaire</label>
            <div class="input-group">
                <input type="text" class="form-control" id="salaire_horaire" name="salaire_horaire" v-model="tmpContrat.salaire_horaire" aria-describedby="salaire_horaire-addon">
                <span class="input-group-text" id="salaire_horaire-addon">€</span>
            </div>
        </div>

        <div class="my-2 row g-2">
            <div class="col-12 col-md">
                <label for="typeContrat" class="form-label">Type de contrat</label>
                <select class="form-select" id="typeContrat" v-model="tmpContrat.type_id">
                    <option v-if="contratType.length == 0" value="" disabled>Aucun type enregistré</option>
                    <option v-else value=""></option>
                    <option v-for="cType in contratType" :key="cType.id" :value="cType.id">{{ cType.label }}</option>
                </select>
            </div>

            <div class="col-12 col-md-4">
                <label for="periodedEssai" class="form-label">Période d'essai (jours)</label>
                <input type="number" class="form-control" id="periodedEssai" name="periode_essai" v-model="tmpContrat.periode_essai">
            </div>

            <div class="col-12 col-md-3">
                <label for="dureeTravail" class="form-label">Temps de travail(%)</label>
                <input type="number" name="pourcentage_temps_partiel" min="0" max="100" step="1" id="duréeTravail" class="form-control" v-model="tmpContrat.pourcentage_temps_partiel">
            </div>
        </div>

        <div class="row g-2 my-2">
            <div class="col-md">
                <label for="qualification" class="form-label">Qualification</label>
                <select name="qualification" id="qualification" class="form-select" v-model="tmpContrat.qualification_id">
                    <option v-if="contratQualification.length == 0" value="" disabled>Aucune qualification enregistrée</option>
                    <option v-else value=""></option>
                    <option v-for="qualification in contratQualification" :key="qualification.id" :value="qualification.id">{{ qualification.label }}</option>
                </select>
            </div>

            <div class="col-md">
                <label for="statut" class="form-label">Statut</label>
                <select name="contrat_statut" id="statut" class="form-select" v-model="tmpContrat.statut_id">
                    <option v-if="contratStatut.length == 0" value="" disabled>Aucun statut enregistré</option>
                    <option v-else value=""></option>
                    <option v-for="statut in contratStatut" :key="statut.id" :value="statut.id">{{ statut.label }}</option>
                </select>
            </div>
        </div>

        <hr>

        <div class="form-check form-switch my-2">
            <label class="form-check-label" for="forfaitJour">Contrat au forfait jour</label>
            <input class="form-check-input" type="checkbox" role="switch" id="forfaitJour" name="forfait_jour" v-model="tmpContrat.forfait_jour">
        </div>

        <div class="row g-2 my-2" v-if="forfait_jour">
            <div class="col-md">
                <label for="nbParSemaine" class="form-label">Unité/semaine</label>
                <input type="number" class="form-control" id="nbParSemaine" name="nb_par_semaine" v-model="tmpContrat.nb_par_semaine">
            </div>

            <div class="col-md">
                <label for="nbParMois" class="form-label">Nb unité/mois</label>
                <input type="number" class="form-control" id="nbParMois" name="nb_par_mois" v-model="tmpContrat.nb_par_mois">
            </div>

            <div class="col-md">
                <label for="nbParAn" class="form-label">Nb unité/an</label>
                <input type="number" class="form-control" id="nbParAn" name="nb_par_an" v-model="tmpContrat.nb_par_an">
            </div>
        </div>


        <div class="fw-lighter mt-4 fs-7">
            * Champs obligatoire
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import PersonnelIdentity from '../personnel/PersonnelIdentity.vue';

export default {
    components: { PersonnelIdentity },

    props: {
        contrat: Object
    },

    emits: ['change'],

    data() {
        return {
            tmpContrat: null
        }
    },

    computed: {
        ...mapState(['openedPersonnel', 'contratType', 'contratQualification', 'contratStatut']),
    },

    watch: {
        /**
         * Observe la modification du contrat
         */
        tmpContrat: {
            deep: true,
            handler(newVal) {
                this.$emit('change', newVal);
            }
        }
    },

    methods: {

        /**
         * Initalise une copie des données du contrat
         */
        init() {
            let contrat = {}
            for (const key in this.contrat) {
                contrat[key] = this.contrat[key];
            }
            this.tmpContrat = contrat;
        }

    },

    mounted() {
        this.init();
    }
}
</script>