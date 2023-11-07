<template>
    
    <div class="d-flex align-items-center">
        <div class="me-2">
            <user-image size="sm" :name="login.login" />
        </div>

        {{ login.login }}

        <div class="ms-1 text-secondary">
            &bull;
            {{ loginStructureName }}
        </div>
    </div>

</template>

<script>

import { mapState } from 'vuex';
import UserImage from '../../pebble-ui/UserImage.vue';

export default {
    components: { UserImage },

    props: {
        login: Object
    },

    computed: {
        ...mapState(['structures']),

        /**
         * Retourne le nom de la structure liée à l'utilisateur
         * 
         * @return {string}
         */
        loginStructureName() {
            const structure = this.structures.find(e => e.id == this.login.primary_structure);
            return structure.nom_interne;
        }
    },
};

</script>
