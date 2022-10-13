<template>
    <div>
        <form method="post" class="border-bottom d-flex" @submit.prevent="searchList()">
            <div class="input-group mb-3">
                <input  type="text" class="form-control" placeholder="rechercher" v-model="searchOptions.q" >
                <button class="btn btn-outline-secondary input-group-text" type="submit"><i class="bi bi-search"></i></button>
                <button @click.prevent="searchForm = !searchForm" type="button" :class="filterButtonClass()" class="btn  input-group-text"><i class="bi bi-filter"></i> <span v-if="filterCheck">{{filterNumber}}</span> </button>
            </div>
        </form>
        <div class="card">
            <span v-if="searchOptions">Critères actifs de la recherche</span>
        
        </div>

        <div v-if="searchForm" id="searchOptions">
            <div class="mb-3">
                <label class="form-label">Contrat</label>
                <div class="btn-group d-flex" role="group">
                    <input type="radio" class="btn-check" name="actif" id="btnSearchActifTrue" autocomplete="off" value="1" v-model="searchOptions.actif">
                    <label class="btn btn-outline-secondary" for="btnSearchActifTrue">Actif</label>

                    <input type="radio" class="btn-check" name="actif" id="btnSearchActifFalse" autocomplete="off" value="0" v-model="searchOptions.actif">
                    <label class="btn btn-outline-secondary" for="btnSearchActifFalse">Inactif</label>

                    <input type="radio" class="btn-check" name="actif" id="btnSearchActifNull" autocomplete="off" value="null" v-model="searchOptions.actif">
                    <label class="btn btn-outline-secondary" for="btnSearchActifNull">Tous</label>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Matricule</label>
                <div class="btn-group d-flex" role="group">
                    <input type="radio" class="btn-check" name="matricule_status" id="btnSearchMatriculeStatusTrue" autocomplete="off" value="1" v-model="searchOptions.matricule_status">
                    <label class="btn btn-outline-secondary" for="btnSearchMatriculeStatusTrue">Avec</label>

                    <input type="radio" class="btn-check" name="matricule_status" id="btnSearchMatriculeStatusFalse" autocomplete="off" value="0" v-model="searchOptions.matricule_status">
                    <label class="btn btn-outline-secondary" for="btnSearchMatriculeStatusFalse">Sans</label>

                    <input type="radio" class="btn-check" name="matricule_status" id="btnSearchMatriculeStatusNull" autocomplete="off" value="null" v-model="searchOptions.matricule_status">
                    <label class="btn btn-outline-secondary" for="btnSearchMatriculeStatusNull">Tous</label>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Archivé</label>
                <div class="btn-group d-flex" role="group">
                    <input type="radio" class="btn-check" name="archived_status" id="btnSearchArchivedStatusTrue" autocomplete="off" value="1" v-model="searchOptions.archived_status">
                    <label class="btn btn-outline-secondary" for="btnSearchArchivedStatusTrue">Oui</label>

                    <input type="radio" class="btn-check" name="archived_status" id="btnSearchArchivedStatusFalse" autocomplete="off" value="0" v-model="searchOptions.archived_status">
                    <label class="btn btn-outline-secondary" for="btnSearchArchivedStatusFalse">Non</label>

                    <input type="radio" class="btn-check" name="archived_status" id="btnSearchArchivedStatusNull" autocomplete="off" value="null" v-model="searchOptions.archived_status">
                    <label class="btn btn-outline-secondary" for="btnSearchArchivedStatusNull">Tous</label>
                </div>
            </div>
            <hr>
            <div class="form-group  d-grid">
                <button  type="button" class="btn btn-primary" @click.prevent="searchList()">
                    <i class="bi bi-check-lg me-1"></i>
                    Appliquer
                </button>
            </div>
        </div>
    </div>

							<!-- <div class="form-row d-flex justify-content-between mx-2 mb-2">
								<input type="radio" class="btn-check" name="contrat" id="sousContrat" autocomplete="off">
								<label class="btn btn-sm btn-outline-secondary" for="sousContrat">Sous contrat</label>

								<input type="radio" class="btn-check" name="contrat" id="horsContrat" autocomplete="off">
								<label class="btn btn-sm btn-outline-secondary" for="horsContrat">Hors contrat</label>
							</div>
							<div class="form-row d-flex justify-content-between mx-2 mb-2">
								<input type="radio" class="btn-check" name="matricule" id="avecMatricule" autocomplete="off">
								<label class="btn btn-sm btn-outline-secondary" for="avecMatricule">Avec matricule</label>

								<input type="radio" class="btn-check" name="matricule" id="sansMatricule" autocomplete="off">
								<label class="btn btn-sm btn-outline-secondary" for="sansMatricule">Sans Matricule</label>
							</div>
							<div class="form-row d-flex justify-content-between mx-2 mb-2">
								<input type="radio" class="btn-check" name="Archive" id="Archive" autocomplete="off">
								<label class="btn btn-sm btn-outline-secondary" for="Archive">Archivé</label>

								<input type="radio" class="btn-check" name="Archive" id="noArchive" autocomplete="off">
								<label class="btn btn-sm btn-outline-secondary" for="noArchive">Non Archivé</label>
							</div> -->
					
                            <!-- <div class="sticky-top bg-light">
                            <h4 class="p-2 m-0 border-bottom d-flex align-items-center justify-content-between" v-if="headerLabel">
                                <strong>{{headerLabel}}</strong>
                                <span v-if="structureById(structure)" class="text-secondary">{{structureById(structure).nom_interne}}</span>
                                <button v-if="filterById(filter)" class="btn btn-light text-secondary" @click.prevent="filterInfo()"><i class="fas fa-filter"></i></button>
                            </h4>

                                <form method="post" class="p-2 border-bottom d-flex" action="ticket_4_app.php" @submit.prevent="searchTickets()" v-if="!filter">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Rechercher" v-model="search.keyword">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary" type="submit">
                                                <i class="fas fa-search"></i>
                                            </button>                                
                                                <span v-if="hasSearchFilter()">{{hasSearchFilter()}}</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                        <	/div> -->
</template>
<script>
    
    export default {
        props: {
            
        },
    
        data() {
            return {
                searchForm: false,
                searchOptions: {
                    actif: "1",
                    matricule_status: "null",
                    archived_status: "null",
                    q: ""
                },
                filterCheck: false,
                filterNumber: 0
            }
        },
        methods: {

            /**
             * retourne la classe à appliquer au bouton filter
             * 
             */
            filterButtonClass() {
                let type = this.filterCheck ? 'warning' : 'secondary';
                let outline = this.searchOptions ? 'outline-': 'outline-';
                return 'btn-'+outline+type;

                //return 'btn-'+outline+type;
            }, 

            searchList() {
                this.filterCheck = true;

                let search = {};

                for (const key in this.searchOptions) {
                    if (this.searchOptions[key] != 'null') {
                        search[key] = this.searchOptions[key];
                        console.log('search', this.searchOptions);
                    }
                }

                let apiUrl = 'structurePersonnel/GET/list';
                this.$app.apiGet(apiUrl, search)
                .then((data) => {
                    this.$store.dispatch('refreshElements', {
                        action: 'replace',
                        elements: data,
                    });
                })
                .catch(this.$app.catchError)
				.finally(() => this.searchForm = false);

                // this.searchForm = false;


            },

            
        }
    }
    </script>