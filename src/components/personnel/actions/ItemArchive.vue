<template>
    <li><button class="dropdown-item" @click.prevent="archive()" :disabled="pending"><i class="bi bi-archive-fill me-1"></i> Archiver</button></li>
</template>

<script>

export default {
    props: {
        personnel: Object
    },
    
    emits: ["pending-status", "updated"],

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
        async archive() {

            if (confirm("Souhaitez vous archiver ce personnel ?")) {
                this.pending = true;
    
                try {
                    const personnel = await this.$app.api.post('v2/personnel/'+this.personnel.id+'/archive');
                    this.pending = false;
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