<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h1 class="fs-3 my-3">Contrat Type</h1>
    
            <button v-if="!modeAjout" type="button" class="btn btn-primary d-flex justify-content-center align-items-center" @click.prevent="showAddForm()">
                <i class="bi bi-plus-circle me-1"></i>
                <span class="d-none d-md-block">Ajouter un type de contrat</span>
            </button>
        </div>

        <AlertMessage v-if="alertMessage" variant="warning">{{ alertMessage }}</AlertMessage>

        <InputText v-if="modeAjout" v-model:value="newContratType" placeholder="Type de contrat" v-model:show="modeAjout" :pending="pending.saveContratType" @save-value="recordValue()"/>

        <ul class="list-group">
            <li v-for="typeContrat in contratType" :key="typeContrat.id" class="list-group-item d-flex justify-content-end align-items-center">
                <span class="me-auto">{{ typeContrat.label }}</span>

                <button type="button" class="btn btn-success d-flex justify-content-center align-items-center me-2" @click.prevent="editMode()">
                    <i class="bi bi-pencil-square me-1"></i>
                    <span class="d-none d-md-block">Modifier</span>
                </button>

                <button type="button" class="btn btn-danger d-flex justify-content-center align-items-center" @click.prevent="confirmDelete()">
                    <i class="bi bi-trash-fill me-1"></i>
                    <span class="d-none d-md-block">Supprimer</span>
                </button>
            </li>
        </ul>

    </div>
</template>

<script>
import AlertMessage from '../pebble-ui/AlertMessage.vue';
import InputText from '@/components/InputText.vue';


export default {
    name: "ContratTypeItem",

    components: { AlertMessage, InputText },

    data() {
        return {
            pending: {
                contratType: true,
                saveContratType: false
            },
            newContratType: null,
            confirmSave: false,
            modeAjout: false,
            alertMessage: null,
            contratType: []
        };
    },

    watch: {
        modeAjout() {
            if (this.modeAjout == false) {
                this.alertMessage = null;
                this.newContratType = null;
            }
        }
    },

    methods: {
        /**
         * Active le formumaire d'ajout
         */
        showAddForm() {
            this.modeAjout = true;
        },

        /**
         * Cache le formulaire d'ajout
         */
        hideAddForm() {
            this.modeAjout = false;
            this.pending.saveContratType = false;
            this.confirmSave = false;
            this.newContratType = null;
            this.alertMessage = null;
        },

        /**
         * Récupere la liste des contrats type
         */
        getContratType() {
            this.pending.contratType = true;

            let urlApi = "v2/contrat/type";
            this.$app.apiGet(urlApi).then((data) => {
                this.contratType = data;
            }).catch(this.$app.catchError)
                .finally(() => { this.pending.contratType = false; });
        },

        recordValue() {
            if (!this.newContratType) {
                this.alertMessage = "le champs ne doit pas etre vide, veuillez le remplir."
                return;
            }

            this.alertMessage = null;
            this.pending.saveContratType = true;

            let urlApi = 'v2/contrat/type';
            let query = {
                label: this.newContratType
            }

            this.$app.apiPost(urlApi, query).then((data) => {
                this.contratType = data;
                this.modeAjout = false;
            }).catch(this.$app.catchError)
            .finally(() => { this.pending.saveContratType = false });
        }
    },
    mounted() {
        this.getContratType();
    },

}

</script>