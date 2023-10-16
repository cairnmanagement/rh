<template>

    <div class="d-flex align-items-center mb-2">
        <button class="btn btn-warning rounded-pill me-2" v-if="contrat.verrou === 'OUI'">
            <i class="bi bi-lock-fill"></i>
            Verrouillé
        </button>
        <button class="btn btn-success rounded-pill me-2" v-if="contrat.notified === 'OUI'">
            <i class="bi bi-bell-fill"></i>
            Notifié
        </button>
        <button class="btn btn-success rounded-pill me-2" v-if="contrat.opened === 'OUI'">
            <i class="bi bi-eye-fill"></i>
            Consulté
        </button>
    </div>

    <div class="mb-1">
        <span :class="contratClassName">
            <i class="bi me-1" :class="startDateIcon"></i>
            {{ contratLabel }} du {{ dateStartDisplay }}
        </span>

        <span class="text-secondary">
            <i class="bi bi-chevron-right mx-2"></i>
            <i class="bi me-1" :class="endDateIcon" v-if="endDateIcon"></i>
            {{ labelDateEnd }}
        </span>
    </div>

    <div class="my-1 d-flex align-items-center">
        <span class="badge bg-primary rounded-pill me-2" v-if="type">{{ type.label }}</span>
        <span v-if="qualification" class="text-primary me-2">{{ qualification.label }}</span>
        <span v-if="statut" class="text-secondary me-2">{{ statut.label }}</span>
    </div>

    <div :class="testPeriodClassName" class="my-2">
        <em>{{ testPeriodLabel }}</em>
    </div>

    <ul class="list-group list-group-horizontal my-3" v-if="contrat.dsortie_reelle">
        <li class="list-group-item shadow-sm list-group-item-danger border-danger">
            <i class="bi me-2" :class="endDateIcon"></i>
            Date de sortie enregistrée
        </li>
        <li class="list-group-item shadow-sm border-danger">
            {{ dateEndDisplay }}
        </li>
        <li class="list-group-item shadow-sm border-danger" v-if="motif_fin">
            <em>{{ motif_fin.label }}</em>
        </li>
    </ul>

    <hr>

    <h3 class="fs-4">Attributs du contrat</h3>
    

    <!-- <table class="table rounded table-sm border">
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
    </table> -->

    <!-- <table class="table rounded border table-sm">
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
    </table> -->

    <div class="my-4">
        <ul class="list-group list-group-horizontal my-3">
            <li class="list-group-item shadow-sm list-group-item-light">
                <i class="bi bi-currency-euro me-2"></i>
                Salaire horaire
            </li>
            <li class="list-group-item shadow-sm">
                <strong v-if="contrat.salaire_horaire">
                    {{contrat.salaire_horaire}}&nbsp;€ 
                </strong>
                <span v-else class="text-secondary">
                    Non renseigné
                </span>
            </li>
        </ul>
    
        <ul class="list-group list-group-horizontal my-3">
            <li class="list-group-item shadow-sm" :class="{'list-group-item-light': isPartTime}">
                <i class="bi bi-clock-fill me-2"></i>
                <template v-if="isPartTime">
                    Temps partiel
                </template>
                <template v-else>
                    Temps plein
                </template>
            </li>
            <li class="list-group-item shadow-sm" v-if="isPartTime">
                {{ contrat.pourcentage_temps_partiel }}&nbsp;%
            </li>
        </ul>
    </div>

    <div class="rounded border shadow-sm overflow-hidden my-4" v-if="contrat.forfait_jour === 'OUI'">
        <table class="table m-0">
            <thead class="table-light">
                <tr>
                    <th colspan="3" class="text-left fw-normal">
                        <i class="bi bi-calendar-day-fill me-2"></i>
                        Contrat au forfait jour
                    </th>
                </tr>
    
                <tr>
                    <th class="text-start border-end fw-normal text-secondary">Unit/semaine</th>
                    <th class="text-start border-end fw-normal text-secondary">Unit/mois</th>
                    <th class="text-start fw-normal text-secondary">Unit/an</th>
                </tr>
            </thead>
    
            <tbody>
                <tr>
                    <td class="border-end">
                        <template v-if="contrat.nb_par_semaine">{{ contrat.nb_par_semaine }}</template>
                        <span class="text-secondary" v-else>Non-renseigné</span>
                    </td>
                    <td class="border-end">
                        <template v-if="contrat.nb_par_mois">{{ contrat.nb_par_mois }}</template>
                        <span class="text-secondary" v-else>Non-renseigné</span>
                    </td>
                    <td>
                        <template v-if="contrat.nb_par_an">{{ contrat.nb_par_an }}</template>
                        <span class="text-secondary" v-else>Non-renseigné</span>
                    </td>
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

    data() {
        return {
            type: null,
            qualification: null,
            statut: null,
            motif_fin: null
        }
    },

    props: {
        contrat: Object
    },

    watch: {
        contrat(newVal) {
            this.loadAssets(newVal);
        }
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
        },

        /**
         * Retourne le libellé pour le contrat : soit Contrat, soit Avenant.
         * 
         * @return {string}
         */
        contratLabel() {
            return this.contrat.flag_avenant === "OUI" ? "Avenant" : "Contrat"
        },

        /**
         * Retourne true si le contrat est à temps partiel
         * 
         * Un contrat est à temps partiel lorsque la valeur pourcentage_temps_partiel est renseignée et que la 
         * valeur est inférieur à 100.
         * 
         * @return {bool}
         */
        isPartTime() {
            return this.contrat.pourcentage_temps_partiel && this.contrat.pourcentage_temps_partiel < 100;
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

        async loadAssets(contrat) {

            contrat = typeof contrat === 'undefined' ? this.contrat : contrat;

            const assets = [
                {
                    collectionName: "contratTypes",
                    dataKey: "type",
                    joinKey: "type_id"
                },
                {
                    collectionName: "contratQualifications",
                    dataKey: "qualification",
                    joinKey: "qualification_id"
                },
                {
                    collectionName: "contratStatuts",
                    dataKey: "statut",
                    joinKey: "statut_id"
                },
                {
                    collectionName: "contratMotifsFin",
                    dataKey: "motif_fin",
                    joinKey: "motif_fin_id"
                }
            ];

            assets.forEach(async asset => {
                if (contrat[asset.joinKey]) {
                    const collection = this.$assets.getCollection(asset.collectionName);
                    this[asset.dataKey] = await collection.getById(contrat[asset.joinKey]);
                }
            });
        }

    },

    mounted() {
        this.loadAssets();
    }
}
</script>