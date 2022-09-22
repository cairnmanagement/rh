<template>
<div>
	<div class="container">
<!--modale edition téléphone	 -->
			<h3>Ajouter un numéro de téléphone</h3>
			<div class="row g-2">
				<div class="col mb-3">
				<label for="type" class="form-label me-3">Type:</label>
				<div class="form-check form-check-inline">
					<input class="form-check-input" type="radio" name="typemail" id="inlineCheckbox1" value="option1">
					<label class="form-check-label" for="inlineCheckbox1">Professionnel</label>
				</div>
				<div class="form-check form-check-inline">
					<input class="form-check-input" type="radio" name="typemail" id="inlineCheckbox2" value="option2">
					<label class="form-check-label" for="inlineCheckbox2">Personnel</label>
				</div>
				</div>
			</div>
			<div class="row g-2">
				<div class="col mb-3">
                    <label for="tel" class="form-label">Numéro</label>
                    <input type="tel" class="form-control" id="tel" name="tel">
                </div>
			</div>
<!-- modale edition adresse mail -->
			<h3>Ajouter une adresse mail</h3>
			<div class="row g-2">
				<div class="col mb-3">
				<label for="type" class="form-label me-3">Type:</label>
				<div class="form-check form-check-inline">
					<input class="form-check-input" type="radio" name="typemail" id="inlineCheckbox1" value="option1">
					<label class="form-check-label" for="inlineCheckbox1">Professionnelle</label>
				</div>
				<div class="form-check form-check-inline">
					<input class="form-check-input" type="radio" name="typemail" id="inlineCheckbox2" value="option2">
					<label class="form-check-label" for="inlineCheckbox2">Personnelle</label>
				</div>
				</div>
			</div>
			<div class="row g-2">
				<div class="col mb-3">
                    <label for="mail" class="form-label">Adresse mail</label>
                    <input type="mail" class="form-control" id="mail" name="mail">
                </div>
			</div>
<!-- modale edition adresse -->
			<h3>Ajouter une adresse postale</h3>
			<div class="row g-2">
				<div class="col mb-3">
				<label for="type" class="form-label me-3">Type:</label>
				<div class="form-check form-check-inline">
					<input class="form-check-input" type="radio" name="typeadress" id="inlineCheckbox1" value="option1">
					<label class="form-check-label" for="inlineCheckbox1">Contrat</label>
				</div>
				<div class="form-check form-check-inline">
					<input class="form-check-input" type="radio" name="typeadress" id="inlineCheckbox2" value="option2">
					<label class="form-check-label" for="inlineCheckbox2">Domicile</label>
				</div>
				</div>
			</div>
            <div class="row g-2">
                <div class="col-2 mb-3">
                    <label for="voie_numero" class="form-label">n°</label>
                    <input type="number" class="form-control" id="voie_numero" name="voieNumero">
                </div>
                <div class="col mb-3">
                    <label for="voie" class="form-label">Voie</label>
                    <input type="text" class="form-control" id="voie_nom" name="voie">
                </div>
            </div>
			<div class="row g-2">
				<div class="col mb-3">
                    <label for="localite" class="form-label">Complément</label>
                    <input type="text" class="form-control" id="complement" name="complement">
                </div>
			</div>
            <div class="row g-2">
                <div class="col-3 mb-3">
                    <label for="code_postal" class="form-label">Code postal</label>
                    <input type="number" class="form-control" id="code_postal" name="cp">
                </div>
                <div class="col mb-3">
                    <label for="localite" class="form-label">Localité</label>
                    <input type="text" class="form-control" id="localite" name="localite">
                </div>
            </div> 
			<div class="row g-2">
				<div class="col mb-3">
                    <label for="localite" class="form-label">Pays</label>
                    <input type="text" class="form-control" id="pays" name="pays">
                </div>
			</div>	
<!-- fin modale edition adresse -->

