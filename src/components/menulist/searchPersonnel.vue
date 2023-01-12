<template>
    <div class="container">
        <div class="my-2">
            <h2 class="fs-5">Contrat:</h2>

            <div class="btn-group w-100" role="group" aria-label="filtre des contrat">
                <button type="button" class="btn btn-outline-secondary" :class="{'active': searchActif == '1'}" @click="updateSearch(['Actif', 1, '1'])">Actif</button>
                <button type="button" class="btn btn-outline-secondary" :class="{'active': searchActif == '0'}" @click="updateSearch(['Actif', 1, '0'])">Inactif</button>
                <button type="button" class="btn btn-outline-secondary" :class="{'active': searchActif == 'null'}" @click="updateSearch(['Actif', 0, 'null'])">Tous</button>
            </div>
        </div>

        <div class="my-2">
            <h2 class="fs-5">Matricule:</h2>

            <div class="btn-group w-100" role="group" aria-label="filtre des contrat">
                <button type="button" class="btn btn-outline-secondary" :class="{'active': searchMatriculeStatus == '1'}" @click="updateSearch(['MatriculeStatus', 1, '1'])">Actif</button>
                <button type="button" class="btn btn-outline-secondary" :class="{'active': searchMatriculeStatus == '0'}" @click="updateSearch(['MatriculeStatus', 1, '0'])">Inactif</button>
                <button type="button" class="btn btn-outline-secondary" :class="{'active': searchMatriculeStatus == 'null'}" @click="updateSearch(['MatriculeStatus', 0, 'null'])">Tous</button>
            </div>
        </div>

        <div class="my-2">
            <h2 class="fs-5">Archivé:</h2>

            <div class="btn-group w-100" role="group" aria-label="filtre des contrat">
                <button type="button" class="btn btn-outline-secondary" :class="{'active': searchArchived == '1'}" @click="updateSearch(['Archived', 1, '1'])">Actif</button>
                <button type="button" class="btn btn-outline-secondary" :class="{'active': searchArchived == '0'}" @click="updateSearch(['Archived', 1, '0'])">Inactif</button>
                <button type="button" class="btn btn-outline-secondary" :class="{'active': searchArchived == 'null'}" @click="updateSearch(['Archived', 1, 'null'])">Tous</button>
            </div>
        </div>

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
                }
            }
        },

        emits: ['update:nbFilterActive', 'update:searchActif', 'update:searchMatriculeStatus', 'update:searchArchived', 'update:showFilter'],

        methods: {
            /**
             * Récupère la liste fitrer avec les parametres choisies
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
             * @param {Array} options 
             *                  - filtre        Filtre qui est concerné par le changement
             *                  - CountValue    La valeur a effectuer a l'element count concerné
             *                  - FiltreValue   La valeur a effectuer au filtre pour la requete a la base de données
             *                                  actif = '1', incatif = '0', tous = 'null'
             */
            updateSearch(options) {
                if (0 === options[1]) {
                    this.count[options[0]] = 0;
                } else {
                    this.count[options[0]] = 1;
                }
                
                this.$emit('update:nbFilterActive', (this.count.Actif + this.count.MatriculeStatus + this.count.Archived));
                this.$emit('update:search'+options[0], options[2] );
            }

        },
    }
    </script>