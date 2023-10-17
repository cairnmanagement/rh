<template>

    <div class="row">
        <div class="col-3">
            <div class="list-group list-group-flush">
                <a href="#" class="list-group-item list-group-item-action" :class="{'active': tab == 'home'}" @click.prevent="tab = 'home'"><i class="bi bi-toggles"></i> Général</a>
                <a href="#" class="list-group-item list-group-item-action" :class="{'active': tab == 'type'}" @click.prevent="tab = 'type'"><i class="bi bi-bookmark"></i> Types</a>
                <a href="#" class="list-group-item list-group-item-action" :class="{'active': tab == 'qualification'}" @click.prevent="tab = 'qualification'"><i class="bi bi-bookmark"></i> Qualifications</a>
                <a href="#" class="list-group-item list-group-item-action" :class="{'active': tab == 'statut'}" @click.prevent="tab = 'statut'"><i class="bi bi-bookmark"></i> Statuts</a>
                <a href="#" class="list-group-item list-group-item-action" :class="{'active': tab == 'motif_fin'}" @click.prevent="tab = 'motif_fin'"><i class="bi bi-bookmark"></i> Motifs de fin</a>
                <a href="#" class="list-group-item list-group-item-action" :class="{'active': tab == 'secteur'}" @click.prevent="tab = 'secteur'"><i class="bi bi-person"></i> Secteurs</a>
                <a href="#" class="list-group-item list-group-item-action" :class="{'active': tab == 'fonction'}" @click.prevent="tab = 'fonction'"><i class="bi bi-person"></i> Fonctions</a>
            </div>
        </div>
        <div class="col border-left">
            <component :is="activeView" :ressourceName="tab" />
        </div>
    </div>
    
    
</template>

<script>

import RessourceList from './RessourceList.vue';
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
            if (['type', 'qualification', 'statut', 'motif_fin', 'fonction', 'secteur'].includes(this.tab)) {
                return 'RessourceList';
            }
            else {
                return 'Home';
            }
        }
    },

    components: { RessourceList, Home },
}
</script>