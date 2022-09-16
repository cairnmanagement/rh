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
			<div class="row">
				<div class="col-6">
					<div class="card mb-3">
						<div class="card-body">
							<div>
								<user-image :name="openedElement.oPersonne.nom"></user-image>
							</div>
							<h3>{{openedElement.oPersonne.prenom}} {{openedElement.oPersonne.nom}}</h3>
							<p> CDI depuis le DD/MM/YYYY</p>
						</div>
					</div>
					<div class="card mb-3">
						<div class="card-body">
							<div class="d-flex align-items-center justify-content-between">
								<h4 class="card-title m-0">Etat-civil</h4>
								<a href="/" class="btn btn-light"><i class="bi bi-pencil"></i></a>
							</div>
						</div>
						<ul class="list-group list-group-flush">
							<li class="list-group-item">
								<div class="d-flex align-items-center justify-content-between">
									<span>Nom complet:</span><span>{{openedElement.oPersonne.civilite}} {{openedElement.oPersonne.prenom}} {{openedElement.oPersonne.nom}}</span>
								</div>
							</li>
							<li class="list-group-item">
								<div class="d-flex align-items-center justify-content-between">
									<span>né(e) le:</span><span>{{openedElement.oPersonne.dn}}</span> 
								</div>
							</li>
							<li class="list-group-item">
								<div class="d-flex align-items-center justify-content-between">
									<span>Lieu de naissance:</span><span>{{openedElement.oPersonne.lieuNaissance}}</span> 
								</div>
							</li>
							
							<li class="list-group-item">
								<div class="d-flex align-items-center justify-content-between">
									<span>Nationalité:</span><span>{{openedElement.oPersonne.nationalite}}</span> 
								</div>
							</li>
							<li class="list-group-item">
								<div class="d-flex align-items-center justify-content-between">
									<span>N° de sécurité sociale:</span><span>{{openedElement.nss}}</span> 
								</div>
							</li>
						</ul>
					</div>
					<div class="card mb-3">
						<div class="card-body">
							<div class=" card-header d-flex align-items-center justify-content-between">
								<h3>Coordonnées</h3>
								<a href="/" class="text-primary fs-4"><i class="bi bi-plus-lg"></i></a>
							</div>
							<ul class="list-group list-group-flush">
								<li v-if="openedElement.oPersonne.tel1.numero" class="list-group-item d-flex align-items-baseline">
									<div class="me-3"><i class="bi bi-phone"></i></div>
									<div class="flex-fill">
										<div class="d-flex align-items-center justify-content-between">
											<a :href="'tel:'+openedElement.oPersonne.tel1.numero" class="text-decoration-none">{{openedElement.oPersonne.tel1.numero}}</a>
											<button class="btn btn-sm btn-link text-black-50"><i class="bi bi-trash3"></i></button>
										</div>
									</div>
								</li>
								<li v-if="openedElement.oPersonne.mail1.adresse" class="list-group-item">
									<div class="d-flex align-items-start justify-content-between">
										<div><i class="bi bi-envelope"></i></div>
										<div class="d-flex flex-column align-items-start justify-content-between" >
											<div class="d-flex align-items-start justify-content-between">
												<span>{{openedElement.oPersonne.mail1.adresse}}</span>
												<span><i class="bi bi-trash3"></i></span>
											</div>
											<div v-if="openedElement.oPersonne.mail2.adresse">
												<span>{{openedElement.oPersonne.mail2.adresse}}</span>
												<span><i class="bi bi-trash3"></i></span>
											</div>
										</div>
									</div>
								</li>
								
								<li v-if="openedElement.oPersonne.mail1.adresse" class="list-group-item">
									<div class="d-flex align-items-start justify-content-between">
										<div><i class="bi bi-geo-alt"></i></div>
										<div class="d-flex flex-column align-items-start justify-content-between" >
											<div class="text-muted">
												Contrat
												<span><i class="bi bi-trash3"></i></span>
											</div>
											<div class="d-flex flex-column align-items-start justify-content-between">
												<span>{{openedElement.oPersonne.adresse.voie}}</span>
												<span>{{openedElement.oPersonne.adresse.cp}} {{openedElement.oPersonne.adresse.localite}}</span>
												<span> </span>

											</div>
											<div class="text-muted">
												Courrier
												<span><i class="bi bi-trash3"></i></span>
											</div>
											<div v-if="openedElement.oPersonne.mail2.adresse">
												<span>{{openedElement.oPersonne.mail2.adresse}}</span>
											</div>
										</div>
									</div>
								</li>
							</ul>


						</div>
					</div>
				</div>
				<div class="card col-6">
					<div class="card-body">
						<h3>Contrats</h3>
						{{openedElement.oPersonne.adresse}}
					</div>
				</div>
			</div>	
			
			{{openedElement.extendedData}}
					
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
										<div><i class="bi bi-file-text"></i><span class="m-1">CDI 22/04/2022<i class="bi bi-arrow-right m-1"></i>N.D.</span></div>
									</a>
									<a href="" class="list-group-item list-group-item-action">
										<div><span class="text-muted text-nowrap">Créateur d'API</span></div>
										<div><i class="bi bi-file-text"></i><span class="text-muted m-1">CDD 13/04/2020<i class="bi bi-arrow-right m-1"></i>terminé le 12/04/2022</span></div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-2">
					<img src="../assets/facewoman.png" class="img-fluid rounded-5 rounded-circle"  alt="photo identité de l'agent">
				</div>
			</div>

	<!-- documents joints au dossier -->
			
			<!-- fin documents joints au dossier -->
		</div>
	<!-- FIN accordion avec Coordonnées, informations personnelles et contrats de travail et docts joints au dossier-->


	<!-- Fin de l'interface -->
    

	<!-- Ne pas toucher -->
        <router-view></router-view>
</div>

</template>

<script>

import {mapState} from 'vuex'
import UserImage from '../components/pebble-ui/UserImage.vue';

export default {
    data() {
        return {
            pending: {
                extendedData: true
            }
        };
    },
    computed: {
        ...mapState(["openedElement"])
    },
    methods: {
        /**
         * Charger les données complémentaires du personnel
         */
        loadData(id) {
            if (!this.openedElement.extendedData) {
                this.pending.extendedData = true;
                this.$app.apiGet("structurePersonnel/GET/" + id, {
                    api_hierarchy: true
                })
                    .then(personnelData => {
                    personnelData.extendedData = true;
                    this.$store.dispatch("refreshOpened", personnelData);
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
        this.$store.dispatch("load", to.params.id);
        this.loadData(to.params.id);
    },
    /**
     * Lorsqu'on quite la route active, l'élément ouvert est vidé.
     */
    beforeRouteLeave(from, to, next) {
        this.$store.dispatch("unload");
        next();
    },
    /**
     * Lorsque l'élément est monté, on va lire l'élément à charger passé en paramètre.
     */
    mounted() {
        /**
         * Ici on va charger l'élém
         */
        this.$store.dispatch("load", this.$route.params.id);
        this.loadData(this.$route.params.id);
    },
    components: { UserImage }
}

</script>
