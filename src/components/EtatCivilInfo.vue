<template>

    <div>
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <h3 class="card-title m-0">Etat-civil</h3>

                <router-link :to="{name:'ModificationEtatCivil', params:{id:openedElement.id}}" v-slot="{navigate,href}" custom>
                    <a :href="href" @click="navigate" class="btn btn-light">
                        <i class="bi bi-pencil"></i>
                    </a>
                </router-link>
            </div>
        </div>

        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex align-items-center justify-content-between">
                <span>Nom complet:</span>
                <span>{{openedElement.oPersonne.civilite}} {{openedElement.cache_nom}}</span>
            </li>

            <li class="list-group-item d-flex align-items-center justify-content-between">
                <span>né(e) le:</span>
                <span>{{dateOfBirth}}</span> 
            </li>

            <li class="list-group-item d-flex align-items-center justify-content-between">
                <span>Lieu de naissance:</span>
                <span>{{openedElement.oPersonne.lieuNaissance}}</span> 
            </li>
            
            <li class="list-group-item d-flex align-items-center justify-content-between">
                <span>Nationalité:</span>
                <span>{{openedElement.oPersonne.nationalite}}</span> 
            </li>

            <li class="list-group-item d-flex align-items-center justify-content-between">
                <span>N° de sécurité sociale:</span>
                <span>{{openedElement.nss}}</span> 
            </li>
        </ul>
    </div>

</template>

<script>

import { mapState } from 'vuex';
import date from 'date-and-time';

export default{

    computed: {
        ...mapState(["openedElement"]),
        
        /**
         * Retourne la date de naissance formatée au format DD MMM YYYY
         */
        dateOfBirth() {
			return date.format(new Date(this.openedElement.oPersonne.dn) , 'DD MMM YYYY');
		},
    }
    
}

</script>
