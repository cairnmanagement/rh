<template>
    <div class="timeline d-flex flex-column align-items-end">
        <button class="timeline-button" v-for="contrat in contrats" :key="contrat.id" :class="buttonWrapperClassName(contrat)" @click.prevent="select(contrat)">
            <span class="btn btn-primary btn-sm timeline-date" :class="buttonClassName(contrat)">{{ getStartDate(contrat) }}</span>
        </button>
    </div>
</template>

<style lang="scss" scoped>

.timeline-button {
    background-color:transparent;
    border:0;
    padding:0px;
    margin:0px;
    padding-right:15px;
    padding-top:8px;
    padding-bottom:8px;
    position: relative;
}

.timeline-button::before {
    display:block;
    content: '';
    position:absolute;
    right:5px;
    top:0px;
    bottom:0px;
    border-right: 2px solid #d3d4d5;
    transition: border-color .15s;
}

.timeline-button:hover::before {
    border-color: #c6c7c8;
}

.timeline-button.active::before {
    border-color:#0d6efd;
}

.timeline-button.active:hover::before {
    border-color:#0b5ed7;
}

.timeline-button.active.contrat-actif::before {
    border-color:#198754;
}

.timeline-button.active.contrat-actif:hover::before {
    border-color: #157347;
}

.timeline-button::after {
    display: block;
    position:absolute;
    right:0px;
    top:50%;
    border-radius: 50%;
    margin-top:-6px;
    width:12px;
    height:12px;
    content:'';
    background-color:#d3d4d5;
    border: 2px solid white;
    transition: background-color .15s;
}

.timeline-button.active::after {
    background-color:#0d6efd;
    border:1px solid white;
}

.timeline-button:hover::after {
    background-color: #c6c7c8;
}

.timeline-button.active:hover::after {
    background-color: #0b5ed7;
}

.timeline-button.active.contrat-actif::after {
    background-color:#198754;
    border:1px solid white;
}

.timeline-button.active:hover::after {
    background-color: #157347;
}

</style>

<script>

import { isActive } from '../../js/contrat';
import { getDisplayFormatedDate } from '../../js/date';

export default {

    props: {
        contrats: Array,
        selected: Object
    },

    emits: ['selection-change'],

    methods: {
        /**
         * Retourne la classe CSS du wrapper du bouton en fonction de l'état de sélection d'un contrat
         * 
         * @param {object} contrat Le contrat à analyser
         * 
         * @return {string}
         */
        buttonWrapperClassName(contrat) {
            let classList = contrat.id == this.selected.id ? 'active' : '';
            if (isActive(contrat)) {
                classList += ' contrat-actif';
            }
            return classList;
        },

        /**
         * Retourne la classe CSS du bouton en fonction de l'état de sélection d'un contrat
         * 
         * @param {object} contrat Le contrat à analyser
         * 
         * @return {string}
         */
        buttonClassName(contrat) {
            let classList;
            if (isActive(contrat)) {
                classList = contrat.id == this.selected.id ? 'btn-success' : 'btn-light border-success text-success';
            }
            else {
                classList = contrat.id == this.selected.id ? 'btn-primary' : 'btn-light';
            }

            return classList;
        },

        /**
         * Change le contrat sélectionné dans la liste
         * 
         * @param {object} contrat Le contrat à sélectionner
         */
        select(contrat) {
            this.$emit('selection-change', contrat);
        },

        getStartDate(contrat) {
            let date = contrat.dentree_relative ? contrat.dentree_relative : contrat.dentree;
            return getDisplayFormatedDate(date);
        }
    }
}
</script>

