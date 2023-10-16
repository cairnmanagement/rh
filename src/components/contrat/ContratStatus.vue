<template>
    <div :class="className"><i :class="icon"></i> {{ statusLabel }}</div>
</template>

<script>

import { getDisplayFormatedDate, getValue as getDateValue } from "../../js/date";
import { isActive as isContratActive } from "../../js/contrat";

export default {
    props: {
        contrat: Object
    },

    data() {
        return {
            contratType: null,
            statusLabel: null,
            className: null,
            icon: null
        }
    },

    watch: {
        contrat() {
            this.refresh();
        }
    },

    computed: {
        /**
         * Retourne la date d'entrée exacte du contrat
         * 
         * @return {DateTime}
         */
        date_start() {
            if (!this.contrat) {
                return null;
            }

            return this.contrat.dentree;
        },

        /**
         * Retourne la date de sortie exacte du contrat
         * 
         * @return {DateTime}
         */
        date_end() {
            if (!this.contrat) {
                return null;
            }

            const d = this.getDateValue(this.contrat.dsortie_reelle);
            return d ? d : this.contrat.dsortie;
        },
    },

    methods: {
        /**
         * Rafraichie les informations du composant.
         */
        async refresh() {
            await this.refreshType();
            this.refreshStatusLabel();
            this.refreshClassName();
            this.refreshIcon();
        },

        /**
         * Rafraichie les informations du type de contrat
         */
        async refreshType() {
            if (!this.contrat) {
                return null;
            }

            let collection = this.$assets.getCollection('contratTypes');

            this.contratType = null;

            if (this.contrat.type_id) {
                this.contratType = await collection.getById(this.contrat.type_id);
            }
        },

        /**
         * Retourne la valeur d'une date SQL ou NULL dans les cas suivants :
         * - La valeur est null
         * - La valeur est vide ou 0
         * - La valeur est 0000-00-00 00:00:00
         * 
         * @param {string} value
         * 
         * @return {string}
         */
        getDateValue(value) {
            return getDateValue(value);
        },

        /**
         * Formate la date pour l'affichage
         * 
         * @param {string}
         * 
         * @returns {string}
         */
        formatDate(date) {
            return getDisplayFormatedDate(date);
        },

        /**
         * Met à jour le libellé de status du contrat
         * 
         * @return {string}
         */
        refreshStatusLabel() {
            if (!this.contrat) {
                this.statusLabel = "Cette personne n'a jamais fait partie des effectifs de la société";
                return;
            }

            let label = this.contratType ? this.contratType.label : "Type de contrat non-définit";

            if (this.getDateValue(this.date_end)) {
                label += " jusqu'au "+this.formatDate(this.date_end);
            }
            else {
                label += " depuis le "+this.formatDate(this.date_start);
            }

            this.statusLabel = label;
        },

        /**
         * Rafraichie la classe CSS en fonction du statut du contrat
         */
        refreshClassName() {
            if (!this.contrat) {
                this.className = 'text-muted';
                return;
            }

            this.className = isContratActive(this.contrat) ? "text-success" : "text-secondary";
        },

        /**
         * Rafraichie les icons
         */
        refreshIcon() {
            this.icon = this.contrat ? "bi bi-file-earmark-medical" : "bi bi-file-x"
        }
    },

    beforeMount() {
        this.refresh();
    }
}

</script>
