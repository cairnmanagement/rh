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

                <div class="row w-100 g-2 justify-content-center">
                    <template v-for="(button, index) in buttonsContratOptions" :key="index">
                        <template v-if="getCondition(button.mode)">
                            <div class="col-12 col-md-4">
                                <router-link :to="getRoute(button.routeName)" v-slot="{navigate, href}" custom>
                                    <a :href="href" @click="navigate" class="btn btn-sm w-100 " :class="classBtn(button)">
                                        <i class="bi bi-lock-fill" v-if="!checkLastContrat"></i>
                                        <i class="bi" :class="button.icon" v-else></i>
                                        {{button.label}}
                                    </a>
                                </router-link>
                            </div>
                        </template>
                    </template>
                </div>

                <div v-if="checkLastContrat"></div>
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
        components: {LineLifeAvenant,  UserImage, AvenantResume, Spinner},

        props: {
            contrat: Object
        },

        data() {
            return {
                avSelected: {},
                buttonsContratOptions: [
                    {
                        mode: 'edit',
                        label: "Modifier le contrat",
                        color: "success",
                        icon: "bi-pencil",
                        routeName: "EditContrat"
                    },
                    {
                        mode: 'avenant',
                        label: "Faire une avenant",
                        color: "primary",
                        icon: "bi-file-earmark-plus",
                        routeName: "Avenant"
                    },
                    {
                        mode: 'delete',
                        label: "Mettre fin au contrat",
                        color: "danger",
                        icon: "bi-clipboard2-x",
                        routeName: "DeleteContrat"
                    },
                ]
            }
        },
        
        computed: {
            ...mapState(['openedElement']),

            /**
             * Verifie si le contrat peu etre modifié
             * 
             * @return {boolean}
             */
            checkEditContrat() {
                if ('OUI' === this.contrat.verrou) {
                    return false;
                }

                return true;
            },

            /**
             * Verifie si le contrat peu etre supprimé
             * 
             * @return {boolean}
             */
            checkDeleteContrat() {
                if (this.contrat.dsortie_reelle && '0000-00-00 00:00:00' !== this.contrat.dsortie_reelle) {
                    return false;
                }

                return true;
            },

            /**
             * Verifie si on peux faire un avenant
             * 
             * @return {boolean}
             */
            checkAvenant() {
                if (this.contrat.avenant__structure__personnel_contrat_id) {
                    return false;
                }

                if (this.contrat.dsortie_reelle) {
                    return false;
                }

                return true;
            },

            /**
             * Verifie si on selectionné le dernier contrat
             * 
             * @return {boolean}
             */
            checkLastContrat() {
                if (this.contrat.contrats[0].id === this.avSelected.id ) {
                    return true;
                }

                return false;
            }, 

            
        },



        methods: {
            /**
             * Retourne true ou false en function du mode du button
             * 
             * @param {String} mode l'avtion que va effectuer le button
             * 
             * @return {Boolean}  
             */
            getCondition(mode) {
                if (mode === 'edit') {
                    return this.checkEditContrat;
                }

                if (mode === 'delete') {
                    return this.checkDeleteContrat;
                }

                if (mode === 'avenant') {
                    return this.checkAvenant;
                }

                return false;
            },

            /**
             * retourne l'object route pour le :to du router-link
             * 
             * @param {string} routeName le nom de la route
             * 
             * @return {Object} 
             */
            getRoute(routeName) {
                return {name: routeName, params: {id: this.contrat.structure__personnel_id, idContrat: this.contrat.id}};
            },

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


            /**
             * Retoure la classe du buttons
             */
            classBtn(button) {
                let className = '';

                className += ' btn-' + button.color;

                if (!this.checkLastContrat) {
                    className += ' disabled';
                }

                return className;
            },
        },

        mounted(){
            this.loadFirstAvenant();
        }

    }
    </script>