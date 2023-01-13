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

						<li>
							<router-link :to="'/'" custom v-slot="{ navigate, href }">
								<a class="dropdown-item" :href="href" @click="navigate">Archiver</a>
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
			<AppMenu>
				<app-search-bar 
					v-model:showFilter="showFilter"
					v-model:searchValue="searchValue"

					:nbFilterActive="countNbFilterActive"
				/>

				<template v-if="showFilter">
					<search-personnel 
						v-model:searchActif="searchOptions.actif"
						v-model:searchMatriculeStatus="searchOptions.matriculeStatus"
						v-model:searchArchived="searchOptions.archived"
						v-model:showFilter="showFilter"

						v-model:nbFilterActif="nbFilterActive.Actif"
						v-model:nbFilterMatricule="nbFilterActive.MatriculeStatus"
						v-model:nbFilterArchived="nbFilterActive.Archived"
					/>
				</template>

				<template v-else >
					<AppMenuItem :href="'/personnel/'+personnel.id" v-for="personnel in elements" :key="personnel.id">
						<spinner v-if="this.pending.element"></spinner>
						<personnel-item v-else :personnel="personnel"></personnel-item>
					</AppMenuItem>	
				</template>

				
			</AppMenu>
		</template>

		<template v-slot:core>
			<div class="bg-light" v-if="isConnectedUser">
				<router-view />
			</div>
		</template>
	</AppWrapper>
	
</template>

<script>

import AppWrapper from '@/components/pebble-ui/AppWrapper.vue'
import AppMenu from '@/components/pebble-ui/AppMenu.vue'
import AppMenuItem from '@/components/pebble-ui/AppMenuItem.vue'
import { mapActions, mapState } from 'vuex'
import CONFIG from "@/config.json"

import searchPersonnel from './components/menulist/searchPersonnel.vue'
import PersonnelItem from './components/menulist/personnelItem.vue'
import AppSearchBar from './components/pebble-ui/AppSearchBar.vue'
import Spinner from './components/pebble-ui/Spinner.vue'

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

			showFilter: false,
			nbFilterActive: {
				Actif: 0,
				MatriculeStatus: 0,
				Archived: 0,
			},
			personnelListFilter: [],
			searchValue: '',
			searchOptions: {
				actif: "null",
				matriculeStatus: "null",
				archived: "null"
			},

		}
	},

	computed: {
		...mapState(['elements', 'openedElement']),

		countNbFilterActive() {
			return this.nbFilterActive.Actif + this.nbFilterActive.MatriculeStatus + this.nbFilterActive.Archived;
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
		},

		/**
		 * Filtre le personnel en fonction de la recherche effectuée
		 */
		searchValue() {
			this.personnelFilted();
		},

		/**
		 * Filtre le personnel en function des filtres séléctionné
		 */
		showFilter() {
			if (!this.showFilter)
				this.personnelFilted();
		},
	},

	components: {AppWrapper, AppMenu, AppMenuItem, searchPersonnel, PersonnelItem, AppSearchBar, Spinner},

	methods: {
		...mapActions(['closeElement']),

		/**
		 * Modifie le format de la date entrée en paramètre et la retourne 
		 * sous le format dd/mm:yyyy
		 * 
		 * @param {string} date 
		 * 
		 * @return {date}
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
				//console.log('listElements', data);
			})
			.catch(this.$app.catchError);
		},

		/**
		 * Filtre la liste du personnel avec les options de filtre défini.
		 */
		personnelFilted() {
			this.pending.elements = true;

			let apiUrl = 'structurePersonnel/GET/list';
			let search = {
				'contrat': this.searchOptions.actif,
				'matricule_status': this.searchOptions.matriculeStatus,
				'archived': this.searchOptions.archived,
				'q': this.searchValue
			};

			this.$app.apiGet(apiUrl, search)
			.then((data) => {
				console.log('data filter', data);
				this.$store.dispatch('refreshElements', {
					action: 'replace',
					elements: data,
				});
			})
			.catch(this.$app.catchError)
			.finally(() => {this.pending.elements = false});
		},
		
	},

	mounted() {
		this.personnelListFilter = this.elements;
	}


}
</script>