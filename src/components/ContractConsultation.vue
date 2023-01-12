<template>

    <div class="card-body">

        <div class="row mb-3">
            <div class="col-3"></div>
            <div class="col-6 d-flex justify-content-between my-2">
                <div class="d-flex flex-column align-items-start">
                    <div>Contrat {{contrat.id}}</div>
                    <div class="lead"><strong>{{openedElement.cache_nom}}</strong></div>
                    <span>Contrat à durée indéterminée</span>
                </div>
                <div>
                    <router-link :to="{name:'EditContrat', params:{id:openedElement.id, idContrat:contrat.id}}" v-slot="{navigate, href}" custom>
                        <a :href="href" @click="navigate" class="btn btn-sm btn-outline-primary mx-1 "><i class="bi bi-pencil"></i></a>
                    </router-link>
                </div>
            </div>
            <div class="col-3 mt-2">
                <router-link :to="{name:'EditContrat', params:{id:openedElement.id, idContrat:contrat.id}}" v-slot="{navigate, href}" custom>
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


            <div class="col-9">
                <div class="list-group list-group-flush d-flex align-items-start">
                    <div class="d-flex flex-row">
                        <div class="d-flex flex-column align-items-start mb-2 me-4">
                            <span class="text-success"> {{changeFormatDateLit(contrat.dentree)}}> {{changeFormatDateLit(contrat.dsortie)}} </span>
                            <span v-if="contrat.dentree_initiale">Contrat initial {{changeFormatDateLit(contrat.dentree_initiale)}}</span>
                        </div>
                    </div>
                    <div class="d-flex flex-row mb-2">
                        <span class="me-1">Jours de période d'essai restants?</span>
                        <span class="text-warning"> Contrat.periode_essai: {{contrat.periode_essai}}</span>
                    </div>

                    <div class="d-flex flex-column align-items-start mb-2">
                        <span>Salaire horaire:</span>
                        <span v-if="contrat.salaire_horaire == 'null' || contrat.salaire_horaire == 0"><strong>Pas d'infos sur le salaire horaire</strong></span>
                        <span v-else-if="contrat.salaire_horaire"><strong>{{contrat.salaire_horaire}}€ </strong></span>
                        <span v-else><strong>Pas d'infos enregistrées</strong></span>
                    </div>
                    <div class="d-flex flex-column align-items-start mb-2">
                        <span>Temps de travail:</span>
                        <span v-if="contrat.mls__contrat_duree_travail == 'null' || contrat.mls__contrat_duree_travail == 0"><strong>Pas d'infos sur le temps de travail</strong></span>
                        <span v-else-if="contrat.mls__contrat_duree_travail"><strong>{{contrat.mls__contrat_duree_travail}} mls__contrat_duree_travail</strong></span>
                        <span v-else><strong>Pas d'infos enregistrées</strong></span>
                        <span><strong>{60%}</strong></span>
                    </div>
                </div>
            </div>
            
        </div>

        <div class="row">
            <div class="col-3"></div>
            <div class="col-9">
                <div v-if="contrat.forfait_jour =='OUI'">
                    <span>Contrat au forfait jour:</span>
                    <div class="row fw-bold mb-2">
                        <div class="col">{{contrat.nb_par_semaine}} unités/semaine</div>
                        <div class="col">{{contrat.nb_par_mois}} unités/mois</div>
                        <div class="col">{{contrat.nb_par_an}} unités/an</div>
                    </div>
                
                </div>
                <div class="d-flex flex-row justify-content-between mb-2">
                    <div class="d-flex flex-column">
                        <span>Qualification</span>
                        <span class="text-warning"><strong>{{contrat.mls__qualification}}</strong></span>
                    </div>
                    <div class="d-flex flex-column">
                        <span>Statut</span>
                        <span class="text-warning"><strong>{{contrat.mls__contrat_statut}}</strong></span>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>


import date from 'date-and-time';
import fr from 'date-and-time/locale/fr';
import { mapState } from 'vuex';

export default {

        props: {
            contrat: Object
        },
        
        computed: {
            ...mapState(['openedElement']),

        },

        methods: {

            /**
             * Modifie le format de la date entrée en paramètre et la retourne 
             * sous le format DD/MM/YYYY
             * @param {string} date 
             */

            formatDateFr(date) {
                let newDate = new Date(date);
                let format = newDate.toLocaleDateString('fr-FR');
                return format;
            },

            /**
             * Modifie le format de la date entrée en paramètre et la retourne 
             * sous le format 01 févr. 2021
             * @param {string} date 
             */

            changeFormatDateLit(el) {
                date.locale(fr);
                return date.format(new Date(el), 'DD MMM YYYY')
            },

        },

        mounted(){
        }

    }
    </script>