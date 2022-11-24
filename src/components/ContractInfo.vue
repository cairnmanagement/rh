<template>
    <div class="card-body">
		<div class="d-flex align-items-center justify-content-between">
			<h4 class="card-title m-0">Contrats</h4>
		</div>
		<hr>
		<div class=" list-group list-group-flush">
			
			<router-link :to="{name:'infoContrat', params:{id:openedElement.id, idContrat:openedElement.oContrat.id}}" v-slot="{navigate,href}" custom>
				<a :href="href" @click="navigate" class="list-group-item list-group-item-action d-flex justify-content-between mb-1 bg-light">
					<div v-if="openedElement.oContrat.dsortie_reelle" class="d-flex flex-column align-items-start">
					<p>OpenedElement contrat:{{openedElement.oContrat.id}}</p>

						<div v-if="openedElement.oFonction.nom">{{openedElement.oFonction.nom}}</div>
						<div class="text-muted">du {{changeFormatDateLit(openedElement.oContrat.dentree)}} au {{exitDateFormat2}}</div>
						<div v-if="openedElement.oContrat.duree_indeterminee == 'OUI'">Contrat à durée indéterminée (X avenants)</div> 
						<div v-else>Contrat à durée déterminée  avenants</div> 
					</div>

					<div v-else-if="openedElement.oContrat.duree_indeterminee == 'OUI'" class="d-flex flex-column align-items-start">
					<p>OpenedElement</p>

						<div v-if="openedElement.oFonction.nom">{{openedElement.oFonction.nom}}</div>
						<div class="text-success">depuis le {{entryDateFormat2}}</div>
						<div v-if="openedElement.oContrat.dsortie_reelle">{{exitDateReal}}</div>
						<div>Contrat à durée indéterminée  (X avenants)</div> 

					</div>
					<div v-else-if="openedElement.oContrat.duree_indeterminee ='NON'" class="d-flex flex-column align-items-start" >
					<p>OpenedElement</p>

						<div v-if="openedElement.oFonction.nom">{{openedElement.oFonction.nom}}</div>
						<div class="text-success">du {{entryDateFormat2}} au {{exitDateFormat2}}</div>
						<div>Contrat à durée déterminée (X avenants)</div> 
					</div>
					<div v-else>?</div>
					
					<div class="d-flex align-items-center">
						<i class="bi bi-arrow-up-right"></i>
					</div>
				</a>
			</router-link>
		</div>
		<div >
			<router-link :to="{name:'infoContrat', params:{id:openedElement.id, idContrat:openedElement.oContrat.id}}" v-slot="{navigate,href}" custom>
						<div class=" list-group list-group-flush"  >
							<a :href="href" @click="navigate" class="list-group-item list-group-item-action d-flex justify-content-between mb-1" v-for="contrat in contracts" :key="'contrat-'+contrat.id">
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
						</div>
			</router-link>
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
		...mapState(["openedElement"]),

		
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
		// 	return date.format(new Date(this.contracts.dsortie_reelle) , 'DD MM YYYY')
		// }
		
		
	},

	methods : {
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
