<template>
    <div class="ms-4 col-8">
        <div>
            <div class="text-success d-flex justify-content-between aligne">
                <div>
                    Avenant du {{ changeFormatDateLit(avSelected.dentree_relative) }}
                </div>

                <div class="text-secondary">
                    <i class="bi bi-chevron-right"></i>
                    <span v-if="avSelected.dsortie">Fini le {{ changeFormatDateLit(avSelected.dsortie) }}</span>
                    <span v-else> Sans date de sortie</span>
                </div>
            </div>

            <div class="badge bg-secondary">
                Contrat initial au {{ changeFormatDateLit(avSelected.dentree) }}
            </div>

            <div class="mt-4">
                <span v-if="avSelected.duree_determinee === 'OUI'">Contrat a durée indeterminé</span>
                <span v-else>Contrat a durée déterminé</span>
            </div>
            
            <div class="fw-lighter">
                <div v-if="avSelected.periode_essai">
                    Reste {{ avSelected.periode_essai }} jour{{ avSelected.periode_essai > 1 ? 's': ''}} de période essai
                </div>

                <div v-else>
                    Periode d'essai fini.
                </div>
            </div>

            <div class="d-flex flex-column my-4">
                <span>Salaire horaire:</span>

                <strong v-if="avSelected.salaire_horaire == 'null' || avSelected.salaire_horaire == 0" class="text-warning">
                    Pas d'infos sur le salaire horaire
                </strong>

                <strong v-else-if="avSelected.salaire_horaire">
                    {{avSelected.salaire_horaire}}€ 
                </strong>

                <strong v-else class="danger">Pas d'infos enregistrées</strong>
            </div>

            <div class="d-flex flex-column my-4">
                <span>Temps de travail:</span>

                <strong v-if="avSelected.mls__contrat_duree_travail == 'null' || avSelected.mls__contrat_duree_travail == 0" class="text-warning">
                    Pas d'infos sur le temps de travail
                </strong>

                <strong v-else-if="avSelected.mls__contrat_duree_travail">
                    {{avSelected.mls__contrat_duree_travail}} heures
                </strong>

                <strong v-else class="text-danger">Pas d'infos enregistrées</strong>                
            </div>

            <div v-if="avSelected.forfait_jour === 'OUI'">
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
                            <td>{{avSelected.nb_par_semaine}}</td>
                            <td>{{avSelected.nb_par_mois}}</td>
                            <td>{{avSelected.nb_par_an}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import date from 'date-and-time';
import fr from 'date-and-time/locale/fr';

export default {
    name: 'avenantResume',

    props: {
        avSelected: Object
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
    }
}
</script>