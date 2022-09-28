<template>
    <div class="card-body">
        <div class="row mb-3">
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
                        <a :href="href" @click="navigate" class="btn btn-lg btn-outline-primary mx-1 "><i class="bi bi-pencil"></i></a>
                    </router-link>
                    <a href="/" class="btn btn-lg btn-outline-danger mx-1"><i class="bi bi-sign-stop"></i> </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-3 list-group list-group-flush align-items-end">
                <span>.</span>
                <span>|</span>
                <span class="text-muted">20.09.1980 .</span>
                <span>|</span>
                <span class="text-muted">03.09.1966 .</span>
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
                    <div class="d-flex flex-row align-items-center  justify-content-between mb-2">
                        <span class="me-3">3 unités/semaine</span>
                        <span class="me-3">13 unités/mois</span>
                        <span class="me-3">156 unités/an</span>
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
</template>
<script>

    import { mapState } from 'vuex';
    export default {
        
        computed: {
            ...mapState(['openedElement']),
        },
    
    }
    </script>