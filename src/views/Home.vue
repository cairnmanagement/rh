<template>
	<div v-if="$store.state.login">

		<!-- Modifier à partir d'ici -->
		<HeaderToolbar>
			<div class="d-flex align-items-center justify-content-end">
				<button class="btn btn-light" @click.prevent="$emit('refresh')" title="Actualiser les données" :disabled="isPending">
					<i class="bi bi-arrow-clockwise" v-if="!isPending"></i>
					<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-else></span>
				</button>
			</div>
		</HeaderToolbar>

		<div class="container">

			<h1>Module de gestion du personnel</h1>

			<StaffManagementCard :display-mode="displayMode" />
			<ContractsTimeLine/>

			<!-- <div class="row">
				<div class="col">
				</div>
			</div> -->
			<hr>
		</div>
	
		<router-view/>
	</div> 

<!-- fin de modif-->
</template>

<script>


import { mapState } from 'vuex';
import StaffManagementCard from '../components/StaffManagementCard.vue';
import ContractsTimeLine from '../components/ContractsTimeLine.vue';
import HeaderToolbar from '../components/pebble-ui/toolbar/HeaderToolbar.vue';


export default {
	name: 'Home',
	
	components: {
		StaffManagementCard,
		ContractsTimeLine,
		HeaderToolbar
	},
	
	data() {
		return {
			chartMode: false,
			isPending: false
		}
	},
	
	computed: {
		
		...mapState([Element]),
		/**
		 * Retourne le mode d'affichage des informations (table ou graphique)
		 * @returns {String}
		 */
		displayMode() {
			return this.chartMode ? 'chart' : 'list';
		}
	}
	
}
</script>