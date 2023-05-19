<template>

    <div class="d-flex align-items-center justify-content-between">
        <personnel-identity :personnel="personnel" :showMatricule="true" />
    </div>

</template>

<script>
import PersonnelIdentity from '../personnel/PersonnelIdentity.vue';


export default {
    props: {
        personnel: Object
    },

    components: { PersonnelIdentity }
}

</script>