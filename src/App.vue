<template>

	<AppWrapper
		:cfg="cfg"
		:cfg-menu="cfgMenu"
		:cfg-slots="cfgSlots"
		
		@auth-change="setLocal_user"
		@config-menu="displayConfig = true">

		<template v-slot:header>
			<div class="mx-2 d-flex align-items-center" v-if="openedElement">
				<router-link to="/" custom v-slot="{ navigate, href }">
					<a class="btn btn-dark me-2" :href="href" @click="navigate">
						<i class="bi bi-arrow-left"></i>
					</a>
				</router-link>

				<div class="me-2">
					<personnel-name :personnel="openedElement" />
				</div>
			</div>
		</template>


		<template v-slot:menu>
			<AppMenu>
				<AppMenuItem href="/" look="dark" icon="bi bi-house">Mon personnel</AppMenuItem>
			</AppMenu>
		</template>

		<template v-slot:list>
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
			<AppMenu v-else>
				<AppMenuItem :href="'/personnel/'+personnel.id" v-for="personnel in elements" :key="personnel.id">
					<personnel-item :personnel="personnel"></personnel-item>
				</AppMenuItem>	
			</AppMenu>

		</template>

		<template v-slot:core v-if="isConnectedUser">
			<div class="bg-light">
				<router-view />
			</div>

			<AppModal title="Configuration du module"
				id="configModule"
				:display="displayConfig"
				:close-btn="true"
				class-name="modal-dialog-scrollable modal-xl"
				
				@modal-hide="displayConfig = false">
				<Config v-if="!pending.config && displayConfig" />
			</AppModal>
		</template>
	</AppWrapper>
	
</template>

<style lang="scss">

.fs-7 {
	font-size: 0.80rem !important;
}

</style>

<script>

import AppWrapper from '@/components/pebble-ui/AppWrapper.vue'
import AppMenu from '@/components/pebble-ui/AppMenu.vue'
import AppMenuItem from '@/components/pebble-ui/AppMenuItem.vue'
import { mapActions, mapState } from 'vuex'
import CONFIG from "@/config.json"

import searchPersonnel from './components/menulist/searchPersonnel.vue'
import PersonnelItem from './components/menulist/personnelItem.vue'
import AppSearchBar from './components/pebble-ui/AppSearchBar.vue'
import Config from './components/parametre/Config.vue';
import AppModal from './components/pebble-ui/AppModal.vue'
import PersonnelName from './components/personnel/PersonnelName.vue'

export default {
	components: {AppWrapper, AppMenu, AppMenuItem, searchPersonnel, PersonnelItem, AppSearchBar, Config, AppModal, PersonnelName},

	data() {
		return {
			cfg: CONFIG.cfg,
			cfgMenu: CONFIG.cfgMenu,
			cfgSlots: CONFIG.cfgSlots,
			appController: null,
			pending: {
				elements: true,
				config: false
			},
			isConnectedUser: false,
			displayConfig: false,

			showFilter: false,
			nbFilterActive: {
				Actif: 0,
				MatriculeStatus: 0,
				Archived: 0,
			},
			searchValue: '',
			searchOptions: {
				actif: null,
				matriculeStatus: null,
				archived: "false"
			},
			params: [
				{
					label: 'Contrat type',
					url: 'contrat-type'
				},
				{
					label: 'Contrat qualification',
					url: 'contrat-qualification'
				},
				{
					label: 'Contrat statut',
					url: 'contrat-statut'
				}
			]

		}
	},

	computed: {
		...mapState(['elements', 'openedElement', 'login']),

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
			})
			.catch(this.$app.catchError);
		},

		/**
		 * Filtre la liste du personnel avec les options de filtre défini.
		 */
		personnelFilted() {
			this.pending.elements = true;


			// let apiUrl = 'structurePersonnel/GET/list';
			let search = {
				'actif': this.searchOptions.actif,
				'matricule_status': this.searchOptions.matriculeStatus,
				'archived': this.searchOptions.archived,
				'q': this.searchValue
			};

			this.listElements(search,'replace')
			// this.$app.listElements(search, 'replace')

			// // this.apiGet()
			// // this.$app.apiGet(apiUrl, search ) // pb dans le retour de l'api. elle retourne un tableau vide 
			// // this.$app.listElements(this.search)
			// .then((data) => {
			// 	console.log(data, 'reponseAPI');
			// 	this.$store.dispatch('refreshElements', {
			// 		action: 'replace',
			// 		elements: data,
			// 	});
			// })
			// .catch(this.$app.catchError)
			// .finally(() => {this.pending.elements = false});
		},
		
	},

	mounted(){
		this.$app.addEventListener('structureChanged', () => {
			this.$router.push('/');
			if (this.isConnectedUser) {
				this.listElements('','replace')
				// this.personnelFilted()
			}
		});
	}
}
</script>