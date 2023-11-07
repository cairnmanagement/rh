<template>
    
    <div class="mb-3">
        <account-search-control @response="updateLoginsList" />
    </div>

    <div class="list-group list-group-flush" v-if="logins.length">
        <login-select-item v-for="login in logins" :key="login.id" :login="login" @select="selectLogin(login)" :selected="isSelected(login)" />
    </div>
    <div class="alert alert-secondary" v-else>Aucun résultat</div>

</template>


<script>
import AccountSearchControl from './AccountSearchControl.vue'
import LoginSelectItem from './LoginSelectItem.vue';

export default {

    data() {
        return {
            logins: []
        }
    },

    props: {
        selectedLogins: Array
    },

    emits: ['selected'],

    components: { AccountSearchControl, LoginSelectItem },

    methods: {
        /**
         * Remplace la liste des logins par un nouveau résultat de recherche.
         * 
         * @param {array} list Nouvelle liste
         */
        updateLoginsList(list) {
            this.logins = list;
        },

        /**
         * Envoie un événement contenant le login sélectionné
         * 
         * @param {object} login L'instance du login sélectionné
         */
        selectLogin(login) {
            this.$emit("selected", login);
        },

        /**
         * Retourne true si le login est dans la liste selectedLogins
         * 
         * @param {object} login Le login à tester
         */
        isSelected(login) {
            const found = this.selectedLogins.find(e => e.id === login.id);
            return found ? true : false;
        }
    }

}
</script>
