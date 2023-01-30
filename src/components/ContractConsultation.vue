<template>

    <div class="card-body">
        <section class="mb-3">
            <div class="position-relative">
                <user-image :name="openedElement.oPersonne.nom" size="xl"></user-image>
                <span v-if="openedElement.matricule" class="badge text-bg-secondary position-absolute" style="top:0px; left:50%">{{openedElement.matricule}}</span>
            </div>


            <div class="d-flex flex-column align-items-center my-2">
                <div class="mb-2 text-center">
                    <h2>{{openedElement.cache_nom}}</h2>
                </div>

                <div class="d-flex">
                    <router-link :to="{name:'EditContrat', params:{id:openedElement.id, idContrat:contrat.id}}" v-slot="{navigate, href}" custom>
                    <a :href="href" @click="navigate" class="btn btn-sm btn-success mx-1 ">
                        <i class="bi bi-pencil"></i>
                        Modifier le contrat
                        </a>
                    </router-link>
    
                    <router-link :to="{name:'EditContrat', params:{id:openedElement.id, idContrat:contrat.id}}" v-slot="{navigate, href}" custom>
                        <a :href="href" @click="navigate" class="btn btn-sm btn-danger mx-1 ">
                            <i class="bi bi-file-earmark-x"></i>
                            Mettre fin au contrat
                        </a>
                    </router-link>
                </div>
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