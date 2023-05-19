<template>
    
    <span class="align-middle">{{ name }}</span>
    <span class="ms-1 badge text-bg-light border align-middle rounded-pill text-secondary" v-if="matricule">
        <i class="bi bi-person-vcard"></i>
        {{ matricule }}
    </span>

</template>

<script>

import { getName } from '../../js/personnel';

export default {
    props: {
        personnel: Object,
        showMatricule: {
            type: Boolean,
            default: false
        },
        defaultName: {
            type: String,
            default: ''
        }
    },

    computed: {
        /**
         * Retourne le matricule ou null si il n'existe pas ou qu'il ne doit pas être affiché.
         */
        matricule() {
            return this.showMatricule && this.personnel.matricule ? this.personnel.matricule : null;
        },

        /**
         * Retourne le nom du personnel à afficher
         */
        name() {
            return getName(this.personnel, { defaultName: this.defaultName });
        }
    }
}

</script>