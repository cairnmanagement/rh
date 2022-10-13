<template>
    <div v-if="mailEdit">
            <div class="row g-2">
                <div class="col mb-3">
                    <label for="type" class="form-label">Type:</label>
                    <select class="form-select" v-model="mailEdit.type">
                        <option selected></option>
                        <option value="1">Personnel</option>
                        <option value="2">Professionnel</option>
                    </select>
                </div>
            </div>
            <div class="row g-2">
                <div class="col mb-3">
                    <label for="mail" class="form-label">Adresse mail</label>
                    <input type="mail" class="form-control" id="mail" name="mail" v-model="mailEdit.adresse">
                </div>
            </div>
    </div>   
</template>

<script>
    
    export default {
    
        props: {
    
            mail: Object
        },
    
        data() {
    
            return {
                mailEdit: null
            }
        },
    
        mounted() {
            this.mailEdit = JSON.parse(JSON.stringify(this.mail))
        }
    }
    
    </script>