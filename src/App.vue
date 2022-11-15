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
				<AppMenuItem href="/a-propos" look="dark" icon="bi bi-app">À propos</AppMenuItem>
			</AppMenu>
		</template>

		<template v-slot:list>
			<AppMenu v-if="$route.path == '/' ||  $route.name =='Personnel'">
				<div>
					<search-personnel></search-personnel>
				</div>
				<AppMenuItem :href="'/personnel/'+personnel.id" v-for="personnel in filterElements" :key="personnel.id">
					<div class="d-flex align-items-center justify-content-between">
						<div class="d-flex align-items-center">
							<div class="me-2">
								<UserImage :name="personnel.cache_nom" />
							</div>
							<div class="align-items-center justify-content-between">
								<div class="d-flex justify-content-between align-items-center"> {{personnel.cache_nom}}</div>
							</div>
						</div>
						<i  v-if="searchArchived(personnel.id) & searchActifs(personnel.id)" class="bi bi-archive-fill text-success"></i>
						<i  v-else-if="searchArchived(personnel.id) & !searchActifs(personnel.id)" class="bi bi-archive text-secondary"></i>
						<i  v-else-if="!searchArchived(personnel.id) & !searchActifs(personnel.id)" class="bi bi-circle text-secondary"></i>
						<i  v-else-if="!searchArchived(personnel.id) & searchActifs(personnel.id)" class="bi bi-circle-fill text-success"></i>

						<!-- <i v-if="searchActifs(personnel.id)" class="bi bi-circle-fill text-success" ></i> -->
						<!-- <i v-if="!searchActifs(personnel.id)"  class="bi bi-circle text-secondary"></i> -->
						<!-- <i v-else  class="bi bi-circle text-secondary"></i> -->

					</div>
				</AppMenuItem>
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
			listPersonnelActifs: [],
			listPersonnelArchived: []
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
				this.listPersoActifs();
				this.listPersoArchived();
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
					elements: data,
				});
				console.log('listElements', data);
			})
			.catch(this.$app.catchError);
		},

		/**
		 * Envoie une requête pour lister les personnels actifs
		 * enregistre la liste dans listPersonnelActifs
		 * 
		 */
		listPersoActifs(){
			this.$app.apiGet('structurePersonnel/GET/list?actif=true')
				.then((data) => {
					console.log('actifs', data);

					this.listPersonnelActifs = data;
					console.log('listactifs', this.listPersonnelActifs);
				})
				.catch(this.$app.catchError);
		},

		searchActifs(idName){
			let actif = false;
			for (let persoActif of this.listPersonnelActifs) {
					if (persoActif.id == idName) {
						actif=true;
					}
                } 
			return actif;   
		},

		listPersoArchived(){
			this.$app.apiGet('structurePersonnel/GET/list?archived=true')
			.then((data) => {
				console.log('archivés',data);
				this.listPersonnelArchived = data;
				console.log ('listArchived', this.listPersonnelArchived);
			})
			.catch(this.$app.catchError);
		},
		searchArchived(idName){
			let archived = false;
			for (let persoArchived of this.listPersonnelArchived) {
					if (persoArchived.id == idName) {
						archived=true;
					}
                } 
			return archived;   
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

	
	

	// mounted() {
		
	// 	console.log('toto');
	// 	// this.listElements();
	// 	// this.filterElements();
	// 	this.listpersoActifs();
	// 	// if (this.isConnectedUser) {
	// 	// }
	// }

}
</script>