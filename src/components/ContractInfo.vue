<template>
    <div class="card-body">
		<div class="d-flex align-items-center justify-content-between">
			<h4 class="card-title m-0">Contrats</h4>
		</div>
		<div >
			<div class=" list-group list-group-flush" >
				<div v-for="contrat in contracts" :key="'contrat-'+contrat.id" >
					<router-link :to="{name:'infoContrat', params:{id:openedElement.id, idContrat:contrat.id}}" v-slot="{navigate,href}" custom>
						<a :href="href" @click="navigate"  class="list-group-item list-group-item-action d-flex justify-content-between mb-1 text-decoration-none">
							<div v-if="contrat.dsortie_reelle" class="d-flex flex-column align-items-start">
								<div>Contrat {{contrat.id}}</div>
								<div>Qualification: {{contrat.mls__qualification}}</div>
								<div class="text-muted">du {{changeFormatDateLit(contrat.dentree)}} au {{changeFormatDateLit(contrat.dsortie_reelle)}}</div>
								<div>contrat à durée indéterminée: {{contrat.duree_indeterminee}}</div>
	
							</div>
							<div v-else-if="contrat.duree_indeterminee == 'OUI'" class="d-flex flex-column align-items-start">
								<div>Contrat {{contrat.id}}</div>
								<div>Qualification: {{contrat.mls__qualification}}</div>
								<div class="text-success">depuis le {{changeFormatDateLit(contrat.dentree)}}</div>
								<div>contrat à durée indéterminée ( {{contrat.contrats.length-1}} avenants) </div>
	
							</div>
							<div v-else-if="contrat.duree_indeterminee == 'NON'" class="d-flex flex-column align-items-start">
								<div>Contrat {{contrat.id}}</div>
								<div>Qualification: {{contrat.mls__qualification}}</div>
								<div class="text-success">depuis le {{changeFormatDateLit(contrat.dentree)}}</div>
								<div>contrat à durée déterminée ( {{contrat.contrats.length-1}} avenants) </div>
							</div>
							<div v-else>
								<div>Problème sur contrat {{contrat.id}} </div>
								<div>{{changeFormatDateLit(contrat.dentree)}} > {{changeFormatDateLit(contrat.dsortie)}}</div>
								<div> {{contrat.duree_indeterminee}} </div>
							
							</div>
							<div class="d-flex align-items-center">
								<i class="bi bi-arrow-up-right"></i>
							</div>
							<!-- Créer composant contractItem  -->
						</a>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState,} from 'vuex';
import date from 'date-and-time';
import fr from 'date-and-time/locale/fr';
// import ContractItem from '../components/ContractItem.vue';


export default{

	props:{
		contracts: Array
	},

	computed:{
		...mapState(["openedElement","openedContrats"]),
		
	},

	methods : {
		/**
		 * Modifie le format de la date entrée en paramètre et la retourne 
		 * sous le format 01/02/2021
		 * @param {string} date 
		 */


		formatDateFr(date) {
			let newDate = new Date(date);
			let format = newDate.toLocaleDateString('fr-FR');
			return format;
		},
		
		/**
		 * Modifie le format de la date entrée en paramètre et la retourne 
		 * sous le format 01 févr. 2021
		 * @param {string} date 
		 */

		changeFormatDateLit(el) {
			date.locale(fr);
			return date.format(new Date(el), 'DD MMM YYYY')
		},
		
		
	},
	mounted () {

		// this.loadContracts()
	},
    // components: { ContractItem}

}
</script>
