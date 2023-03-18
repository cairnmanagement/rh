<template>

    <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
            <div class="me-2">
                <UserImage :name="personnel.cache_nom" />
            </div>
            
            <div> {{personnel.cache_nom}}</div>
        </div>

        <div class="badge text-bg-secondary">
            {{personnel.matricule}}
        </div>
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