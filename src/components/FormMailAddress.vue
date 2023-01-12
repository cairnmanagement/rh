<template>
    <div v-if="mail">
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
                    <label for="email" class="form-label">Adresse mail</label>
                    <input type="mail" class="form-control" id="adressemail" name="email" v-model="adresse">
                </div>
            </div>
    </div>   
</template>

<script>


    
    export default {
    
        props: {
    
            mail: Object
        },

        emits: ['edit-type', 'edit-adresse'],
    
        data() {
    
            return {
                type: null,
                adresse: null
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
         * Envoie un événement à l'élément parent lorsque l'adresse mail est  modifiée.
         * 
         * @param {String} newVal Nouvelle adresse mail
         */
        adresse(newVal) {
            this.$emit('edit-adresse', newVal);
        }
        },
    
        mounted() {
            this.type = this.mail.type;
            this.adresse = this.mail.adresse
        }
    }
    
    </script>