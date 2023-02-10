<template>

    <div>
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <h3 class="card-title m-0">Coordonnées</h3>

                <div>
                    <router-link v-for="(contact, key) in contacts" :key="'button'+key" :to="routeLink(key, contact)" v-slot="{navigate, href}" custom>
                        <a :href="href" class="btn rounded-pill button-contact mx-1" @click="navigate" :title="contact.title">
                            <i class="bi" :class="contact.classIcon"></i>
                        </a>
                    </router-link>
                </div>
            </div>
        </div>

        <ul class="list-group list-group-flush">
            <contact-ressource-group v-for="(contact, key) in contacts" :key="'list'+key" :ressources="ressourceToSend(key)" :type="key"/>
        </ul>
    </div>

</template>

<style lang="scss" scoped>

@import 'bootstrap';

.button-contact {
    @extend .btn-light;

    .icon-phone::before {
        content: "\f4e7";
    }

    .icon-mail::before { 
        content: "\f32f";
    }

    .icon-address::before { 
        content: "\f3e8";
    }


    &:hover {
        @extend .btn-primary;

        .icon-phone::before,
        .icon-mail::before,
        .icon-address::before {
            content: "\f64d";
        }
    }
}

</style>

<script>

import { mapState, mapActions } from 'vuex';
import ContactRessourceGroup from './ContactRessourceGroup.vue';

export default{
  components: { ContactRessourceGroup },

    data() {
        return {
            contacts : {
                'telephone': {
                    'route': 'ressourcePhone',
                    'classIcon': 'icon-phone',
                    'title': "Ajouter un téléphone"
                },
                'mail': {
                    'route': 'ressourceMail',
                    'classIcon': 'icon-mail',
                    'title': "Ajouter un email"
                },
                'address': {
                    'route': 'ressourceAddress',
                    'classIcon': 'icon-address',
                    'title': "Ajouter une adresse"
                },
            },
        }
    },

    computed: {
        ...mapState(["openedElement"]),
    },

    methods: {
		...mapActions(['removeRessource']),

        /**
         * Retourne la route du button
         * 
         * @param {string} key          index de l'object
         * @param {Object} contact      Object de contact telephone ou mail ou adresse
         * 
         * @return {object}
         */
        routeLink(key, contact) {
            let route = {name:contact.route, params:{id: this.openedElement.id}};

            if (key === 'telephone') route.params.idPhone = 0;
            if (key === 'mail') route.params.idMail = 0;
            if (key === 'address') route.params.idAdress = 0;

            return route;
        },

        /**
         * Retourne la ressource en fonction du contact label renseigné
         * 
         * @param {String} contactLabel 
         * 
         * @return {object}
         */
        ressourceToSend(contactLabel) {
            if (contactLabel === "telephone") return this.openedElement.oPersonne.telephones;
            if (contactLabel === "mail") return this.openedElement.oPersonne.emails;
            if (contactLabel === "address") return this.openedElement.oPersonne.adresses;
        },
	}

}
</script>