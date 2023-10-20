<template>
    

    <li class="list-group-item d-flex align-items-center justify-content-between">

        <div class="d-flex align-items-center">
            <div class="me-2">
                <user-image size="sm" :name="login.login" />
            </div>

            {{ login.login }}
        </div>

        <div class="dropdown">
            <button class="btn btn-light dropdown-toggle btn-sm rounded-pill" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
            
            <ul class="dropdown-menu" style="">
                <li>
                    <button class="dropdown-item"><i class="bi bi-shield-lock me-2"></i>Modifier le code pin</button>
                    <button class="dropdown-item text-danger" @click.prevent="remove()"><i class="bi bi-person-x me-2"></i>Supprimer le lien</button>
                </li>
            </ul>
        </div>

    </li>

</template>

<script>

export default {
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
                await this.api.post("v2/personnel/"+this.personnel.id+"/account/unlink/"+this.login.id);
                this.$emit("removed");
            }
        }
    }
}

</script>