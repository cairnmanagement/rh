<template>

	<AppWrapper
		:cfg="cfg"
		:cfg-menu="cfgMenu"
		:cfg-slots="cfgSlots"
		
		@auth-change="setLocal_user">

		<template v-slot:header>
			<div class="mx-2 d-flex align-items-center" v-if="openedElement">
				<router-link to="/" custom v-slot="{ navigate, href }">
					<a class="btn btn-dark me-2" :href="href" @click="navigate">
						<i class="bi bi-arrow-left"></i>
					</a>
				</router-link>
				<router-link :to="'/personnel/'+openedElement.id+'/properties'" custom v-slot="{ navigate, href }">
					<a class="btn btn-dark me-2" :href="href" @click="navigate">
						<i class="bi bi-file-earmark me-1"></i>
						{{openedElement.cache_nom}}
					</a>
				</router-link>

				<div class="dropdown">
					<button class="btn btn-dark dropdown-toggle" type="button" id="fileDdMenu" data-bs-toggle="dropdown" aria-expanded="false">
						Fichier
					</button>
					<ul class="dropdown-menu" aria-labelledby="fileDdMenu">
						<li>
							<router-link :to="'/personnel/'+openedElement.id+'/informations'" custom v-slot="{ navigate, href }">
								<a class="dropdown-item" :href="href" @click="navigate">Informations</a>
							</router-link>
						</li>
					</ul>
					
				</div>
					<a class="nav-link text-light" href="#"><i class="bi bi-arrow-clockwise"></i></a>

			</div>
		</template>


		<template v-slot:menu>
			<AppMenu>
				<AppMenuItem href="/" look="dark" icon="bi bi-house">Mon personnel</AppMenuItem>
				<AppMenuItem href="/personnel-actif" look="dark" icon="bi bi-person-check">Contrats actifs</AppMenuItem>
				<AppMenuItem href="/contacts" look="dark" icon="bi bi-person">inactifs</AppMenuItem>
				<AppMenuItem href="/tous" look="dark" icon="bi bi-file-check">Tous</AppMenuItem>
				<AppMenuItem href="/docs-complements" look="dark" icon="bi bi-file-code">Tests Docs complémentaires</AppMenuItem>
				<AppMenuItem href="/a-propos" look="dark" icon="bi bi-app">À propos</AppMenuItem>
			</AppMenu>
		</template>

		<template v-slot:list>
			
			<AppMenu v-if="$route.path == '/' || $route.path == '/tous' || $route.name =='Personnel'">
				<AppMenuItem>
				<search-personnel></search-personnel>
			</AppMenuItem>
					<div class="wrapper">
						<AppMenuItem :href="'/personnel/'+personnel.id" v-for="personnel in filterElements" :key="personnel.id">
							<div class="d-flex align-items-center justify-content-between">
							<div class="d-flex align-items-center">
								<div class="me-2">
									<UserImage :name="personnel.cache_nom" />
								</div>
								<!--
									Un seul bloc utile. Utiliser une méthode pour générer le libeller. La méthode reprend les 3 conditions
									- !dentree (= "Sans contrat")
									- dsortie < date du jour (new Date()) (= "terminé le")
									- sinon : (= "depuis le...")
									La méthode est appelée dans l'élément html comme suit :
									<div>{{personnelContratLabel(personnel) }}</div>
								-->
								<div class="align-items-center justify-content-between" v-if="!personnel.dsortie">
									<div class="d-flex justify-content-between align-items-center"> {{personnel.cache_nom}}</div>
									<!-- <div>CDI depuis le {{ formatDateFr(personnel.dentree)}}</div> -->
								</div>
								<div class="align-items-center justify-content-between" v-else-if="personnel.dsortie < '2022-03-09 00:00:00'">
									<div class="d-flex justify-content-between align-items-center">{{personnel.cache_nom}}</div>
									<!-- <div>CDD terminé le {{ formatDateFr(personnel.dsortie)}}</div> -->
								</div>
								<div class="align-items-center justify-content-between" v-else>
									<div class="d-flex justify-content-between align-items-center">{{personnel.cache_nom}}</div>
									<!-- <div>CDD depuis le {{ formatDateFr(personnel.dentree)}}</div> -->
								</div>
							</div>
							<i class="rounded-circle bg-success" style="width:8px; height:8px;"></i>
						</div>
					</AppMenuItem>
				</div>
			</AppMenu>
			<AppMenu v-else-if="$route.path == '/personnel-actif'">
				<div class="search-wrapper input-group sticky-top">
					<span   class="input-group-text" ><i class="bi bi-search"></i></span>
					<input v-model="search" type="text" class="form-control" placeholder="Rechercher dans la liste" aria-label="Username" aria-describedby="recherche">
				</div>
				
				
				<div class="wrapper">

					<AppMenuItem :href="'/personnel/'+el.id" icon="bi bi-file-person" v-for="el in filterElements" :key="el.id">
							<span>{{el.cache_nom}}</span>
							<div class="d-flex align-items-center justify-content-between">
								{{ formatDateFr(el.dentree)}} > {{formatDateFr(el.dsortie)}}
								<span v-if="el.dentree <= '2019-12-31 00:00:00'" class="badge bg-warning">inactif</span> 
								<span v-else-if="el.dentree > '2019-12-31 00:00:00'" class="badge bg-success">actif</span> 
								<span v-else class="badge bg-danger">Erreur</span>
							</div>
					</AppMenuItem>
					<!-- <div v-else>Pas de personnel actif</div> -->

				</div>
			</AppMenu>
			<AppMenu v-else-if="$route.path == '/contacts'">
				<div class="search-wrapper input-group sticky-top">
					<span   class="input-group-text" ><i class="bi bi-search"></i></span>
					<input v-model="search" type="text" class="form-control" placeholder="Votre recherche" aria-label="Username" aria-describedby="recherche">
				</div>
				<div class="wrapper">
					<AppMenuItem :href="'/personnel/'+el.id" icon="bi bi-file-person" v-for="el in filterElements" :key="el.id">
						<span>{{el.cache_nom}}</span>
						<div class="d-flex align-items-center justify-content-between">
							{{ formatDateFr(el.dentree)}} > {{formatDateFr(el.dsortie)}}
							<span v-if="el.dentree <= '2019-12-31 00:00:00'" class="badge bg-warning">inactif</span> 
							<span v-else-if="el.dentree > '2019-12-31 00:00:00'" class="badge bg-success">actif</span> 
							<span v-else class="badge bg-danger">Erreur</span>
						</div>
					</AppMenuItem>
				</div>
			</AppMenu>
			<AppMenu v-else-if="$route.path == '/docs-complements'">
				<div class="d-flex flex-inline">
					
					<div class="d-flex flex-inline flex-wrap">
						<p class="mx-1"> <span class="badge bg-info">hors contrat<i class="bi bi-x-lg ms-1"></i></span></p>
						<p class="mx-1"> <span class="badge bg-info">immatriculé<i class="bi bi-x-lg ms-1"></i></span></p>
						<p class="mx-1"> <span class="badge bg-info">non archivé<i class="bi bi-x-lg ms-1"></i></span></p>
					</div>
				</div>
				<div class="card bg-primary m-2">
					<ul class="list-group">
						<li class="list-group-item">
							<div class="d-flex flex-inline justify-content-between">
								<div class="form-check">
									<input class="form-check-input" type="radio" name="contratRadio" id="contratRadio1" checked>
									<label class="form-check-label" for="contratRadio1">
									Tous
									</label>
								</div>
								<div class="form-check">
									<input class="form-check-input" type="radio" name="contratRadio" id="contratRadio2" >
									<label class="form-check-label" for="contratRadio2">
									Contrat
									</label>
								</div>
								<div class="form-check">
									<input class="form-check-input" type="radio" name="contratRadio" id="contratRadio3">
									<label class="form-check-label" for="contratRadio3">
									Hors contrat
									</label>
								</div>
							</div>
						</li>
						<li class="list-group-item">
							<div class="d-flex flex-inline justify-content-between">
								<div class="form-check">
									<input class="form-check-input" type="radio" name="matriculeRadio" id="matriculeRadio1" checked >
									<label class="form-check-label" for="matriculeRadio1">
									Tous
									</label>
								</div>
								<div class="form-check">
									<input class="form-check-input" type="radio" name="matriculeRadio" id="matriculeRadio2">
									<label class="form-check-label" for="matriculeRadio2">
									Matricule
									</label>
								</div>
								<div class="form-check">
									<input class="form-check-input" type="radio" name="matriculeRadio" id="matriculeRadio3">
									<label class="form-check-label" for="matriculeRadio3">
									Sans
									</label>
								</div>
							</div>
						</li>
						<li class="list-group-item">
							<div class="d-flex flex-inline justify-content-between">
								<div class="form-check">
									<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
									<label class="form-check-label" for="flexRadioDefault1">
									Tous
									</label>
								</div>
								<div class="form-check">
									<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
									<label class="form-check-label" for="flexRadioDefault2">
									Archivés
									</label>
								</div>
								<div class="form-check">
									<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
									<label class="form-check-label" for="flexRadioDefault2">
									Non archivés
									</label>
								</div>
							</div>
						</li>
						<li class="list-group-item d-flex justify-content-end"><button class="btn btn-outline-primary btn-sm">Appliquer</button></li>
					</ul>
				</div>
				<ul class="list-group">
					<li class="list-group-item d-flex flex-inline">
						<div class=" dropdown bg-light">
							<div class="form-check">
								<input class="form-check-input" type="radio" name="contratRadio" id="contratRadio1" checked>
								<label class="form-check-label" for="contratRadio1">
								Tous
								</label>
							</div>
							<div class="form-check">
								<input class="form-check-input" type="radio" name="contratRadio" id="contratRadio2" >
								<label class="form-check-label" for="contratRadio2">
								Contrat
								</label>
							</div>
							<div class="form-check">
								<input class="form-check-input" type="radio" name="contratRadio" id="contratRadio3">
								<label class="form-check-label" for="contratRadio3">
								Hors contrat
								</label>
							</div>
						</div>
						<div class="dropdown">
							<div class="form-check">
								<input class="form-check-input" type="radio" name="matriculeRadio" id="matriculeRadio1" checked >
								<label class="form-check-label" for="matriculeRadio1">
								Tous
								</label>
							</div>
							<div class="form-check">
								<input class="form-check-input" type="radio" name="matriculeRadio" id="matriculeRadio2">
								<label class="form-check-label" for="matriculeRadio2">
								Matricule
								</label>
							</div>
							<div class="form-check">
								<input class="form-check-input" type="radio" name="matriculeRadio" id="matriculeRadio3">
								<label class="form-check-label" for="matriculeRadio3">
								Sans matricule
								</label>
							</div>
						</div>
						<div class="">
							<div class="form-check">
								<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
								<label class="form-check-label" for="flexRadioDefault1">
								Tous
								</label>
							</div>
							<div class="form-check">
								<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
								<label class="form-check-label" for="flexRadioDefault2">
								Archivés
								</label>
							</div>
							<div class="form-check">
								<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
								<label class="form-check-label" for="flexRadioDefault2">
								Non archivés
								</label>
							</div>
						</div>
					</li>
					<li class="list-group-item d-flex justify-content-end"><button class="btn btn-outline-primary btn-sm">Appliquer</button></li>
				</ul>
				<ul class="list-group">
					<li class="list-group-item d-flex flex-inline">
						<div class="input-group mb-3">
							<button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Contrat</button>
							<ul class="dropdown-menu">
								<li> 
								<div class="form-check ms-2">
									<input class="form-check-input" type="radio" name="radioContrat" id="radioContratYes" checked>
									<label class="form-check-label" for="radioContratYes">
										OUI
									</label>
								</div>
								<div class="form-check ms-2">
									<input class="form-check-input" type="radio" name="radioContrat" id="radioContratNo" checked>
									<label class="form-check-label" for="radioContratNo">
										NON
									</label>
								</div>
								</li>
							</ul>
						</div>
						<div class="input-group mb-3">
							<button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Matricule</button>
							<ul class="dropdown-menu">
								<li> 
								<div class="form-check ms-2">
									<input class="form-check-input" type="radio" name="radioMatricule" id="radioMatriculeYes" checked>
									<label class="form-check-label" for="radioMatriculeYes">
										OUI
									</label>
								</div>
								<div class="form-check ms-2">
									<input class="form-check-input" type="radio" name="radioMatricule" id="radioMatriculeNo" checked>
									<label class="form-check-label" for="radioMatriculeNo">
										NON
									</label>
								</div>
								</li>
							</ul>
						</div>
						<div class="input-group mb-3">
							<button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Archivés</button>
							<ul class="dropdown-menu">
								<li> 
								<div class="form-check ms-2">
									<input class="form-check-input" type="radio" name="radioArchive" id="radioArchiveYes" checked>
									<label class="form-check-label" for="radioArchiveYes">
										OUI
									</label>
								</div>
								<div class="form-check ms-2">
									<input class="form-check-input" type="radio" name="radioArchive" id="radioArchiveNo" checked>
									<label class="form-check-label" for="radioArchiveNo">
										NON
									</label>
								</div>
								</li>
							</ul>
						</div>
					</li>
				</ul>
				
				<AppMenuItem :href="'/'" icon="bi bi-file-text"><strong class="search">Ambre Gaveau </strong><br><span class="text-success">OPS support et réseaux</span><br><span>CDD 10/10/2021<i class="bi bi-arrow-right m-1"></i>31-07-2023</span><br></AppMenuItem>
				<AppMenuItem :href="'/'" icon="bi bi-file-text"><strong class="search">Sébastien Héligon</strong><br><span class="text-success">Développeur Web</span><br><span>CDD 11/09/2021<i class="bi bi-arrow-right m-1"></i>10-09-2023</span><br></AppMenuItem>
				<AppMenuItem :href="'/'" icon="bi bi-file-text"><strong class="search">Kopp Killian</strong><br><span class="text-success">Directeur SI Recherches et développements</span><br><span>CDI 21/06/2020<i class="bi bi-arrow-right m-1"></i>sans date de sortie</span><br></AppMenuItem>
				<AppMenuItem :href="'/'" icon="bi bi-file-text"><strong class="search">Le Bihan Cédric</strong><br><span class="text-success">OPS support et réseaux</span><br><span>CDI 12-04-2022<i class="bi bi-arrow-right m-1"></i>sans date de sortie</span><br></AppMenuItem>
				<AppMenuItem :href="'/'" icon="bi bi-file-text"><strong class="search">Lehoux Mari</strong><br><span class="text-success">Développeur Web</span><br><span>CDD 12/07/2021<i class="bi bi-arrow-right m-1"></i>11-07-2022</span><br></AppMenuItem>
				<AppMenuItem :href="'/'" icon="bi bi-file-text"><strong class="search">Modard Guillaume</strong><br><span class="text-success">Développeur et Gourou Fullstack Senior</span><br><span>CDI 13/04/2022<i class="bi bi-arrow-right m-1"></i>sans date de sortie</span><br></AppMenuItem>
				<AppMenuItem :href="'/'" icon="bi bi-file-text"><strong class="search">Ambassade</strong><br><span class="text-success">Développeur et Gourou Fullstack Senior</span><br><span>CDI 13/04/2022<i class="bi bi-arrow-right m-1"></i>sans date de sortie</span><br></AppMenuItem>
				<AppMenuItem :href="'/'" icon="bi bi-file-text"><strong class="text-muted">Modard Guillaume</strong><br><span class="text-muted">Créateur d'API</span><br><span class="text-muted">CDD 13/04/2020<i class="bi bi-arrow-right m-1"></i>12-04-2022</span><br></AppMenuItem>
			
			</AppMenu>
			
		</template>

		<template v-slot:core>
			<div class="bg-light">
				<router-view/>
			</div>
		</template>

	</AppWrapper>
	
