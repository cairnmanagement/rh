<template>

    <div class="card-body">

        <section class="row mb-3">
            <div class="col-3">
                <div class="position-relative">
                    <user-image :name="openedElement.oPersonne.nom" size="xl"></user-image>
                    <span v-if="openedElement.matricule" class="badge bg-secondary position-absolute" style="top:0px; right:30px">{{openedElement.matricule}}</span>
                </div>
            </div>

            <div class="col-6 d-flex justify-content-between my-2">
                <div class="d-flex flex-column align-items-start">
                    <div class="badge bg-secondary">Contrat {{contrat.id}}</div>
                    <div class="lead"><strong>{{openedElement.cache_nom}}</strong></div>
                </div>
            </div>

            <div class="col-3 mt-2">
                <router-link :to="{name:'EditContrat', params:{id:openedElement.id, idContrat:contrat.id}}" v-slot="{navigate, href}" custom>
                    <a :href="href" @click="navigate" class="btn btn-sm btn-outline-primary mx-1 ">
                        Modifier
                        <i class="bi bi-pencil"></i>
                    </a>
                </router-link>

                <router-link :to="{name:'EditContrat', params:{id:openedElement.id, idContrat:contrat.id}}" v-slot="{navigate, href}" custom>
                    <a :href="href" @click="navigate" class="btn btn-sm btn-outline-danger mx-1 ">Mettre fin au contrat</a>
                </router-link>
            </div>
        </section>
        
        <section class="border-top pt-4 d-flex">
            <template v-if="avSelected">
                <line-life-avenant :avenants="contrat.contrats" v-model:avSelected="avSelected"></line-life-avenant>
                
                <avenant-resume :av-selected="avSelected"></avenant-resume>         
            </template>

            <div v-else class="text-center">
                <spinner></spinner>
            </div>
        </section>
    </div>

</template>




<script>
import { mapState } from 'vuex';
import UserImage from './pebble-ui/UserImage.vue';
import LineLifeAvenant from './LineLifeAvenant.vue';
import AvenantResume from './AvenantResume.vue';
import Spinner from './pebble-ui/Spinner.vue';

export default {
        props: {
            contrat: Object
        },

        data() {
            return {
                avSelected: {},
            }
        },
        
        computed: {
            ...mapState(['openedElement']),
        },

        components: {LineLifeAvenant,  UserImage, AvenantResume, Spinner},

        methods: {
            /**
             * Load le premier avenant
             */
            loadFirstAvenant() {
                for(let keyAvenant in this.contrat.contrats) {
                    this.avSelected = this.contrat.contrats[keyAvenant];
                    break;
                }
            },

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
        },

        mounted(){
            this.loadFirstAvenant()
        }

    }
    </script>