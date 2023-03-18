<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h1 class="fs-3 my-3">{{ pageName }}</h1>
    
            <button v-if="!modeAjout" type="button" class="btn btn-primary d-flex justify-content-center align-items-center" @click.prevent="showAddForm()">
                <i class="bi bi-plus-circle me-1"></i>
                <span class="d-none d-md-block">Ajouter un type de contrat</span>
            </button>
        </div>

        <AlertMessage v-if="alertMessage" variant="warning">{{ alertMessage }}</AlertMessage>
    </div>
</template>

<script>
import AlertMessage from '../pebble-ui/AlertMessage.vue';

export default {
    name: "ContratRessourceConsult",

    components: { AlertMessage },

    props: {
        routeName: String,
    },

    data() {
        return {
            alertMessage: null
        }
    },

    conputed: {
        pageName() {
            let pageName;

            switch (this.routeName) {
                case 'ContratType':
                    pageName =  'Contrat type';
                    break;
            
                case 'ContratQualification':
                    pageName = 'Contrat qualification';
                    break;

                case 'ContratStatut':
                    pageName = 'Contrat Statut';
                    break;
            }

            return pageName;
        }
    }

}

</script>