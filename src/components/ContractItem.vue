<template>
    <div v-if="openedElement">
        <!-- <div v-for="contratItem in contrat.contrats" :key="'contratItem-'+contratItem.id">
            <router-link :to="{name:'infoContrat', params:{id:openedElement.id, idContrat:openedElement.oContrat.id}}" v-slot="{navigate,href}" custom>
                <a :href="href" @click="navigate" class="list-group-item list-group-item-action d-flex justify-content-between mb-1">

                    <div v-if="contratItem.dsortie_reelle" class="d-flex flex-column align-items-start">
                        <div v-if="contratItem.id">{{contratItem.id}}</div>
                        <div class="text-muted">du {{entryDateFormat2}} au {{exitDateFormat2}}</div>
                        <div v-if="contratItem.oContrat.duree_indeterminee == 'OUI'">Contrat à durée indéterminée (X avenants)</div> 
                        <div v-else>Contrat à durée déterminée  avenants</div> 
                    </div>

                    <div v-else-if="contratItem.duree_indeterminee == 'OUI'" class="d-flex flex-column align-items-start">
                        <div v-if="contratItem.id">{{contratItem.id}}</div>
                        <div class="text-success">depuis le {{entryDateFormat2}}</div>
                        <div>Contrat à durée indéterminée  (X avenants)</div> 

                    </div>
                    <div v-else-if="contratItem.duree_indeterminee ='NON'" class="d-flex flex-column align-items-start" >
                        <div v-if="contratItem.id">{{contratItem.id}}</div>
                        <div class="text-success">du {{entryDateFormat2}} au {{exitDateFormat2}}</div>
                        <div>Contrat à durée déterminée (X avenants)</div> 
                    </div>
                    <div v-else>?</div>
                    
                    <div class="d-flex align-items-center">
                        <i class="bi bi-arrow-up-right"></i>
                    </div> -->
                    <!-- contractItem 
                                fonction du personnel ... a remplacer par qualification de contrat-->
                                <strong class="d-block">{{contratItem.id}}</strong>
                <!-- </a>
            </router-link> -->
        <!-- </div> -->
    </div>
</template>
<script>
import {mapState,} from 'vuex';
import date from 'date-and-time';
import fr from 'date-and-time/locale/fr';

export default{

    props: {
        contrats: Array
    }, 

    computed:{
        ...mapState(["openedElement"]),

        entrydate() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.dentree)  , 'DD-MM-YYYY')
		},
        /**
		 * modifie le format de la date reçue de l'API au format 10 janv. 2022
		 * @params	
		 */
		entryDateFormat2() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.dentree)  , 'DD MMM YYYY')
		}, 
		exitdate() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.dsortie)  , 'DD-MM-YYYY')
		},
		exitDateFormat2() {
			date.locale(fr);
			return date.format(new Date(this.openedElement.dsortie)  , 'DD MMM YYYY')
		},
		// exitDateReal(){
		// 	date.locale(fr);
		// 	return date.format(new Date(this.contracts.dsortie_reelle) , 'DD MM YYYY')
		// }

		/**
		 * dateFormat
		 * modifie le format de la date reçue en paramètre et la retourne 
		 * sous la forme 10 janv. 2022
		 * @param	{String}	date
		 */
		dateformatLit(day) {
			date.locale(fr);
			return date.format(new Date(day) , 'DD MMM YYYY')
		}
    }
}
</script>