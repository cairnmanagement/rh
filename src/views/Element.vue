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
				<div class="col-12 col-xl-6">
					<div class="card mb-3">
						<div class="card-body">
							<div class="position-relative">
								<user-image :name="openedElement.oPersonne.nom" size="xl"></user-image>
								<span class="badge bg-secondary position-absolute" style="top:0px;">{{openedElement.matricule}}</span>
							</div>
							<h3>{{openedElement.oPersonne.prenom}} {{openedElement.oPersonne.nom}}</h3>
							<div class="align-items-center justify-content-between" >
								<div class="d-flex align-items-center justify-content-center">
									<span v-if="openedElement.oContrat.duree_indeterminee == 'OUI'">CDI depuis le {{formatDateFr(openedElement.dentree)}}</span>
									<span v-if="openedElement.oContrat.duree_indeterminee == 'NON'">CDD jusqu'au {{formatDateFr(openedElement.dsortie)}}</span>

									<!-- {{ formatDateFr(openedElement.dentree)}} > {{formatDateFr(openedElement.dsortie)}} -->
									<!-- <span v-if="openedElement.dentree <= '2019-12-31 00:00:00'" class="badge bg-warning">inactif</span> 
									<span v-else-if="openedElement.dentree > '2019-12-31 00:00:00'" class="badge bg-success">actif</span> 
									<span v-else class="badge bg-danger">Erreur</span> -->
								</div>
							</div>
						</div>
					</div>
					<div class="card mb-3">
						<div class="card-body">
							<div class="d-flex align-items-center justify-content-between">
								<h4 class="card-title m-0">Etat-civil</h4>
								<router-link :to="{name:'ModificationEtatCivil', params:{id:openedElement.id}}" v-slot="{navigate,href}" custom>
									<a :href="href" @click="navigate" class="btn btn-light"><i class="bi bi-pencil"></i></a>
								</router-link>
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
									<span>né(e) le:</span><span>{{birthdate}}</span> 
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
							<div class="d-flex align-items-center justify-content-between">
								<h4 class="card-title m-0">Coordonnées</h4>
								<!-- <a href="/" class="btn btn-light"><i class="bi bi-plus-lg"></i></a> -->
								<div class="dropdown">
									<button class="btn btn-light dropdown-toggle" type="button" id="addRessource" data-bs-toggle="dropdown" aria-expanded="false">
										<i class="bi bi-plus-lg"></i>
									</button>
									<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="addRessource">
										<li>
											<router-link :to="{name:'ressourcePhone', params:{id:openedElement.id, idPhone: 0}}" v-slot="{navigate,href}" custom>
												<a class="dropdown-item" :href="href" @click="navigate">Téléphone</a>
											</router-link>
										</li>
										<li>
											<router-link :to="{name:'ressourceMail', params:{id:openedElement.id, idMail: 0}}" v-slot="{navigate,href}" custom>
												<a class="dropdown-item" :href="href" @click="navigate">Mail</a>
											</router-link>
										</li>
										<li>
											<router-link :to="{name:'ressourceAddress', params:{id:openedElement.id, idAdress: 0}}" v-slot="{navigate,href}" custom>
												<a class="dropdown-item" :href="href" @click="navigate">Adresse</a>
											</router-link>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<ul class="list-group list-group-flush">
							
							<li v-if="!openedElement.oPersonne.telephones" class="list-group-item d-flex align-items-between text-warning">Pas de numéro de téléphone enregistré</li>
							<li v-else class="list-group-item d-flex align-items-baseline">
								<div class="me-3"><i class="bi bi-phone"></i></div>
								<div class="d-flex flex-column flex-fill">
									<div v-for="item in openedElement.oPersonne.telephones" :key="item.id" class="d-flex flex-row align-items-center justify-content-between">
										<div>
											<a :href="'tel'+item.numero" class="text-decoration-none me-2">{{item.numero}}</a>
											<span v-if="item.type" class="badge bg-secondary me-2">{{item.type}}</span>
											<span v-if="item.id">id{{item.id}}</span>

										</div>
										<div>
											<router-link :to="{name:'ressourcePhone', params:{id:openedElement.id, idPhone:item.id}}" v-slot="{navigate,href}" custom>
												<a @click="navigate" :href="href" class=" btn btn-sm btn-light rounded-pill me-2"><i class="bi bi-pencil"></i></a>
											</router-link>
												<button @click.prevent="deletePhone(item.id)"   class="btn btn-sm btn-light rounded-pill text-black-50"><i class="bi bi-trash3"></i></button>
										</div>
									</div>
								</div>
							</li>
							<li v-if="!openedElement.oPersonne.emails?.length" class="list-group-item d-flex align-items-between text-warning">Pas d'adresse email enregistrée</li>
							<li v-else class="list-group-item d-flex align-items-baseline">
								<div class="me-3"><i class="bi bi-envelope"></i></div>
								<div class="d-flex flex-column flex-fill">
									<div v-for="item in openedElement.oPersonne.emails" :key="item.id" class="d-flex flex-row align-items-center justify-content-between">
										<div>
											<a :href="'mail'+item.adresse" class="text-decoration-none me-2">{{item.adresse}}</a>
											<span v-if="item.type" class="badge bg-secondary me-2">{{item.type}}</span>
											<span v-if="item.id">id{{item.id}}</span>
										</div>
										<div>
											<router-link :to="{name:'ressourceMail', params:{id:openedElement.id, idMail:item.id}}" v-slot="{navigate,href}" custom>
												<a @click="navigate" :href="href" class=" btn btn-sm btn-light rounded-pill me-2"><i class="bi bi-pencil"></i></a>
											</router-link>
											<button @click.prevent="deleteMail(item.id)"  class="btn btn-sm btn-light rounded-pill text-black-50"><i class="bi bi-trash3"></i></button>
										</div>
									</div>
								</div>
							</li>
							
							<li  v-for="item in openedElement.oPersonne.adresses" :key="item.id" class="list-group-item d-flex align-items-baseline">
								<div class="me-3"><i class="bi bi-geo-alt"></i></div>
								<div class="d-flex flex-column flex-fill" >
									<div class="d-flex align-items-center justify-content-between">
										<div>
											<span v-if="item.type" class="text-muted">{{item.type}} id: {{item.id}} </span>
											<span v-else class="text-muted">Contractuelle</span>
										</div>
										<div>
											<router-link :to="{name:'ressourceAddress', params:{id:openedElement.id, idAdress:item.id}}" v-slot="{navigate,href}" custom>
												<a @click="navigate" :href="href" class=" btn btn-sm btn-light rounded-pill me-2"><i class="bi bi-pencil"></i></a>
											</router-link>
											<button @click.prevent="deleteAdress(item.id)" class="btn btn-sm btn-light rounded-pill text-black-50"><i class="bi bi-trash3"></i></button>
										</div>
									</div>
									<div class="d-flex flex-column align-items-start justify-content-between">
										<span>{{item.voie}}</span>
										<span> {{item.complement}} </span>
										<span>{{item.cp}} {{item.localite}}</span>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<hr>
				</div>
				<div class="col-12 col-xl-6">
				<div class="card">
					<div class="card-body">
						<div class="d-flex align-items-center justify-content-between">
							<h4 class="card-title m-0">Contrats</h4>
						</div>
						<hr>
						<div class="list-group-flush">
							<router-link :to="{name:'infoContrat', params:{id:openedElement.id, idContrat:openedElement.oContrat.id}}" v-slot="{navigate,href}" custom>
								<a :href="href" @click="navigate" class="list-group-item list-group-item-action d-flex justify-content-between mb-3">
									<div class="d-flex flex-column align-items-start">
										<span>{{openedElement.oFonction.nom}} </span>
										<span class="text-muted">du {{entrydate2}} au {{exitdate2}}</span>
										<span>Contrat à durée déterminée (3 avenants)</span> 
									</div>
									<div class="d-flex align-items-center">
										<i class="bi bi-arrow-up-right"></i>
									</div>
								</a>
							</router-link>
							<hr>
							<router-link :to="{name:'infoContrat', params:{id:openedElement.id, idContrat:openedElement.oContrat.id}}" v-slot="{navigate,href}" custom>
								<a :href="href" @click="navigate" class="list-group-item list-group-item-action d-flex justify-content-between mb-1">
									<div class="d-flex flex-column align-items-start">
										<span>{{openedElement.oFonction.nom}} <span>(Cadre)</span></span>
										<span class="text-success">depuis le {{entrydate2}}</span>
										<span class="mb-2">Contrat à durée indéterminée (3 avenants)</span> 
										<div class="text-success">
											<span>. Avenant depuis le {{entrydate2}}</span>
										</div>
										<div class="text-muted">
											<span>. Avenant du {{entrydate2}}</span>
										</div>
										<div class="text-muted">
											<span>. Avenant du {{entrydate2}}</span>
										</div>
									</div>
									<div class="d-flex align-items-center">
										<i class="bi bi-arrow-up-right"></i>
									</div>
								</a>
							</router-link>
						</div>
					</div>
				</div>
				
				
				<div class="row">
					<div class="col-12">

						<div class="card">
					<h5>oContrat</h5>
					{{openedElement.oContrat}}
				</div>
					</div>

				</div>
				
				
				</div>
			</div>	
			
			
			
		</section>

	<!-- Ne pas toucher -->
        <router-view></router-view>