</template>
<style lang="scss">
h3 {
	font-weight: normal!important;
}
</style>
<script>

import AppWrapper from '@/components/pebble-ui/AppWrapper.vue'
import AppMenu from '@/components/pebble-ui/AppMenu.vue'
import AppMenuItem from '@/components/pebble-ui/AppMenuItem.vue'
import { mapActions, mapState } from 'vuex'

import CONFIG from "@/config.json"
import UserImage from './components/pebble-ui/UserImage.vue'
import searchPersonnel from './components/searchPersonnel.vue'


export default {

	data() {
		return {
			cfg: CONFIG.cfg,
			cfgMenu: CONFIG.cfgMenu,
			cfgSlots: CONFIG.cfgSlots,
			appController: null,
			pending: {
				elements: true
			},
			isConnectedUser: false,
			search: '',
			//searchOptions: false
		}
	},

	computed: {
		...mapState(['elements', 'openedElement']),

		filterElements() {
			if(!this.search) return this.elements;
			
			else 
			return this.elements.filter(el => {
				return el.cache_nom.toLowerCase().includes(this.search.toLowerCase())
			})
		}
	},

	watch: {
		$route() {
			this.$app.dispatchEvent('menuChanged', 'list');
		},

		/**
		 * Observe l'état de connexion de l'utilisateur. Si l'utilisateur se connecte,
		 * les éléments sont chargés depuis l'API
		 */
		isConnectedUser(val) {
			if (val) {
				this.listElements();
			}
		}
	},

	methods: {

		
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
		 * Met à jour les informations de l'utilisateur connecté
		 * @param {Object} user Un objet LocalUser
		 */
		setLocal_user(user) {
			if (user) {
				this.$store.dispatch('login', user);
				this.isConnectedUser = true;
			}
			else {
				this.$store.dispatch('logout');
				this.isConnectedUser = false;
			}
		},

		/**
		 * Envoie une requête pour lister les éléments et les stocke dans le store
		 * 
		 * @param {Object} params Paramètre passés en GET dans l'URL
		 * @param {String} action 'update' (défaut), 'replace', 'remove'
		 */
		listElements(params, action) {
			action = typeof action === 'undefined' ? 'update' : action;
			this.$app.listElements(this, params)
			.then((data) => {
				this.$store.dispatch('refreshElements', {
					action,
					elements: data
				});
			})
			.catch(this.$app.catchError);
		},

		
			

		

		...mapActions(['closeElement']) 
	},

	

	components: {
    AppWrapper,
    AppMenu,
    AppMenuItem,
    UserImage,
	searchPersonnel

},

	
	

	mounted() {
		if (this.isConnectedUser) {
			this.listElements();
			this.filterElements();
		}
	}

}
</script>