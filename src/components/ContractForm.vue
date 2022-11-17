<template>
    <div>
		<form>
            <div class="row">
                <p>Contrat {{openedElement.oContrat.id}}</p>
                <h3>{{openedElement.cache_nom}}</h3>
            </div>
            <hr>
			<div class="row g-2 mb-3">
                <div class="col">
					<label for="typeContrat" class="form-label">Type de contrat</label>
					<select name="mls__contrat_type" id="typeContrat" class="form-select" v-model="contrat.mls__contrat_type">
						<option value=""></option>
					</select>
                </div>
                <div class="col">
					<label for="typeEmploi" class="form-label">Type d'emploi</label>
					<select name="mls__emploi_type" id="typeEmploi" class="form-select" v-model="contrat.mls__emploi_type">
						<option value=""></option>
					</select>
				</div>
                </div>
                
                <div class="mb-3" :class="{'text-muted':!contrat.contrat_duree_indeterminee}">
                    <div class="form-check form-switch">
                        <label v-if="contrat.contrat_duree_indeterminee" class="form-check-label" for="contratDureeIndeterminee">Contrat à durée indéterminée</label>
                        <label v-else class="form-check-label" for="contratDureeIndeterminee">Contrat à durée déterminée</label>

                        <input class="form-check-input" type="checkbox" role="switch" id="contratDureeIndeterminee" name="contrat_duree_indeterminee" value="1" v-model="contrat.contrat_duree_indeterminee">
                    </div>
                </div>
                <div class="row g-2 mb-3">
                    <div class="col">
                        <label for="dateEntree" class="form-label">Date d'entrée</label>
                        <input type="date" class="form-control" id="dateEntree" name="dentree" v-model="contrat.dentree">
                    </div>
                    <div class="col" v-if="!contrat.contrat_duree_indeterminee">
                        <label for="dateSortie" class="form-label">Date de sortie prévue</label>
                        <input type="date" class="form-control" id="dateSortie" name="dsortie" v-model="contrat.dsortie">
                    </div>
                </div>
                <div class="row g-2 mb-3">
                    <div class="col">
                        <label for="periodedEssai" class="form-label">Période d'essai (jours)</label>
                        <input type="number" class="form-control" id="periodedEssai" name="periode_essai" v-model="contrat.periode_essai">
                    </div>
                    <div class="col">
                        <label for="dureeTravail" class="form-label">Temps de travail (%)</label>
                        <input type="number" name="mls__contrat_duree_travail" id="duréeTravail" class="form-control" v-model="contrat.mls__contrat_duree_travail">
                        
                    </div>
                    <!-- <div class="col">
                        <label for="salaireHoraire" class="form-label">Salaire horaire</label>
                        <input type="number" class="form-control" id="salaireHoraire" name="salaire_horaire" v-model="contrat.salaire_horaire">
                    </div> -->
            </div>
			<div class="row g-2 mb-3">
				<div class="col">
                    <label for="qualification" class="form-label">Qualification</label>
					<select name="mls__qualification" id="qualification" class="form-select" v-model="contrat.mls__qualification">
						<option value=""></option>
					</select>
				</div>
                <div class="col">
                    <label for="statut" class="form-label">Statut</label>
                    <select name="mls__contrat_statut" id="statut" class="form-select" v-model="contrat.mls__contrat_statut">
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                </div>
			</div>
            <hr>
			<div class="mb-3 text-start" :class="{'text-muted':!contrat.forfait_jour}">
                <div class="form-check form-switch text-start">
					<label class="form-check-label" for="forfaitJour">Contrat au forfait jour</label>
					<input class="form-check-input" type="checkbox" role="switch" id="forfaitJour" name="forfait_jour" value="1" v-model="contrat.forfait_jour">
				</div>
            </div>
			<div class="row g-2 mb-3" v-if="contrat.forfait_jour">
				<div class="col">
					<label for="nbParSemaine" class="form-label">Nb unité semaine</label>
					<input type="number" class="form-control" id="nbParSemaine" name="nb_par_semaine" v-model="contrat.nb_par_semaine">
				</div>
				<div class="col">
					<label for="nbParMois" class="form-label">Nb unité mois</label>
					<input type="number" class="form-control" id="nbParMois" name="nb_par_mois" v-model="contrat.nb_par_mois">
				</div>
				<div class="col">
					<label for="nbParAn" class="form-label">Nb unité an</label>
					<input type="number" class="form-control" id="nbParAn" name="nb_par_an" v-model="contrat.nb_par_an">
				</div>
			</div>
		</form>
    </div>
</template>

<script>




import { mapState } from 'vuex';
export default {
    props:{
        structure_contrat:{
            type:Object,
            default() {
                return {};
            }
        }
    },

    data() {
        return {
            contrat: null
        };
    },

    beforeMount() {
        this.contrat = this.structure_contrat;
    },
    computed: {
		...mapState(['openedElement']),
    },

}
</script>
