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
                <label for="email" class="form-label">Adresse mail</label>
                <input type="mail" class="form-control" id="adressemail" name="email" v-model="adresseValue">
            </div>
        </div>
    </div>   

</template>

<script>

export default {
    props: {
        type: String,
        adresse: String
    },

    emits: ['update:type', 'update:adresse'],

    data() {
        return {
            typeValue: null,
            adresseValue: null
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
         * Envoie un événement à l'élément parent lorsque l'adresse mail est  modifiée.
         * 
         * @param {String} newVal Nouvelle adresse mail
         * 
         * @event update:adresse
         */
        adresseValue(newVal) {
            this.$emit('update:adresse', newVal);
        }
    },

    mounted() {
        this.typeValue = this.type;
        this.adresseValue = this.adresse
    }
}
    
</script>