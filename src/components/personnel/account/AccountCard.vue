<template>
    
    <div class="card mb-3">
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between mb-2">
                <h4 class="card-title m-0">Utilisateurs et comptes</h4>

                <div>
                    <router-link :to="'/personnel/'+personnel.id+'/account/new'" v-slot="{navigate, href}" custom>
                        <a :href="href" class="btn rounded-pill btn-light mx-1" title="Ajouter un accès" @click="navigate">
                            <i class="bi bi-plus"></i>
                        </a>
                    </router-link>
                </div>
            </div>

            <ul class="list-group list-group-flush">
                <account-item v-for="login in logins" :key="login.id" :login="login" :personnel="personnel" />
            </ul>

            <div class="alert alert-info" v-if="!logins.length">Aucun compte n'est lié à ce personnel.</div>

        </div>
    </div>

</template>

<script>
import AccountItem from './AccountItem.vue'

export default {

    components: { AccountItem },

    props: {
        personnel: Object,
        logins: Array
    }

}

</script>