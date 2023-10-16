<template>
    <div>
        <div class="row g-2">
            <div class="col mb-3">
                <label for="type" class="form-label">Type:</label>
                <select class="form-select" v-model="typeValue">
                    <option selected ></option>
                    <option value="Contrat">Contrat</option>
                    <option value="Domicile">Domicile</option>
                </select>
            </div>
        </div>

        <div class="row g-2">    
            <div class="col mb-3">
                <label for="voie" class="form-label">Adresse:  n° et voie</label>
                <input type="text" class="form-control" id="voie" name="voie" v-model="voieValue">
            </div>
        </div>

        <div class="row g-2">
            <div class="col mb-3">
                <label for="complement" class="form-label">Complément</label>
                <input type="text" class="form-control" id="complement" name="complement" v-model="complementValue">
            </div>
        </div>

        <div class="row g-2">
            <div class="col-3 mb-3">
                <label for="cp" class="form-label">Code postal</label>
                <input type="text" class="form-control" id="cp" name="cp" v-model="cpValue">
            </div>

            <div class="col mb-3">
                <label for="localite" class="form-label">Localité</label>
                <input type="text" class="form-control" id="localite" name="localite" v-model="localiteValue">
            </div>
        </div> 
    </div>

</template>

<script>
    
export default {
    props: {
        type: String,
        voie: String,
        complement: String,
        cp: String,
        localite: String
    },

    emits: ['update:type', 'update:voie', 'update:complement','update:cp','update:localite'],

    data() {
        return {
            typeValue: null,
            voieValue: null,
            complementValue: null,
            cpValue: null,
            localiteValue: null,
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
         * Envoie un événement à l'élément parent lorsque la voie est modifiée.
         * 
         * @param {String} newVal Nouvelle voie
         * 
         * @event update:voie
         */
        voieValue(newVal) {
            this.$emit('update:voie', newVal);
        },

        /**
         * Envoie un événement à l'élément parent lorsque le complément d'adresse est modifié.
         * 
         * @param {String} newVal Nouveau complément d'adresse
         * 
         * @event update:complement
         */
        complementValue(newVal) {
            this.$emit('update:complement', newVal);
        },

        /**
         * Envoie un événement à l'élément parent lorsque le code postal est modifié.
         * 
         * @param {String} newVal Nouveau code postal
         * 
         * @event update:cp
         */
        cpValue(newVal) {
            this.$emit('update:cp', newVal);
        },

        /**
         * Envoie un événement à l'élément parent lorsque la localité est modifiée.
         * 
         * @param {String} newVal Nouvelle localité
         * 
         * @event update:localite
         */
        localiteValue(newVal) {
            this.$emit('update:localite', newVal);
        },
        
    },

    mounted() {
        this.typeValue = this.type;
        this.voieValue = this.voie;
        this.complementValue = this.complement;
        this.cpValue = this.cp;
        this.localiteValue = this.localite;
    }
}

</script>