<template>

    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h1 class="fs-3 my-3">{{ ressourceConfig.title }}</h1>

            <button v-if="!creationForm" type="button" class="btn btn-primary d-flex justify-content-center align-items-center" @click.prevent="displayCreationForm()">
                <i class="bi bi-plus-circle me-1"></i>
                <span class="d-none d-md-block">Ajouter</span>
            </button>
        </div>
        
        <div class="mb-3" v-if="creationForm">
            <AlertMessage v-if="alertMessage" variant="warning">{{ alertMessage }}</AlertMessage>
    
            <InputText :placeholder="'Libellé pour '+ressourceConfig.label" :pending="pending.saveContratRessource" @confirm="record($event)" @cancel="cancel()"/>
        </div>

        <div class="alert alert-secondary d-flex align-items-center" v-if="ressourceConfig.description">
            <i class="bi bi-lightbulb me-2"></i>
            {{ ressourceConfig.description }}
        </div>


        <ul class="list-group my-3" v-if="ressourcesList.length > 0">
            <ressource-item v-for="ressourceItem in ressourcesList" :key="ressourceItem.id" :ressource="ressourceItem" :ressource-config="ressourceConfig"></ressource-item>
        </ul>

        <AlertMessage v-else variant="info"> {{ ressourceEmpty }} </AlertMessage>
    </div>

</template>

<script>
import AlertMessage from '../pebble-ui/AlertMessage.vue';
import RessourceItem from './RessourceItem.vue';
import InputText from '../InputText.vue';
import { mapState } from 'vuex';

export default {

    components: { AlertMessage, RessourceItem, InputText },

    props: {
        ressourceName: String
    },

    data() {
        return {
            pending: {
                saveContratRessource: false
            },
            alertMessage: null,
            creationForm:false,
            ressourcesDict: {
                type: {
                    label: "type",
                    variable: "contratType",
                    collectionName: "contratTypes",
                    title: "Types de contrat",
                    description: "Type de contrat au sens du droit du travail : CDI, CDD, alternance...",
                    apiRoute: "v2/contrat/type"
                },
                qualification: {
                    label: "qualification",
                    variable: "contratQualification",
                    collectionName: "contratQualifications",
                    title: "Qualifications des contrats",
                    description: "Métier ou fonction exercé par un employé dans l'entreprise. Cuisinier, Chef cuisinier, Barman...",
                    apiRoute: "v2/contrat/type"
                },
                statut: {
                    label: "statut",
                    variable: "contratStatut",
                    collectionName: "contratStatuts",
                    title: "Statuts salariaux",
                    description: "Statut du salarier. Cadre, Non-cadre, ETAM...",
                    apiRoute: "v2/contrat/type"
                },
                motif_fin: {
                    label: "motif_fin",
                    variable: "contratMotifsFin",
                    collectionName: "contratMotifsFin",
                    title: "Motifs de fin",
                    description: "Motif justifiant l'arrêt d'un contrat de travail : Fin de CDD, rupture conventionnelle, licenciement pour faute...",
                    apiRoute: "v2/contrat/type"
                },
                fonction: {
                    label: "fonction",
                    variable: "personnelFonctions",
                    collectionName: "personnelFonctions",
                    title: "Fonctions du personnel",
                    description: "La fonction du personnel est une caractéristique non contractuelle qui peut être liée à ses missions ou qui peut préciser sa qualification.",
                    apiRoute: "v2/personnel/fonction"
                },
                secteur: {
                    label: "secteur",
                    variable: "personnelSecteurs",
                    collectionName: "personnelSecteurs",
                    title: "Secteur du personnel",
                    description: "Le secteur est une caractéristique non contractuelle qui peut rattacher le personnel à un service ou à un groupe dans l'entreprise. Secteur RH, Cuisine...",
                    apiRoute: "v2/personnel/secteur"
                }
,            }
        }
    },

    watch: {
        ressourceName(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.cancel();
            }
        }
    },

    computed: {
        ...mapState(['contratType', 'contratQualification', 'contratStatut', 'contratMotifsFin', 'personnelSecteurs', 'personnelFonctions']),

        /**
         * Retourne la liste de la ressource en fonction de ressourceName
         * 
         * @return {array}
         */
        ressourcesList() {
            return this[this.ressourceConfig.variable];
        },

        /**
         * Retourne les paramètres associés au nom de la ressource.
         * 
         * @return {object}
         */
        ressourceConfig() {
            return this.ressourcesDict[this.ressourceName];
        },

        /**
         * Retourne le message à afficher si la liste est vide
         * 
         * @return {string}
         */
        ressourceEmpty() {
            let sentence = this.ressourceName == "qualification" ? 'Auncune qualification enregistrée' : `Aucun ${this.ressourceConfig.title.toLowerCase()} enregistré`;

            return sentence;
        }
    },

    methods: {
        /**
         * Active le formumaire d'ajout
         */
        displayCreationForm() {
            this.creationForm = true;
        },

        /**
         * Ajoute une ressource à la liste
         */
        record(labelValue) {
            if (!labelValue) {
                this.alertMessage = "Le champs libellé doit pas être vide."
                return;
            }

            this.alertMessage = null;
            this.pending.saveContratRessource = true;

            let urlApi = this.ressourceConfig.apiRoute;
            let query = {
                label: labelValue
            }

            this.$app.api.post(urlApi, query).then((data) => {
                const collection = this.$assets.getCollection(this.ressourceConfig.collectionName);
                collection.updateCollection([data]);
                this.creationForm = false;
            }).catch(this.$app.catchError)
            .finally(() => { this.pending.saveContratRessource = false });
        },

        /**
         * Annule l'ajout d'une ressource
         */
        cancel() {
            this.alertMessage = null;
            this.creationForm = false;
        }
    }

}

</script>