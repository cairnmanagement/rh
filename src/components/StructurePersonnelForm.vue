<template>
    <div class="card" v-if="personnel">
        <div class="card-body">  
            <h2 class="mb-3">Nouveau collaborateur</h2>

            <div class="row g-2">
                <div class="col-3">
                    <label for="personne_civilite" class="form-label">Civilité</label>
                    <select class="form-select" id="personne_civilite" name="civilite" v-model="personnel.oPersonne.civilite">
                        <option value="Mr">Monsieur</option>
                        <option value="Mme">Madame</option>
                        <option value="Melle">Mademoiselle</option>
                    </select>						
                </div>
                <div class="col mb-3">
                    <label for="personne_nom" class="form-label">Nom</label>
                    <input type="text" class="form-control" id="personne_nom" name="nom" v-model="personnel.oPersonne.nom">
                </div>
                <div class="col mb-3">
                    <label for="personne_prenom" class="form-label">Prénom</label>
                    <input type="text" class="form-control" id="personne_prenom" name="prenom" v-model="personnel.oPersonne.prenom">
                </div>
            </div>
            <div class="row g-2">
                <div class="col-auto mb-3">
                    <label for="date_naissance" class="form-label">Né(e) le</label>
                    <input type="date" class="form-control" id="date_naissance" name="dn" v-model="personnel.oPersonne.dn">
                </div>
                <div class="col mb-3">
                    <label for="lieu_naissance" class="form-label">Lieu de naissance</label>
                    <input type="text" class="form-control"  placeholder="Localité"  id="lieu_naissance" name="lieuNaissance" v-model="personnel.oPersonne.lieuNaissance">
                </div>
            </div>
            <div class="row g-2">
                <div class="col mb-3">
                    <label for="telephone_1" class="form-label">Téléphone</label>
                    <input type="tel" class="form-control" id="telephone_1" name="tel1_numero" v-model="personnel.oPersonne.tel1.numero">
                </div>
                <div class="col mb-3">
                    <label for="mail_1" class="form-label">Adresse mail</label>
                    <input type="email" class="form-control" id="mail_1" name="mail_adresse" v-model="personnel.oPersonne.mail1.adresse">
                </div>
            </div>
            <div class="row g-2 mb-3">
                    <label for="numeroSecu" class="form-label">Numéro de sécurité sociale</label>
                    <input type="number" class="form-control" id="numeroSecu" name="nss" v-model="personnel.nss">
                </div>
            <h3 class="mt-2">Adresse postale</h3>
            <div class="row g-2">
                <div class="col-2 mb-3">
                    <label for="voie_numero" class="form-label">n°</label>
                    <input type="number" class="form-control" id="voie_numero" name="voieNumero" v-model="personnel.oPersonne.adresse.voieNumero">
                </div>
                <div class="col mb-3">
                    <label for="voie" class="form-label">voie</label>
                    <input type="text" class="form-control" id="voie_nom" name="voie" v-model="personnel.oPersonne.adresse.voie">
                </div>
            </div>
            <div class="row g-2">
                <div class="col-3 mb-3">
                    <label for="code_postal" class="form-label">code postal</label>
                    <input type="number" class="form-control" id="code_postal" name="cp" v-model="personnel.oPersonne.adresse.cp">
                </div>
                <div class="col mb-3">
                    <label for="localite" class="form-label">Localité</label>
                    <input type="text" class="form-control" id="localite" name="localite" v-model="personnel.oPersonne.adresse.localite">
                </div>
            </div> 
            <hr>
            <div class="row g-2 m-2 d-flex justify-content-end">
                <a type="button" href="#" class="btn btn-lg btn-primary col-5 col-md-3 col-lg-2">Valider</a>  
            </div>			
        </div>
    </div>
</template>

<script>
export default {
    props: {
        structure_personnel: {
            type: Object,
            default() {
                return {
                    oPersonne: {
                        adresse: {},
                        tel1: {},
                        mail1: {}
                    }
                }
            }
        }
    },

    data() {
        return {
            personnel: null
        }
    },

    beforeMount() {
        this.personnel = this.structure_personnel;
    }
}
</script>