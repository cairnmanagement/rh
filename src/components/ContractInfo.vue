<template>
    <div class="card-body">
		<div class="d-flex align-items-center justify-content-between mb-2">
			<h4 class="card-title m-0">Contrats</h4>


			<router-link :to="{name: 'EditContrat', params:{id:openedElement.id, idContrat: 0}}" v-slot="{navigation, href}" custom>
				<a :href="href" class="btn btn-primary" @click="navigation">
					<i class="bi bi-plus-lg"></i>
					Nouveau contrat
				</a>
			</router-link>
		</div>

		<div class="list-group list-group-flush">
			<contract-item v-for="contrat in contracts" :key="'contrat-'+contrat.id" :contrat="contrat"></contract-item>
		</div>
	</div>
</template>


<script>
import {mapState,} from 'vuex';
import date from 'date-and-time';
import fr from 'date-and-time/locale/fr';
import ContractItem from './ContractItem.vue';


export default{
	props:{
		contracts: Array
	},

	computed:{
		...mapState(["openedElement","openedContrats"]),
		
	},

	components: { ContractItem },

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
