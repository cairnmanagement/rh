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

                <div class="row g-2">
                    <template v-for="(button, index) in buttonsContratOptions" :key="index">
                        <div class="col-12 col-md">
                            <template v-if="button.condition">
                                <router-link :to="button.route" v-slot="{navigate, href}" custom>
                                    <a :href="href" @click="navigate" class="btn btn-sm w-100" :class="'btn-'+button.color">
                                        <i class="bi" :class="button.icon"></i>
                                        {{button.label}}
                                    </a>
                                </router-link>
                            </template>
                        </div>
                    </template>
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
                buttonsContratOptions: [
                    {
                        condition: "checkEditContrat",
                        label: "Modifier le contrat",
                        color: "success",
                        icon: "bi-pencil",
                        route: {
                            name: "EditContrat",
                            params: this.routeParam
                        }
                    },
                    {
                        condition: "checkAvenant",
                        label: "Faire une avenant",
                        color: "primary",
                        icon: "bi-file-earmark-plus",
                        route: {
                            name: "DeleteContrat",
                            params: this.routeParam
                        }
                    },
                    {
                        condition: "checkDeleteContrat",
                        label: "Mettre fin au contrat",
                        color: "danger",
                        icon: "bi-clipboard2-x",
                        route: {
                            name: "DeleteContrat",
                            params: this.routeParam
                        }
                    },
                ]
            }
        },
        
        computed: {
            ...mapState(['openedElement']),

            /**
             * Verifie si le contrat peu etre modifié
             */
            checkEditContrat() {
                return true;
            },

            /**
             * Verifie si le contrat peu etre supprimé
             */
            checkDeleteContrat() {
                return true;
            },

            /**
             * Verifie si on peux faire un avenant
             */
            checkAvenant() {
                return true;
            },

            /**
             * Retourne l'id du personnel et l'id du contrat pour les param du roouter link des buttons
             */
            routeParam() {
                return {
                    id: this.contrat.id,
                    idContrat: this.contrat.id
                }
            }
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