<template>
    <div class="container">
        <template v-for="(filterSection, index) in aFilterSection" :key="'filtreSection-'+index" >
            <div class="my-2">
                <h2 class="fs-5">{{filterSection.label}}</h2>

                <div class="btn-group w-100" role="group" aria-label="filtre des contrat">
                    <button v-for="(oButton, i) in filterSection.button" :key="'filtreSection-'+index+'-button-'+i"
                            class="btn btn-outline-secondary" :class="buttonDisplay(oButton.value, filterSection)"
                            type="button"
                            @click="updateSearchOptions(filterSection, oButton)">
                        {{ oButton.label }}
                    </button>
                    <button class="btn btn-outline-secondary" :class="buttonDisplay('null', filterSection)" 
                            type="button" 
                            @click="updateSearchOptions(filterSection, 'Tous')">
                        Tous
                    </button>
                </div>
            </div>
        </template>

        <div class="text-center my-4">
            <button  type="button" class="btn btn-primary col-8" @click.prevent="searchList()">
                <span v-if="pending.filter" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <i v-else class="bi bi-check-lg me-1"></i>
                Appliquer
            </button>
        </div>
    </div>
</template>

<script>
    
    export default {
        props: {
            nbFilterActive: Number,
            searchActif: String,
            searchMatriculeStatus: String,
            searchArchived: String,
            showFilter: Boolean,
        },
    
        data() {
            return {
                pending: {
                    filter: false
                },                
                count: {
                    Actif: 0,
                    MatriculeStatus: 0,
                    Archived: 0,
                },
                aFilterSection: [
                    {
                        'label':'Contrat', 
                        'mapSearch':'Actif', 
                        'button':  [
                            {'label': 'Actif', 'value': '1'},
                            {'label': 'Inactif', 'value': '0'}
                        ]
                    },
                    {
                        'label':'Matricule', 
                        'mapSearch':'MatriculeStatus',
                        'button': [
                            {'label': 'Actif', 'value': '1'},
                            {'label': 'Inactif', 'value': '0'}
                        ]
                    },
                    {
                        'label':'Archived', 
                        'mapSearch':'Archived',
                        'button': [
                            {'label': 'Oui', 'value': '1'},
                            {'label': 'Non', 'value': '0'}
                        ]
                    }
                ],
            }
        },

        emits: ['update:nbFilterActive', 'update:searchActif', 'update:searchMatriculeStatus', 'update:searchArchived', 'update:showFilter'],

        methods: {
            /**
             * Récupère la liste fitrer avec les parametres choisies
             * 
             * @event   update:showFilter
             */
            searchList() {
                this.pending.filter = true;

                let apiUrl = 'structurePersonnel/GET/list';
                let search = {
                    'contrat': this.searchActif,
                    'matricule_status': this.searchMatriculeStatus,
                    'archived': this.searchArchived
                };

                this.$app.apiGet(apiUrl, search)
                .then((data) => {
                    this.$store.dispatch('refreshElements', {
                        action: 'replace',
                        elements: data,
                    });
                })
                .catch(this.$app.catchError)
				.finally(() => {
                    this.pending.filter = false; 
                    this.$emit('update:showFilter', false)
                });
            },
            

            /**
             * Met à jour les informations du searchOptions de l'element parents
             * Ainsi que le nombre de filtre activé
             * 
             * @param {Object}      filterSection       Represente la section du filtre
             * @param {Object|string}      oButton              Object du button clicker
             * 
             * @event   update:nbFilterActive
             * @event   update:searchActif
             * @event   update:searchMatriculeStatus
             * @event   update:searchArchived
             */
            updateSearchOptions(filterSection, oButton) {
                let button = {
                    'label' : null,
                    'value' : null
                };

                if (typeof oButton == 'string') {
                    button = {
                        'label': oButton,
                        'value': 'null'
                    }
                } else {
                    button = oButton;
                }

                button.label != 'Tous' ? this.count[filterSection.mapSearch] = 1 : this.count[filterSection.mapSearch] = 0;
                
                this.$emit('update:nbFilterActive', (this.count.Actif + this.count.MatriculeStatus + this.count.Archived));
                this.$emit('update:search'+ filterSection.mapSearch, button.value );
            },

            /**
             * Retourne la classe CSS à donner au boutton de filtre si on le selectionne
             * 
             * @returns {String}
             */
            buttonDisplay(buttonValue, filterSection) {
                if (
                    this.searchActif === buttonValue && 'Actif' == filterSection.mapSearch
                    || this.searchMatriculeStatus === buttonValue && 'MatriculeStatus' == filterSection.mapSearch
                    || this.searchArchived === buttonValue && 'Archived' == filterSection.mapSearch
                    ) {
                    return "active";
                }
            }

        },
    }
    </script>