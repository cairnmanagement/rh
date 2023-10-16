<template>

    <li  class="list-group-item d-flex align-items-baseline">
        <i class="bi me-3" :class="icon"></i>

        <span v-if="!ressources?.length" class="text-warning">{{ alertLabel }}</span>

        <div v-else class="d-flex flex-column flex-fill">
            <contact-ressource-item v-for="ressource in ressources" :key="ressource.id" :ressource="ressource" :type="type" />
        </div>
    </li>
    
</template>


<script>
import ContactRessourceItem from './ContactRessourceItem.vue';

export default {
    components: { ContactRessourceItem },

    props: {
        ressources: Array,
        type: String
    },

    computed: {
        /**
         * Retourne une icon en fonction du type
         * 
         * @return {string}
         */
        icon() {
            let icon;

            switch (this.type) {
                case 'telephone':
                    icon =  'bi-phone';
                    break;

                case 'mail':
                    icon =  'bi-envelope';
                    break;

                case 'address':
                    icon =  "bi-geo-alt";
                    break;
            
            
                default:
                    break;
            }

            return icon;
        },

        /**
         * Retoune un message spécific en fonction du type
         */
        alertLabel() {
             "Pas de numéro de {{{téléphone}}} enregistré";

            let alertMessage;

            switch (this.type) {
                case 'telephone':
                    alertMessage =  "de numéro de téléphone";
                    break;

                case 'mail':
                    alertMessage =  "d'adresse email";
                    break;

                case 'address':
                    alertMessage =  "d'adresse postale";
                    break;
            
            
                default:
                    break;
            }

            return `Pas ${alertMessage} enregistrée`;
        }
    }
}

</script>