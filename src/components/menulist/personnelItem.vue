<template>

    <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
            <div class="me-2">
                <UserImage :name="personnel.cache_nom" />
            </div>
            <div class="align-items-center justify-content-between">
                <div class="d-flex justify-content-between align-items-center"> {{personnel.cache_nom}}</div>
            </div>
        </div>

        <div class="badge bg-secondary">
            {{personnel.matricule}}
        </div>
        
        <!-- <i  v-if="searchArchived(personnel.id) & searchActifs(personnel.id)" class="bi bi-archive-fill text-success"></i>
        <i  v-else-if="searchArchived(personnel.id) & !searchActifs(personnel.id)" class="bi bi-archive-fill text-secondary"></i>

        <div v-else-if="!personnel.matricule" >
            <i class="bi bi-circle text-secondary"></i>
        </div>

        <div v-else-if="!searchArchived(personnel.id) & !searchActifs(personnel.id)" class="badge bg-secondary">
            {{personnel.matricule}}
        </div>

        <div v-else-if="!searchArchived(personnel.id) & searchActifs(personnel.id)" class="badge bg-success">
            {{personnel.matricule}}
        </div> -->
    </div>

</template>

<script>
import UserImage from '../pebble-ui/UserImage.vue';


export default {
    props: {
        personnel: Object
    },

    components: { UserImage }
}

</script>