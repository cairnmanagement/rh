<template>
    <button @click="showContract()" class="list-group-item list-group-item-action mb-1 border rounded-1 contrat-item" type="button">
        <div class="d-flex align-items-center justify-content-between">
            <div>
                <div class="d-flex align-items-center" :class="className">
                    <span>Contrat n°{{ contrat.id }}</span>
                    <span class="badge text-bg-light border rounded-pill ms-2" :class="statusBadgeClassName">{{ statusLabel }}</span>
                </div>

                <div class="d-flex align-items-center">
                    <progress-awaiting v-if="pending.type" size="50" />
                    <span v-else>{{ typeLabel }}</span>
                    <span class="ms-1 fw-lighter">{{ dateLabel }}</span>
                </div>
            </div>

            <div class="icon-display">
                <i class="bi bi-eye"></i>
            </div>
        </div>
    </button>
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

import { mapState } from 'vuex';

import { isActive as isContratActive, getSelfDateStart as getContratDateStart, getSelfDateEnd as getContratDateEnd, getDisplayFormatedDateRange } from '../../js/contrat';
import { getDisplayFormatedDate } from '../../js/date';
import ProgressAwaiting from '../pebble-ui/loader/ProgressAwaiting.vue';

export default {
    props: {
        contrat: Object,
        type: Promise
    },

    data() {
        return {
            fullfiledType: null,
            pending: {
                type: true
            }
        }
    },

    components: { ProgressAwaiting },

    computed: {
        ...mapState(['openedPersonnel']),

        /**
         * retourne la nom de la classe a appliqué si contrat actif
         * 
         * @return {string}
         */
        className() {
            return this.isActive ? 'text-success' : '';
        },

        /**
         * retourne le nom de la classe badge a appliqué si contrat actif
         * 
         * @return {string}
         */
        statusBadgeClassName() {
            return this.isActive ? 'text-success border-success' : 'text-muted border-muted';
        },

        /**
         * Retyourne le libellé actif ou inactif pour le contrat en cours
         * 
         * @return {string}
         */
        statusLabel() {
            return this.isActive ? 'Actif' : 'Inactif';
        }, 

        /**
         * Retourne la date de sortie exacte du contrat
         */
        dateEnd() {
            return getContratDateEnd(this.contrat);
        },

        /**
         * Retourne la date d'entrée exacte du contrat
         * 
         * @return {DateTime}
         */
        dateStart() {
            return getContratDateStart(this.contrat, { fromFirst : true });
        },

        /**
         * check si le contrat est actif ou non
         * 
         * @return {Boolean}
         */
        isActive() {
            return isContratActive(this.contrat);
        },

        /**
         * Retourne une chaine de caractère exprimant la période du contrat
         * 
         * @return {string}
         */
        dateLabel() {
            return getDisplayFormatedDateRange(this.contrat);
        },

        /**
         * Retourne le libellé du type de contrat
         * 
         * @return {string}
         */
        typeLabel() {
            return this.fullfiledType ? this.fullfiledType.label : "Type non-définit";
        }
    },

    methods: {
        /**
		 * Modifie le format de la date entrée en paramètre et la retourne sous le format 01 févr. 2021
         * 
		 * @param {string|Date} val 
		 */
		formatDate(val) {
			return getDisplayFormatedDate(val)
		},

        /**
         * Appel la route de consultation du contrat
         */
        showContract() {
            this.$router.push({ name:'infoContrat', params:{id: this.openedPersonnel.id, idContrat: this.contrat.id}})
        }

    },

    mounted() {
        this.type.then(val => {
            this.fullfiledType = val;
        }).finally(() => this.pending.type = false);
    }
}
</script>