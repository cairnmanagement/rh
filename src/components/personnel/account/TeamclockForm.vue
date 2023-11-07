<template>
    
    <form @submit.prevent="record()">
        <div class="my-3">
            <label for="appAccountField" class="form-label">Compte de pointage</label>
            <select name="clock_account" id="appAccountField" class="form-select" v-model="access.clock_account">
                <option :value="account.login" v-for="account in appAccounts" :key="account">{{ account.login }}</option>
            </select>
        </div>

        <div class="my-3">
            <label for="loginField" class="form-label">Nom d'utilisateur</label>
            <input type="text" class="form-control" name="login" id="loginField" v-model="access.login" required>
            <span class="form-text">Doit être une adresse email</span>
        </div>

        <div class="my-3">
            <label for="pinField" class="form-label">Code PIN</label>
            <input type="password" class="form-control" id="pinField" name="pin" v-model="access.pin" required>
            <div class="text-danger" v-if="errors.pin">{{ errors.pin }}</div>
            <span class="form-text">Le code PIN doit être composé de 4 chiffres.</span>
        </div>

        <div class="my-3">
            <label for="pinConfirmField" class="form-label">Confirmez le code PIN</label>
            <input type="password" class="form-control" id="pinConfirmField" name="pinConfirm" v-model="access.pinConfirm" required>
        </div>

        <div class="my-3 d-grid">
            <button class="btn btn-lg btn-primary" type="submit" :disabled="pending.record">Créer l'accès</button>
        </div>
    </form>

</template>

<script>
import { validatePinOrThrow } from '../../../js/account';

export default {
    props: {
        appAccounts: Array,
        personnel: Object
    },

    data() {
        return {
            access: {
                clock_account: null,
                login: "",
                pin: "",
                pinConfirm: ""
            },
            errors: {
                pin: null
            },
            pending: {
                record: false
            }
        }
    },

    emits: ["created"],

    methods: {
        /**
         * Génère l'accès sur le serveur
         */
        async record() {
            
            for (const key in this.errors) {
                this.errors[key] = null;
            }

            try {
                validatePinOrThrow(this.access.pin, this.access.pinConfirm);
            }
            catch (e) {
                this.errors.pin = e.message;
                return 0;
            }
            
            this.pending.record = true;

            try {
                const logins = await this.$app.api.post("v2/personnel/"+this.personnel.id+"/account/team-clock-access", this.access, {
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                this.$emit("created", logins);
            }
            catch (e) {
                this.$app.catchError(e);
            }
            finally {
                this.pending.record = false;
            }
        }
    },

    beforeMount() {
        if (this.appAccounts.length) {
            this.access.clock_account = this.appAccounts[0].login;
        }
    }
}

</script>