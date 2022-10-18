<template>
    <div v-if="adresse">
        
            <div class="row g-2">
                <div class="col mb-3">
                        <label for="type" class="form-label">Type:</label>
                        <select class="form-select" v-model="type">
                            <option selected ></option>
                            <option value="Contrat">Contrat</option>
                            <option value="Domicile">Domicile</option>
                        </select>
                    </div>
            </div>
            <div class="row g-2">
                
                <div class="col mb-3">
                    <label for="voie" class="form-label">Adresse:  n° et voie</label>
                    <input type="text" class="form-control" id="voie" name="voie" v-model="voie">
                </div>
            </div>
            <div class="row g-2">
                <div class="col mb-3">
                    <label for="complement" class="form-label">Complément</label>
                    <input type="text" class="form-control" id="complement" name="complement" v-model="complement">
                </div>
            </div>
            <div class="row g-2">
                <div class="col-3 mb-3">
                    <label for="cp" class="form-label">Code postal</label>
                    <input type="number" class="form-control" id="cp" name="cp" v-model="cp">
                </div>
                <div class="col mb-3">
                    <label for="localite" class="form-label">Localité</label>
                    <input type="text" class="form-control" id="localite" name="localite" v-model="localite">
                </div>
            </div> 
            <!-- <div class="row g-2">
                <div class="col mb-3">
                    <label for="pays" class="form-label">Pays</label>
                    <input type="text" class="form-control" id="pays" name="pays" v-model="pays">
                </div>
            </div> -->
        
    </div>
</template>

<script>
    
    export default {
    
        props: {
    
            adresse: Object
        },

        emits: ['edit-type', 'edit-voie', 'edit-complement','edit-cp','edit-localite'],
    
        data() {
    
            return {
                type: null,
                voie: null,
                complement: null,
                cp: null,
                localite: null,
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
             * Envoie un événement à l'élément parent lorsque la voie est modifiée.
             * 
             * @param {String} newVal Nouvelle voie
             */
            voie(newVal) {
                this.$emit('edit-voie', newVal);
            },
            /**
             * Envoie un événement à l'élément parent lorsque le complément d'adresse est modifié.
             * 
             * @param {String} newVal Nouveau complément d'adresse
             */
            complement(newVal) {
                this.$emit('edit-complement', newVal);
            },
            /**
             * Envoie un événement à l'élément parent lorsque le code postal est modifié.
             * 
             * @param {String} newVal Nouveau code postal
             */
            cp(newVal) {
                this.$emit('edit-cp', newVal);
            },
            /**
             * Envoie un événement à l'élément parent lorsque la localité est modifiée.
             * 
             * @param {String} newVal Nouvelle localité
             */
            localite(newVal) {
                this.$emit('edit-localite', newVal);
            },
            
        },
        mounted() {
            this.type = this.adresse.type;
            this.voie = this.adresse.voie;
            this.complement = this.adresse.complement;
            this.cp = this.adresse.cp;
            this.localite = this.adresse.localite;
            console.log(this.data)
        }
    }
    
    </script>