<template>
    <div>
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <h4 class="card-title m-0">Coordonnées</h4>
                <!-- <a href="/" class="btn btn-light"><i class="bi bi-plus-lg"></i></a> -->
                <div class="dropdown">
                    <button class="btn btn-light dropdown-toggle" type="button" id="addRessource" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-plus-lg"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="addRessource">
                        <li>
                            <router-link :to="{name:'ressourcePhone', params:{id:openedElement.id, idPhone: 0}}" v-slot="{navigate,href}" custom>
                                <a class="dropdown-item" :href="href" @click="navigate">Téléphone</a>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name:'ressourceMail', params:{id:openedElement.id, idMail: 0}}" v-slot="{navigate,href}" custom>
                                <a class="dropdown-item" :href="href" @click="navigate">Mail</a>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name:'ressourceAddress', params:{id:openedElement.id, idAdress: 0}}" v-slot="{navigate,href}" custom>
                                <a class="dropdown-item" :href="href" @click="navigate">Adresse</a>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <ul class="list-group list-group-flush">
            
            <li v-if="!openedElement.oPersonne.telephones?.length" class="list-group-item d-flex align-items-between text-warning">Pas de numéro de téléphone enregistré</li>
            <li v-else class="list-group-item d-flex align-items-baseline">
                <div class="me-3"><i class="bi bi-phone"></i></div>
                <div class="d-flex flex-column flex-fill">
                    <div v-for="item in openedElement.oPersonne.telephones" :key="item.id" class="d-flex flex-row align-items-center justify-content-between">
                        <div>
                            <a :href="'tel'+item.numero" class="text-decoration-none me-2">{{item.numero}}</a>
                            <span v-if="item.type" class="badge bg-secondary me-2">{{item.type}}</span>
                        </div>
                        <div>
                            <router-link :to="{name:'ressourcePhone', params:{id:openedElement.id, idPhone:item.id}}" v-slot="{navigate,href}" custom>
                                <a @click="navigate" :href="href" class=" btn btn-sm btn-light rounded-pill me-2"><i class="bi bi-pencil"></i></a>
                            </router-link>
                                <button @click.prevent="deletePhone(item.id)"   class="btn btn-sm btn-light rounded-pill text-black-50"><i class="bi bi-trash3"></i></button>
                        </div>
                    </div>
                </div>
            </li>
            <li v-if="!openedElement.oPersonne.emails?.length" class="list-group-item d-flex align-items-between text-warning">Pas d'adresse email enregistrée</li>
            <li v-else class="list-group-item d-flex align-items-baseline">
                <div class="me-3"><i class="bi bi-envelope"></i></div>
                <div class="d-flex flex-column flex-fill">
                    <div v-for="item in openedElement.oPersonne.emails" :key="item.id" class="d-flex flex-row align-items-center justify-content-between">
                        <div>
                            <a :href="'mail'+item.adresse" class="text-decoration-none me-2">{{item.adresse}}</a>
                            <span v-if="item.type" class="badge bg-secondary me-2">{{item.type}}</span>
                        </div>
                        <div>
                            <router-link :to="{name:'ressourceMail', params:{id:openedElement.id, idMail:item.id}}" v-slot="{navigate,href}" custom>
                                <a @click="navigate" :href="href" class=" btn btn-sm btn-light rounded-pill me-2"><i class="bi bi-pencil"></i></a>
                            </router-link>
                            <button @click.prevent="deleteMail(item.id)"  class="btn btn-sm btn-light rounded-pill text-black-50"><i class="bi bi-trash3"></i></button>
                        </div>
                    </div>
                </div>
            </li>

            <li v-if="!openedElement.oPersonne.adresses?.length" class="list-group-item d-flex align-items-baseline text-warning"> Pas d'adresse postale enregistrée</li>
            <li v-else class="list-group-item">

                <div  v-for="item in openedElement.oPersonne.adresses" :key="item.id" class="d-flex align-items-baseline">
                    <div class="me-3"><i class="bi bi-geo-alt"></i></div>
                    <div class="d-flex flex-column flex-fill" >
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <span v-if="item.type" class="text-muted">{{item.type}}</span>
                                <span v-else class="text-muted">Contractuelle</span>
                            </div>
                            <div>
                                <router-link :to="{name:'ressourceAddress', params:{id:openedElement.id, idAdress:item.id}}" v-slot="{navigate,href}" custom>
                                    <a @click="navigate" :href="href" class=" btn btn-sm btn-light rounded-pill me-2"><i class="bi bi-pencil"></i></a>
                                </router-link>
                                <button @click.prevent="deleteAdress(item.id)" class="btn btn-sm btn-light rounded-pill text-black-50"><i class="bi bi-trash3"></i></button>
                            </div>
                        </div>
                        <div class="d-flex flex-column align-items-start justify-content-between">
                            <span>{{item.voie}}</span>
                            <span> {{item.complement}} </span>
                            <span>{{item.cp}} {{item.localite}}</span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default{

    computed: {
        ...mapState(["openedElement"]),
    },

    methods: {
		...mapActions(['removeRessource']),

		deleteAdress(ressourceId) {
			if (confirm('Souhaitez vous supprimer cette adresse postale?')) {
				let idElement= this.openedElement.id;
				console.log(idElement, ressourceId);
				let apiUrl = 'structurePersonnel/DELETE/' +idElement+ '/adresse/' +ressourceId;
				this.$app.apiPost(apiUrl)

                .then((resp) => {

                    if (resp ==='OK') {
					// supprime dans le store l'item dans le tableau des adresses, celui dont l'id == ressourceId

						this.removeRessource({
							ressource: 'adresses',
							id: ressourceId
						});
                    }
                    else {
						alert('Erreur inconnue!')
					}
                })
                .catch(this.$app.catchError);
			}
			else {
				alert ('Cette adresse postale ne sera pas supprimée');
				console.log('adresse postale non supprimée');
			}
		},

		deletePhone(ressourceId) {
			if (confirm('Souhaitez vous supprimer ce contact téléphonique ?')) {
				let idElement= this.openedElement.id;
				console.log(idElement,ressourceId);
				let apiUrl = 'structurePersonnel/DELETE/' +idElement+ '/telephone/' +ressourceId;
				this.$app.apiPost(apiUrl)

                .then((resp) => {

                    if (resp === 'OK') {
					// supprime dans le store l'item dans le tableau des telephones, celui dont l'id == ressourceId
						this.removeRessource({
							ressource: 'telephones',
							id: ressourceId
						});
                    }
					else {
						alert('Erreur inconnue!')
					}
                })
                .catch(this.$app.catchError);
			}
			else {
				alert ('Ce contact télphonique ne sera pas supprimé');
				console.log('téléphone non supprimé');
			}
		},

		deleteMail(ressourceId) {
			if (confirm('Souhaitez vous supprimer cette adresse mail ?')) {
				let idElement= this.openedElement.id;
				console.log(idElement,ressourceId);
				let apiUrl = 'structurePersonnel/DELETE/' +idElement+ '/email/' +ressourceId;
				this.$app.apiPost(apiUrl)

                .then((resp) => {

					if (resp === 'OK') {
					// supprime dans le store l'item dans le tableau des  emails, celui dont l'id == ressourceId
						this.removeRessource({
							ressource: 'emails',
							id: ressourceId
						});
					}
					else {
						alert('Erreur inconnue!');
					}
                })
                .catch(this.$app.catchError);
			}
			else {
				alert ('Cette adresse mail ne sera pas supprimée');
				console.log('adresse mail non supprimée');
			}
		},


	}

}
</script>