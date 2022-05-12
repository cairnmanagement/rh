<template>


<div v-if="$store.state.login">
    <!-- Modifier à partir d'ici -->

	<div class="container">

		<h1 class="my-3">Module de gestion du personnel</h1>

		<h2>Statistiques</h2>

		<div class="row">
			<div class="col">
				<div class="card">
					<div class="card-body">
						<h3>Revue des effectifs</h3>
					</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item d-flex justify-content-between align-items-center">
							<span>Personnels actifs</span>
							<span class="badge bg-secondary">123</span>
						</li>
						<li class="list-group-item d-flex justify-content-between align-items-center">
							<span>Total contacts</span>
							<span class="badge bg-secondary">456</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="col">
				<div class="card">
					<div class="card-body">
						<div id="piechart"></div>
					</div>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="list-group col-xm-12 col-lg-6">
				<h3 class="list-group-item bg-light">Revue des  effectifs</h3>
				<a class="list-group-item list-group-item-action">Personnels actifs<span class="badge bg-secondary float-end">123</span></a>
				<a class="list-group-item list-group-item-action">Personnels ressources<span class="badge bg-secondary float-end">456</span></a>
				<a class="list-group-item list-group-item-action">Sorties des effectifs le mois prochain<span class="badge bg-warning float-end">12</span></a>
				</div>

			<div class="list-group col">
				<h3 class="list-group-item bg-light">Les contrats en cours</h3>

				<a class="list-group-item list-group-item-action">Contrat à durée indéterminée<span class="badge bg-secondary float-end">123</span></a>
				<a class="list-group-item list-group-item-action">Contrat à durée déterminée<span class="badge bg-secondary float-end">456</span></a>
				<a class="list-group-item list-group-item-action">Contrat d'apprentissage<span class="badge bg-secondary float-end">12</span></a>
				<a class="list-group-item list-group-item-action">Contrat de professionalisation<span class="badge bg-secondary float-end">3</span></a>
				<a class="list-group-item list-group-item-action">Contrat de stage<span class="badge bg-secondary float-end">1</span></a>
				<a class="list-group-item list-group-item-action">Total<span class="badge bg-primary float-end">595</span></a>
			</div>
		</div>

		<hr>

		<StructurePersonnelForm />
	</div>    
</div>

        <!-- fin de modif-->
</template>

<script>

import {GoogleCharts} from 'google-charts';

import StructurePersonnelForm from '@/components/StructurePersonnelForm.vue'

export default {
    name: 'Home',

	components: {
		StructurePersonnelForm
	},

	data() {
		return {
			chart_disp: false
		}
	},

	methods: {
		/**
		 * Affiche un diagramme
		 */
		drawChart() {
			let el = document.getElementById('piechart');

			let data = [
				['Task', 'Hours per Day'],
				['Work',     11],
				['Eat',      2],
				['Commute',  2],
				['Watch TV', 2],
				['Sleep',    7]
			];

			var visData = GoogleCharts.api.visualization.arrayToDataTable(data);
			var chart = new GoogleCharts.api.visualization.PieChart(el);

			chart.draw(visData);
		},

		/**
		 * Charge un diagramme
		 */
		loadChart() {
			let el = document.getElementById('piechart');
			if (typeof el !== 'undefined') {
				GoogleCharts.load(this.drawChart);
			}
		}
	},

	updated() {
		this.loadChart();
	},

	mounted() {
		this.loadChart();
		// GoogleCharts.load(this.drawChart);
		//GoogleCharts.setOnLoadCallback(this.drawChart);
	}
}
</script>
