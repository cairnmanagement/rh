<template>

    <section class="mb-3">
        
        <personnel-identity :personnel="openedPersonnel" display="vertical" size="lg" :useTitle="false " :showMatricule="true" />

        <div class="row align-items-stretch g-2">
            <template v-for="(button, index) in buttonsContratOptions" :key="index">
                <div  class="col-12 col-md d-block d-md-flex align-items-stretch" v-if="isActionPossible(button.action)">
                    <router-link :to="getRoute(button.routeName)" v-slot="{navigate, href}" custom>
                        <a :href="href" @click="navigate" class="btn btn-sm align-items-center d-block d-md-flex w-100 text-center" :class="classBtn(button)">
                            <span>
                                <i class="bi bi-lock-fill" v-if="!checkLastContrat"></i>
                                <i class="bi" :class="button.icon" v-else></i>
                                {{button.label}}
                            </span>
                        </a>
                    </router-link>
                </div>
            </template>
        </div>

        <div v-if="checkLastContrat"></div>
    </section>
    
    <section class="border-top pt-4">
        <div class="row" v-if="contratSelected">

            <div class="col-3">
                <Timeline :contrats="contrat.contrats" :selected="contratSelected" @selection-change="changeContratSelection"></Timeline>
            </div>
            <div class="col">
                <avenant-overview :contrat="contratSelected"></avenant-overview>         
            </div>
        </div>

        <div v-else class="text-center">
            <spinner></spinner>
        </div>
    </section>

</template>




<script>
import { mapState } from 'vuex';
import Timeline from './Timeline.vue';
import AvenantOverview from './AvenantOverview.vue';
import Spinner from '../pebble-ui/Spinner.vue';
import PersonnelIdentity from '../personnel/PersonnelIdentity.vue';
import { isAvenantPossible, isDeletable, isEditable } from '../../js/contrat';

export default {
        components: {Timeline, AvenantOverview, Spinner, PersonnelIdentity},

        props: {
            contrat: Object
        },

        data() {
            return {
                contratSelected: {},
                buttonsContratOptions: [
                    {
                        action: 'edit',
                        label: "Modifier le contrat",
                        color: "secondary",
                        icon: "bi-pencil",
                        routeName: "EditContrat"
                    },
                    // {
                    //     action: 'avenant',
                    //     label: "Faire une avenant",
                    //     color: "primary",
                    //     icon: "bi-file-earmark-plus",
                    //     routeName: "Avenant"
                    // },
                    {
                        action: 'delete',
                        label: "Mettre fin au contrat",
                        color: "danger",
                        icon: "bi-clipboard2-x",
                        routeName: "StopContrat"
                    },
                ]
            }
        },
        
        computed: {
            ...mapState(['openedPersonnel']),

            /**
             * Verifie si le contrat peu etre modifié
             * 
             * @return {boolean}
             */
            isEditable() {
                return isEditable(this.contrat);
            },

            /**
             * Verifie si le contrat peu etre supprimé
             * 
             * @return {boolean}
             */
            isDeletable() {
                return isDeletable(this.contrat);
            },

            /**
             * Contrôle si un avenant est possible sur le contrat sélectionné
             * 
             * @return {boolean}
             */
            isAvenantPossible() {
                return isAvenantPossible(this.contrat);
            },

            /**
             * Verifie si on selectionné le dernier contrat
             * 
             * @return {boolean}
             */
            checkLastContrat() {
                if (this.contrat.contrats[0].id === this.contratSelected.id ) {
                    return true;
                }

                return false;
            }, 

            
        },



        methods: {
            /**
             * Retourne true ou false en function du action du button
             * 
             * @param {String} action l'avtion que va effectuer le button
             * 
             * @return {Boolean}  
             */
            isActionPossible(action) {
                if (action === 'edit') {
                    return this.isEditable;
                }

                if (action === 'delete') {
                    return this.isDeletable;
                }

                if (action === 'avenant') {
                    return this.isAvenantPossible;
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
                    this.contratSelected = this.contrat.contrats[keyAvenant];
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

                className += ' btn-outline-' + button.color;

                if (!this.checkLastContrat) {
                    className += ' disabled';
                }

                return className;
            },

            /**
             * Modifie l'avenant sélectionné
             * 
             * @param {object} avenant L'avenant à sélectionner
             */
            changeContratSelection(avenant) {
                this.contratSelected = avenant;
            }
        },

        mounted(){
            this.loadFirstAvenant();
        }

    }
    </script>