<!--projet de vue du dossier agent-->
		<h3>Projet dosssier agent</h3>
		<div class="album py-2 bg-light">
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
	<div>
		sauvegarde
		<div class="accordion my-2 col-sm-12 col-xl-6">
				<div class="accordion-item" id="accordionDocuments">
					<p class="accordion-header" id="Documents">
						<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDocuments" aria-expanded="false" aria-controls="collapseDocuments">
						Documents joints au dossier
						</button>
					</p>
					<div id="collapseDocuments" class="accordion-collapse collapse show" aria-labelledby="headingThree" data-bs-parent="#accordionContrats">
						<div class="accordion-body list-group-flush">
							<a href="#" class="list-group-item list-group-item-action  d-flex gap-2 py-2 align-items-center" aria-current="true">
							<span class="text-center text-success align-items-baseline"><i class="bi bi-check-circle"></i></span>
								<div class="d-flex gap-2 w-100 justify-content-between">
									<p class="mb-0">Fiche de renseignements</P>
									<small class="opacity-50 text-nowrap text-success">15/03/2022</small>
								</div>
							</a>
							<a href="#" class="list-group-item list-group-item-action d-flex gap-2 py-2 align-items-center" aria-current="true">
							<span class="text-center text-danger"><i class="bi bi-file-arrow-down"></i></span>
								<div class="d-flex gap-2 w-100 justify-content-between">
								<p class="mb-0">Pièce d'identité</p>
								<small class="opacity-50 text-nowrap text-danger">Ajouter</small>
								</div>
							</a>
							<a href="#" class="list-group-item list-group-item-action d-flex gap-2 py-2 align-items-center" aria-current="true">
							<span class="text-center text-success"><i class="bi bi-check-circle"></i></span>
								<div class="d-flex gap-2 w-100 justify-content-between">
								<p class="mb-0">Photo</p>
								<small class="opacity-50 text-nowrap text-success">15/03/2022</small>
								</div>
							</a>
							<a href="#" class="list-group-item list-group-item-action d-flex gap-2 py-2 align-items-center" aria-current="true">
							<span class="text-center text-danger"><i class="bi bi-file-arrow-down"></i></span>
								<div class="d-flex gap-2 w-100 justify-content-between">
								<p class="mb-0">Droit sécurité sociale</p>
								<small class="opacity-50 text-nowrap text-danger">Ajouter</small>
								</div>
							</a>
							<a href="#" class="list-group-item list-group-item-action d-flex gap-2 py-2 align-items-center" aria-current="true">
							<span class="text-center text-success"><i class="bi bi-check-circle"></i></span>
								<div class="d-flex gap-2 w-100 justify-content-between">
								<p class="mb-0">Permis de conduire</p>
								<small class="opacity-50 text-nowrap">15/03/2022</small>
								</div>
							</a>
							<a href="#" class="list-group-item list-group-item-action d-flex gap-2 py-2 align-items-center" aria-current="true">
							<span class="text-center text-danger"><i class="bi bi-file-arrow-down"></i></span>
								<div class="d-flex gap-2 w-100 justify-content-between">
								<p class="mb-0">Justificatif de domicile</p>
								<small class="opacity-50 text-nowrap text-danger">15/03/2022</small>
								</div>
							</a>
							<a href="#" class="list-group-item list-group-item-action d-flex gap-2 py-2 align-items-center" aria-current="true">
							<span class="text-center text-success"><i class="bi bi-check-circle"></i></span>
								<div class="d-flex gap-2 w-100 justify-content-between">
								<p class="mb-0">RIB</p>
								<small class="opacity-50 text-nowrap text-success">15/03/2022</small>
								</div>
							</a>
							<a href="#" class="list-group-item list-group-item-action d-flex gap-2 py-2 align-items-center" aria-current="true">
							<span class="text-center text-danger"><i class="bi bi-file-arrow-down"></i></span>
								<div class="d-flex gap-2 w-100 justify-content-between">
								<p class="mb-0">Certificat d'aptitudes physiques</p>
								<small class="opacity-50 text-nowrap text-danger">Ajouter</small>
								</div>
							</a>
							<a href="#" class="list-group-item list-group-item-action d-flex gap-2 py-2 align-items-center" aria-current="true">
							<span class="text-center text-success"><i class="bi bi-check-circle"></i></span>
								<div class="d-flex gap-2 w-100 justify-content-between">
								<p class="mb-0">Certificat d'aptitudes psychotechniques</p>
								<small class="opacity-50 text-nowrap text-success">15/03/2022</small>
								</div>
							</a>
							<a href="#" class="list-group-item list-group-item-action d-flex gap-2 py-2 align-items-center" aria-current="true">
							<span class="text-center text-success"><i class="bi bi-check-circle"></i></span>
								<div class="d-flex gap-2 w-100 justify-content-between">
								<p class="mb-0">Visite médicale du travail</p>
								<small class="opacity-50 text-nowrap text-success">15/03/2022</small>
								</div>
							</a>
							<a href="#" class="list-group-item list-group-item-action d-flex gap-2 py-2 align-items-center" aria-current="true">
							<span class="text-center text-success"><i class="bi bi-check-circle"></i></span>
								<div class="d-flex gap-2 w-100 justify-content-between">
								<p class="mb-0">Charte véhicule</p>
								<small class="opacity-50 text-nowrap text-success">15/03/2022</small>
								</div>
							</a>
							<a href="#" class="list-group-item list-group-item-action d-flex gap-2 py-2 align-items-center" aria-current="true">
							<span class="text-center text-success"><i class="bi bi-check-circle"></i></span>
								<div class="d-flex gap-2 w-100 justify-content-between">
								<p class="mb-0">Charte informatique</p>
								<small class="opacity-50 text-nowrap text-success">15/03/2022</small>
								</div>
							</a>
							<a href="#" class="list-group-item list-group-item-action d-flex gap-2 py-2 align-items-center" aria-current="true">
							<span class="text-center text-success"><i class="bi bi-check-circle"></i></span>
								<div class="d-flex gap-2 w-100 justify-content-between">
								<p class="mb-0">Fiche(s) de poste</p>
								<small class="opacity-50 text-nowrap text-success">15/03/2022</small>
								</div>
							</a>
							<a href="#" class="list-group-item list-group-item-action d-flex gap-2 py-2 align-items-center" aria-current="true">
							<span class="text-center text-success"><i class="bi bi-check-circle"></i></span>
								<div class="d-flex gap-2 w-100 justify-content-between">
								<p class="mb-0">Attestation validité permis</p>
								<small class="opacity-50 text-nowrap text-success">15/03/2022</small>
								</div>
							</a>
							<a href="#" class="list-group-item list-group-item-action d-flex gap-2 py-2 align-items-center" aria-current="true">
							<span class="text-center text-success"><i class="bi bi-check-circle"></i></span>
								<div class="d-flex gap-2 w-100 justify-content-between">
								<p class="mb-0">Accueil sécurité</p>
								<small class="opacity-50 text-nowrap text-success">15/03/2022</small>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
			

	</div>
<!--fin de projet de vue du dossier agent-->
</div>
<div class="container">
    <div v-for="abs in listabsence" :key="'absence'+abs.id">
		test api absence {{abs.dc}}
    </div> 
</div> 

</template>
<script>
	export default {
	
		data() {
			return {
				listabsence: [],
					
				}
				
		},
	
	
		
	
		methods: {
			DisplayList() {
				let apiUrl = 'structurePersonnel/GET/'+561+'/absence';
				this.$app.apiGet(apiUrl)
				.then( (data) => {
					this.listabsence = data.result;
					console.log(this.listabsence)
				})
				.catch(this.$app.catchError);
			},
		},
		mounted() {
			this.DisplayList();
		},   
	}
		
	</script>
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