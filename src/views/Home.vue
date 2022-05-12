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
						<li class="list-group-item list-group-flush d-flex justify-content-between align-items-center">
							<span>Sorties des effectifs le mois prochain</span>
							<span class="badge bg-warning">12</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="col">
				<div class="card">
					<div class="card-body">
						<h3>Les contrats en cours</h3>
					</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item d-flex justify-content-between align-items-center">
							<span>Contrat à durée indéterminée</span>
							<span class="badge bg-secondary">123</span>
						</li>
						<li class="list-group-item d-flex justify-content-between align-items-center">
							<span>Contrat à durée déterminée</span>
							<span class="badge bg-secondary">456</span>
						</li>
						<li class="list-group-item list-group-flush d-flex justify-content-between align-items-center">
							<span>Contrat d'apprentissage</span>
							<span class="badge bg-secondary">12</span>
						</li>
						<li class="list-group-item list-group-flush d-flex justify-content-between align-items-center">
							<span>Contrat de professionalisation</span>
							<span class="badge bg-secondary">3</span>
						</li>
						<li class="list-group-item list-group-flush d-flex justify-content-between align-items-center">
							<span>Contrat de stage</span>
							<span class="badge bg-secondary">2</span>
						</li>
						<li class="list-group-item list-group-flush d-flex justify-content-between align-items-center">
							<span>Total</span>
							<span class="badge bg-warning">595</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="col">
				<div class="card">
					<div class="card-body">
						<h3>Les contrats en cours par type</h3>
						<div id="piechart"></div>
					</div>
				</div>
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
				['Task', 'Type de contrat'],
				['CDI',     123],
				['CDD',      456],
				['Apprentissage',  12],
				['Professionalisation', 3],
				['Stage',    2]
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
