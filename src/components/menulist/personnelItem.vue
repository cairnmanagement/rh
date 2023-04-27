<template>

    <div class="d-flex align-items-center justify-content-between">
        <personnel-name :personnel="personnel" />

        <div class="badge text-bg-secondary">
            {{personnel.matricule}}
        </div>
    </div>

</template>

<script>
import PersonnelName from '../personnel/PersonnelName.vue';


export default {
    props: {
        personnel: Object
    },

    components: { PersonnelName }
}

</script>