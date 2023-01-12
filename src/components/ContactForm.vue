<template>
    <div>
        <form action="">
            <div class="row g-2">
                <div class="col-2 mb-3">
                    <label for="personne_civilite" class="form-label">Civilité</label>
                    <select class="form-select" id="personne_civilite" name="civilite" v-model="personnel.civilite">
                        <option value="Mr">Monsieur</option>
                        <option value="Mme">Madame</option>
                        <!-- <option value="Melle">Mademoiselle</option> -->
                    </select>						
                </div>
                <div class="col mb-3">
                    <label for="personne_nom" class="form-label">Nom</label>
                    <input type="text" class="form-control" id="personne_nom" name="nom" placeholder="" v-model="personnel.nom">
                </div>
                <div class="col mb-3">
                    <label for="personne_prenom" class="form-label">Prénom</label>
                    <input type="text" class="form-control" id="personne_prenom" name="prenom" v-model="personnel.prenom">
                </div>
            </div>
            <div class="row g-2">
                <div class="col-auto mb-3">
                    <label for="date_naissance" class="form-label">Né(e) le</label>
                    <input type="date" class="form-control" id="date_naissance" name="dn" v-model="personnel.dn">
                </div>
                <div class="col mb-3">
                    <label for="lieu_naissance" class="form-label">Ville de naissance</label>
                    <input type="text" class="form-control"  placeholder="Ville"  id="lieu_naissance" name="lieuNaissance" v-model="personnel.lieuNaissance">
                </div>
                <!-- <div class="col mb-3">
                    <label for="pays_naissance" class="form-label">Pays de naissance</label>
                    <input type="text" class="form-control text-warning"  placeholder="Pays"  id="pays_naissance" name="paysNaissance" v-model="personnel.paysNaissance">
                </div> -->
            </div>
            <div class="row g-2">
                <div class="col mb-3">
                    <label for="numeroSecu" class="form-label">Numéro de sécurité sociale</label>
                    <input type="text" class="form-control" id="numeroSecu" name="nss" v-model="personnel.nss"/>
                </div>
                <div class="col-4 mb-3">
                    <label for="nationalite" class="form-label">Nationalité</label>
                    <input type="text" class="form-control"  placeholder="Nationalité"  id="nationalite" name="Nationalite" v-model="personnel.nationalite">
                </div>
            </div>
        </form>
    </div>		
</template>

<script>
import { mapState } from 'vuex';

    export default {

        props:{
            contact: Object
        },
        
    
        data() {
            return {
                personnel: {
                    nom: null,
                    prenom: null,
                    //nomNaissance: null,
                    civilite: null,
                    dn: null,
                    lieuNaissance: null,
                    nss: null,
                    nationalite: null,
                    // paysNaissance : null
                },
            }
        },
        computed: {

            ...mapState(["openedElement"]),

            // newContact(){
            //     if (this.$route.params.id) {
            //         return false;
            //     }
            //     return true
            // }

        },

        emits:['edit-nom', 'edit-prenom','edit-civilite','edit-dn','edit-lieuNaissance','edit-nationalite', 'edit-nss'],

        watch: {
            /**
             * Envoie un événement à l'élément parent lorsque le nom est modifié.
             * 
             * @param {String} newVal Nouveau nom
             */
            nom(newVal) {
                this.$emit('edit-nom', newVal);
            },

            /**
             * Envoie un événement à l'élément parent lorsque le prénom est  modifiée.
             * 
             * @param {String} newVal Nouveau prénom
             */
            prenom(newVal) {
                this.$emit('edit-prenom', newVal);
            },
            /**
             * Envoie un événement à l'élément parent lorsque la civilité est modifiée.
             * 
             * @param {String} newVal Nouvelle civilité
             */
            civilite(newVal) {
                this.$emit('edit-civilite', newVal);
            },
            /**
             * Envoie un événement à l'élément parent lorsque la date de naissance est  modifiée.
             * 
             * @param {String} newVal date de naissance
             */
            dn(newVal) {
                this.$emit('edit-dn', newVal);
            },
            /**
             * Envoie un événement à l'élément parent lorsque le lieu de naissance est  modifié.
             * 
             * @param {String} newVal Nouveau lieu de naissance
             */
            lieuNaissance(newVal) {
                this.$emit('edit-lieuNaissance', newVal);
            },
            /**
            * Envoie un événement à l'élément parent lorsque la nationalité est  modifiée.
            * 
            * @param {String} newVal Nouvelle nationalité
            */
            nationalite(newVal) {
                this.$emit('edit-nationalite', newVal);
            },
            /**
             * Envoie un événement à l'élément parent lorsque le numéro de sécurité sociale est modifié.
             * 
             * @param {String} newVal Nouveau numéro de sécurité sociale
             */
            nss(newVal) {
                this.$emit('edit-nss', newVal);
            }
        },
    
        mounted(){
            // if (!this.newContact) {
            //     this.personnel.nom = this.openedElement.oPersonne.nom
            //     this.personnel.prenom = this.openedElement.oPersonne.prenom
            //     // this.personnel.paysNaissance = 'à prévoir API'
            // }
            this.personnel.nom = this.contact.nom
            this.personnel.prenom = this.contact.prenom
            this.personnel.civilite = this.contact.civilite
            this.personnel.dn = this.contact.dn
            this.personnel.lieuNaissance = this.contact.lieuNaissance
            this.personnel.nationalite = this.contact.nationalite
            this.personnel.nss = this.contact.nss      
        }
    }
    </script>