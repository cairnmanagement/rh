<template>
    <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="stat in stats" :key="stat.type">
            <span>{{ stat.type }}</span>
            <span class="badge text-bg-secondary">{{stat.value}}</span>
        </li>
    </ul>
</template>
<script>

export default {
    
    data() {
        return {
            displayMode: false
        }
    },

    props: {
        contratCurrentStats: Object
    },

    computed: {
        /**
         * Retourne un tableau séquentiel depuis contratCurrentStats. Chaque entrée contient un objet décrit comme suit :
         * - value (le nombre de contrat du type donné)
         * - type (le libellé du type de contrat)
         */
        stats() {
            let list = [];

            for (const type in this.contratCurrentStats) {

                const value = this.contratCurrentStats[type];

                if (type !== "total" && value) {
                    list.push({ value, type });
                }
            }

            return list;
        }
    }
  
}
</script>