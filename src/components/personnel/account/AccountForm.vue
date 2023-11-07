<template>
    

    <form method="post" @submit.prevent="record()">
        <div class="mb-3">
            <label for="loginField" class="form-label">Identifiant</label>
            <input type="text" class="form-control" v-model="tmpLogin.login" id="loginField" required>
            <div class="text-muted">Doit être une adresse e-mail</div>
            <div class="text-danger" v-if="errors.login">{{ errors.login }}</div>
        </div>

        <div class="card p-3 mb-3">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="updatePasswordCkb" v-model="updatePassword">
                <label class="form-check-label" for="updatePasswordCkb">Enregistrer un mot de passe</label>
            </div>

            <div v-if="updatePassword" class="mt-3">
                <div class="mb-3">
                    <label for="passwordField" class="form-label">Mot de passe</label>
                    <input type="password" id="passwordField" class="form-control" v-model="tmpLogin.password">
                    <div class="text-danger" v-if="errors.password">{{ errors.password }}</div>
                </div>
            
                <div>
                    <label for="passwordConfirmField" class="form-label">Confirmez le mot de passe</label>
                    <input type="password" id="passwordConfirmField" class="form-control" v-model="tmpLogin.passwordConfirm">
                </div>
            </div>
        </div>
    
    
        <div class="card p-3 mb-3">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="updatePinCkb" v-model="updatePin">
                <label class="form-check-label" for="updatePinCkb">Enregistrer un code pin</label>
            </div>

            <div v-if="updatePin" class="mt-3">
                <div class="mb-3">
                    <label for="pinField" class="form-label">Code PIN</label>
                    <input type="password" id="pinField" class="form-control" v-model="tmpLogin.pin">
                    <div class="text-danger" v-if="errors.pin">{{ errors.pin }}</div>
                </div>
            
                <div>
                    <label for="pinConfirmField" class="form-label">Confirmez le PIN</label>
                    <input type="password" id="pinConfirmField" class="form-control" v-model="tmpLogin.pinConfirm">
                </div>
            </div>
        </div>
    
        <button type="submit" class="btn btn-lg btn-primary" :disabled="pending.record">
            <span class="spinner-border spinner-border-sm" v-if="pending.record"></span>
            <i class="bi bi-check2" v-else></i>
            Créer
        </button>
    </form>


</template>

<script>

import { validatePasswordOrThrow, validatePinOrThrow } from '../../../js/account';

export default {

    props: {
        personnel: Object,
    },

    data() {
        return {
            tmpLogin: {
                login: "",
                password: "",
                passwordConfirm: "",
                pin: "",
                pinConfirm: ""
            },
            errors: {
                login: null,
                password: null,
                pin: null
            },
            pending: {
                record: false
            },
            updatePassword: false,
            updatePin: false
        }
    },

    methods: {
        /**
         * Enregistre les informations et retourne un événement à l'élément parent
         */
        async record() {

            let errors = 0;

            if (this.updatePassword) {
                try {
                    this.validatePasswordOrTrhow(this.tmpLogin.password, this.tmpLogin.passwordConfirm);
                }
                catch (e) {
                    this.errors.password = e.message;
                    errors += 1;
                }
            }


            if (this.updatePin) {
                try {
                    this.validatePinOrThrow(this.tmpLogin.pin, this.tmpLogin.pinConfirm);
                }
                catch (e) {
                    this.errors.pin = e.message;
                    errors += 1;
                }
            }

            if (errors) {
                return 0;
            }

            this.pending.record = true;

            try {
                const login = await this.$app.api.post("v2/personnel/"+this.personnel.id+"/account", this.tmpLogin, {
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                this.$emit("recorded", login);
            }
            catch (e) {
                this.$app.catchError(e);
            }
            finally {
                this.pending.record = false;
            }
        },

        /**
         * Contrôle que le mot de passe saisis correspond bien aux critères de sécurités :
         * - des lettres minuscules
         * - des lettres majuscules
         * - des chiffres
         * - des caractères spéciaux
         * - au moins 8 caractères
         * 
         * @param {string} password Le mot de passe
         * @param {string} confirmation La confirmation du mot de passe
         */
        validatePasswordOrTrhow(password, confirmation) {
            validatePasswordOrThrow(password, confirmation);
        },

        /**
         * Contrôle que le pin saisis correspond bien aux critères de sécurité :
         * - 4 caractères
         * - Uniquement des chiffres
         * 
         * @param {string} pin Le code PIN
         * @param {string} confirmation La confirmation du PIN
         */
        validatePinOrThrow(pin, confirmation) {
            validatePinOrThrow(pin, confirmation);
        }
    }
}

</script>