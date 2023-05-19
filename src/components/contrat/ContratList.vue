<template>
    <div class="card-body">
		<div class="d-flex align-items-center justify-content-between mb-2">
			<h4 class="card-title m-0">Contrats</h4>


			<router-link :to="{name: 'EditContrat', params:{id:openedPersonnel.id, idContrat: 0}}" v-slot="{navigation, href}" custom>
				<a :href="href" class="btn btn-primary" @click="navigation">
					<i class="bi bi-plus-lg"></i>
					Nouveau contrat
				</a>
			</router-link>
		</div>

		<div class="list-group list-group-flush" v-if="contrats?.length">
			<ListItem 
				v-for="contrat in contrats" 
				:key="'contrat-'+contrat.id" 
				
				:contrat="contrat"
				:type="getType(contrat)" />
		</div>

		<div class="text-secondary my-2" v-else>Aucun contrat</div>
	</div>
</template>


<script>
import {mapState,} from 'vuex';
import ListItem from './ListItem.vue';
import { AssetsAssembler } from '../../js/app/services/AssetsAssembler';


export default{
	props:{
		contrats: Array
	},

	data() {
		return {
			pending: {
				types: true
			},
			typesCollection: null
		}
	},

	computed:{
		...mapState(["openedPersonnel","openedContrats"]),
		
	},

	components: { ListItem },

	methods : {
		/**
		 * Contrôle le chargement des types de la liste de contrats
		 * 
		 * @return {Promise}
		 */
		async loadTypes() {
			this.pending.types = true;

			try {
				this.typesCollection = this.$assets.getCollection('contratTypes');
	
				let assembler = new AssetsAssembler(this.contrats);
				await assembler.joinAsset(this.typesCollection, 'type_id');
			}
			catch (e) {
				this.$app.catchError(e);
			}
			finally {
				this.pending.types = false;
			}
		},

		/**
		 * Retourne le type pour un contrat donné
		 * 
		 * @param {object} contrat Le contrat pour lequel il faut récupérer le type
		 * 
		 * @return {Promise<object>}
		 */
		async getType(contrat) {
			if (!contrat.type_id) {
				return null;
			}

			await this.loadTypes();
			return await this.typesCollection.getById(contrat.type_id);
		}
		
	}

}
</script>
