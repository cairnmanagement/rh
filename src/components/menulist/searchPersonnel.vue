<template>
    <div class="container">
    
        <template v-for="(filterSection, index) in aFilterSection" :key="'filtreSection-'+index" >
            <div class="my-2">
                <div class="fs-6 fw-bold">{{filterSection.label}}</div>

                <div class="btn-group w-100" role="group" aria-label="filtre des contrat">
                    <button v-for="(oButton, i) in filterSection.button" :key="'filtreSection-'+index+'-button-'+i"
                            class="btn btn-outline-secondary" :class="buttonDisplay(oButton.value, filterSection)"
                            type="button"
                            @click="updateSearchOptions(filterSection, oButton)">
                        {{ oButton.label }}
                    </button>
                    <!-- <button class="btn btn-outline-secondary" :class="buttonDisplay('null', filterSection)" 
                            type="button" 
                            @click="updateSearchOptions(filterSection, 'Tous')">
                        Tous
                    </button> -->
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    
    export default {
        props: {
            searchActif: String,
            searchMatriculeStatus: String,
            searchArchived: String,
            showFilter: Boolean,

            nbFilterActif: Number,
            nbFilterMatricule: Number,
            nbFilterArchived: Number,
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
                            {'label': 'Actif', 'value': 'true'},
                            {'label': 'Inactif', 'value': 'false'},
                            {'label': 'Tous', 'value': null}
                        ]
                    },
                    {
                        'label':'Matricule', 
                        'mapSearch':'MatriculeStatus',
                        'button': [
                            {'label': 'Avec', 'value': 'true'},
                            {'label': 'Sans', 'value': 'false'},
                            {'label': 'Tous', 'value': null}
                        ]
                    },
                    {
                        'label':'Archivé', 
                        'mapSearch':'Archived',
                        'button': [
                            {'label': 'Oui', 'value': 'true'},
                            {'label': 'Non', 'value': 'false'},
                            {'label': 'Tous', 'value': null}
                        ]
                    }
                ],
            }
        },

        emits: [
            'update:searchActif', 
            'update:searchMatriculeStatus', 
            'update:searchArchived', 
            'update:showFilter',

            'update:nbFilterActif',
            'update:nbFilterMatricule',
            'update:nbFilterArchived',
        ],

        methods: {
            /**
             * Cache le formulaire de filtre
             * 
             * @event   update:showFilter
             */
            hideFilterForm() {
                this.$emit('update:showFilter', false);
            },
            

            /**
             * Met à jour les informations du searchOptions de l'element parent
             * Ainsi que le nombre de filtre activé
             * 
             * @param {Object}      filterSection       Represente la section du filtre
             * @param {Object|string}      oButton              Object du button click
             * 
             * @event   update:nbFilterActif
             * @event   update:nbFilterMatricule
             * @event   update:nbFilterArchived
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
                        'value': null
                    }
                } else {
                    button = oButton;
                }

                button.label != 'Tous' ? this.count[filterSection.mapSearch] = 1 : this.count[filterSection.mapSearch] = 0;
                
                this.$emit('update:nbFilterActif', this.count.Actif);
                this.$emit('update:nbFilterMatricule', this.count.MatriculeStatus);
                this.$emit('update:nbFilterArchived', this.count.Archived);

                this.$emit('update:search'+ filterSection.mapSearch, button.value );
            },

            /**
             * Retourne la classe CSS à donner au bouton de filtre si on le selectionne
             * 
             * @returns {String}
             */
            buttonDisplay(buttonValue, filterSection) {
                if (
                    this.searchActif === buttonValue && 'Actif' == filterSection.mapSearch
                    || this.searchMatriculeStatus === buttonValue && 'MatriculeStatus' == filterSection.mapSearch
                    || this.searchArchived === buttonValue && 'Archived' == filterSection.mapSearch
                    ) 
                {
                    return "active";
                }
            }

        },

        mounted() {
            this.count = {
                
                Actif: this.nbFilterActif,
                MatriculeStatus: this.nbFilterMatricule,
                Archived: this.nbFilterArchived,
                
            }
        }
    }
    </script>