<template>
    
    <app-modal
        title="Modifier le code PIN"
        @modal-hide="routeToParent()"
        @submit="record()"
        :pending="pending.record"
        :submit-btn="true"
        :cancel-btn="true"
        :close-btn="false"
        :display="displayModal">

        <div class="mb-3">
            <label for="pinField" class="form-label">Nouveau code PIN</label>
            <input type="password" name="pin" id="pinField" class="form-control" v-model="pin">
            <div class="text-danger mt-2" v-if="error">{{ error }}</div>
        </div>

        <div>
            <label for="pinConfirmField" class="form-label">Confirmez</label>
            <input type="password" name="pinConfirm" id="pinConfirmField" class="form-control" v-model="pinConfirm">
        </div>

    </app-modal>

</template>

<script>

import AppModal from '../../components/pebble-ui/AppModal.vue';

import { mapState } from 'vuex';
import { validatePinOrThrow } from '../../js/account'

export default {
    data() {
        return {
            pin: null,
            pinConfirm: null,
            error: null,
            pending: {
                record: false
            },
            displayModal: true
        }
    },

    components: { AppModal },

    computed: {
        ...mapState(["openedPersonnel"])
    },

    methods: {
        /**
         * Enregistre le nouveau code pin sur le serveur
         */
        async record() {
            this.error = null;

            try {
                validatePinOrThrow(this.pin, this.pinConfirm);
            }
            catch (e) {
                this.error = e.message;
                return 0;
            }

            this.pending.record = true;

            try {
                await this.$app.api.patch("v2/personnel/"+this.openedPersonnel.id+"/account/"+this.$route.params.idAccount, {
                    pin: this.pin
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                this.displayModal = false;
            }
            catch (e) {
                this.$app.catchError(e);
            }
            finally {
                this.pending.record = false;
            }
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