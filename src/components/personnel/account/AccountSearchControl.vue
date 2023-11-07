<template>
    
    <form method="post" @submit.prevent="search()" class="input-group">
        <input type="text" class="form-control form-control-lg" placeholder="Rechercher un utilisateur" v-model="loginName">
        <button type="submit" class="btn btn-outline-primary btn-lg" :disabled="pending.search">
            <span class="spinner-border spinner-border-sm" v-if="pending.search"></span>
            <i class="bi bi-search" v-else></i>
        </button>
    </form>

</template>


<script>

export default {

    data() {
        return {
            loginName: "",
            pending: {
                search: false
            }
        }
    },

    emits: ["response"],

    methods: {
        /**
         * Lance une requête pour trouver une liste d'utilisateurs
         */
        async search() {
            this.pending.search = true;

            try {
                const logins = await this.$app.api.get("login/GET/list", {
                    q: this.loginName
                });
                this.$emit("response", logins);
            }
            catch (e) {
                this.$app.catchError(e);
            }
            finally {
                this.pending.search = false;
            }
        }
    }
}

</script>