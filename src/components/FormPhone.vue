<template>
    <div v-if="telephoneEdit">
        
        <div class="row g-2">
            <div class="col mb-3">
                <label for="type" class="form-label">Type:</label>
                <select class="form-select" v-model="telephoneEdit.type" >
                    <option selected></option>
                    <option value="1">Personnel</option>
                    <option value="2">Professionnel</option>
                </select>
            </div>
        </div>
        <div class="row g-2">
            <div class="col mb-3">
                <label for="tel" class="form-label">Numéro</label>
                <input type="tel" class="form-control" id="tel" name="tel" v-model="telephoneEdit.numero">
            </div>
        </div>
    </div>
</template>

<script>
    
export default {

    props: {

        telephone: Object
    },

    data() {

        return {
            telephoneEdit: null
        }
    },

    mounted() {
        console.log(this.telephone);
        this.telephoneEdit = JSON.parse(JSON.stringify(this.telephone))
    }
}

</script>