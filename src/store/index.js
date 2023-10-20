import { createStore } from 'vuex'

export default createStore({
	state: {
		structures: [],
		activeStructureId: null,
		login: null,
		mkg: {
			config: {
				THEME_COLOR: 'black'
			}
		},
		personnels: [],
		openedPersonnel: null,
		tmpElement: null,
		personnelStats: null,
		contratStats: null,
		contratCurrentStats: null,
		openedContrats:null,
		contratQualification: [],
		contratStatut: [],
		contratType: [],
		contratMotifsFin: [],
		personnelFonctions: [],
		personnelSecteurs: [],
		storePending: {
			contratType: false
		},
		contrats: [],
		config: {}
	},
	getters: {
		activeStructure(state) {
			return state.structures.find(e => e.id === state.activeStructureId);
		}
	},
	mutations: {
		/**
		 * Met à jour les informations de configuration
		 * @param {Object} state Le state de l'instance VueX
		 * @param {Object} payload Les valeurs de configuration à écrire
		 */
		mkgConfig(state, payload) {
			state.mkg.config = payload;
		},

		
		/**
		 * Charge un objet dans openedPersonnel
		 * @param {Object} state Le state de l'instance VueX
		 * @param {Integer} id L'ID de l'élément à charger
		 */
		open(state, id) {
			state.openedPersonnel = id;
		},


		/**
		 * Ferme l'élément ouvert
		 * @param {Object} state Le state de l'instance VueX
		 */
		close(state) {
			state.openedPersonnel = null;
		},

		/**
		 * Remplace la liste des éléments chargés avec une nouvelle liste
		 * @param {Object} state		Le state de l'instance VueX
		 * @param {Array} personnels		La nouvelle liste d'éléments
		 */
		replacePersonnels(state, personnels) {
			state.personnels = personnels;
		},

		/**
		 * Rafraichie la liste du personnel chargée à partir d'une autre liste.
		 * - si un personnel existe dans state et dans personnels, il est actualisé avec le nouveau
		 * - si un personnel est dans personnels mais pas dans state, il est ajouté
		 * @param {Object} state		Le state de l'instance VueX
		 * @param {Array} personnels		La nouvelle liste d'éléments
		 */
		updatePersonnels(state, personnels) {
			personnels.forEach(element => {
				let stateEl = state.personnels.find(e => e.id === element.id);

				// Mise à jour d'un élément existant
				if (stateEl) {
					for (let key in element) {
						stateEl[key] = element[key];
					}
				}
				// Ajout d'un élément existant
				else {
					state.personnels.push(element);
				}
			});
		},

		/**
		 * Retire des éléments de la liste des éléments chargés
		 * @param {Object} state Le state de l'instance vueX
		 * @param {Array} personnels Les ID des éléments à retirer
		 */
		removePersonnels(state, personnels) {
			personnels.forEach(id => {
				let index = state.personnels.findIndex(e => e.id === id);

				if (index !== -1) {
					state.personnels.splice(index, 1);
				}
			});
		},

		/**
		 * Met à jour les données de l'élément chargé
		 * @param {Object} state Le state de l'instance vueX
		 * @param {Object} data Liste clé valeur des infos à mettre à jour
		 */
		updateOpened(state, data) {
			for (let key in data) {
				state.openedPersonnel[key] = data[key];
			}
		},

		/**
		 * Ajoute un personnel a opened element
		 * @param {Object} state le state de l'instance vueX
		 * @param {object} data données du nouveau personnel
		 */
		newOpened(state, data) {
			state.openedPersonnel = data;
		},

		/**
		 * Enregistre le login dans le store
		 * @param {Object} state Le state de l'instance vueX
		 * @param {Object} login L'objet Login
		 */
		setLogin(state, login) {
			state.login = login;
		},

		/**
		 * Enregistre les structures chargées dans le store
		 * @param {Object} state Le state de l'instance vueX
		 * @param {Array} structures La liste des structures
		 */
		setStructures(state, structures) {
			state.structures = structures;
		},

		/**
		 * Enregistre une donnée dubliqué de openedPersonnel
		 * @param {Object} state Le state de l'instance vueX
		 * @param {Object} data Un objet identique à la structure de openedPersonnel
		 */
		tmpElement(state, data) {
			state.tmpElement = data;
		},

		/**
		 * Met à jour les informations d'une ressource sur le personnel ouvert.
		 * 
		 * @param {Object} state State de VueX
		 * @param {Object} ressourceOptions 
		 * - ressource		Nom de la ressource : telephones, emails, adresses
		 * - data			Données à mettre à jour
		 */
		personnelRessource(state, ressourceOptions) {
			let key = ressourceOptions.ressource;
			let data = ressourceOptions.data;

			if (!(key in state.openedPersonnel.oPersonne)) {
				state.openedPersonnel.oPersonne[key] = [];
			}

			let ressource = state.openedPersonnel.oPersonne[key].find(e => e.id == data.id);

			if (ressource) {
				for (const k in data) {
					ressource[k] = data[k];
				}
			}
			else state.openedPersonnel.oPersonne[key].push(data);
		},

		/**
		 * Supprimer une ressource liée au personnel ouvert.
		 * 
		 * @param {Object} state State de VueX
		 * @param {Object} ressourceOptions 
		 * - ressource Nom de la ressource : telephones, emails, adresses
		 * - id ID de la ressource à supprimer du store
		 */
		removePersonnelRessource(state, ressourceOptions) {
			let key = ressourceOptions.ressource;
			let id = ressourceOptions.id;

			let index = state.openedPersonnel.oPersonne[key].findIndex(e => e.id == id);

			if (index !== -1) {
				state.openedPersonnel.oPersonne[key].splice(index, 1);
			}
		},

		/**
		 * Met à jour les statistiques du personnel dans le store.
		 * 
		 * @param {object} state State de VueX
		 * @param {object} stats Informations à mettre à jour
		 */
		personnelStats(state, stats) {
			state.personnelStats = stats;
		},

		/**
		 * Met à jour les statistiques des contrats à date dans le store.
		 * 
		 * @param {object} state State de VueX
		 * @param {object} stats Informations à mettre à jour
		 */
		contratCurrentStats(state, stats) {
			state.contratCurrentStats = stats;
		},

		/**
		 * Met à jour les statistiques des contrats sur 12 mois dans le store.
		 * 
		 * @param {object} state State de VueX
		 * @param {object} stats Informations à mettre à jour
		 */
		contratStats(state, stats) {
			state.contratStats = stats;
		},

		/**
		 * Met à jour les données des contrats chargés
		 * @param {Object} state Le state de l'instance vueX
		 * @param {Object} contratsOptions Liste clé valeur des infos à mettre à jour
		 * - mode : 'set', 'refresh', 'remove'
		 * - contrats : collection de contrats
		 */
		openedContrats(state, contratsOptions) {
			let mode = contratsOptions.mode;
			let contrats = contratsOptions.contrats;

			if (mode == 'set') {
				state.openedContrats = contrats;
			}
			else if (mode == 'refresh') {
				// Mise à jour des contrats racines
				contrats.forEach(contrat => {
					let contratFound = state.openedContrats.find(e => e.id == contrat.id);

					if (contratFound) {
						for (const key in contrat) {
							contratFound[key] = contrat[key];
						}
					}
					else {
						state.openedContrats.push(contrat);
					}
				});

				// Mise à jour des avenants
				state.openedContrats.forEach(contrat => {
					if (contrat.contrats) {
						contrat.contrats.forEach(avenant => {
							let contratFound = contrats.find(e => e.id == avenant.id);

							if (contratFound) {
								for (const key in contratFound) {
									avenant[key] = contratFound[key];
								}
							}
						});
					}
					else {
						let copy = {};
						for (const key in contrat) {
							copy[key] = contrat[key];
						}
						contrat.contrats = [copy];
					}
				});
			}
			else if (mode == 'remove') {
				// Suppression des contrats racines
				contrats.forEach(contrat => {
					let index = state.openedContrats.findIndex(e => e.id == contrat.id);

					if (index !== -1) {
						state.openedContrats.splice(index, 1);
					}
				});
			}
		},

		/**
		 * Met à jour les données d'un state en fonction de la ressource
		 * @param {object} state Le state de l'instance vueX
		 * @param {array} assetsOptions 
		 * 		- ressource : Nom de la ressource à modifier: contratType, contratQualification, contratStatut, contrats
		 * 		- data : Données à mettre à jour
		 * 		- mode : 'reset', 'add', 'update', 'remove'
		 */
		setAssets(state, assetsOptions) {
			let ressource = assetsOptions.ressource;
			let aData = assetsOptions.data;
			let mode = assetsOptions.mode;

			if ("reset" === mode) {
				state[ressource] = aData;
			} else {
				for (const index in aData) {
					if ('add' === mode) {
						state[ressource].push(aData[index]);
					}
	
					if ('update' === mode) {
						let i = state[ressource].findIndex(e => e.id == aData[index].id);

						if (i !== -1) {
							state[ressource][i] = aData[index];
						}
						else {
							state[ressource].push(aData[index]);
						}
					}

					if ('remove' === mode) {
						let i = state[ressource].findIndex(e => e.id == aData[index].id);

						if(i !== -1) {
							state[ressource].splice(i, 1);
						}
					}
				}
			}
		},

		/**
		 * Actualise les informations de configuration du module RH stockée dans le store
		 * 
		 * @param {object} state Le state de VueX
		 * @param {object} configOptions 
		 * - action 	'update' (par défaut), 'reset'
		 * - config 	La configuration à stocker
		 */
		config(state, configOptions)  {
			const action = configOptions.action ? configOptions.action : 'update';
			const config = configOptions.config;

			if (action == 'reset') {
				state.config = config;
			}
			else {
				if (!state.config) {
					state.config = {};
				}

				for (const key in config) {
					state.config[key] = config[key];
				}
			}
		}

	},
	actions: {
		/**
		 * Charge un élément depuis le store via son ID
		 * @param {Object} context Instance VueX
		 * @param {Integer} elementId Id de l'élément à charger depuis les éléments existants ou depuis l'API
		 */
		load(context, elementId) {
			let el = context.state.personnels.find(e => e.id == elementId);

			if (el) {
				context.commit('open', el);
			}
			else {
				console.log('Not found');
			}
		},

		/**
		 * Ferme l'élément ouvert
		 * @param {Object} context Instance VueX
		 */
		unload(context) {
			context.commit('close');
		},

		/**
		 * Met à jour la liste du personnel chargé
		 * @param {Object} context L'instance VueX
		 * @param {Object} payload Les paramètres de rafraichissement
		 * - action			update (default), replace, remove
		 * - personnels		la liste du personnel
		 */
		refreshPersonnels(context, payload) {
			if (!('action' in payload)) {
				payload.action = 'update';
			}

			if (payload.action == 'update') {
				context.commit('updatePersonnels', payload.personnels);
			}
			else if (payload.action == 'replace') {
				context.commit('replacePersonnels', payload.personnels);
			}
			else if (payload.action == 'remove') {
				context.commit('removePersonnels', payload.personnels);
			}
			else {
				throw new Error(`La mutation ${payload.action} n'existe pas.`);
			}
		},

		/**
		 * Met à jour les infos de l'élément ouvert avec des données
		 * @param {Object} context L'instance vueX
		 * @param {Object} data Liste clé valeur des informations à mettre à jour
		 */
		refreshOpened(context, data) {
			context.commit('updateOpened', data);
		},

		/**
		 * ajout un nouveau personnel a l'élément ouvert avec des données
		 * @param {Object} context L'instance vueX
		 * @param {Object} data un personnel
		 */
		newOpened(context, data) {
			context.dispatch('refreshPersonnels', { personnels: [data] })
			context.commit('newOpened', data);
		},

		/**
		 * Enregistre l'ouverture d'une session
		 * @param {Object} context L'instance vueX
		 * @param {Object} payload Un objet contenant une clé login et une clé structure
		 */
		login(context, payload) {
			context.commit('setLogin', payload.login);
			context.commit('setStructures', payload.structures);
		},

		/**
		 * Enregistre la fermeture d'une session
		 * @param {Object} context L'instance vueX
		 */
		logout(context) {
			context.commit('setLogin', null);
			context.commit('setStructures', []);
		},

		/**
		 * Met à jour les informations d'une ressource liée au personnel dans le store
		 * 
		 * @param {Object} context Instance VueX
		 * @param {Object} ressourceOptions Données à enregistrer sur le store
		 * - ressource			telephones, emails, adresses
		 * - data				objet contenant les informations à actualiser
		 */
		updateRessource(context, ressourceOptions) {
			context.commit('personnelRessource', ressourceOptions);
		},

		/**
		 * Supprimer une ressource liée au personnel actif dans le store
		 * 
		 * @param {Object} context Instance VueX
		 * @param {Object} ressourceOptions Données à enregistrer sur le store
		 * - ressource			telephones, emails, adresses
		 * - id					id de la ressource  supprimer
		 */
		removeRessource(context, ressourceOptions) {
			context.commit('removePersonnelRessource', ressourceOptions);
		},

		/**
		 * Met à jour les statistiques du personnel dans le store.
		 * 
		 * @param {object} context Instance VueX
		 * @param {object} stats Données à mettre à jour
		 */
		updatePersonnelStats(context, stats) {
			context.commit('personnelStats', stats);
		},

		/**
		 * Met à jour les statistiques des contrats sur 12 mois dans le store.
		 * 
		 * @param {object} context Instance VueX
		 * @param {object} stats Données à mettre à jour
		 */
		updateContratStats(context, stats) {
			context.commit('contratStats', stats);
		},

		/**
		 * Met à jour les statistiques des contrats au jour dans le store.
		 * 
		 * @param {object} context Instance VueX
		 * @param {object} stats Données à mettre à jour
		 */
		updateContratCurrentStats(context, stats) {
			context.commit('contratCurrentStats', stats);
		},

		/**
		 * Met à jour les contrats du personnel chargé dans le store
		 * @param {Object} context Le l'instance vueX
		 * @param {array} contrats Liste des contrats à mettre à jour
		 */
		updateOpenedContrats(context, contrats) {
			context.commit('openedContrats', {
				mode: 'refresh',
				contrats
			});
		},

		/**
		 * Met à jour les contrats du personnel chargé dans le store
		 * @param {Object} context Le l'instance vueX
		 * @param {array} contrats Liste des contrats à mettre à jour
		 */
		setOpenedContrats(context, contrats) {
			context.commit('openedContrats', {
				mode: 'set',
				contrats
			});
		},

		/**
		 * Retire les contrats du personnel chargé dans le store
		 * @param {Object} context Le l'instance vueX
		 * @param {array} contrats Liste des contrats à retire
		 */
		removeOpenedContrats(context, contrats) {
			context.commit('openedContrats', {
				mode: 'remove',
				contrats
			});
		},

		/**
		 * Met a jour un ou plusieur element la liste d asset
		 * @param {Object} context L'instance vueX
		 * @param {array} contratAssetOptions 
		 * 		- data: Liste d'asset
		 * 		- ressource: Ressource a mettre a jour
		 */
		updateContratAsset(context, contratAssetOptions) {
			context.commit('setAssets', {
				mode: 'update',
				data: contratAssetOptions.data,
				ressource: contratAssetOptions.ressource
			});
		},

		/**
		 * Initialise un element la liste de contrat type
		 * @param {Object} context L'instance vueX
		 * @param {array} contratAssetOptions 
		 * 		- data: Liste de contrat asset
		 * 		- ressource: Ressource a mettre a jour
		 */
		resetContratAsset(context, contratAssetOptions) {
			context.commit('setAssets', {
				mode: "reset",
				data: contratAssetOptions.data,
				ressource: contratAssetOptions.ressource
			})
		},

		/**
		 * Met a jour un ou plusieur element la liste de contrat type
		 * @param {Object} context L'instance vueX
		 * @param {array} contratAssetOptions 
		 * 		- data: Liste de contrat asset
		 * 		- ressource: Ressource a mettre a jour
		 */
		addContratAsset(context, contratAssetOptions) {
			context.commit('setAssets', {
				mode: 'add',
				data: contratAssetOptions.data,
				ressource: contratAssetOptions.ressource
			})
		},

		/**
		 * Met a jour un ou plusieur element la liste de contrat type
		 * @param {Object} context L'instance vueX
		 * @param {array} contratAssetOptions 
		 * 		- data: Liste de contrat asset
		 * 		- ressource: Ressource a mettre a jour
		 */
		removeContratAsset(context, contratAssetOptions) {
			context.commit('setAssets', {
				mode: 'remove',
				data: [contratAssetOptions.data],
				ressource: contratAssetOptions.ressource
			})
		},

		/**
		 * Met à jour la collection des contrats types.
		 * 
		 * @param {object} context Instance VueX
		 * @param {array} collection Collection d'assets à mettre à jour
		 */
		updateContratTypes(context, collection) {
			context.dispatch('updateContratAsset', {
				data: collection,
				ressource: 'contratType'
			});
		},

		/**
		 * Met à jour la collection des qualifications de contrats.
		 * 
		 * @param {object} context Instance VueX
		 * @param {array} collection Collection d'assets à mettre à jour
		 */
		updateContratQualifications(context, collection) {
			context.dispatch('updateContratAsset', {
				data: collection,
				ressource: 'contratQualification'
			});
		},

		/**
		 * Met à jour la collection des statuts de contrats.
		 * 
		 * @param {object} context Instance VueX
		 * @param {array} collection Collection d'assets à mettre à jour
		 */
		updateContratStatuts(context, collection) {
			context.dispatch('updateContratAsset', {
				data: collection,
				ressource: 'contratStatut'
			});
		},

		/**
		 * Met à jour la collection des contrats types.
		 * 
		 * @param {object} context Instance VueX
		 * @param {array} collection Collection d'assets à mettre à jour
		 */
		updateContrats(context, collection) {
			context.commit('setAssets', {
				mode: 'update',
				data: collection,
				ressource: 'contrats'
			});
		},

		/**
		 * Récupère les informations des assets depuis l'API
		 * 
		 * @param {object} context Instance vueX
		 * @param {object} options
		 * - @param {object} api Instance ApiController
		 * - @param {string} asset Ressource : type, status, qualification
		 * - @param {object} params Paramètres additionnels envoyées par le payload
		 * 
		 * @returns {Promise}
		 */
		async getAssetsFromApi(context, options) {
			return options.api.get('v2/contrat/'+options.asset, options.params);
		},

		/**
		 * Stock les informations récupérées depuis l'API dans le store.
		 * 
		 * @param {object} context Instance vueX
		 * @param {object} options
		 * - @param {object} api Instance ApiController
		 * - @param {string} asset Ressource : type, status, qualification
		 * - @param {object} params Paramètres additionnels envoyées par le payload
		 * 
		 * @returns {Promise}
		 */
		async storeAssetsFromApi(context, options)
		{
			let ressource = 'contrat' + options.asset.charAt(0).toUpperCase() + options.asset.slice(1);
			
			context.dispatch('startPending', [ressource]);
			
			try {
				let data = await context.dispatch('getAssetsFromApi', options);
				context.commit('setAssets', {
					mode: 'reset',
					data,
					ressource
				});
			}
			finally {
				context.dispatch('stopPending', ['contratType']);
			}
		},

		/**
		 * Récupère les informations des types de contrat sur l'API
		 * 
		 * @param {object} context Instance vueX
		 * @param {object} api Instance ApiController
		 */
		importContratTypeFromApi(context, api) {
			context.dispatch('storeAssetsFromApi', {api, asset: 'type'});
		},

		/**
		 * Démarre un processus de chargement asynchrone
		 * 
		 * @param {object} context Instance vueX
		 * @param {array} pendings Liste des actions à mettre en attente
		 */
		startPending(context, pendings) {
			context.dispatch('changePendingStatus', {pendings, value: true});
		},

		/**
		 * Termine un processus de chargement asynchrone
		 * 
		 * @param {object} context Instance vueX
		 * @param {array} pendings Liste des actions à mettre en attente
		 */
		stopPending(context, pendings) {
			context.dispatch('changePendingStatus', {pendings, value: false});
		},

		/**
		 * Modifie le statut des opérations en attente
		 * 
		 * @param {object} context Instance vueX
		 * @param {object} options 
		 * - @param {array} pendings Liste des actions à mettre en attente
		 * - @param {bool} value Valeur à attribuer à l'action
		 */
		changePendingStatus(context, options) {
			let storePending = {};
			options.pendings.forEach(key => storePending[key] = options.value);
			context.commit('setPending', storePending);
		},

		/**
		 * Réinitialise la configuration du module RH stockée dans le store
		 * 
		 * @param {object} context Instance VueX
		 * @param {object} config La configuration à actualiser
		 */
		setConfig(context, config) {
			context.commit('config', {
				action: 'reset',
				config
			});
		},

		/**
		 * Actualise la configuration du module RH stockée dans le store
		 * 
		 * @param {object} context Instance VueX
		 * @param {object} config La configuration à actualiser
		 */
		updateConfig(context, config) {
			context.commit('config', {
				action: 'update',
				config
			});
		}


	},
	modules: {
	}
})
