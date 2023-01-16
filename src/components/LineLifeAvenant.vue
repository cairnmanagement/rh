<template>
    <div class="col-3">
        <div v-for="(avenant, i) in avenants" :key="'avenant-'+avenant.id" class="fs-7" :class="checkSelected(avenant)" @click="selectAvenant(avenant)">
            <div v-if="'0' != i" class="border-end border-dark border-4" style="height:10px;"></div>
            <div type="button" class="d-flex align-items-center justify-content-end">
                <div :class="{'text-success': avSelected.id == avenant.id}">{{ changeFormatDateLit(avenant.dentree_relative) }}</div>
                <div class="dot onTheLine" :class="{'dot-success': avSelected.id == avenant.id}"></div>
            </div>
            <div class="border-end border-dark border-4" style="height:10px;"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dot {
    width: 10px;
    height: 10px;
    background-color: #bbb;
    border-radius: 50%;
}

.dot-success {
    width: 10px;
    height: 10px;
    background-color: rgb(25, 135, 84);
    border-radius: 50%;
}

.onTheLine {
    position: relative;
    left: 3px;
}
</style>

<script>
import date from 'date-and-time';
import fr from 'date-and-time/locale/fr';

export default {
    name: 'LineLifeAvenant',

    emits: ['update:avSelected'],

    props: {
        avenants: Array,
        avSelected: Object
    },

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
                    return 'text-success';
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
            date.locale(fr);
            return date.format(new Date(el), 'DD MMM YYYY')
        },
    }
}
</script>

