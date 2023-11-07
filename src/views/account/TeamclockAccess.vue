<template>
    
    <app-modal
        title="Ouvrir un accès pointage"
        @modal-hide="routeToParent()"
        :submit-btn="false"
        :cancel-btn="false"
        :close-btn="true"
        :display="displayModal">

        <spinner v-if="pending.appAccounts"></spinner>

        <template v-else>
            <alert-message variant="warning" icon="bi-exclamation-triangle-fill" v-if="!appAccounts.length">
                Il n'y a pas de compte enregistré pour l'application de pointage en équipe.
                Vous pouvez configurer les comptes dans les paramètres de cette application.
            </alert-message>

            <teamclock-form :personnel="openedPersonnel" :appAccounts="appAccounts" @created="updatePersonnelLogins" v-else />
        </template>

    </app-modal>

</template>

<script>
import { mapState } from 'vuex';
import AlertMessage from '../../components/pebble-ui/AlertMessage.vue';

import AppModal from '../../components/pebble-ui/AppModal.vue';
import Spinner from '../../components/pebble-ui/Spinner.vue';
import TeamclockForm from '../../components/personnel/account/TeamclockForm.vue';

export default {

    data() {
        return {
            appAccounts: [],
            pending: {
                appAccounts: true
            },
            displayModal: true
        }
    },

    components: { AppModal, Spinner, TeamclockForm, AlertMessage },

    computed: {
        ...mapState(["config", "openedPersonnel"])
    },

    methods: {
        /**
         * Charge les comptes de l'application depuis le serveur
         */
        async loadAppAccounts() {
            this.pending.appAccounts = true;
            try {
                this.appAccounts = await this.$app.api.get("v2/personnel/team-clock-access");
            }
            catch (e) {
                this.$app.catchError(e);
            }
            finally {
                this.pending.appAccounts = false;
            }
        },

        /**
         * Ajoute les nouveaux logins dans la liste des comptes de pointage
         * 
         * @param {array} logins Liste des logins à mettre à jour
         */
        updatePersonnelLogins(logins) {
            const collection = this.$assets.getCollection("openedPersonnelLogins");
            collection.updateCollection(logins);
            this.displayModal = false;
        },

        /**
         * retourne à la route précédente
         */
        routeToParent() {
            this.$router.go(-1);
        }
    },

    beforeMount() {
        this.loadAppAccounts();
    }

}

</script>