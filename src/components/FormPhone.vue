<template>
    <div v-if="telephone">
        
        <div class="row g-2">
            <div class="col mb-3">
                <label for="type" class="form-label">Type:</label>
                <select class="form-select" v-model="type">
                    <option selected></option>
                    <option value="Personnel">Personnel</option>
                    <option value="Professionnel">Professionnel</option>
                </select>
            </div>
        </div>
        <div class="row g-2">
            <div class="col mb-3">
                <label for="tel" class="form-label">Numéro</label>
                <input type="tel" class="form-control" id="tel" name="tel" v-model="numero">
            </div>
        </div>
    </div>
</template>

<script>
    
export default {

    props: {
        telephone: Object
    },

    emits: ['edit-type', 'edit-numero'],

    data() {
        return {
            type: null,
            numero: null
        }
    },

    watch: {
        /**
         * Envoie un événement à l'élément parent lorsque le type est modifié.
         * 
         * @param {String} newVal Nouveau type
         */
        type(newVal) {
            this.$emit('edit-type', newVal);
        },

        /**
         * Envoie un événement à l'élément parent lorsque le numéro de téléphone est modifié.
         * 
         * @param {String} newVal Nouveau numéro de téléphone
         */
        numero(newVal) {
            this.$emit('edit-numero', newVal);
        }
    },

    mounted() {
        this.type = this.telephone.type;
        this.numero = this.telephone.numero;
    }
}

</script>