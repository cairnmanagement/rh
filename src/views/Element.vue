<template>
<div class="container" v-if="openedElement">

		<div>
			<nav id="enteteDossier" class=" card-header navbar navbar-light bg-light px-3 justify-content-end">
				<ul class="nav nav-pills">
					<li class="nav-item">
						<a class="nav-link" href="#"><i class="bi bi-arrow-clockwise"></i></a>
					</li>
				</ul>
			</nav>
		</div>

	<!--en-tête fiche personnel-->
		<section class="text-center py-3 bg-light" v-if="openedElement.extendedData">
			<div class="row justify-content-center">
				<div class="col-2">
					<img src="../assets/facewoman.png" class="img-fluid rounded-5 rounded-circle"  alt="photo identité de l'agent">
				</div>
				</div>		
			<div class="row">
					<h1 class="fw-light">{{openedElement.oPersonne.prenom}} {{openedElement.oPersonne.nom}}</h1>
					<!--<h2 class="fw-light">!!{{openedElement.oFonction.nom}}</h2>-->
					<!--<p class="lead text-muted">Structure {{openedElement.structure}} Id. #{{openedElement.id}}</p>-->
						<div class="row justify-content-center" v-if="openedElement.oPersonne">
							<!--<span>{{openedElement.oPersonne.tel1.numero}}</span>
							<span>{{openedElement.oPersonne.mail1.adresse}}</span>-->

							<button class="btn btn-primary col-1 m-1"><i class="bi bi-envelope"></i></button>
							<button class="btn btn-primary col-1 m-1"><i class="bi bi-telephone-outbound-fill"></i></button>
						</div>
			</div>
			<!--<div v-else>
			<div v-if="pending.extendedData">Chargement en cours...</div>
			<div v-else class="text-danger">Erreur dans le chargement des données.</div>
			</div>
			-->
		</section>
	<!-- fin entête fiche personnel-->



		
		

	<!-- DEBUT accordion avec Coordonnées, informations personnelles et contrats de travail-->
		<div class="row">
			<div class="col-sm-12 col-xl-6">
				<div class="accordion my-2">
					<div class="accordion-item" id="accordionContact">
						<p class="accordion-header" id="Contact">
							<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseContact" aria-expanded="false" aria-controls="collapseInfo">
								Coordonnées 
							</button>
						</p>
						<div id="collapseContact" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionContact">
							<div class="accordion-body list-group-flush">
								<a href="#" class="list-group-item list-group-item-action" v-if="openedElement.oPersonne">
									<div class="d-flex flex-row justify-content-start">
										<span class="col-1"><i class="bi bi-telephone-outbound-fill"></i></span>
										<span class="col"> {{openedElement.oPersonne.tel1.numero}}</span>
									</div>
								</a>
								<a href="#" class="list-group-item list-group-item-action" v-if="openedElement.oPersonne">
									<div class="d-flex flex-row justify-content-start">
										<span class="col-1"><i class="bi bi-telephone-outbound-fill"></i></span>
										<span class="col">{{openedElement.oPersonne.tel2.numero}}</span>
									</div>
								</a>
								<a href="#"  class="list-group-item list-group-item-action" v-if="openedElement.oPersonne">
									<div class="d-flex flex-row justify-content-start">
										<span class="col-1"><i class="bi bi-envelope"></i></span>
										<span class="col">{{openedElement.oPersonne.mail1.adresse}}</span>
									</div>
								</a>
								<a href="#"  class="list-group-item list-group-item-action" v-if="openedElement.oPersonne">
									<div class="d-flex flex-row justify-content-start">
										<span class="col-1"><i class="bi bi-envelope"></i></span>
										<span class="col">{{openedElement.oPersonne.mail2.adresse}}</span>
									</div>
								</a>
								<a href="#"  class="list-group-item list-group-item-action" v-if="openedElement.oPersonne">
									<div class="d-flex flex-row justify-content-start">
										<span class="col-1"><i class="bi bi-house"></i></span>
										<span class="col">{{openedElement.oPersonne.adresse.adresse}}</span>
									</div>
								</a>
								
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="accordion my-2 col-sm-12 col-xl-6">
				<div class="accordion-item" id="accordionInfo">
					<p class="accordion-header" id="Info">
						<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseInfo" aria-expanded="false" aria-controls="collapseInfo">
						Informations personnelles
						</button>
					</p>
					<div id="collapseInfo" class="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionInfo">
						<div class="accordion-body list-group-flush">
								<div class="list-group-item">
									<span class="d-block">{{openedElement.oPersonne.civilite}} {{openedElement.cache_nom}} est
									né(e) le !!<strong>{{openedElement.oPersonne.dn}}</strong> à <strong> {{openedElement.oPersonne.lieuNaissance}} </strong>.<br>
									{{openedElement.oPersonne.prenom}} est de nationalité <strong>{{openedElement.oPersonne.nationalite}}.</strong></span>
								</div>
								<div class="list-group-item">
									<span class="d-block">Son numéro de sécurité sociale est : <strong>{{openedElement.nss}}</strong></span>
								</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-sm-12 col-xl-6">
				<div class="accordion my-2">
					<div class="accordion-item" id="accordionContrats">
						<p class="accordion-header" id="Contrats">
							<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseContrats" aria-expanded="false" aria-controls="collapseContrats">
							Contrats de travail
							</button>
						</p>
						<div id="collapseContrats" class="accordion-collapse collapse show" aria-labelledby="headingThree" data-bs-parent="#accordionContrats">
							<div class="accordion-body">								
								<div class="list-group-flush">
									<a href="" class="list-group-item list-group-item-action">
										<div class="text-primary"><span class="text-success text-nowrap">Développeur et Gourou Fullstack Senior</span></div>
										<div><i class="bi bi-file-text"></i><span class="m-1">CDI du 22/04/2022 178 J.<i class="bi bi-arrow-right m-1"></i>N.D.</span></div>
									</a>
									<a href="" class="list-group-item list-group-item-action">
										<div class="text-primary"><span class="text-primary text-nowrap">Créateur d'API</span></div>
										<div><i class="bi bi-file-text"></i><span class="m-1">CDD du 22/04/2020 35h.<i class="bi bi-arrow-right m-1"></i>terminé le 21/04/2022</span></div>
									</a>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>

	<!-- documents joints au dossier -->
			<div class="accordion my-2 col-sm-12 col-xl-6">
				<div class="accordion-item" id="accordionDocuments">
					<p class="accordion-header" id="Documents">
						<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDocuments" aria-expanded="false" aria-controls="collapseContrats">
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
			</div><!-- fin documents joints au dossier -->
		</div>
	<!-- FIN accordion avec Coordonnées, informations personnelles et contrats de travail et docts joints au dossier-->


	<!-- Fin de l'interface -->
    

	<!-- Ne pas toucher -->
        <router-view></router-view>
