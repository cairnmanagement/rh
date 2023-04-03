<template>

    <div class="row">
        <div class="col-3">
            <div class="list-group list-group-flush">
                <a href="#" class="list-group-item list-group-item-action" :class="{'active': tab == 'type'}" @click.prevent="tab = 'type'"><i class="bi bi-app"></i> Types</a>
                <a href="#" class="list-group-item list-group-item-action" :class="{'active': tab == 'qualification'}" @click.prevent="tab = 'qualification'"><i class="bi bi-app"></i> Qualifications</a>
                <a href="#" class="list-group-item list-group-item-action" :class="{'active': tab == 'statut'}" @click.prevent="tab = 'statut'"><i class="bi bi-app"></i> Statuts</a>
            </div>
        </div>
        <div class="col border-left">
            <component :is="activeView" :ressourceName="tab" />
        </div>
    </div>
    
    
</template>

<script>

import ContratRessourceList from './ContratRessourceList.vue';
import Home from './Home.vue';

export default {
    data() {
        return {
            tab: 'home'
        }
    },

    computed: {
        /**
         * Retourne la vue à charger en fonction de tab.
         * 
         * @returns {string}
         */
        activeView() {
            if (['type', 'qualification', 'statut'].includes(this.tab)) {
                return 'ContratRessourceList';
            }
            else {
                return 'Home';
            }
        }
    },

    components: { ContratRessourceList, Home },
}
</script>