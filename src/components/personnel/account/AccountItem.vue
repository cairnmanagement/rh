<template>
    

    <li class="list-group-item d-flex align-items-center justify-content-between">

        <login-infos :login="login" />

        <div class="dropdown">
            <button class="btn btn-light dropdown-toggle btn-sm rounded-pill" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
            
            <ul class="dropdown-menu" style="">
                <li>
                    <router-link :to="'/personnel/'+personnel.id+'/account/'+login.id+'/pin'" v-slot="{navigate, href}" custom>
                        <a class="dropdown-item" :href="href" @click="navigate"><i class="bi bi-shield-lock me-2"></i>Modifier le code pin</a>
                    </router-link>
                    <button class="dropdown-item text-danger" @click.prevent="remove()"><i class="bi bi-person-x me-2"></i>Supprimer le lien</button>
                </li>
            </ul>
        </div>

    </li>

</template>

<script>

import LoginInfos from './LoginInfos.vue';

export default {

    components: { LoginInfos },

    props: {
        login: Object,
        personnel: Object
    },

    emits: ["removed"],

    methods: {
        /**
         * Supprimer le lien entre le personnel et l'utilisateur sélectionné
         */
        async remove() {
            if (confirm("Confirmez la suppression du lien avec l'utilisateur "+this.login.login)) {
                try  {
                    await this.$app.api.post("v2/personnel/"+this.personnel.id+"/account/unlink/"+this.login.id);
                    this.$emit("removed");
                }
                catch (e) {
                    this.$app.catchError(e);
                }
            }
        }
    }
}

</script>