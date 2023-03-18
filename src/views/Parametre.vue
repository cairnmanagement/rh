<template>
    <div class="container py-2">
        <div v-if="login.type >= 4">
            <h1 class="fs-3 my-3">Configurer votre application</h1>
    
            <div class="card my-2">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-6 col-lg-4 col-12">
                            <img src="../assets/parametre.jpg" class="img-fluid" alt="parametrage de RH" />
                        </div>
     
                        <div class="col fw-light fs-4 text-center">
                            <p>Utilisez cet espace pour paramétrer votre application</p>
                            <p>Sélectionner un élement de la liste pour commencer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div v-else class="my-3">
            <alert-message :variant="'danger'" :icon="'bi-exclamation-triangle-fill'">Vous n'avez pas l'autorisation d'acceder a cette page</alert-message>
        </div>

        <router-view />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import AlertMessage from '../components/pebble-ui/AlertMessage.vue';

export default {
    components: { AlertMessage },

    computed: {
        ...mapState(['login'])
    }
}
</script>