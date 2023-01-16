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
								<span v-if="openedElement.matricule" class="badge bg-secondary position-absolute" style="top:0px;">{{openedElement.matricule}}</span>
							</div>
							<h3>{{openedElement.oPersonne.prenom}} {{openedElement.oPersonne.nom}}</h3>
							<div v-if="openedElement.oContrat" class="align-items-center justify-content-between" >
								<div class="d-flex align-items-center justify-content-center">
									<span v-if="!openedElement.oContrat.duree_indeterminee">pas de contrat</span>
									<span v-if="openedElement.oContrat.duree_indeterminee == 'OUI'">CDI depuis le {{formatDateFr(openedElement.dentree)}}</span>
									<span v-if="openedElement.oContrat.duree_indeterminee == 'NON'">CDD jusqu'au {{formatDateFr(openedElement.dsortie)}}</span>
								</div>
							</div>
							<div v-else>
								Cette personne n'a jamais fait partie des effectifs de la société
							</div>
							
							
						</div>
					</div>

					<div class="card mb-3">
						<!-- <PersonnelHeaderCard></PersonnelHeaderCard> -->
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
						
						<contract-info :contracts="openedContrats"></contract-info>
					</div>
				</div>
			</div>	
		</section>

		<!-- Ne pas toucher -->
        <router-view></router-view>
	</div>

	<spinner v-else></spinner>

</template>

<script>




import {mapActions, mapState} from 'vuex'
import UserImage from '../components/pebble-ui/UserImage.vue';
import date from 'date-and-time';
import fr from 'date-and-time/locale/fr';
import ContractInfo from '../components/ContractInfo.vue';
import CoordInfo from '../components/CoordInfo.vue';
import EtatCivilInfo from '../components/EtatCivilInfo.vue';
import Spinner from '../components/pebble-ui/Spinner.vue';
// import PersonnelHeaderCard from '@/components/PersonnelHeaderCard.vue';

export default {
    data() {
        return {
            pending: {
                extendedData: true,
				contrats: true
            }
			
        };
    },
    computed: {
        ...mapState(["openedElement", 'openedContrats']),

		birthdate() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.oPersonne.dn)  , 'DD-MM-YYYY')
		},
		
		
    },
    methods: {

		...mapActions(['setOpenedContrats']),
		

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

		/**
		 * Charge l'ensemble des contrats du personnel ouvert
		 * 
		 * @param {number} personnelId ID du personnel pour charger les contrats. Si undefined, ID actif
		 */
		loadContract(personnelId) {
			personnelId = typeof personnelId === 'undefined' ? this.openedElement.id  : personnelId;
			this.pending.contrats = true;
			this.$app.apiGet("structurePersonnel/GET/" + personnelId +"/contrats")
			.then((data) => {
				this.setOpenedContrats(data);
			})
			.catch(this.$app.catchError).finally(() => this.pending.contrats = false);
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
    components: { UserImage, ContractInfo, CoordInfo, EtatCivilInfo, Spinner, }
}

</script>
