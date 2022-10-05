<template>
    <div>
        <form method="post" class="border-bottom d-flex">
            <div class="input-group mb-3">
                <input  type="text" class="form-control" placeholder="rechercher" >
                <button @click="searchNom()" class="btn btn-outline-secondary input-group-text" ><i class="bi bi-search"></i></button>
                <button @click.prevent="searchOptions = !searchOptions"  :class="filterButtonClass()" class="btn  input-group-text"><i class="bi bi-filter"></i> <span v-if="filterCheck"> VAR</span> </button>
            </div>
        </form>
					
					<div v-if="searchOptions" id="searchOptions" class="card">
						<div class="card-body form-group">
							<div class="form-row d-flex justify-content-between mx-2 mb-2">
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
							</div>
							<hr>
							<div class="form-group  d-grid">
								<button  type="submit" class="btn btn-primary">
									<i class="bi bi-check-lg me-1"></i>
									Appliquer
								</button>
							</div>
                        </div>
                    </div>
                    <div class="card m-3">
                        <div class="form-group  d-grid m-4">
                            <button @click.prevent="searchList()" type="submit" class="btn btn-primary">
                                <i class="bi bi-check-lg me-1"></i>
                                test tri list
                            </button>
                        </div>
                    </div>
                    <div v-if="newList" class="card-body">
                        <h4>Nouvelle liste</h4>

                        <AppMenuItem :href="'/personnel/'+personnel.id" v-for="personnel in dataList" :key="personnel.id">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div class="me-2">
                                        <UserImage :name="personnel.cache_nom" />
                                    </div>
                                    <div>
                                        {{personnel.cache_nom}}

                                    </div>
                                </div>
                            </div>
                        </AppMenuItem>
                    </div>
                </div>
					
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
    import AppMenuItem from './pebble-ui/AppMenuItem.vue';
    import UserImage from './pebble-ui/UserImage.vue';
    
    export default {
        props: {
            
        },
    
        data() {
            return {
                searchOptions: false,
                filterCheck: false,
                newList: false,
                dataList:[],
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
            }, 

            searchList() {
                this.filterCheck = true;
                this.searchOptions = false;
                let apiUrl = 'structurePersonnel/GET/list?actif=true';
                this.$app.apiGet(apiUrl)
                    .then((data) => {
                        this.dataList = data;
                        this.newList = 1;
                        console.log('test searchList',this.dataList);
                    })
                    .catch ('erreur test searchList', this.$app.catchError);

            },

            
        },

        components: {
            AppMenuItem,UserImage,
        },
    
        beforeMount() {
            
        }
    }
    </script>