<template>
    <div class="card-body">
		<div class="d-flex align-items-center justify-content-between">
			<h4 class="card-title m-0">Contrats</h4>
		</div>
		<hr>
		<div class="list-group-flush">
			<!-- <router-link :to="{name:'infoContrat', params:{id:openedElement.id, idContrat:openedElement.oContrat.id}}" v-slot="{navigate,href}" custom>
				<a :href="href" @click="navigate" class="list-group-item list-group-item-action d-flex justify-content-between mb-3">
					<div class="d-flex flex-column align-items-start">
						
					ZONE DE TEST
						
						
					</div>
					<div class="d-flex align-items-center">
						<i class="bi bi-arrow-up-right"></i>
					</div>
				</a>
			</router-link> -->
			
			<router-link :to="{name:'infoContrat', params:{id:openedElement.id, idContrat:openedElement.oContrat.id}}" v-slot="{navigate,href}" custom>
				<a :href="href" @click="navigate" class="list-group-item list-group-item-action d-flex justify-content-between mb-1">

					<div v-if="openedElement.oContrat.dsortie_reelle">{{openedElement.oContrat.dsortie_reelle}}</div>

					<div v-else-if="openedElement.oContrat.duree_indeterminee == 'OUI'" class="d-flex flex-column align-items-start">
						<span v-if="openedElement.oFonction.nom">{{openedElement.oFonction.nom}}</span>
						<span class="text-success">depuis le {{entryDateFormat2}}</span>
						<!-- <span v-if="openedElement.oContrat.dsortie_reelle">{{exitDateReal}}</span> -->
						<span>Contrat à durée indéterminée (X avenants)</span> 

					</div>
					<div v-else-if="openedElement.oContrat.duree_indeterminee ='NON'" class="d-flex flex-column align-items-start" >
						<span v-if="openedElement.oFonction.nom">{{openedElement.oFonction.nom}}</span>
						<span class="text-success">du {{entryDateFormat2}} au {{exitDateFormat2}}</span>
						<span>Contrat à durée déterminée (X avenants)</span> 
					</div>
					<div v-else>?</div>
					
					<div class="d-flex align-items-center">
						<i class="bi bi-arrow-up-right"></i>
					</div>
				</a>
				<div class="card m-6">
					<div class="d-flex flex-column">
						<div>
							id contrat: {{openedElement.oContrat.id}}
						</div>
						<div>
							duree indéterminée: {{openedElement.oContrat.duree_indeterminee}}
						</div>
						<div class="card-body">
							<p>données oContrat</p>
							{{openedElement.oContrat}}
						</div>
					</div>
					<div>
					</div>
				</div>
			</router-link>
		</div>
	</div>
</template>
<script>
import {mapState,} from 'vuex';
import date from 'date-and-time';
import fr from 'date-and-time/locale/fr'


export default{

	props:{

	},

	computed:{
		...mapState(["openedElement"]),

		entrydate() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.dentree)  , 'DD-MM-YYYY')
		},
		/**
		 * modifie le format de la date reçue de l'API au format 10 janv. 2022
		 * @params	
		 */
		entryDateFormat2() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.dentree)  , 'DD MMM YYYY')
		}, 
		exitdate() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.dsortie)  , 'DD-MM-YYYY')
		},
		exitDateFormat2() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.dsortie)  , 'DD MMM YYYY')
		},
		// exitDateReal(){
		// 	date.locale(fr);
		// 	return date.format(new Date(this.openedElement.oContrat.dsortie_reelle) , 'DD MM YYYY')
		// }
	},

	methods : {

		// loadContracts(){
		// 	if (this.openedElement) {
		// 		this.$app.apiGet('structurePersonnel/GET/'+this.openedElement.id+'contrats')
				
		// 	}
		// 	else{
		// 		alert('erreur api')
		// 	}
		// }
	},
	mounted () {

		// this.loadContracts()
	}



}
</script>
