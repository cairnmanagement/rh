<template>
    <div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>Tous les contacts (actifs et inactifs)</span>
                <span class="badge bg-secondary">{{elements.length}}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span><i class="bi bi-person-plus-fill me-2"></i>Arrivées dans les 7 jours</span>
                <span class="badge bg-secondary">Y</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span><i class="bi bi-person-dash-fill me-2"></i>Départs dans les 7 jours</span>
                <span class="badge bg-secondary">Z</span>
            </li>
            <li v-if="birthday.length" class="list-group-item list d-flex justify-content-between align-items-center">
                <span class="text-success"><span class="text-success me-2"><i class="bi bi-balloon"></i></span>Aujourd'hui c'est l'anniversaire de {{birthdayString}}</span>
            </li>
        </ul>
    </div>
        
</template>
<script>
import { mapState } from 'vuex'


    export default {

        data() {
            return {
                displayMode: true,
                birthday: []
            };

        },
        computed: {
		...mapState(['elements', 'openedElement']),

            birthdayString() {
                let birthdayNames =[];

            this.birthday.forEach(birthday => {
                birthdayNames.push(birthday.cache_nom);
            })
            return birthdayNames.join(', ');
            }
        }
    }

</script>
