<template>
    <div @click="showContract()" class="list-group-item list-group-item-action mb-1 border rounded-1 contrat-item" type="button">
        <div class="d-flex align-items-center justify-content-between">
            <div>
                <div class="d-flex align-items-center" :class="classNumContrat">
                    Contrat n°{{ contrat.id }}
            
                    <div class="badge text-bg-secondary ms-2" :class="classBadgeTypeContrat">
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
         * retourne la nom de la classe a appliqué si contrat actif
         * 
         * @return {string}
         */
        classNumContrat() {
            if (this.contratActif) {
                return 'text-success';
            }

            return '';
        },

        /**
         * retourne le nom de la classe badge a appliqué si contrat actif
         * 
         * @return {string}
         */
        classBadgeTypeContrat() {
            if (this.contratActif) {
                return 'text-bg-success';
            }

            return 'text-bg-secondary';
        },
        

        /**
         * Retourne la date de sortie exacte du contrat
         */
        sortieContrat() {
            if(this.contrat.dsortie_reelle) {
                return this.contrat.dsortie_reelle;
            }
                        
            return this.contrat.dsortie;
        },

        /**
         * Retourne la date d'entrée exacte du contrat
         * 
         * @return {DateTime}
         */
         startContrat() {
            if (this.contrat.dentree_relative && this.contrat.dentree_relative != "0000-00-00 00:00:00") {
                return this.contrat.dentree_relative;
            }

            return this.contrat.dentree;
        },

        /**
         * Check su le CDI est actif ou non
         * 
         * @return {boolean}
         */
        CDIActif() {
            if(this.contrat.duree_indeterminee === 'OUI' && !this.sortieContrat || this.contrat.duree_indeterminee === 'OUI' && this.sortieContrat == "0000-00-00 00:00:00") {
                return true;
            }

            return false;
        },

        /**
         * check si le contrat est actif ou non
         * 
         * @return {Boolean}
         */
        contratActif() {
            let today = new Date().getTime();
            let start = new Date(this.startContrat).getTime();
            let end = new Date(this.sortieContrat).getTime();

            if(this.CDIActif && today > start || today < end && today > start) {
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

    },
}
</script>