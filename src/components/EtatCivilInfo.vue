<template>

    <div>
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <h3 class="card-title m-0">Etat-civil</h3>

                <router-link :to="{name:'ModificationEtatCivil', params:{id:openedPersonnel.id}}" v-slot="{navigate,href}" custom>
                    <a :href="href" @click="navigate" class="btn button-etat-civil">
                        <i class="bi bi-pencil"></i>
                    </a>
                </router-link>
            </div>
        </div>

        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex align-items-center justify-content-between">
                <span>Nom complet:</span>
                <span>{{ openedPersonnel.oPersonne.civilite }} {{ openedPersonnel.cache_nom }}</span>
            </li>

            <li class="list-group-item d-flex align-items-center justify-content-between" v-if="dateOfBirth">
                <span>{{ birthLabel }}:</span>
                <span>{{ dateOfBirth }}</span> 
            </li>

            <li class="list-group-item d-flex align-items-center justify-content-between" v-if="openedPersonnel.oPersonne.lieuNaissance">
                <span>Lieu de naissance:</span>
                <span>{{ openedPersonnel.oPersonne.lieuNaissance }}</span> 
            </li>
            
            <li class="list-group-item d-flex align-items-center justify-content-between" v-if="openedPersonnel.oPersonne.nationalite">
                <span>Nationalité:</span>
                <span>{{ openedPersonnel.oPersonne.nationalite }}</span> 
            </li>

            <li class="list-group-item d-flex align-items-center justify-content-between" v-if="openedPersonnel.nss">
                <span>N° de sécurité sociale:</span>
                <span>{{ openedPersonnel.nss }}</span> 
            </li>
        </ul>
    </div>

</template>

<style lang="scss" scoped>
@import 'bootstrap';

.button-etat-civil{
    @extend .btn-light;

    &:hover {
        @extend .btn-success;
    }
}
</style>

<script>

import { mapState } from 'vuex';

import { getDisplayFormatedDate, getValue as getDateValue } from '../js/date';

export default{

    computed: {
        ...mapState(["openedPersonnel"]),
        
        /**
         * Retourne la date de naissance formatée au format DD MMM YYYY
         */
        dateOfBirth() {
			return getDateValue(this.openedPersonnel.oPersonne.dn) ? getDisplayFormatedDate(this.openedPersonnel.oPersonne.dn) : null;
		},

        /**
         * Retourne le libellé de la date de naissance en fonction du genre
         * Né, Née ou Né(e)
         * 
         * @return {string}
         */
        birthLabel() {
            let civilite = this.openedPersonnel.oPersonne.civilite ? this.openedPersonnel.oPersonne.civilite.toLowerCase() : null;
            if (['mme', 'mlle'].includes(civilite)) return 'Née le';
            else if (['mr', 'm', 'm.'].includes(civilite)) return 'Né le';
            return 'Né(e) le'
        }
    }
    
}

</script>
