<template>
    
    <button type="button" @click="select()" class="list-group-item list-group-item-action d-flex align-items-center justify-content-between" :disabled="selected">
        <login-infos :login="login" />
        <i class="bi bi-check2 text-success" v-if="selected"></i>
        <i class="bi bi-link" v-else></i>
    </button>

</template>

<script>
import LoginInfos from './LoginInfos.vue'

export default {
    
    components: { LoginInfos },

    props: {
        login: Object,
        selected: {
            type: Boolean,
            default: false
        }
    },

    emits: ["select"],

    methods: {
        /**
         * Envoie un événement de sélection au parent
         */
        select() {
            this.$emit("select");
        }
    }

}

</script>