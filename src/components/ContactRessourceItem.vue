<template>
    <div class="d-flex flex-row align-items-center justify-content-between my-1">
        <div v-if="type != 'address'">
            <a :href="href" class="text-decoration-none me-2" v-if="href">{{label}}</a>
            <span v-else>{{ label }}</span>
            <span v-if="typeLabel" class="badge bg-secondary me-2"> {{typeLabel}}</span>
        </div>

        <div v-else>
            <div v-if="typeLabel" class="text-start text-muted fs-7 mt-2"> 
                {{ typeLabel.toUpperCase() }}
            </div>
            
            <a :href="href" target="_blank" class="text-decoration-none d-flex flex-column align-items-start justify-content-between">
                <span> {{ressource.voie}} </span>
                <span> {{ressource.complement}} </span>
                <span> {{ressource.cp}} {{ressource.localite}} </span>
            </a>
        </div>

        <div>
            <router-link :to="routeEditOptions" v-slot="{navigate,href}" custom>
                <a @click="navigate" :href="href" class="btn btn-sm button-contact-edit rounded-pill me-2" title="Modifier">
                    <i class="bi bi-pencil"></i>
                </a>
            </router-link>

            <button @click.prevent="deleteRessource(ressource.id)" class="btn btn-sm button-contact-delete rounded-pill text-black-50" title="supprimer">
                <i class="bi bi-trash3"></i>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import 'bootstrap';

.button-contact-edit {
    @extend .btn-light;

    &:hover {
        @extend .btn-success;
    }
}

.button-contact-delete {
    @extend .btn-light;

    &:hover {
        @extend .btn-danger;
    }
}

</style>

<script>
import { mapState } from 'vuex';


export default {
    props: {
        ressource: Object,
        type: String
    },

    computed: {
        ...mapState(['openedElement']),

        /**
         * Retourne un lien permettant de déclencher une action sur la ressource.
         * 
         * @return {string}
         */
        href() {
            switch (this.type) {
                case 'telephone':
                    return `tel:${this.ressource.numero}`;
                case 'mail':
                    return `mailto:${this.ressource.adresse}`;
                case 'address':
                    return `http://maps.google.com/?q=i${this.ressource.voie} ${this.ressource.complement} ${this.ressource.cp} ${this.ressource.localite}`;
                default:
                    return null;
            }
        },

        /**
         * Retourne un label de la ressource
         */
        label() {
            console.log(this.ressource);
            switch (this.type) {
                case 'telephone':
                    return this.ressource.numero;
                case 'mail':
                    return this.ressource.adresse;
                case 'address':
                    return `http://maps.google.com/?q=i${this.ressource.voie} ${this.ressource.complement} ${this.ressource.cp} ${this.ressource.localite}`;
                default:
                    return null;
            }
        },

        routeEditOptions() {
            let route = {};

            switch (this.type) {
                case 'telephone':
                    route = {name:'ressourcePhone', params:{id:this.openedElement.id, idPhone:this.ressource.id}};
                    break;
                case 'mail':
                    route =  {name:'ressourceMail', params:{id:this.openedElement.id, idMail:this.ressource.id}};
                    break;
                case 'address':
                    route =  {name:'ressourceAddress', params:{id:this.openedElement.id, idAdress:this.ressource.id}};
                    break;
                default:
                    route = {};
            }
            console.log('route',route);
            return route;
        },

        typeLabel() {
            return this.ressource.type;
        },
    },

    methods: {
        deleteRessource(ressourceId) {
            console.log(ressourceId);
        }
    },
}

</script>