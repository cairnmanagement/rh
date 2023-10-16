<template>
    <div class="dropdown">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" :disabled="pending">
            <span class="spinner-border spinner-border-sm" aria-hidden="true" v-if="pending"></span>
            Action
        </button>
        <ul class="dropdown-menu">
            <item-unarchive v-if="personnel.archived === 'OUI'" :personnel="personnel" @pending-status="updatePendingStatus" @updated="updatePersonnel" />
            <item-archive v-else :personnel="personnel" @pending-status="updatePendingStatus" @updated="updatePersonnel" />
        </ul>
    </div>
</template>

<script>
import ItemArchive from './ItemArchive.vue'
import ItemUnarchive from './ItemUnarchive.vue'

export default {
    components: { ItemUnarchive, ItemArchive },

    emits: ["updated"],

    props: {
        personnel: Object
    },

    data() {
        return {
            pending: false
        }
    },

    methods: {
        /**
         * Modifie l'état du pending
         * 
         * @param {bool} status 
         */
        updatePendingStatus(status) {
            this.pending = status;
        },

        /**
         * Envoie un signal à l'élément parent avec les données modifiées
         * 
         * @param {object} personnel 
         */
        updatePersonnel(personnel) {
            this.$emit("updated", personnel);
        }
    }
}

</script>