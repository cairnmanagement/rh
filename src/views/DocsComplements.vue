<template>
<div>
	<div class="container">
		<div class="card shadow-sm mt-4">
			<div class=" card-body">
				<h2 class="mb-3">Nouvelle demande d'absence</h2>
				<div class="row mb-3">
					<div class="col">
						<label for="dd" class="form-label col">Choisissez une période:</label>
						<input type="date" class="form-control" id="dd">
					</div>
					<!--
					<div class="col">
						<label for="type" class="form-label">le type de congés</label>
						<select class="form-select form-select-md">
							<option value="1">Congés payés N-1*</option>
							<option value="2">Congés payés N*</option>
							<option value="3">Congés sans solde</option>
							<option value="3">Congés pour évènement familial</option>
							<option value="3">Récupération</option>
							<option value="3">RTT</option>
						</select>
					</div>
					-->
				</div>
				<div class="col-3 m-2">
					<input class="form-control btn btn-primary" type="submit" value="Créez">
				</div>
			</div>
		</div>
		<div class="card shadow-sm mt-3 mb-3">
			<div class=" card-body">
				<h2 class="mb-2">Votre demande d'absence</h2>
					<ul class="list-group list-group-flush">
						<li class="list-group-item">
							<div class="row align-items-center">
								<span class="col-3">Jeu 14 juil 2022</span>
								<div class="col-8">
									<select class="form-select">
										<option value="2">Congés payés</option>
										<option value="3">Congés sans solde</option>
										<option value="3">Congés pour évènement familial</option>
										<option value="3">Récupération</option>
										<option value="3">RTT</option>
									</select>
								</div>
								<span class="col"><i class="bi bi-trash"></i></span>
							</div>
						</li>
						<li class="list-group-item">
							<div class="row align-items-center">
								<span class="col-3">Ven 15 juil 2022</span>
								<div class="col-8">
									<select class="form-select">
										<option value="2">Congés payés</option>
										<option value="3">Congés sans solde</option>
										<option value="3">Congés pour évènement familial</option>
										<option value="3">Récupération</option>
										<option value="3">RTT</option>
									</select>
								</div>
								<span class="col"><i class="bi bi-trash"></i></span>
							</div>
						</li>
						<li class="list-group-item">
							<div class="row align-items-center">
								<span class="col-3">Sam 16 juil 2022</span>
								<div class="col-8">
									<select class="form-select">
										<option value="2">Congés payés</option>
										<option value="3">Congés sans solde</option>
										<option value="3">Congés pour évènement familial</option>
										<option value="3">Récupération</option>
										<option value="3">RTT</option>
									</select>
								</div>
								<span class="col"><i class="bi bi-trash"></i></span>
							</div>
						</li>
						<li class="list-group-item">
							<div class="row align-items-center">
								<span class="col-3">Dim 17 juil 2022</span>
								<div class="col-8">
									<select class="form-select">
										<option value="2">Congés payés</option>
										<option value="3">Congés sans solde</option>
										<option value="3">Congés pour évènement familial</option>
										<option value="3">Récupération</option>
										<option value="3">RTT</option>
									</select>
								</div>
								<span class="col"><i class="bi bi-trash"></i></span>
							</div>	
						</li>
						<li class="list-group-item">
							<div class="row align-items-center">
								<span class="col-3">Lun 18 juil 2022</span>
								<div class="col-8">
									<select class="form-select">
										<option value="2">Congés payés</option>
										<option value="3">Congés sans solde</option>
										<option value="3">Congés pour évènement familial</option>
										<option value="3">Récupération</option>
										<option value="3">RTT</option>
									</select>
								</div>
								<span class="col"><i class="bi bi-trash"></i></span>
							</div>
						</li>
						<li class="list-group-item">
							<div class="row align-items-center">
								<span class="col-3">Mar 19 juil 2022</span>
								<div class="col-8">
									<select class="form-select">
										<option value="2">Congés payés</option>
										<option value="3">Congés sans solde</option>
										<option value="3">Congés pour évènement familial</option>
										<option value="3">Récupération</option>
										<option value="3">RTT</option>
									</select>
								</div>
								<span class="col"><i class="bi bi-trash"></i></span>
							</div>
						</li>
						<li class="list-group-item">
							<div class="row align-items-center">
								<span class="col-3">Mer 20 juil 2022</span>
								<div class="col-8">
									<select class="form-select">
										<option value="2">Congés payés</option>
										<option value="3">Congés sans solde</option>
										<option value="3">Congés pour évènement familial</option>
										<option value="3">Récupération</option>
										<option value="3">RTT</option>
									</select>
								</div>
								<span class="col"><i class="bi bi-trash"></i></span>
							</div>
						</li>
						<li class="list-group-item">
							<div class="row align-items-center">
								<span class="col-3">Jeu 21 juil 2022</span>
								<div class="col-8">
									<select class="form-select">
										<option value="2">Congés payés</option>
										<option value="3">Congés sans solde</option>
										<option value="3">Congés pour évènement familial</option>
										<option value="3">Récupération</option>
										<option value="3">RTT</option>
									</select>
								</div>
								<span class="col"><i class="bi bi-trash"></i></span>
							</div>
						</li>
						<li class="list-group-item">
							<div class="row align-items-center">
								<span class="col-3">Ven 22 juil 2022</span>
								<div class="col-8">
									<select class="form-select">
										<option value="2">Congés payés</option>
										<option value="3">Congés sans solde</option>
										<option value="3">Congés pour évènement familial</option>
										<option value="3">Récupération</option>
										<option value="3">RTT</option>
									</select>
								</div>
								<span class="col"><i class="bi bi-trash"></i></span>
							</div>
						</li>
						<li class="list-group-item">
							<div class="row align-items-center">
								<label class="form-label" rows="3" for="commentaire">Commentaire:</label>
								<textarea class="form-control" name="commentaire"></textarea>
							</div>
						</li>
					</ul>
					<div class="col-3 m-2">
						<input class="form-control btn btn-primary" type="submit" value="Validez">
					</div>
				</div>
			</div>
			
			
			<div class="col">
				<div class="card shadow-sm">
					<div class="card-body">
						<p class="card-text">Vos demandes enregistrées</p>
						<div class="d-flex justify-content-between align-items-center">
							
						</div>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="card shadow-sm">
					<div class="card-body">
						<p class="card-text">Vos demandes validées</p>
						<div class="d-flex justify-content-between align-items-center">
							
						</div>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="card shadow-sm">
					<div class="card-body">
						<p class="card-text">Vos soldes de congés</p>
						<div class="d-flex justify-content-between align-items-center">
						</div>
					</div>
				</div>
			</div>
		
