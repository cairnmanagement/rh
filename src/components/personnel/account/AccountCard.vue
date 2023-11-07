<template>
    
    <div class="card mb-3">
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between mb-2">
                <h4 class="card-title m-0">Utilisateurs et comptes</h4>

                <div>
                    <router-link :to="'/personnel/'+personnel.id+'/account/new'" v-slot="{navigate, href}" custom>
                        <a :href="href" class="btn rounded-pill btn-light mx-1" title="Ajouter un accès" @click="navigate">
                            <i class="bi bi-plus"></i>
                        </a>
                    </router-link>
                </div>
            </div>

            <ul class="list-group list-group-flush my-3">
                <account-item v-for="login in logins" :key="login.id" :login="login" :personnel="personnel" @removed="removeAccount(login)" />
            </ul>

            <div class="alert alert-info" v-if="!logins.length">Aucun compte n'est lié à ce personnel.</div>

            <div class="my-3 d-grid" v-if="hasTeamclockApp">
                <router-link :to="'/personnel/'+personnel.id+'/account/create-team-clock-access'" v-slot="{navigate, href}" custom>
                    <a :href="href" @click="navigate" class="btn btn-light shadow-sm border fs-5">
                        <i class="bi bi-stopwatch me-1"></i> Ouvrir un accès pointage
                    </a>
                </router-link>
            </div>

        </div>
    </div>

</template>

<script>
import { hasTeamclockAppLicence } from '../../../js/personnel'
import AccountItem from './AccountItem.vue'

export default {

    components: { AccountItem },

    props: {
        personnel: Object,
        logins: Array
    },

    emits: ["account-removed"],

    data() {
        return {
            licence: null
        }
    },

    computed: {
        /**
         * Retourne true si la licence active contient un accès à l'application team-pointage
         */
        hasTeamclockApp() {
            return hasTeamclockAppLicence(this.licence);
        }
    },

    methods: {
        /**
         * Envoie un événement de suppression d'un login à l'élément parent
         * 
         * @param {object} login Le login à supprimer de la liste
         */
        removeAccount(login) {
            this.$emit("account-removed", login);
        }
    },

    beforeMount() {
        this.licence = this.$app.licence;
    }

}

</script>