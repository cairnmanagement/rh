<template>

	<AppWrapper
		:cfg="cfg"
		:cfg-menu="cfgMenu"
		:cfg-slots="cfgSlots"
		
		@auth-change="setLocal_user"
		@config-menu="displayConfig = true">

		<template v-slot:header>
			<div class="mx-2 d-flex align-items-center" v-if="openedPersonnel">
				<router-link to="/" custom v-slot="{ navigate, href }">
					<a class="btn btn-dark me-2" :href="href" @click="navigate">
						<i class="bi bi-arrow-left"></i>
					</a>
				</router-link>

				<div class="me-2">
					<personnel-identity :personnel="openedPersonnel" :showMatricule="true" />
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
				v-model:searchValue="searchOptions.q"
				:pending="pending.personnels"
				:nbFilterActive="countNbFilterActive"
				
				@search="listPersonnels('replace')">

				<search-personnel 
					v-model:searchActif="searchOptions.actif"
					v-model:searchMatriculeStatus="searchOptions.matricule_status"
					v-model:searchArchived="searchOptions.archived"

					v-model:nbFilterActif="nbFilterActive.Actif"
					v-model:nbFilterMatricule="nbFilterActive.MatriculeStatus"
					v-model:nbFilterArchived="nbFilterActive.Archived"
				/>
			</app-search-bar>

			<AppMenu>
				<AppMenuItem :href="'/personnel/'+personnel.id" v-for="personnel in personnels" :key="personnel.id">
					<personnel-item :personnel="personnel"></personnel-item>
				</AppMenuItem>

				<div class="text-muted m-2 text-center" v-if="!personnels.length && !pending.personnels">Aucun résultat</div>
			</AppMenu>

		</template>

		<template v-slot:core v-if="isConnectedUser">
			<div class="bg-light">

				<router-view v-if="inited" />
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
import PersonnelIdentity from './components/personnel/PersonnelIdentity.vue'
import { AssetsCollection } from './js/app/services/AssetsCollection';

export default {
	components: {AppWrapper, AppMenu, AppMenuItem, searchPersonnel, PersonnelItem, AppSearchBar, Config, AppModal, PersonnelIdentity},

	data() {
		return {
			cfg: CONFIG.cfg,
			cfgMenu: CONFIG.cfgMenu,
			cfgSlots: CONFIG.cfgSlots,
			appController: null,
			pending: {
				personnels: true,
				config: false
			},
			isConnectedUser: false,
			displayConfig: false,

			nbFilterActive: {
				Actif: 0,
				MatriculeStatus: 0,
				Archived: 0,
			},
			searchOptions: {
				actif: null,
				matricule_status: null,
				archived: "false",
				q: ''
			},
			inited: false,
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
		...mapState(['personnels', 'openedPersonnel', 'login', 'contratType', 'storePending', 'contrats']),

		countNbFilterActive() {
			return this.nbFilterActive.Actif + this.nbFilterActive.MatriculeStatus + this.nbFilterActive.Archived;
		}
	},

	watch: {
		$route() {
			this.$app.dispatchEvent('menuChanged', 'list');
		},
	},

	methods: {
		...mapActions(['setConfig']),

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
		listPersonnels(action) {
			action = typeof action === 'undefined' ? 'update' : action;

			this.pending.personnels = true;

			return this.$app.listElements(this, this.searchOptions)
			.then(async (data) => {

				this.$store.dispatch('refreshPersonnels', {
					action,
					personnels: data,
				});

				return data;

			})
			.catch(this.$app.catchError)
			.finally(() => this.pending.personnels = false);
		},

		/**
		 * Initialise les valeurs et charge les données.
		 */
		async loadData() {

			this.pending.config = true;

			try {
				const config = await this.$app.api.get('v2/personnel/config');
				this.setConfig(config);
			}
			catch (e) {
				this.$app.catchError(e);
			}
			finally {
				this.pending.config = false;
			}

			this.listPersonnels('replace').then(() => {

				this.$assets.addCollection('contrats', new AssetsCollection(this, {
					assetName: 'contrats',
					apiRoute: 'v2/contrat'
				}));
				this.$assets.import('contratTypes', new AssetsCollection(this, {
					assetName: 'contratType',
					apiRoute: 'v2/contrat/type'
				}));
				this.$assets.import('contratQualifications', new AssetsCollection(this, {
					assetName: 'contratQualification',
					apiRoute: 'v2/contrat/qualification'
				}));
				this.$assets.import('contratStatuts', new AssetsCollection(this, {
					assetName: 'contratStatut',
					apiRoute: 'v2/contrat/statut'
				}));
				this.$assets.import('contratMotifsFin', new AssetsCollection(this, {
					assetName: 'contratMotifsFin',
					apiRoute: 'v2/contrat/motif_fin'
				}));
				this.$assets.import('personnelFonctions', new AssetsCollection(this, {
					assetName: 'personnelFonctions',
					apiRoute: 'v2/personnel/fonction'
				}));
				this.$assets.import('personnelSecteurs', new AssetsCollection(this, {
					assetName: 'personnelSecteurs',
					apiRoute: 'v2/personnel/secteur'
				}));

				this.inited = true;
			});
		}
		
	},

	mounted() {
		this.$app.addEventListener('structureChanged', () => {
			this.$router.push('/');
			this.loadData();
		});
	}
}
</script>