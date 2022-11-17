<template>
   <!--  <div class="card-body">
        <div class="row mb-3 bg-light">
            <div class="col-3">
            </div>
            <div class="col d-flex justify-content-between my-2">
                <div class="d-flex flex-column align-items-start">
                    <div>Contrat {{openedElement.oContrat.id}}</div>
                    <div>{{openedElement.cache_nom}}</div>
                    <span>Contrat à durée indéterminée</span>
                </div>
                <div class="">
                    <router-link :to="{name:'EditContrat', params:{id:openedElement.id, idContrat:openedElement.oContrat.id}}" v-slot="{navigate, href}" custom>
                        <a :href="href" @click="navigate" class="btn btn-sm btn-outline-primary mx-1 "><i class="bi bi-pencil"></i></a>
                    </router-link>
                    <router-link :to="{name:'EditContrat', params:{id:openedElement.id, idContrat:openedElement.oContrat.id}}" v-slot="{navigate, href}" custom>
                        <a :href="href" @click="navigate" class="btn btn-sm btn-outline-danger mx-1 ">Mettre fin au contrat</a>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-3 list-group list-group-flush align-items-end">
                <div>.</div>
                <div>|</div>
                <div class="text-muted">20.09.1980 .</div>
                <div>|</div>
                <div class="text-muted">03.09.1966 .</div>
            </div>
            <div class="col-9">
                <div class="list-group list-group-flush d-flex align-items-start">
                    <div class="d-flex flex-row">
                        <div class="d-flex flex-column align-items-start mb-2 me-4">
                            <span class="text-success">Avenant du 27 oct. 1988</span>
                            <span>Contrat initial au 3 sept. 1966</span>
                        </div>
                        <div class="d-flex align-items-baseline">
                            <span>> Sans date de sortie</span>
                        </div>
                    </div>
                    <div class="mb-2">Reste 12 jours de période d'essai</div>
                    <div class="d-flex flex-column align-items-start mb-2">
                        <span>Salaire horaire:</span>
                        <span> 15,00€</span>
                    </div>
                    <div class="d-flex flex-column align-items-start mb-2">
                        <span>Temps de travail:</span>
                        <span>60%</span>
                    </div>
                    <span>Contrat au forfait jour:</span>
                    <div class="d-flex flex-row align-items-center justify-content-around mb-2">
                        <div class="me-3">3 unités/semaine</div>
                        <div class="me-3">13 unités/mois</div>
                        <div class="me-3">156 unités/an</div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="d-flex flex-column">
                                <span>Qualification</span>
                                <span>Informaticien</span>
                            </div>
                        </div>
                        <div class="col">
                            <div class="d-flex flex-column">
                                <span>Statut</span>
                                <span>Cadre</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row bg-secondary text-light">..... version 2  HTML uniquement .....</div>


    <div class="card-body">
        <div class="row mb-3">
            <div class="col-3"></div>
            <div class="col-6 d-flex justify-content-between my-2">
                <div class="d-flex flex-column align-items-start">
                    <div>Contrat 4402</div>
                    <div class="lead"><strong>Amandine DOE</strong></div>
                    <span>Contrat à durée indéterminée</span>
                </div>
                <div class="row align-items-center">
                    <i class="btn btn-lg btn-outline-primary bi bi-pencil"></i>
                </div>
            </div>
            <div class="col-3">
                <a href="/" class="btn btn-lg btn-outline-danger mx-1 m-2 ">Mettre fin au contrat</a>
            </div>
        </div>

        <hr>

        <div class="row">
            <div class="col-2 list-group list-group-flush align-items-end ">
                <div class="mt-4"></div>
                <a href="/" class="text-muted text-decoration-none mt-3 mb-3">20.09.1980</a>                       
                <a href="/" class="text-muted text-decoration-none">03.09.1966</a>
            </div>
            <div class="col-1 list-group align-items-center">
                <i class="rounded-circle bg-success mt-2" style="width:8px; height:8px;"></i>
                <p class="text-muted my-1">|</p>
                <i class="rounded-circle bg-secondary" style="width:8px; height:8px;"></i>
                <span class="text-muted my-1">|</span>
                <i class="rounded-circle bg-secondary" style="width:8px; height:8px;"></i>
            </div>
            <div class="col-5">
                <div class="list-group list-group-flush d-flex align-items-start">
                    <div class="d-flex flex-row">
                        <div class="d-flex flex-column align-items-start mb-2 me-4">
                            <span class="text-success">Avenant du 27 oct. 1988</span>
                            <span>Contrat initial au 3 sept. 1966</span>
                        </div>
                    </div>
                    <div class="mb-2">Reste 12 jours de période d'essai</div>
                    <div class="d-flex flex-column align-items-start mb-2">
                        <span>Salaire horaire:</span>
                        <span><strong>15,00€ </strong></span>
                    </div>
                    <div class="d-flex flex-column align-items-start mb-2">
                        <span>Temps de travail:</span>
                        <span><strong>60%</strong></span>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="d-flex align-items-baseline">
                    <span>> Sans date de sortie</span>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-3"></div>
            <div class="col-9">
                <span>Contrat au forfait jour:</span>
                <div class="row fw-bold mb-2">
                    <div class="col">3 unités/semaine</div>
                    <div class="col">13 unités/mois</div>
                    <div class="col">156 unités/an</div>
                </div>
                <div class="d-flex flex-row justify-content-between mb-2">
                    <div class="d-flex flex-column">
                        <span>Qualification</span>
                        <span><strong>Informaticien</strong></span>
                    </div>
                    <div class="d-flex flex-column">
                        <span>Statut</span>
                        <span><strong>Cadre</strong></span>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    </div> -->

