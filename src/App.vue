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
				<router-link :to="'/element/'+openedElement.id+'/properties'" custom v-slot="{ navigate, href }">
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
							<router-link :to="'/element/'+openedElement.id+'/informations'" custom v-slot="{ navigate, href }">
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
				<AppMenuItem href="/" look="dark" icon="bi bi-house">Accueil</AppMenuItem>
				<AppMenuItem href="/personnel-actif" look="dark" icon="bi bi-person-check">Personnel actif</AppMenuItem>
				<AppMenuItem href="/contacts" look="dark" icon="bi bi-person">Tous les contacts</AppMenuItem>
				<AppMenuItem href="/contrats" look="dark" icon="bi bi-file-check">Contrats</AppMenuItem>
				<AppMenuItem href="/docs-complements" look="dark" icon="bi bi-file-code">Docs complémentaires</AppMenuItem>
				<AppMenuItem href="/a-propos" look="dark" icon="bi bi-app">À propos</AppMenuItem>
			</AppMenu>
		</template>

		<template v-slot:list>
			<AppMenu v-if="$route.path == '/' || $route.path == '/personnel-actif'">
				<AppMenuItem :href="'/element/'+el.id" icon="bi bi-file-person" v-for="el in elements" :key="el.id">{{el.cache_nom}}</AppMenuItem>
			</AppMenu>
			<AppMenu v-else-if="$route.path == '/contrats'">
				<AppMenuItem :href="'/contrats/1'" icon="bi bi-file-text"><strong class="">Ambre Gaveau </strong><br><span class="text-success">OPS support et réseaux</span><br><span>CDD 10/10/2021<i class="bi bi-arrow-right m-1"></i>31-07-2023</span><br></AppMenuItem>
				<AppMenuItem :href="'/contrats/2'" icon="bi bi-file-text"><strong class="">Sébastien Héligon</strong><br><span class="text-success">Développeur Web</span><br><span>CDD 11/09/2021<i class="bi bi-arrow-right m-1"></i>10-09-2023</span><br></AppMenuItem>
				<AppMenuItem :href="'/contrats/3'" icon="bi bi-file-text"><strong class="">Kopp Killian</strong><br><span class="text-success">Directeur SI Recherches et développements</span><br><span>CDI 21/06/2020<i class="bi bi-arrow-right m-1"></i>sans date de sortie</span><br></AppMenuItem>
				<AppMenuItem :href="'/contrats/4'" icon="bi bi-file-text"><strong class="">Le Bihan Cédric</strong><br><span class="text-success">OPS support et réseaux</span><br><span>CDI 12-04-2022<i class="bi bi-arrow-right m-1"></i>sans date de sortie</span><br></AppMenuItem>
				<AppMenuItem :href="'/contrats/5'" icon="bi bi-file-text"><strong class="">Lehoux Mari</strong><br><span class="text-success">Développeur Web</span><br><span>CDD 12/07/2021<i class="bi bi-arrow-right m-1"></i>11-07-2022</span><br></AppMenuItem>
				<AppMenuItem :href="'/contrats/6'" icon="bi bi-file-text"><strong class="">Modard Guillaume</strong><br><span class="text-success">Développeur et Gourou Fullstack Senior</span><br><span>CDI 13/04/2022<i class="bi bi-arrow-right m-1"></i>sans date de sortie</span><br></AppMenuItem>
				<AppMenuItem :href="'/contrats/7'" icon="bi bi-file-text"><strong class="text-muted">Modard Guillaume</strong><br><span class="text-muted">Créateur d'API</span><br><span class="text-muted">CDD 13/04/2020<i class="bi bi-arrow-right m-1"></i>12-04-2022</span><br></AppMenuItem>

			</AppMenu>
		</template>

		<template v-slot:core>
			<div class="px-2 bg-light">
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
			isConnectedUser: false
		}
	},

	computed: {
		...mapState(['elements', 'openedElement'])
	},

	methods: {
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

	watch: {
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

	components: {
		AppWrapper,
		AppMenu,
		AppMenuItem
	},

	mounted() {
		if (this.isConnectedUser) {
			this.listElements();
		}
	}

}
</script>