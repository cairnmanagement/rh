<template>
    <div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>Tous les contacts (actifs et inactifs)</span>
                <span class="badge bg-secondary">{{tab.contacts}} </span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span><i class="bi bi-person-plus-fill me-2"></i>Arrivées dans les {{tab.turnoverdays}} jours</span>
                <span class="badge bg-secondary">getIn()</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span><i class="bi bi-person-dash-fill me-2"></i>Départs dans les {{tab.turnoverdays}} jours</span>
                <span class="badge bg-secondary">getOut()</span>
            </li>
            <li class="list-group-item list d-flex justify-content-between align-items-center">
                <span class="text-success"><span class="text-success me-2"><i class="bi bi-balloon"></i></span>Aujourd'hui c'est l'anniversaire de {{birthdayString}}</span>
            </li>
        </ul>
    </div>
        
</template>
<script>
import { mapState } from 'vuex'


    export default {
        props: {
            tab: Object
        },

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
