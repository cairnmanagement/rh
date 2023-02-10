<template>
    <form>
        <div class="row g-2">
            <div class="col mb-3">
                <label for="dsortie" class="form-label">Date de sortie</label>
                <input type="date" class="form-control" id="dsortie" name="dsortie" v-model="dsortie_reelleValue" re>
            </div>
        </div>

        <div class="row g-2">
            <div class="col mb-3">
                <label for="type" class="form-label">Type:</label>
                <select class="form-select" v-model="motifValue">
                    <option v-for="motif in motifsList" :key="motif.id" :value="motif.id">{{ motif.motif }}</option>
                </select>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        motifsList: {
            type: Array,
            required: true,
        },
        motif: {
            type: Number,
            required: true,
        },
        dsortie_reelle: {
            type: String,
            required: true,
        }
    },

    emits: ['update:motif', 'update:dsortie_reelle'],

    data() {
        return {
            motifValue: null,
            dsortie_reelleValue: null,
        }
    },


    watch: {
        dsortie_reelleValue(newValue) {
            this.$emit('update:dsortie_reelle', newValue);
        },

        motifValue(newValue) {
            this.$emit('update:motif', newValue);
        }
    },

    mounted() {
        this.motifValue = this.motif;
        this.dsortie_reelleValue = this.dsortie_reelle;
    },
}
</script>