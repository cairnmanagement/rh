<template>
    <div>
        <form method="post" class="border-bottom d-flex" @submit.prevent="searchList()">
            <div class="input-group mb-3">
                <input  type="text" class="form-control" placeholder="rechercher" v-model="searchOptions.q" >
                <button class="btn btn-outline-secondary input-group-text" type="submit"><i class="bi bi-search"></i></button>
                <button @click.prevent="searchForm = !searchForm" type="button" :class="filterButtonClass()" class="btn  input-group-text"><i class="bi bi-filter"></i> <span v-if="filterCheck">{{filterNumber}}</span> </button>
            </div>
        </form>
        <div class="d-flex flex-row justify-content-start" v-if="filterCheck">
            <span v-if="searchOptions.actif == 1"  class=" badge bg-secondary  me-1">actifs</span>
            <span v-if="searchOptions.actif == 0" class=" badge bg-secondary  me-1">inactifs</span>
            <span v-if="searchOptions.matricule_status == 1" class=" badge bg-secondary  me-1">immatriculés</span>
            <span v-if="searchOptions.matricule_status == 0" class=" badge bg-secondary  me-1">sans matricule</span>
            <span v-if="searchOptions.archived == 1" class=" badge bg-secondary  me-1">archivés</span>
            <span v-if="searchOptions.archived == 0" class=" badge bg-secondary  me-1">non archivés</span>

        </div>

        <div v-if="searchForm" id="searchOptions">
            <div class="m-2">
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
            <div class="m-2">
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
            <div class="m-2">
                <label class="form-label">Archivé</label>
                <div class="btn-group d-flex" role="group">
                    <input type="radio" class="btn-check" name="archived_status" id="btnSearchArchivedStatusTrue" autocomplete="off" value="1" v-model="searchOptions.archived">
                    <label class="btn btn-outline-secondary" for="btnSearchArchivedStatusTrue">Oui</label>

                    <input type="radio" class="btn-check" name="archived_status" id="btnSearchArchivedStatusFalse" autocomplete="off" value="0" v-model="searchOptions.archived">
                    <label class="btn btn-outline-secondary" for="btnSearchArchivedStatusFalse">Non</label>

                    <input type="radio" class="btn-check" name="archived_status" id="btnSearchArchivedStatusNull" autocomplete="off" value="null" v-model="searchOptions.archived">
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
</template>
<script>
    
    export default {
        props: {
            
        },
    
        data() {
            return {
                searchForm: false,
                searchOptions: {
                    actif: "null",
                    matricule_status: "null",
                    archived: "null",
                    q: ""
                },
                filterCheck: false,
                filterNumber: 0,

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
                this.filterNumber = -1;

                let search = {};

                for (const key in this.searchOptions) {
                    if (this.searchOptions[key] != 'null') {
                        search[key] = this.searchOptions[key];
                        console.log('search', this.searchOptions);
                        console.log('filtres',this.searchOptions.actif, this.searchOptions.matricule_status , this.searchOptions.archived);
                        this.filterNumber = this.filterNumber + 1;
                    }
                }

                let apiUrl = 'structurePersonnel/GET/list';
                this.$app.apiGet(apiUrl, search)
                .then((data) => {
                    console.log(data, 'retour api');
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