<template>
    <div @click="showContract()" class="list-group-item list-group-item-action mb-1 border rounded-1 contrat-item" type="button">
        <div class="d-flex align-items-center justify-content-between">
            <div>
                <div class="d-flex align-items-center">
                    Contrat n°{{ contrat.id }}
            
                    <div class="badge text-bg-secondary ms-2">
                        <span v-if="contrat.duree_indeterminee === 'OUI'">CDI</span>
                        <span v-else>CDD</span>
                    </div>
                </div>

                <div class="fw-lighter">
                    <div v-if="CDIActif">
                        Depuis le {{ changeFormatDateLit(contrat.dentree) }}
                    </div>
    
                    <div v-else>
                        Du {{ changeFormatDateLit(contrat.dentree) }} au {{ changeFormatDateLit(sortieContrat) }}
                    </div>
                </div>
            </div>

            <div class="icon-display">
                <i class="bi bi-eye"></i>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .icon-display {
        display: none;
    }
    .contrat-item:hover .icon-display {
        display: block;
    }
</style>

<script>
import date from 'date-and-time';
import { mapState } from 'vuex';
import fr from 'date-and-time/locale/fr';

export default{
    props: {
        contrat: Object
    },

    computed: {
        ...mapState(['openedElement']),
        

        /**
         * Retourne la date de sortie exacte du contrat
         */
        sortieContrat() {
            if(this.contrat.dsortie_reelle) {
                return this.contrat.dsortie_reelle;
            }
                        
            return this.contrat.dsortie;
        },

        CDIActif() {
            if(this.contrat.duree_indeterminee === 'OUI' && !this.sortieContrat || this.contrat.duree_indeterminee === 'OUI' && this.sortieContrat == "0000-00-00 00:00:00") {
                return true;
            }

            return false;
        }
    },

    methods: {
        /**
		 * Modifie le format de la date entrée en paramètre et la retourne 
		 * sous le format 01 févr. 2021
		 * @param {string} date 
		 */

		changeFormatDateLit(el) {
            date.locale(fr);
			return date.format(new Date(el), 'DD MMM YYYY')
		},

        /**
         * Show the contrat selected
         */
        showContract() {
            this.$router.push({ name:'infoContrat', params:{id: this.openedElement.id, idContrat: this.contrat.id}})
        }

    }
}
</script>