<template>
    <div>
        {{ contrat.verrou }}
    </div>
    <div>
        {{ contrat.notified }}
    </div>
    <div>
        {{ contrat.opened }}
    </div>
    <div>
        
    </div>
    <div>
        {{ contrat.statut_id }}
    </div>

    <table class="table rounded table-sm border">
        <thead>
            <tr>
                <th>Classe</th>
                <th>Cotation</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>{{ contrat.classe }}</td>
                <td>{{ contrat.cotation }}</td>
            </tr>
        </tbody>
    </table>

    <table class="table rounded border table-sm">
        <thead>
            <tr>
                <th>Niveau</th>
                <th>Position</th>
                <th>Coeficient</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ contrat.niveau_id }}</td>
                <td>{{ contrat.position_id }}</td>
                <td>{{ contrat.coeficient_id }}</td>
            </tr>
        </tbody>
    </table>
    <div>
        {{ contrat.motif_fin_id }}
    </div>
    <div>
        <span :class="contratClassName">
            <i class="bi me-1" :class="startDateIcon"></i>
            Avenant du {{ dateStartDisplay }}
        </span>

        <span class="text-secondary">
            <i class="bi bi-chevron-right mx-2"></i>
            <i class="bi me-1" :class="endDateIcon" v-if="endDateIcon"></i>
            {{ labelDateEnd }}
        </span>
    </div>

    <div class="badge text-bg-secondary rounded-pill">
        {{ contrat.type_id }}
    </div>

    
    <div :class="testPeriodClassName" class="my-2">
        <em>{{ testPeriodLabel }}</em>
    </div>

    <div class="d-flex flex-column my-4">
        <span>Salaire horaire:</span>

        
        <strong v-if="contrat.salaire_horaire">
            {{contrat.salaire_horaire}}€ 
        </strong>

        <span v-else class="text-secondary">
            Non renseigné
        </span>
    </div>

    <div class="d-flex flex-column my-4" v-if="contrat.pourcentage_temps_partiel">
        <span>Temps de travail(%):</span>

        <strong>
            {{contrat.pourcentage_temps_partiel}} %
        </strong>    
    </div>

    <div v-if="contrat.forfait_jour === 'OUI'">
        <span>Contrat au forfait jour:</span>
        
        <table class="table table-bordered table-sm">
            <thead class="table-light">
                <tr class="text-center">
                    <th class="text-left">unités/semaine</th>
                    <th class="text-left">unités/mois</th>
                    <th class="text-left">unités/an</th>
                </tr>
            </thead>

            <tbody>
                <tr class="text-end">
                    <td>{{contrat.nb_par_semaine}}</td>
                    <td>{{contrat.nb_par_mois}}</td>
                    <td>{{contrat.nb_par_an}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import date from 'date-and-time';
import { getSelfDateEnd, getSelfDateStart, isActive, testPeriodRemaningDays } from '../../js/contrat';
import { pluralize } from '../../js/string';
import { getDisplayFormatedDate } from '../../js/date';

export default {
    name: 'avenantResume',

    props: {
        contrat: Object
    },

    computed: {
        /**
         * Retourne la date d'entrée exacte du contrat
         * 
         * @return {string}
         */
        dateStartDisplay() {
            return getDisplayFormatedDate(getSelfDateStart(this.contrat));
        },

        /**
         * Retourne la date de sortie exacte du contrat
         * 
         * @return {string}
         */
        dateEndDisplay() {
            return getDisplayFormatedDate(getSelfDateEnd(this.contrat));
        },

        /**
         * retourne la nom de la classe a appliqué si contrat actif
         * 
         * @return {string}
         */
        contratClassName() {
            return isActive(this.contrat) ? 'text-success' : '';
        },

        /**
         * Retourne l'icon de début de contrat.
         * 
         * - Si le contrat est actif, icon check
         * - Si le contrat est inactif, icon programmé
         * 
         * @return {string}
         */
        startDateIcon() {
            return isActive(this.contrat) ? 'bi-calendar-check' : 'bi-calendar-event'; 
        },

        /**
         * Retourne l'icon de fin de contrat ou null
         * 
         * @returns {string}
         */
        endDateIcon() {
            return getSelfDateEnd(this.contrat) ? 'bi bi-calendar-x' : null;
        },

        /**
         * Retourne un libellé pour la date de fin en fonction du contexte
         * 
         * - Sans date de fin
         * - Termine le...
         * - Terminé le...
         */
        labelDateEnd() {
            let dateEnd = getSelfDateEnd(this.contrat);

            if (!dateEnd) {
                return "Sans date de fin";
            }

            let now = new Date();
            let diff = now - dateEnd;
            let word = diff > 0 ? 'Terminé' : 'Termine';

            return word+" le "+this.dateEndDisplay;
        },

        /**
         * Retourne le libellé de la période d'essai
         * 
         * Le libellé correspond au différenciel entre la date de début de l'avenant et
         * le nb de jour de la période d'essai.
         * 
         * @return {string}
         */
        testPeriodLabel() {
            let testDays = this.contrat.periode_essai;

            if (!testDays) {
                return null;
            }
            
            let diffDays = testPeriodRemaningDays(this.contrat);

            return diffDays > 0 ? "Reste "+diffDays+" "+pluralize('jour', diffDays)+" sur "+testDays+" de période d'essai" : "Période d'essai terminée ("+testDays+" "+pluralize('jour', testDays)+")";
        },

        /**
         * Retourne une classe pour la période d'essai
         * 
         * Si la période d'essai est terminée, le texte passe en secondary
         * 
         * @return {string}
         */
        testPeriodClassName() {
            return testPeriodRemaningDays(this.contrat) > 0 ? '' : 'text-secondary';
        }

    },

    methods: {


        /**
         * Modifie le format de la date entrée en paramètre et la retourne 
         * sous le format 01 févr. 2021
         * @param {string} date 
         */
        changeFormatDateLit(el) {
            return date.format(new Date(el), 'DD MMM YYYY')
        },


    }
}
</script>