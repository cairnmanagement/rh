<template>
    <li><button class="dropdown-item" @click.prevent="unarchive()" :disabled="pending"><i class="bi bi-archive me-1"></i> Ré-activer</button></li>
</template>

<script>

export default {

    emits: ["pending-status", "updated"],

    props: {
        personnel: Object
    },

    data() {
        return {
            pending: false
        }
    },

    watch: {
        pending(newVal) {
            this.$emit("pending-status", newVal);
        }
    },

    methods: {
        /**
         * Archive le personnel
         */
        async unarchive() {

            if (confirm("Souhaitez vous ré-activer ce personnel ?")) {
                this.pending = true;
    
                try {
                    const personnel = await this.$app.api.post('v2/personnel/'+this.personnel.id+'/unarchive');
                    this.$emit("updated", personnel);
                }
                catch (e) {
                    this.$app.catchError(e);
                }
                finally {
                    this.pending = false;
                }
            }
        }
    },

    beforeUnmount() {
        this.$emit("pending-status", false);
    }
}

</script>