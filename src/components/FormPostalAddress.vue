<template>
    <div v-if="adresseEdit">
        
            <div class="row g-2">
                <div class="col mb-3">
                        <label for="type" class="form-label">Type:</label>
                        <select class="form-select" v-model="adresseEdit.type">
                            <option selected></option>
                            <option value="1">Contrat</option>
                            <option value="2">Domicile</option>
                        </select>
                    </div>
            </div>
            <div class="row g-2">
                
                <div class="col mb-3">
                    <label for="voie" class="form-label">Adresse:  n° et voie</label>
                    <input type="text" class="form-control" id="voie_nom" name="voie" v-model="adresseEdit.voie">
                </div>
            </div>
            <div class="row g-2">
                <div class="col mb-3">
                    <label for="complement" class="form-label">Complément</label>
                    <input type="text" class="form-control" id="complement" name="complement" v-model="adresseEdit.complement">
                </div>
            </div>
            <div class="row g-2">
                <div class="col-3 mb-3">
                    <label for="cp" class="form-label">Code postal</label>
                    <input type="number" class="form-control" id="code_postal" name="cp" v-model="adresseEdit.cp">
                </div>
                <div class="col mb-3">
                    <label for="localite" class="form-label">Localité</label>
                    <input type="text" class="form-control" id="localite" name="localite" v-model="adresseEdit.localite">
                </div>
            </div> 
            <div class="row g-2">
                <div class="col mb-3">
                    <label for="pays" class="form-label">Pays</label>
                    <input type="text" class="form-control" id="pays" name="pays" v-model="adresseEdit.pays">
                </div>
            </div>
        
    </div>
</template>

<script>
    
    export default {
    
        props: {
    
            adresse: Object
        },
    
        data() {
    
            return {
                adresseEdit: null
            }
        },
    
        mounted() {
            this.adresseEdit = JSON.parse(JSON.stringify(this.adresse))
        }
    }
    
    </script>