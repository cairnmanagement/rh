<template>
    <Spinner v-if="pending.contratRessoures"/>

    <div v-else>
        <div class="d-flex justify-content-between align-items-center">
            <h1 class="fs-3 my-3">{{ ressource.title }}</h1>
    
            <button v-if="!modeAjout" type="button" class="btn btn-primary d-flex justify-content-center align-items-center" @click.prevent="showAddForm()">
                <i class="bi bi-plus-circle me-1"></i>
                <span class="d-none d-md-block">Ajouter {{ ressource.buttonLabel }}</span>
            </button>
        </div>

        <AlertMessage v-if="alertMessage" variant="warning">{{ alertMessage }}</AlertMessage>

        <InputText v-if="modeAjout" :placeholder="ressource.buttonLabel" :pending="pending.saveContratType" @confirm="record($event)" @cancel="cancel()"/>

        <ul class="list-group my-3" v-if="ressourceListe.length != 0">
            <contrat-ressource-item v-for="ressourceItem in ressourceListe" :key="ressourceItem.id" :ressource="ressourceItem" :variable="ressource.variable" :label="ressource.label"></contrat-ressource-item>
        </ul>

        <AlertMessage v-else variant="info"> {{ ressourceEmpty }} </AlertMessage>
    </div>

</template>

<script>
import AlertMessage from '../pebble-ui/AlertMessage.vue';
import ContratRessourceItem from '@/components/parametre/ContratRessourceItem.vue';
import InputText from '../InputText.vue';
import { mapActions, mapState } from 'vuex';
import Spinner from '../pebble-ui/Spinner.vue';

export default {

    components: { AlertMessage, ContratRessourceItem, InputText, Spinner },

    props: {
        ressourceName: String
    },

    data() {
        return {
            pending: {
                contratRessoures: true,
                saveContratRessource: false
            },
            alertMessage: null,
            modeAjout:false,
            ressourcesDict: {
                type: {
                    label: "type",
                    variable: "contratType",
                    title: "Contrat type",
                    buttonLabel: "un type de contrat"
                },
                qualification: {
                    label: "qualification",
                    variable: "contratQualification",
                    title: "Contrat qualification",
                    buttonLabel: "une qualification de contrat"
                },
                statut: {
                    label: "statut",
                    variable: "contratStatut",
                    title: "Contrat statut",
                    buttonLabel: "un statut de contrat"
                }
            }
        }
    },

    watch: {
        ressourceName(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.cancel();
                this.getContratRessources();
            }
        }
    },

    computed: {
        ...mapState(['contratType', 'contratQualification', 'contratStatut']),

        /**
         * Retourne la liste de la ressource en fonction de ressourceName
         * 
         * @return {array}
         */
        ressourceListe() {
            return this[this.ressource.variable];
        },

        /**
         * Retourne les paramètres associés au nom de la ressource.
         * 
         * @return {object}
         */
        ressource() {
            return this.ressourcesDict[this.ressourceName];
        },

        /**
         * Retourne le message à afficher si la liste est vide
         * 
         * @return {string}
         */
        ressourceEmpty() {
            let sentence = this.ressourceName == "qualification" ? 'Auncune qualification enregistrée' : `Aucun ${this.ressourceName} enregistré`;

            return sentence;
        }
    },

    methods: {
        ...mapActions(['resetContratAsset', 'addContratAsset']),

        /**
         * Active le formumaire d'ajout
         */
         showAddForm() {
            this.modeAjout = true;
        },

        /**
         * Récupere les ressources necessaire au fonctionnement
         * contratType, contratQuallification, contratStatut
         */
        getContratRessources() {
            this.pending.contratRessoures = true;

            let urlApi = `v2/contrat/${this.ressource.label}`;

            this.$app.apiGet(urlApi).then((data) => {
                let options = {
                    'data' : data,
                    'ressource' : this.ressource.variable
                };

                this.resetContratAsset(options);
            }).catch(this.$app.catchError)
            .finally( () => { this.pending.contratRessoures = false} );
        },

        /**
         * Ajoute une ressource à la liste
         */
        record(event) {
            if (!event) {
                this.alertMessage = "le champs ne doit pas être vide, veuillez le remplir."
                return;
            }

            this.alertMessage = null;
            this.pending.saveContratRessource = true;

            let urlApi = `v2/contrat/${this.ressource.label}`;
            let query = {
                label: event
            }

            this.$app.apiPost(urlApi, query).then((data) => {
                let options = {
                    'data' : data,
                    'ressource' : this.ressource.variable
                };
                this.addContratAsset(options);
                this.modeAjout = false;
            }).catch(this.$app.catchError)
            .finally(() => { this.pending[this.ressource.variable] = false });
        },

        /**
         * Annule l'ajout d'une ressource
         */
        cancel() {
            this.alertMessage = null;
            this.modeAjout = false;
        }
    },

    mounted() {
        this.getContratRessources();
    }

}

</script>