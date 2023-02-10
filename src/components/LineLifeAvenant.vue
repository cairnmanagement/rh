<template>
    <div class="col-3">
        <button v-for="(avenant) in avenants" :key="'avenant-'+avenant.id" class="fs-7 timeline-el position-relative w-100 btn d-flex align-items-baseline justify-content-end" :class="checkSelected(avenant)" @click="selectAvenant(avenant)">
            <div :class="{'text-primary': avSelected.id == avenant.id}">{{ changeFormatDateLit(startContrat(avenant)) }}</div>
            <div class="dot" :class="{'dot-primary': avSelected.id == avenant.id}"></div>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.dot {
    width: 10px;
    height: 10px;
    background-color: #bbb;
    border-radius: 50%;
    z-index: 15;
    border:1px solid white;
}

.dot-success {
    background-color: rgb(25, 135, 84);
}

.dot-primary {
    background-color: rgb(13, 110, 253);
}

.timeline-el {
    border:0;
}

.timeline-el::after {
    display:block;
    position:absolute;
    content:'';
    top:16px;
    right:16px;
    bottom:-16px;
    border-left:2px solid black;
    z-index: 10;
}

.timeline-el:last-child::after {
    display:none;
}
</style>

<script>
import date from 'date-and-time';
//import fr from 'date-and-time/locale/fr';

export default {
    name: 'LineLifeAvenant',

    props: {
        avenants: Array,
        avSelected: Object
    },

    emits: ['update:avSelected'],

    methods: {
        /**
         * Check si l'avenant selection correspond a l'avenantId,
         * si oui lui return une class boostrap, sinon du text vide
         * 
         * @param {Number} avenantId l'id de l'avenant
         * 
         * @return {String}
         */
        checkSelected(avenantId) {
            if (this.avSelected) {
                if (avenantId == this.avSelected.id && this.avSelected)  {
                    return 'text-primary';
                }
            }
            
            return '';
        },

        /**
         * Renvoi le nouveau avenant selectionné
         * @param {Object} avenant 
         */
        selectAvenant(avenant) {
            this.$emit('update:avSelected', avenant);
        },

        /**
         * Modifie le format de la date entrée en paramètre et la retourne 
         * sous le format 01 févr. 2021
         * @param {string} date 
         */
        changeFormatDateLit(el) {
            return date.format(new Date(el), 'DD MMM YYYY')
        },

        /**
         * Retourne la date d'entrée exacte du contrat
         * 
         * @param {Object} avenant 
         * 
         * @return {DateTime}
         */
         startContrat(avenant) {
            if (avenant.dentree_relative && avenant.dentree_relative != "0000-00-00 00:00:00") {
                return avenant.dentree_relative;
            }

            return avenant.dentree;
        },
    }
}
</script>

