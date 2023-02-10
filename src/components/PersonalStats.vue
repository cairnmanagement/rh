<template>
    <div class="card-body">
        <div class="d-flex align-items-center justify-content-between mb-2">
            <h3 class="card-title fs-5 m-0">{{personnelStats.actifs}} Personnels actifs</h3>
            <router-link :to="{name:'PersonnelNew'}" v-slot="{navigate,href}" custom>
                <a :href="href" @click="navigate" class="btn btn-primary btn-sm">
                    <i class="bi bi-plus-lg ms-1"></i>
                    Nouveau
                </a>
            </router-link>
        </div>

        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>Tous les contacts (actifs et inactifs)</span>
                <span class="badge text-bg-secondary">{{personnelStats.contacts}} </span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center" v-if="numIn">
                <span><i class="bi bi-person-plus-fill me-2"></i>Arrivées dans les {{personnelStats.turnoverdays}} jours</span>
                <span class="badge text-bg-secondary">{{numIn}}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center" v-if="numOut">
                <span><i class="bi bi-person-dash-fill me-2"></i>Départs dans les {{personnelStats.turnoverdays}} jours</span>
                <span class="badge text-bg-secondary">{{numOut}}</span>
            </li>
            <li class="list-group-item list d-flex justify-content-between align-items-center" v-if="birthdayString">
                <span class="text-success"><span class="text-success me-2"><i class="bi bi-balloon"></i></span>Aujourd'hui c'est l'anniversaire de {{birthdayString}}</span>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    props: {
        personnelStats: Object
    },

    computed: {
        /**
         * Retourne la liste des anniversaires sous la forme d'une chaine de 
         * caractères
         * 
         * @return {string}
         */
        birthdayString() {
            let birthdayNames =[];

            this.personnelStats.birthday.forEach(birthday => {
                birthdayNames.push(birthday.cache_nom);
            });

            return birthdayNames.join(', ');
        },

        /**
         * Retourne le nombre d'entrées
         * 
         * @return {number}
         */
        numIn() {
            return this.countTurnover('in');
        },

        /**
         * Retourne le nombre de sorties
         * 
         * @return {number}
         */
        numOut() {
            return this.countTurnover('out');
        }
    },
    
    methods: {
        /**
         * Retourne le nombre d'arrivées (in) ou de départs (out)
         * @param {string} direction 'in' 'out'
         * @return {number}
         */
        countTurnover (direction) {
            if (this.personnelStats[direction]) {
                return this.personnelStats[direction].length;
            }
            return 0;
        }
    }
}

</script>
