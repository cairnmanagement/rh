<template>
    <div>
        <div class="border-bottom">
            <div class="position-relative">
                <user-image :name="openedElement.oPersonne.nom" size="xl"></user-image>
                <span v-if="openedElement.matricule" class="badge bg-secondary position-absolute" style="top:0px; left:50%">{{openedElement.matricule}}</span>
            </div>

            <h2 class="text-center">{{ openedElement.cache_nom }}</h2>
        </div>

        <form>
            <div class="my-2">
                <label for="typeContrat" class="form-label">Type de contrat</label>
                <select class="form-select" id="typeContrat">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>

            <div class=" my-2 row g-2">
                <div class="col-md">
                    <label for="dateEntree" class="form-label">Entrée</label>
                    <input type="date" class="form-control" id="dateEntree" name="dentree">
                </div>

                <div class="col-md">
                    <label for="dateSortie" class="form-label">Sortie prévue</label>
                    <input type="date" class="form-control" id="dateSortie" name="dsortie">
                </div>
            </div>

            <div class="row g-2">
                <div class="col-md">
                    <label for="periodedEssai" class="form-label">Période d'essai (jours)</label>
                    <input type="number" class="form-control" id="periodedEssai" name="periode_essai">
                </div>

                <div class="col-md">
                    <label for="dureeTravail" class="form-label">Temps de travail (%)</label>
                    <input type="number" name="mls__contrat_duree_travail" id="duréeTravail" class="form-control">
                </div>
            </div>

            <div class="row g-2">
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
                    <label for="statut" class="form-label">Statut</label>
                    <select name="contrat_statut" id="statut" class="form-select">
                        <option value="val"></option>
                        <option value="val"></option>
                        <option value="val"></option>
                    </select>
                </div>
            </div>

            <div class="form-check form-switch mt-2">
                <label class="form-check-label" for="forfaitJour">Contrat au forfait jour</label>
                <input class="form-check-input" type="checkbox" role="switch" id="forfaitJour" name="forfait_jour" value="1">
            </div>

            <div class="row g-2">
                <div class="col-md">
                    <label for="nbParSemaine" class="form-label">unité/semaine</label>
					<input type="number" class="form-control" id="nbParSemaine" name="nb_par_semaine" >
                </div>

                <div class="col-md">
                    <label for="nbParMois" class="form-label">Nb unité mois</label>
					<input type="number" class="form-control" id="nbParMois" name="nb_par_mois" >
                </div>

                <div class="col-md">
                    <label for="nbParAn" class="form-label">Nb unité an</label>
					<input type="number" class="form-control" id="nbParAn" name="nb_par_an" >
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import UserImage from './pebble-ui/UserImage.vue';

export default {
    components: { UserImage },

    computed: {
        ...mapState(['openedElement'])
    }
    
}
</script>