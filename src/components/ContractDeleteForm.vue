<template>
    <form>
        <div class="row g-2">
            <div class="col mb-3">
                <label for="dsortie" class="form-label">Date de sortie</label>
                <input type="date" class="form-control" id="dsortie" name="dsortie" v-model="dsortie_reelleValue" re>
            </div>
        </div>

        <div class="row g-2" v-if="motifsList">
            <div class="col mb-3">
                <label for="type" class="form-label">Type:</label>
                <select class="form-select" v-model="motifValue">
                    <option v-for="motif in motifsList" :key="motif.id" :value="motif.id">{{ motif.label }}</option>
                </select>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        motif_fin_id: {
            type: Number,
            required: true,
        },
        dsortie_reelle: {
            type: String,
            required: true,
        }
    },

    emits: ['update:motif_fin_id', 'update:dsortie_reelle'],

    data() {
        return {
            motifValue: null,
            dsortie_reelleValue: null,
            motifsList: null,
            pending: {
                motifs_fin: false
            }
        }
    },


    watch: {
        dsortie_reelleValue(newValue) {
            this.$emit('update:dsortie_reelle', newValue);
        },

        motifValue(newValue) {
            this.$emit('update:motif_fin_id', newValue);
        }
    },

    async beforeMount() {
        this.pending.motifs_fin = true;
        try {
            this.motifsList = await this.$assets.getCollection('contratMotifsFin').getCollection();
        }
        catch (e) {
            this.$app.catchError(e);
        }
        finally {
            this.pending.motifs_fin = false;
        }
    },

    mounted() {
        this.motifValue = this.motif_fin_id;
        this.dsortie_reelleValue = this.dsortie_reelle;
    },
}
</script>