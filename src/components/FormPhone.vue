<template>

    <div>
        <div class="row g-2">
            <div class="col mb-3">
                <label for="type" class="form-label">Type:</label>
                <select class="form-select" v-model="typeValue">
                    <option selected></option>
                    <option value="Personnel">Personnel</option>
                    <option value="Professionnel">Professionnel</option>
                </select>
            </div>
        </div>

        <div class="row g-2">
            <div class="col mb-3">
                <label for="tel" class="form-label">Numéro</label>
                <input type="tel" class="form-control" id="tel" name="tel" v-model="numeroValue">
            </div>
        </div>
    </div>

</template>

<script>
    
export default {
    props: {
        type: String,
        numero: String
    },

    emits: ['update:type', 'update:numero'],

    data() {
        return {
            typeValue: null,
            numeroValue: null
        }
    },

    watch: {
        /**
         * Envoie un événement à l'élément parent lorsque le type est modifié.
         * 
         * @param {String} newVal Nouveau type
         * 
         * @event update:type
         */
         typeValue(newVal) {
            this.$emit('update:type', newVal);
        },

        /**
         * Envoie un événement à l'élément parent lorsque le numéro de téléphone est modifié.
         * 
         * @param {String} newVal Nouveau numéro de téléphone
         * 
         * @event update:numero
         */
         numeroValue(newVal) {
            this.$emit('update:numero', newVal);
        }
    },

    mounted() {
        this.typeValue = this.type;
        this.numeroValue = this.numero;
    }
}

</script>