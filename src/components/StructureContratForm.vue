<template>
	<div class="card">
		<div class="card-body">
		<h2 class="mb-3">Éditer un contrat de travail</h2>
            <div class="row g-2 mb-3">
				<div class="col">
					<label for="fonction" class="form-label">Fonction</label>
					<input type="text" class="form-control" id="fonction" name="fonction_nom">
				</div>
			</div>
			<div class="row g-2 mb-3">
				<div class="col">
					<label for="typeContrat" class="form-label">Type de contrat</label>
					<select name="mls__contrat_type" id="typeContrat" class="form-select" v-model="contrat.mls__contrat_type">
						<option value=""></option>
					</select>
				</div>
				<div class="col">
					<label for="dureeTravail" class="form-label">Durée du travail </label>
					<select name="mls__contrat_duree_travail" id="duréeTravail" class="form-select" v-model="contrat.mls__contrat_duree_travail">
						<option value=""></option>
					</select>
				</div>
			</div>
            <div class="row g-2 mb-3">
				<div class="form-check form-switch">
					<label class="form-check-label" for="contratDureeIndeterminee">Contrat à durée indéterminée</label>
					<input class="form-check-input" type="checkbox" role="switch" id="contratDureeIndeterminee" name="contrat_duree_indeterminee" value="1" v-model="contrat.contrat_duree_indeterminee">
				</div>
			</div>
			<div class="row g-2 mb-3">
				<div class="col">
					<label for="dateEntree" class="form-label">Date d'entrée</label>
					<input type="datetime-local" class="form-control" id="dateEntree" name="dentree" v-model="contrat.dentree">
				</div>
				<div class="col" v-if="!contrat.contrat_duree_indeterminee">
					<label for="dateSortie" class="form-label">Date de sortie prévue</label>
					<input type="date" class="form-control" id="dateSortie" name="dsortie" v-model="contrat.dsortie">
				</div>
			</div>
            <div class="row g-2 mb-3">
                <div class="col">
                    <label for="periodedEssai" class="form-label">Période d'essai en jours</label>
                    <input type="text" class="form-control" id="periodedEssai" name="periode_essai" v-model="contrat.periode_essai">
                </div>
                <div class="col">
                    <label for="salaireHoraire" class="form-label">Salaire horaire</label>
                    <input type="number" class="form-control" id="salaireHoraire" name="salaire_horaire" v-model="contrat.salaire_horaire">
                </div>
            </div>
			<hr>
			<h3 class="mb-3">Typologie du contrat</h3>
			<div class="row g-2 mb-3">
				<div class="col">
					<label for="typeEmploi" class="form-label">Type d'emploi</label>
					<select name="mls__emploi_type" id="typeEmploi" class="form-select" v-model="contrat.mls__emploi_type">
						<option value=""></option>
					</select>
				</div>
				<div class="col">
					<label for="qualification" class="form-label">Qualification</label>
					<select name="mls__qualification" id="qualification" class="form-select" v-model="contrat.mls__qualification">
						<option value=""></option>
					</select>
				</div>
			</div>
			<div class="row g-2 mb-3">
				<div class="col">
					<label for="metier" class="form-label">Métier</label>
					<select name="mls__contrat_metier" id="metier" class="form-select" v-model="contrat.mls__contrat_metier">
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
            <h3 class="mb-3">Classification du contrat</h3>
            <div class="row g-2 mb-3">
				<div class="col">
					<label for="niveau" class="form-label">Niveau</label>
					<select name="mls__contrat_niveau" id="niveau" class="form-select" v-model="contrat.mls__contrat_niveau">
						<option value=""></option>
					</select>
				</div>
				<div class="col">
					<label for="position" class="form-label">Position</label>
					<select name="mls__contrat_position" id="position" class="form-select" v-model="contrat.mls__contrat_position">
						<option value=""></option>
					</select>
				</div>
				<div class="col">
					<label for="coefficient" class="form-label">Coefficient</label>
					<select name="mls__contrat_coeficient" id="coefficient" class="form-select" v-model="contrat.mls__contrat_coeficient">
						<option value=""></option>
					</select>
				</div>
			</div>
			<div class="row g-2 mb-3">
				<div class="col">
					<label for="classe" class="form-label">Classe</label>
					<input type="number" class="form-control" id="classe" name="classe" v-model="contrat.classe">
				</div>
				<div class="col">
					<label for="cotation" class="form-label">Cotation</label>
					<input type="number" class="form-control" id="cotation" name="cotation" v-model="contrat.cotation">
				</div>
			</div>
			
			<hr>
			<h3 class="mb-3" :class="{'text-muted':!contrat.forfait_jour}">
                <div class="form-check form-switch">
					<label class="form-check-label" for="forfaitJour">Contrat au forfait jour</label>
					<input class="form-check-input" type="checkbox" role="switch" id="forfaitJour" name="forfait_jour" value="1" v-model="contrat.forfait_jour">
				</div>
            </h3>
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
			<hr>
			<h3 class="mb-3">Autres informations</h3>
			<div class="row g-2 mb-3">
				<div class="col">
					<label for="infosEngagement" class="form-label">Informations engagement</label>
					<input type="text" class="form-control" id="infosEngagement" name="infos_engagement" v-model="contrat.infos_engagement">
				</div>
			</div>
			<div class="row g-2 mb-3">
				<div class="col">
					<label for="infosAutreEmployeur" class="form-label">Nom et adresse agence interim</label>
					<input type="text" class="form-control" id="infosAutreEmployeur" name="infos_autre_employeur" v-model="contrat.infos_autre_employeur">
				</div>
			</div>
		</div>
		<hr>
		<div class="row m-2 p-2 d-flex justify-content-end">
                <a type="button" href="#" class="btn btn-lg btn-primary col-5 col-md-3 col-lg-2">Valider</a>  
		</div>
	</div>

</template>

<script>
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
    }
}
</script>