</div>

</template>

<script>

import {mapState} from 'vuex'

export default {

	data() {
		return {
			pending : {
				extendedData : true
			}
		}
	},

    computed: {
        ...mapState(['openedElement'])
    },

	methods: {
		/**
		 * Charger les données complémentaires du personnel
		 */
		loadData(id) {

			if (!this.openedElement.extendedData) {
				this.pending.extendedData = true;
				this.$app.apiGet('structurePersonnel/GET/'+id, {
					api_hierarchy: true
				})
				.then(personnelData => {
					personnelData.extendedData = true;
					this.$store.dispatch('refreshOpened', personnelData);
					this.pending.extendedData = false;
				})
				.catch(this.$app.catchError);
			}
			else {
				this.pending.extendedData = false;
			}
		}
	},

    /**
     * Lorsque la route interne est mise à jour, le nouvel élément doit être chargé.
     */
    beforeRouteUpdate(to) {
        this.$store.dispatch('load', to.params.id);
		this.loadData(to.params.id);
    },


    /**
     * Lorsqu'on quite la route active, l'élément ouvert est vidé.
     */
    beforeRouteLeave(from, to, next) {
        this.$store.dispatch('unload');
        next();
    },


    /**
     * Lorsque l'élément est monté, on va lire l'élément à charger passé en paramètre.
     */
    mounted() {
        /**
         * Ici on va charger l'élém
		 */
        this.$store.dispatch('load', this.$route.params.id);
		this.loadData(this.$route.params.id);
    }
}

</script>
