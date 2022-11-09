<template>
<div class="container" v-if="openedElement">

		<div>
			<nav id="enteteDossier" class=" card-header navbar navbar-light bg-light px-3 justify-content-end">
				<ul class="nav nav-pills">
					<li class="nav-item">
						<a class="nav-link" href="#"><i class="bi bi-arrow-clockwise"></i></a>
					</li>
				</ul>
			</nav>
		</div>

	<!--en-tête fiche personnel-->
		<section class="text-center py-3 bg-light" v-if="openedElement.extendedData">
			
			<div class="row">
				<div class="col-12 col-xxl-6">
					<div class="card mb-3">
						<div class="card-body">
							<div class="position-relative">
								<user-image :name="openedElement.oPersonne.nom" size="xl"></user-image>
								<span class="badge bg-secondary position-absolute" style="top:0px;">{{openedElement.matricule}}</span>
							</div>
							<h3>{{openedElement.oPersonne.prenom}} {{openedElement.oPersonne.nom}}</h3>
							<div class="align-items-center justify-content-between" >
								<div class="d-flex align-items-center justify-content-center">
									<span v-if="openedElement.oContrat.duree_indeterminee == 'OUI'">CDI depuis le {{formatDateFr(openedElement.dentree)}}</span>
									<span v-if="openedElement.oContrat.duree_indeterminee == 'NON'">CDD jusqu'au {{formatDateFr(openedElement.dsortie)}}</span>
								</div>
							</div>
							<div class="d-flex align-items-center justify-content-end">
								<button @click-prevent="persoArchived(openedElement.id)" class="btn btn-sm btn-outline-danger">Archiver</button>
							</div>
							
						</div>
					</div>
					<div class="card mb-3">
						<etat-civil-info/>
					</div>
					<div class="card mb-3">
						<coord-info/>
					</div>
				</div>
				<div class="col-12 col-xxl-6">
					<div class="card">
						<contract-info></contract-info>
					</div>
					<div class="card">
						<p>donnée API listContrats</p>
						{{listContrats}}
					</div>
				</div>
			</div>	
		</section>

	<!-- Ne pas toucher -->
        <router-view></router-view>
</div>

</template>

<script>

import {mapState} from 'vuex'
import UserImage from '../components/pebble-ui/UserImage.vue';
import date from 'date-and-time';
import fr from 'date-and-time/locale/fr';
import ContractInfo from '../components/ContractInfo.vue';
import CoordInfo from '../components/CoordInfo.vue';
import EtatCivilInfo from '../components/EtatCivilInfo.vue';
export default {
    data() {
        return {
            pending: {
                extendedData: true
            },
			listContrats: [],
			
        };
    },
    computed: {
        ...mapState(["openedElement"]),

		birthdate() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.oPersonne.dn)  , 'DD-MM-YYYY')
		},
		entrydate() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.dentree)  , 'DD-MM-YYYY')
		}, 
		entrydate2() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.dentree)  , 'DD MMM YYYY')
		}, 
		exitdate() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.dsortie)  , 'DD-MM-YYYY')
		},
		exitdate2() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.dsortie)  , 'DD MMM YYYY')
		}
		
    },
    methods: {

		

		/**
		 * Modifie le format de la date entrée en paramètre et la retourne 
		 * sous le format dd/mm:yyyy
		 * @param {string} date 
		 */


		formatDateFr(date) {
			let newDate = new Date(date);
			let format = newDate.toLocaleDateString('fr-FR');
			return format;
		},
		
        /**
         * Charger les données complémentaires du personnel
         */
        loadData(id) {
			if (this.openedElement) {
				if (!this.openedElement.extendedData) {
					this.pending.extendedData = true;
					this.$app.apiGet("structurePersonnel/GET/" + id, {
						api_hierarchy: true
					})
						.then(personnelData => {
						personnelData.extendedData = true;
						this.$store.dispatch("refreshOpened", personnelData);
						this.pending.extendedData = false;
						console.log('result api', personnelData)
					})
						.catch(this.$app.catchError);
				}
				else {
					this.pending.extendedData = false;
				}
			}
        },
		loadContract(id) {
			if (this.openedElement) {
					this.$app.apiGet("structurePersonnel/GET/" + id +"/contrats")
						.then((data) => {
						console.log('result contrat', data);
						this.listContrats = data
					})
						.catch(this.$app.catchError);
				
				
			}
        }
    },
	
    /**
     * Lorsque la route interne est mise à jour, le nouvel élément doit être chargé.
     */
    beforeRouteUpdate(to) {
        this.$store.dispatch("load", to.params.id);
        this.loadData(to.params.id);
        this.loadContract(to.params.id);


    },
    /**
     * Lorsqu'on quite la route active, l'élément ouvert est vidé.
     */
    beforeRouteLeave(from, to, next) {
        this.$store.dispatch("unload");
        next();
    },
    /**
     * Lorsque l'élément est monté, on va lire l'élément à charger passé en paramètre.
     */
    mounted() {
        /**
         * Ici on va charger l'élém
         */
        this.$store.dispatch("load", this.$route.params.id);
        this.loadData(this.$route.params.id);
		this.loadContract(this.$route.params.id);
    },
    components: { UserImage, ContractInfo, CoordInfo, EtatCivilInfo}
}

</script>
