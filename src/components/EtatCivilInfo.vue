<template>
    <div>
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <h4 class="card-title m-0">Etat-civil</h4>
                <router-link :to="{name:'ModificationEtatCivil', params:{id:openedElement.id}}" v-slot="{navigate,href}" custom>
                    <!-- personelEdit -->
                    <a :href="href" @click="navigate" class="btn btn-light"><i class="bi bi-pencil"></i></a>
                </router-link>
            </div>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div class="d-flex align-items-center justify-content-between">
                    <span>Nom complet:</span><span>{{openedElement.oPersonne.civilite}} {{openedElement.oPersonne.prenom}} {{openedElement.oPersonne.nom}}</span>
                </div>
            </li>
            <li class="list-group-item">
                <div class="d-flex align-items-center justify-content-between">
                    <span>né(e) le:</span><span>{{dateOfBirth}}</span> 
                </div>
            </li>
            <li class="list-group-item">
                <div class="d-flex align-items-center justify-content-between">
                    <span>Lieu de naissance:</span><span>{{openedElement.oPersonne.lieuNaissance}}</span> 
                </div>
            </li>
            
            <li class="list-group-item">
                <div class="d-flex align-items-center justify-content-between">
                    <span>Nationalité:</span><span>{{openedElement.oPersonne.nationalite}}</span> 
                </div>
            </li>
            <li class="list-group-item">
                <div class="d-flex align-items-center justify-content-between">
                    <span>N° de sécurité sociale:</span><span>{{openedElement.nss}}</span> 
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import date from 'date-and-time';
import fr from 'date-and-time/locale/fr';



export default{

    computed: {
        ...mapState(["openedElement"]),
        

        dateOfBirth() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.oPersonne.dn)  , 'DD MMM YYYY')
		},
    }
    
}
</script>