<!--formulaire de demande d'absence (voir pour implanter une timeline)-->
<div class="album py-2 bg-light">
	<div class="container">
		
		<div class="col">
					<div class="card shadow-sm">
						<div class="card-body">
							<p class="card-text">Récap demande d'absence</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card shadow-sm">
						<div class="card-body">
							<p class="card-text">Solde de congés</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card shadow-sm">
						<div class="card-body">
							<p class="card-text">Autre chose</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
								</div>
							</div>
						</div>
					</div>
				</div>
</div>

	</div>
</div>	






<!--fin de formulaire de demande d'absence-->

<!-- graphique google charts
<div id="piechart"></div>
-->
<!--projet de vue du dossier agent-->

	<div class="album py-2 bg-light">
		<div class="container">
			<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
				<div class="col">
					<div class="card shadow-sm">
						<div class="card-body">
							<p class="card-text">Fiche de renseignents</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
									<button type="button" class="btn btn-sm btn-outline-secondary">Ajouter</button>
								</div>
								<span class="badge bg-success">OK</span>                
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card shadow-sm">
						<div class="card-body">
							<p class="card-text">Pièce d'identité</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
									<button type="button" class="btn btn-sm btn-outline-secondary">Ajouter</button>
								</div>
								<span class="badge bg-success">OK</span>                
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card shadow-sm">
						<div class="card-body">
							<p class="card-text">Photo</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
									<button type="button" class="btn btn-sm btn-outline-secondary">Ajouter</button>
								</div>
								<span class="badge bg-success">OK</span>                
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card shadow-sm">
						<div class="card-body">
							<p class="card-text">Droit sécurité sociale</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
									<button type="button" class="btn btn-sm btn-outline-secondary">Ajouter</button>
								</div>
								<span class="badge bg-success">OK</span>                
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card shadow-sm">
						<div class="card-body">
							<p class="card-text">Permis de conduire</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
									<button type="button" class="btn btn-sm btn-outline-secondary">Ajouter</button>
								</div>
								<span class="badge bg-success">OK</span>              
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card shadow-sm">
						<div class="card-body">
							<p class="card-text">Justificatif de domicile</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
									<button type="button" class="btn btn-sm btn-outline-secondary">Ajouter</button>
								</div>
								<span class="badge bg-danger">VIDE</span>								
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card shadow-sm">
						<div class="card-body">
							<p class="card-text">RIB</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
									<button type="button" class="btn btn-sm btn-outline-secondary">Ajouter</button>
								</div>
								<span class="badge bg-success">OK</span>        
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card shadow-sm">
						<div class="card-body">
							<p class="card-text">Certificat d'aptitude physique</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
									<button type="button" class="btn btn-sm btn-outline-secondary">Ajouter</button>
								</div>
								<span class="badge bg-success">OK</span>              
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card shadow-sm">
						<div class="card-body">
							<p class="card-text">Certificat d'aptitudes psychotechniques</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
									<button type="button" class="btn btn-sm btn-outline-secondary">Ajouter</button>
								</div>
								<span class="badge bg-danger">VIDE</span>								
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card shadow-sm">
						<div class="card-body">
							<p class="card-text">Visite médicale du travail</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
									<button type="button" class="btn btn-sm btn-outline-secondary">Ajouter</button>
								</div>
								<span class="badge bg-danger">VIDE</span>								
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card shadow-sm">
						<div class="card-body">
							<p class="card-text">Charte véhicule</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
									<button type="button" class="btn btn-sm btn-outline-secondary">Ajouter</button>
								</div>
								<span class="badge bg-danger">VIDE</span>								
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card shadow-sm">
						<div class="card-body">
							<p class="card-text">Charte informatique</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
									<button type="button" class="btn btn-sm btn-outline-secondary">Ajouter</button>
								</div>
								<span class="badge bg-danger">VIDE</span>                
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card shadow-sm">
						<div class="card-body">
							<p class="card-text">Fiche (s) de poste</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
									<button type="button" class="btn btn-sm btn-outline-secondary">Ajouter</button>
								</div>
								<span class="badge bg-success">OK</span>                
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card shadow-sm">
						<div class="card-body">
							<p class="card-text">Attestation validité permis</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
									<button type="button" class="btn btn-sm btn-outline-secondary">Ajouter</button>
								</div>
								<span class="badge bg-success">OK</span>                
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card shadow-sm">
						<div class="card-body">
							<p class="card-text">Accueil sécurité</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
									<button type="button" class="btn btn-sm btn-outline-secondary">Ajouter</button>
								</div>
								<span class="badge bg-success">OK</span>                
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<hr>
	
<!--fin de projet de vue du dossier agent-->


</div>
</template>
<!--
<script>
import {GoogleCharts} from 'google-charts';


export default {
name: 'docs',



data() {
return {
chart_disp: false
}
},

methods: {
/**
* Affiche un diagramme
*/
/*
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
/*
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
</script>-->