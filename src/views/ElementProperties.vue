<template>
    <AppModal id="elementProperties" title="Propriétés" :cancel-btn="true" :submit-btn="true" :pending="pending" :display="display" className="modal-lg" @submit="record">
        <StructurePersonnelForm :structure_personnel="openedElement" v-if="openedElement" />
    </AppModal>
</template>

<script>

import AppModal from '@/components/pebble-ui/AppModal.vue'
import StructurePersonnelForm from '@/components/StructurePersonnelForm.vue'

import {mapState} from 'vuex'

export default {
    data() {
        return {
            pending: false,
            display: true
        }
    },

    computed: {
        ...mapState(['openedElement', 'tmpElement'])
    },

    components: {
        AppModal,
        StructurePersonnelForm
    },

    methods: {
        /**
         * Appel le système d'enregistrement
         */
        record() {
            this.$app.record(this, this.$store.state.tmpElement, {
                pending: this.pending
            })
            .then((data) => {
                this.$store.dispatch('refreshOpened', data);
                this.close();
            });
        },

        /**
         * Ferme la vue
         */
        close() {
            this.$router.push('/element/'+this.openedElement.id);
        }
    },

    /**
     * Lorsqu'on quite la route active, la boite modale est fermée
     */
    beforeRouteLeave(from, to, next) {
        this.display = false;
        next();
    },

    beforeMount() {
        this.$app.makeTmpElement(this);
    },

    unmounted() {
        this.$app.clearTmpElement(this);
    }
}
</script>