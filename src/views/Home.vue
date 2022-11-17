<template>
	<div v-if="$store.state.login">

		<div class="container py-3">

			<div class="pb-3">
				<div class="row row-cols-1 row-cols-lg-2">
					<div class="col">
						<PersonalStats :personnel-stats="personnelStats" v-if="!pending.updatePersonnelStats"></PersonalStats>
					</div>

					<div class="col">
						<ContractCurrentStats :contrat-current-stats="contratCurrentStats" v-if="!pending.updateContratCurrentStats"></ContractCurrentStats>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col">
					<ContractsTimeLine :contrat-stats="contratStats" v-if="!pending.updateContratStats" />
				</div>
			</div>
		</div>
	
		<router-view/>
	</div> 

<!-- fin de modif-->
</template>

<script>


import { mapState } from 'vuex';
import ContractsTimeLine from '../components/ContractsTimeLine.vue';
import ContractCurrentStats from '../components/ContractCurrentStats.vue';
import PersonalStats from '../components/PersonalStats.vue';


export default {
	name: 'Home',
	
	components: {
    ContractsTimeLine,
    ContractCurrentStats,
	PersonalStats},
	
	data() {
		return {
			chartMode: false,
			isPending: false,
			pending: {
				updatePersonnelStats: true,
				updateContratCurrentStats: true,
				updateContratStats: true
			}
		}
	},
	
	computed: {
		
		...mapState(['personnelStats', 'contratStats', 'contratCurrentStats']),

		/**
		 * Retourne le mode d'affichage des informations (table ou graphique)
		 * @returns {String}
		 */
		displayMode() {
			return this.chartMode ? 'chart' : 'list';
		}
		
	},

	methods: {

		/**
		 * Récupère l'ensemble des statistiques afin de les stocker dans le store
		 * - Statistique du personnel
		 * - Statistique des contrats à date
		 * - Statistique des contrats sur 12 mois
		 */
		loadStats() {
			let stats_actions = {
				updatePersonnelStats: {
					route: 'structurePersonnel/GET/stats'
				}, 
				updateContratCurrentStats: {
					route: 'structurePersonnelContrat/GET/stats'
				}, 
				updateContratStats: {
					route: 'structurePersonnelContrat/GET/stats',
					query: {
						nbMonth: 12
					}
				}
			};

			for (const action in stats_actions) {
				let options = stats_actions[action];
				this.pending[action] = true;

				this.$app.apiGet(options.route, options.query)
				.then(data => {
					this.$store.dispatch(action, data);
					console.log(action, data);
				})
				.catch(this.$app.catchError)
				.finally(() => {
					this.pending[action] = false;
				})
			}
        },
	},

	mounted() {
		this.loadStats();
	}
	
}

</script>