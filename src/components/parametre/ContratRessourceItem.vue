<template>
    <li v-if="modeEdit" class="list-group-item">
        <alert-message v-if="alertMessage" variant="warning">{{ alertMessage }}</alert-message>
        
        <input-text :value="value" :pending="pending.saveRessource" @confirm="record($event)" @cancel="cancel()"></input-text>
    </li>

    <li v-else class="list-group-item d-flex justify-content-end align-items-center">
        <span class="me-auto">{{ ressource.label }}</span>

        <button type="button" class="btn btn-primary d-flex justify-content-center align-items-center me-2" @click.prevent="editMode()">
            <i class="bi bi-pencil-square me-1"></i>
            <span class="d-none d-md-block">Modifier</span>
        </button>

        <!-- <button type="button" class="btn btn-outline-danger d-flex justify-content-center align-items-center" @click.prevent="deleteMode()">
            <i class="bi bi-trash"></i>
        </button> -->
    </li>
</template>

<script>
import { mapActions } from 'vuex';
import InputText from '../InputText.vue';
import AlertMessage from '../pebble-ui/AlertMessage.vue';


export default {

    components: { InputText, AlertMessage },

    props: {
        ressource: Object,
        variable: String,
        label: String
    },

    data() {
        return {
            pending: {
                deleteRessource: false,
                saveRessource: false
            },
            modeEdit: false,
            newRessource: null,
            alertMessage: null
        };
    },

    watch: {
        modeEdit() {
            this.newRessource = this.ressource.label;
        }
    },

    computed: {
        /**
         * Retourne la valeur enregistrée sur la ressource.
         * 
         * @returns {string}
         */
        value() {
            return this.ressource.label;
        }        
    },

    methods: {
        ...mapActions([
            'updateContratAsset',
            'removeContratAsset'
        ]),

        /**
         * Passe la ressource en mmode edition pour pouvoir une modification
         */
        editMode() {
            this.modeEdit = true;
        },

        /**
         * Supprime la ressource de la base de donnée
         */
         deleteMode() {
            this.pending.deleteRessource = true;

            let actions = 'remove' + this.variable.charAt(0).toUpperCase()+this.variable.substring(1);
            let urlApi = `v2/contrat/${this.label}/${this.ressource.id}`;

            this.$app.apiDelete(urlApi).then(() => {
                this[actions](this.ressource.id);
            }).catch(this.$app.catchError)
            .finally( () => this.pending.deleteRessource = false );
        },

        /**
         * Enregistre la nouvelle valeur en base de donnée
         */
         record(event) {
            if (!event) {
                this.alertMessage = "le champs ne doit pas être vide, veuillez le remplir."
                return;
            }

            this.pending.saveRessource = true;

            if (event === this.ressource.label) {
                this.cancel();
                this.pending.saveRessource = false;
                return;
            }

            this.alertMessage = null;
            this.pending.saveContratType = true;

            let urlApi = `v2/contrat/${this.label}/${this.ressource.id}`;
            let query = {
                label: event
            }

            this.$app.apiPost(urlApi, query).then((data) => {
                let options = {
                    data: data,
                    ressource: this.variable
                }
                this.updateContratAsset(options);
                this.modeEdit = false;
                this.newRessource = null;
            }).catch(this.$app.catchError)
            .finally(() => { this.pending.saveRessource = false });
        },

        /**
         * Annule l'ajout d'une ressource
         */
         cancel() {
            this.alertMessage = null;
            this.newRessource = null;
            this.modeEdit = false;
        }
    },
}
</script>