</div>

</template>

<script>

import {mapActions, mapState} from 'vuex'
import UserImage from '../components/pebble-ui/UserImage.vue';
import date from 'date-and-time';
import fr from 'date-and-time/locale/fr';

export default {
    data() {
        return {
            pending: {
                extendedData: true
            }
			
        };
    },
    computed: {
        ...mapState(["openedElement"]),

		birthdate() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.oPersonne.dn)  , 'DD-MM-YYYY')
		},
		entrydate() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.dentree)  , 'DD-MM-YYYY')
		}, 
		entrydate2() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.dentree)  , 'DD MMM YYYY')
		}, 
		exitdate() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.dsortie)  , 'DD-MM-YYYY')
		},
		exitdate2() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.dsortie)  , 'DD MMM YYYY')
		}
		
    },
    methods: {

		...mapActions(['removeRessource']),

		deleteAdress(data) {
			if (confirm('Souhaitez vous supprimer cette adresse ?')) {
				let idElement= this.openedElement.id;
				let adresses = this.openedElement.oPersonne.adresses
				console.log(idElement,data);
				let apiUrl = 'structurePersonnel/DELETE/' +idElement+ '/adresse/' +data;
				this.$app.apiPost(apiUrl)

                .then((resp) => {
					console.log(data);
					console.log(resp);

                    if (resp) {
                        alert('adresse supprimée');
						console.log('1',resp);
						console.log('2',adresses);
						console.log('3',data);
                    }
					// suprimer dans le store l'item dans le tableau adresses, dont l'id == data
                    
                })
                .catch(this.catchError);
			}
			else {
				alert ('Cette adresse ne sera pas supprimée');
				console.log('Cette adresse ne sera pas supprimée');
			}
		},

		deletePhone(data) {
			if (confirm('Souhaitez vous supprimer ce contact téléphonique ?')) {
				let idElement= this.openedElement.id;
				let telephones = this.openedElement.oPersonne.telephones
				console.log(idElement,data);
				let apiUrl = 'structurePersonnel/DELETE/' +idElement+ '/telephone/' +data;
				this.$app.apiPost(apiUrl)

                .then((resp) => {
					console.log(data);
					console.log(resp);

                    if (resp) {
                        alert('adresse supprimée');
						console.log('1',resp);
						console.log('2',telephones);
						console.log('3',data);
                    }
					// suprimer dans le store l'item dans le tableau telephones, dont l'id == data

                })
                .catch(this.catchError);
			}
			else {
				alert ('Ce contact télphonique ne sera pas supprimé');
				console.log('téléphone non supprimé');
			}
		},

		deleteMail(ressourceId) {
			if (confirm('Souhaitez vous supprimer cette adresse mail ?')) {
				let idElement= this.openedElement.id;
				console.log(idElement,ressourceId);
				let apiUrl = 'structurePersonnel/DELETE/' +idElement+ '/email/' +ressourceId;
				this.$app.apiPost(apiUrl)

                .then((resp) => {

					if (resp === 'OK') {
						this.removeRessource({
							ressource: 'emails',
							id: ressourceId
						});
					}
					else {
						alert('Erreur inconnue!');
					}

					// suprimer dans le store l'item dans le tableau emails, dont l'id == data
                })
                .catch(this.$app.catchError);
			}
			else {
				alert ('Cette adresse mail ne sera pas supprimée');
				console.log('téléphone non supprimée');
			}
		},

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
		
        /**
         * Charger les données complémentaires du personnel
         */
        loadData(id) {
			if (this.openedElement) {
				if (!this.openedElement.extendedData) {
					this.pending.extendedData = true;
					this.$app.apiGet("structurePersonnel/GET/" + id, {
						api_hierarchy: true
					})
						.then(personnelData => {
						personnelData.extendedData = true;
						this.$store.dispatch("refreshOpened", personnelData);
						this.pending.extendedData = false;
						console.log('result api', personnelData)
					})
						.catch(this.$app.catchError);
				}
				else {
					this.pending.extendedData = false;
				}
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
    components: { UserImage,}
}

</script>
