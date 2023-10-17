<template>
    <li v-if="modeEdit" class="list-group-item">
        <alert-message v-if="alertMessage" variant="warning">{{ alertMessage }}</alert-message>
        
        <input-text :value="currentLabelValue" :pending="pending.saveRessource" @confirm="record($event)" @cancel="cancel()"></input-text>
    </li>

    <li v-else class="list-group-item d-flex justify-content-between align-items-center">
        <span class="me-auto">{{ ressource.label }}</span>

        <div class="btn-group">
            <button type="button" class="btn btn-secondary d-flex" @click.prevent="editMode()">
                <i class="bi bi-pencil-square"></i>
            </button>
    
            <button type="button" class="btn btn-outline-danger d-flex" @click.prevent="remove()" :disabled="pending.deleteRessource">
                <span class="spinner-border spinner-border-sm" v-if="pending.deleteRessource"></span>
                <i class="bi bi-trash" v-else></i>
            </button>
        </div>
    </li>
</template>

<script>

import InputText from '../InputText.vue';
import AlertMessage from '../pebble-ui/AlertMessage.vue';


export default {

    components: { InputText, AlertMessage },

    props: {
        ressource: Object,
        ressourceConfig: Object
    },

    data() {
        return {
            pending: {
                deleteRessource: false,
                saveRessource: false
            },
            modeEdit: false,
            alertMessage: null
        };
    },

    computed: {
        /**
         * Retourne la valeur enregistrée sur la ressource.
         * 
         * @returns {string}
         */
        currentLabelValue() {
            return this.ressource.label;
        }        
    },

    methods: {

        /**
         * Passe la ressource en mmode edition pour pouvoir une modification
         */
        editMode() {
            this.modeEdit = true;
        },

        /**
         * Supprime la ressource de la base de donnée
         */
        remove() {
            if (confirm("Confirmez-vous supprimer cette ligne : "+this.ressource.label)) {
                this.pending.deleteRessource = true;

                let urlApi = `${this.ressourceConfig.apiRoute}/${this.ressource.id}`;
    
                this.$app.api.delete(urlApi).then(() => {
                    const collection = this.$assets.getCollection(this.ressourceConfig.collectionName);
                    collection.removeAssetById(this.ressource.id);
                }).catch(this.$app.catchError)
                .finally( () => this.pending.deleteRessource = false );
            }
        },

        /**
         * Enregistre la nouvelle valeur en base de donnée
         */
        record(newLabelValue) {
            if (!newLabelValue) {
                this.alertMessage = "Le libellé ne doit pas être vide."
                return;
            }

            
            if (newLabelValue === this.ressource.label) {
                this.cancel();
                return;
            }

            this.alertMessage = null;
            this.pending.saveRessource = true;

            let urlApi = `${this.ressourceConfig.apiRoute}/${this.ressource.id}`;
            let query = {
                label: newLabelValue
            };

            this.$app.api.patch(urlApi, query).then((data) => {
                const collection = this.$assets.getCollection(this.ressourceConfig.collectionName);
                collection.updateCollection([data]);
                this.modeEdit = false;
            }).catch(this.$app.catchError)
            .finally(() => { this.pending.saveRessource = false });
        },

        /**
         * Annule l'ajout d'une ressource
         */
        cancel() {
            this.alertMessage = null;
            this.modeEdit = false;
        }
    },
}
</script>