<!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
    <div class="row bg-secondary text-light">..... version 3  HTML uniquement .....</div>
<!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->


    <div class="card-body">

        <div class="row mb-3">
            <div class="col-3"></div>
            <div class="col-6 d-flex justify-content-between my-2">
                <div class="d-flex flex-column align-items-start">
                    <div>Contrat {{openedElement.oContrat.id}}</div>
                    <div class="lead"><strong>{{openedElement.cache_nom}}</strong></div>
                    <span>Contrat à durée indéterminée</span>
                </div>
                <div>
                    <router-link :to="{name:'EditContrat', params:{id:openedElement.id, idContrat:openedElement.oContrat.id}}" v-slot="{navigate, href}" custom>
                        <a :href="href" @click="navigate" class="btn btn-sm btn-outline-primary mx-1 "><i class="bi bi-pencil"></i></a>
                    </router-link>
                </div>
            </div>
            <div class="col-3 mt-2">
                <router-link :to="{name:'EditContrat', params:{id:openedElement.id, idContrat:openedElement.oContrat.id}}" v-slot="{navigate, href}" custom>
                        <a :href="href" @click="navigate" class="btn btn-sm btn-outline-danger mx-1 ">Mettre fin au contrat</a>
                    </router-link>
            </div>
        </div>

        <hr>

        <div class="row">

            <div class="col-3 d-flex flex-column align-items-end px-1"> 

                <div class="d-flex flex-row align-items-center mt-2">
                    <i class="rounded-circle bg-success mb-1" style="width:8px; height:8px;"></i>
                </div>
                
                <div class="d-flex flex-row">
                    <span class="text-muted">|</span>
                </div>
    
                <div class="d-flex flex-row align-items-center">
                    <a href="/" class="text-muted text-decoration-none me-2">20.09.1980 </a>
                    <i class="rounded-circle bg-secondary" style="width:8px; height:8px;"></i>
                </div>

                <div class="d-flex flex-row">
                    <span class="text-muted">|</span>
                </div>
                
                <div class="d-flex flex-row align-items-center">
                    <a href="/" class="text-muted text-decoration-none me-2">20.09.1966 </a>
                    <i class="rounded-circle bg-secondary" style="width:8px; height:8px;"></i>
                </div>
                
            </div>


            <div class="col-5">
                <div class="list-group list-group-flush d-flex align-items-start">
                    <div class="d-flex flex-row">
                        <div class="d-flex flex-column align-items-start mb-2 me-4">
                            <span class="text-success">Avenant du 27 oct. 1988</span>
                            <span>Contrat initial au 3 sept. 1966</span>
                        </div>
                    </div>
                    <div class="mb-2">Reste 12 jours de période d'essai</div>
                    <div class="d-flex flex-column align-items-start mb-2">
                        <span>Salaire horaire:</span>
                        <span><strong>15,00€ </strong></span>
                    </div>
                    <div class="d-flex flex-column align-items-start mb-2">
                        <span>Temps de travail:</span>
                        <span><strong>60%</strong></span>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="d-flex align-items-baseline">
                    <span>> Sans date de sortie</span>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-3"></div>
            <div class="col-9">
                <span>Contrat au forfait jour:</span>
                <div class="row fw-bold mb-2">
                    <div class="col">3 unités/semaine</div>
                    <div class="col">13 unités/mois</div>
                    <div class="col">156 unités/an</div>
                </div>
                <div class="d-flex flex-row justify-content-between mb-2">
                    <div class="d-flex flex-column">
                        <span>Qualification</span>
                        <span><strong>Informaticien</strong></span>
                    </div>
                    <div class="d-flex flex-column">
                        <span>Statut</span>
                        <span><strong>Cadre</strong></span>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapState } from 'vuex';
    export default {
        
        computed: {
            ...mapState(['openedElement']),
        },
        mounted(){
            console.log(this.openedElement.oContrat);
        }

    }
    </script>