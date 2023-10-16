<template>

    <form>
        <div class="row g-2">
            <div class="col-md-auto mb-3">
                <label for="personne_civilite" class="form-label">Civilité</label>
                <select class="form-select" id="personne_civilite" name="civilite" v-model="civiliteValue">
                    <option value="M">Monsieur</option>
                    <option value="Mme">Madame</option>
                </select>						
            </div>

            <div class="col-md mb-3">
                <label for="personne_nom" class="form-label">Nom*</label>
                <input type="text" class="form-control" id="personne_nom" name="nom" v-model="nomValue" required>
            </div>

            <div class="col-md mb-3">
                <label for="personne_prenom" class="form-label">Prénom*</label>
                <input type="text" class="form-control" id="personne_prenom" name="prenom" v-model="prenomValue" required>
            </div>
        </div>

        <div class="row g-2">
            <div class="col-auto mb-3">
                <label for="date_naissance" class="form-label">Né(e) le*</label>
                <input type="date" class="form-control" id="date_naissance" name="dn" v-model="dnValue" required>
            </div>

            <div class="col mb-3">
                <label for="lieu_naissance" class="form-label">Ville de naissance</label>
                <input type="text" class="form-control"  placeholder="Ville"  id="lieu_naissance" name="lieuNaissance" v-model="lieuNaissanceValue">
            </div>
        </div>

        <div class="row g-2">
            <div class="col-md mb-3">
                <label for="numeroSecu" class="form-label">Numéro de sécurité sociale</label>
                <input type="text" class="form-control" id="numeroSecu" name="nss" v-model="nssValue"/>
            </div>

            <div class="col-md-auto mb-3">
                <label for="nationalite" class="form-label">Nationalité</label>
                <input type="text" class="form-control"  placeholder="Nationalité"  id="nationalite" name="Nationalite" v-model="nationaliteValue">
            </div>
        </div>

        <div class="fw-lighter mt-4 fs-7">
            * Champs obligatoire
        </div>
    </form>

</template>

<script>

export default {

    props:{
        nom: String,
        prenom: String,
        civilite: String,
        dn: String,
        lieuNaissance: String,
        nss: String,
        nationalite: String
    },

    emits: [
        'update:nom',
        'update:prenom',
        'update:civilite',
        'update:dn',
        'update:lieuNaissance',
        'update:nss',
        'update:nationalite'
    ],

    data() {
        return {
            nomValue: null,
            prenomValue: null,
            civiliteValue: null,
            dnValue: null,
            lieuNaissanceValue: null,
            nssValue: null,
            nationaliteValue: null
        }
    },

    watch: {
        /**
         * Envoie un événement à l'élément parent lorsque le nom est modifié.
         * 
         * @param {String} newVal Nouveau nom
         * 
         * @event update:nom
         */
        nomValue(newVal) {
            this.$emit('update:nom', newVal);
        },

        /**
         * Envoie un événement à l'élément parent lorsque le prénom est  modifiée.
         * 
         * @param {String} newVal Nouveau prénom
         * 
         * @event update:prenom
         */
        prenomValue(newVal) {
            this.$emit('update:prenom', newVal);
        },

        /**
         * Envoie un événement à l'élément parent lorsque la civilité est modifiée.
         * 
         * @param {String} newVal Nouvelle civilité
         * 
         * @event update:civilite
         */
        civiliteValue(newVal) {
            this.$emit('update:civilite', newVal);
        },

        /**
         * Envoie un événement à l'élément parent lorsque la date de naissance est  modifiée.
         * 
         * @param {String} newVal date de naissance
         * 
         * @event update:dn
         */
        dnValue(newVal) {
            this.$emit('update:dn', newVal);
        },

        /**
         * Envoie un événement à l'élément parent lorsque le lieu de naissance est  modifié.
         * 
         * @param {String} newVal Nouveau lieu de naissance
         * 
         * @event update:lieuNaissance
         */
        lieuNaissanceValue(newVal) {
            this.$emit('update:lieuNaissance', newVal);
        },

        /**
        * Envoie un événement à l'élément parent lorsque la nationalité est  modifiée.
        * 
        * @param {String} newVal Nouvelle nationalité
        * 
        * @event update:nationalite
        */
        nationaliteValue(newVal) {
            this.$emit('update:nationalite', newVal);
        },

        /**
         * Envoie un événement à l'élément parent lorsque le numéro de sécurité sociale est modifié.
         * 
         * @param {String} newVal Nouveau numéro de sécurité sociale
         * 
         * @event update:nss
         */
        nssValue(newVal) {
            this.$emit('update:nss', newVal);
        }
    },

    mounted(){
        this.nomValue = this.nom
        this.prenomValue = this.prenom
        this.civiliteValue = this.civilite
        this.dnValue = this.dn
        this.lieuNaissanceValue = this.lieuNaissance
        this.nationaliteValue = this.nationalite
        this.nssValue = this.nss      
    }
}
</script>