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

        // /**
        //  * Supprime la ressource selectionnée
        //  * 
        //  * @param {string} ressource            la ressource a supprimer (telephone, mail, address)
        //  * @param {string} ressource
        //  */
        // deleteRessource(ressource, ressourceId) {
        //     console.log(typeof ressourceId);
        //     let alertMessage = "Souhaitez vous supprimer";

        //     switch (ressource) {
        //         case 'telephone':
        //             alertMessage += " ce contact téléphonique?";
        //             break;
        //         case'mail':
        //             alertMessage += " cette adresse mail?";
        //             break;
        //         case 'address':
        //             alertMessage += " cette adresse postale?";
        //             break;

        //         default:
        //             alertMessage += " cette ressource ? ";
        //             break;
        //     }

        //     if (confirm(alertMessage)) {
        //         let apiUrl = `structurePersonnel/DELETE/${this.openedElement.id}/${ressource}/${ressourceId}`

        //         this.$app.apiPost(apiUrl).then((resp) => {
        //             if (resp === "OK") {
        //                 this.removeRessource({
        //                     ressource: ressource, 
        //                     id:ressourceId
        //                 });
        //             } else {
        //                 alert("Erreur lors de la suppression sur le serveur");
        //             }
        //         }).catch(this.$app.catchError)
        //     }
        // },



		// deleteAdress(ressourceId) {
		// 	if (confirm('Souhaitez vous supprimer cette adresse postale?')) {
		// 		let idElement= this.openedElement.id;

		// 		let apiUrl = 'structurePersonnel/DELETE/' +idElement+ '/adresse/' +ressourceId;
		// 		this.$app.apiPost(apiUrl)

        //         .then((resp) => {

        //             if (resp ==='OK') {
		// 			// supprime dans le store l'item dans le tableau des adresses, celui dont l'id == ressourceId

		// 				this.removeRessource({
		// 					ressource: 'adresses',
		// 					id: ressourceId
		// 				});
        //             }
        //             else {
		// 				alert('Erreur inconnue!')
		// 			}
        //         })
        //         .catch(this.$app.catchError);
		// 	}
		// 	else {
		// 		alert ('Cette adresse postale ne sera pas supprimée');
		// 	}
		// },

		// deletePhone(ressourceId) {
		// 	if (confirm('Souhaitez vous supprimer ce contact téléphonique ?')) {
		// 		let idElement= this.openedElement.id;
		// 		console.log(idElement,ressourceId);
		// 		let apiUrl = 'structurePersonnel/DELETE/' +idElement+ '/telephone/' +ressourceId;
		// 		this.$app.apiPost(apiUrl)

        //         .then((resp) => {

        //             if (resp === 'OK') {
		// 			// supprime dans le store l'item dans le tableau des telephones, celui dont l'id == ressourceId
		// 				this.removeRessource({
		// 					ressource: 'telephones',
		// 					id: ressourceId
		// 				});
        //             }
		// 			else {
		// 				alert('Erreur inconnue!')
		// 			}
        //         })
        //         .catch(this.$app.catchError);
		// 	}
		// 	else {
		// 		alert ('Ce contact téléphonique ne sera pas supprimé');
		// 	}
		// },

		// deleteMail(ressourceId) {
		// 	if (confirm('Souhaitez vous supprimer cette adresse mail ?')) {
		// 		let idElement= this.openedElement.id;
		// 		console.log(idElement,ressourceId);
		// 		let apiUrl = 'structurePersonnel/DELETE/' +idElement+ '/email/' +ressourceId;
		// 		this.$app.apiPost(apiUrl)

        //         .then((resp) => {

		// 			if (resp === 'OK') {
		// 			// supprime dans le store l'item dans le tableau des  emails, celui dont l'id == ressourceId
		// 				this.removeRessource({
		// 					ressource: 'emails',
		// 					id: ressourceId
		// 				});
		// 			}
		// 			else {
		// 				alert('Erreur inconnue!');
		// 			}
        //         })
        //         .catch(this.$app.catchError);
		// 	}
		// 	else {
		// 		alert ('Cette adresse mail ne sera pas supprimée');
		// 	}
		// },


	}

}
</script>