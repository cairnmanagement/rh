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
		elements: [],
		openedElement: null,
		tmpElement: null,
		personnelStats: null,
		contratStats: null,
		contratCurrentStats: null,
		openedContrats:null
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
		 * Charge un objet dans openedElement
		 * @param {Object} state Le state de l'instance VueX
		 * @param {Integer} id L'ID de l'élément à charger
		 */
		open(state, id) {
			state.openedElement = id;
		},


		/**
		 * Ferme l'élément ouvert
		 * @param {Object} state Le state de l'instance VueX
		 */
		close(state) {
			state.openedElement = null;
		},

		/**
		 * Remplace la liste des éléments chargés avec une nouvelle liste
		 * @param {Object} state		Le state de l'instance VueX
		 * @param {Array} elements		La nouvelle liste d'éléments
		 */
		replaceElements(state, elements) {
			state.elements = elements;
		},

		/**
		 * Rafraichie la liste des éléments chargés à partir d'une autre liste.
		 * - si un élément existe dans state et dans elements, il est actualisé avec le nouveau
		 * - si un élément est dans elements mais pas dans state, il est ajouté
		 * @param {Object} state		Le state de l'instance VueX
		 * @param {Array} elements		La nouvelle liste d'éléments
		 */
		updateElements(state, elements) {
			elements.forEach(element => {
				let stateEl = state.elements.find(e => e.id === element.id);

				// Mise à jour d'un élément existant
				if (stateEl) {
					for (let key in element) {
						stateEl[key] = element[key];
					}
				}
				// Ajout d'un élément existant
				else {
					state.elements.push(element);
				}
			});
		},

		/**
		 * Retire des éléments de la liste des éléments chargés
		 * @param {Object} state Le state de l'instance vueX
		 * @param {Array} elements Les ID des éléments à retirer
		 */
		removeElements(state, elements) {
			elements.forEach(id => {
				let index = state.elements.findIndex(e => e.id === id);

				if (index !== -1) {
					state.elements.splice(index, 1);
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
				state.openedElement[key] = data[key];
			}
		},

		/**
		 * Ajoute un personnel a opened element
		 * @param {Object} state le state de l'instance vueX
		 * @param {object} data données du nouveau personnel
		 */
		newOpened(state, data) {
			state.openedElement = data;
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
		 * Enregistre une donnée dubliqué de openedElement
		 * @param {Object} state Le state de l'instance vueX
		 * @param {Object} data Un objet identique à la structure de openedElement
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

			if (!(key in state.openedElement.oPersonne)) {
				state.openedElement.oPersonne[key] = [];
			}

			let ressource = state.openedElement.oPersonne[key].find(e => e.id == data.id);

			if (ressource) {
				for (const k in data) {
					ressource[k] = data[k];
				}
			}
			else state.openedElement.oPersonne[key].push(data);
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

			let index = state.openedElement.oPersonne[key].findIndex(e => e.id == id);

			if (index !== -1) {
				state.openedElement.oPersonne[key].splice(index, 1);
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
			}
			else if (mode == 'remove') {
				contrats.forEach(contrat => {
					let index = state.openedContrats.findIndex(e => e.id == contrat.id);

					if (index !== -1) {
						state.openedContrats.splice(index, 1);
					}
				})
			}
		},

		// openedElementContrats (state, data){
		// 	for (let key in data) {
		// 		state.openedElementContrats[key] = data[key];
		// 	}
		// }
	},
	actions: {
		/**
		 * Charge un élément depuis le store via son ID
		 * @param {Object} context Instance VueX
		 * @param {Integer} elementId Id de l'élément à charger depuis les éléments existants ou depuis l'API
		 */
		load(context, elementId) {
			let el = context.state.elements.find(e => e.id == elementId);

			if (el) {
				context.commit('open', el);
			}
			else {
				// Il faut générer une requête pour charger l'élément manquant
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
		 * Met à jour la liste des éléments chargés
		 * @param {Object} context L'instance VueX
		 * @param {Object} payload Les paramètres de rafraichissement
		 * - action			update (default), replace, remove
		 * - elements		la liste des éléments
		 */
		refreshElements(context, payload) {
			if (!('action' in payload)) {
				payload.action = 'update';
			}

			if (payload.action == 'update') {
				context.commit('updateElements', payload.elements);
			}
			else if (payload.action == 'replace') {
				context.commit('replaceElements', payload.elements);
			}
			else if (payload.action == 'remove') {
				context.commit('removeElements', payload.elements);
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
	},
	modules: {
	}
})
