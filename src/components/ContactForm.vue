<template>
    <div class="row g-2">
        <div class="col-2 mb-3">
            <label for="personne_civilite" class="form-label">Civilité</label>
            <select class="form-select" id="personne_civilite" name="civilite" v-model="personnel.civilite">
                <option value="Mr">Monsieur</option>
                <option value="Mme">Madame</option>
                <option value="Melle">Mademoiselle</option>
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
        <div class="col mb-3">
            <label for="pays_naissance" class="form-label">Pays de naissance</label>
            <input type="text" class="form-control"  placeholder="Pays"  id="pays_naissance" name="paysNaissance" v-model="personnel.paysNaissance">
        </div>
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
</template>

<script>
import { mapState } from 'vuex';

    export default {
        
    
        data() {
            return {
                personnel: {
                    civilite: null,
                    nom: null,
                    prenom: null,
                    dn: null,
                    lieuNaissance: null,
                    nss: null,
                    nationalite: null,
                    PaysNaissance : null
                },
            }
        },
        computed: {

            ...mapState(["openedElement"]),

            newContact(){
                if (this.$route.params.id) {
                    return false;
                }
                
                return true
                
            }

        },
    
        mounted(){
            if (!this.newContact) {
                this.personnel.civilite = this.openedElement.oPersonne.civilite
                this.personnel.nom = this.openedElement.oPersonne.nom
                this.personnel.prenom = this.openedElement.oPersonne.prenom
                this.personnel.dn = this.openedElement.oPersonne.dn
                this.personnel.lieuNaissance = this.openedElement.oPersonne.lieuNaissance
                this.personnel.nss = this.openedElement.nss
                this.personnel.nationalite = this.openedElement.oPersonne.nationalite
                this.personnel.paysNaissance = 'à prévoir API'
            }
        }
    }
    </script>