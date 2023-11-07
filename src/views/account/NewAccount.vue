<template>
    
    <app-modal
        title="Ajouter un compte"
        @modal-hide="routeToParent()"
        :submit-btn="false"
        :cancel-btn="false"
        :close-btn="true"
        :display="displayModal">

            <nav class="nav nav-pills nav-fill mb-3">
                <button class="nav-link" :class="{'active' : view === 'home'}" @click="view = 'home'">Rechercher</button>
                <button class="nav-link" :class="{'active' : view === 'new' }" @click="view = 'new'">Nouveau compte</button>
            </nav>

            <spinner v-if="pending.link" />

            <template v-else>
                <account-select :selected-logins="openedPersonnelLogins" @selected="linkLogin" v-if="view === 'home'" />
                <account-form :personnel="openedPersonnel" @recorded="addLogin" v-if="view === 'new'" />
            </template>



    </app-modal>

</template>

<script>
import { mapState } from 'vuex';

import AppModal from '../../components/pebble-ui/AppModal.vue';
import Spinner from '../../components/pebble-ui/Spinner.vue';
import AccountForm from '../../components/personnel/account/AccountForm.vue';
import AccountSelect from '../../components/personnel/account/AccountSelect.vue';

export default {

    data() {
        return {
            pending: {
                link: false
            },
            view: "home",
            displayModal: true
        }
    },

    components: { AppModal, AccountSelect, Spinner, AccountForm },

    computed: {
        ...mapState(["openedPersonnelLogins", "openedPersonnel"]),
    },

    methods: {
        async linkLogin(login) {
            this.pending.link = true;
            try {
                const respLogin = await this.$app.api.post("v2/personnel/"+this.openedPersonnel.id+"/account/link/"+login.id);
                this.addLogin(respLogin);
                this.routeToParent();
            }
            catch (e) {
                this.$app.catchError(e);
            }
            finally {
                this.pending.link = false;
            }
        },

        /**
         * Ajoute un nouveau login à la collection
         * 
         * @param {object} login Le login à ajouter
         */
        addLogin(login) {
            const collection = this.$assets.getCollection("openedPersonnelLogins");
            collection.updateCollection([login]);
            this.displayModal = false;
        },

        /**
         * retourne à la route précédente
         */
        routeToParent() {
            this.$router.go(-1);
        }
    }
}

</script>