<template>
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <h3 class="card-title fs-5 m-0">{{contratCurrentStats.total}} Contrats en cours</h3>
                <div class="form-check form-switch form-check-reverse ms-2" title="Mode graphique">
                    <input class="form-check-input" type="checkbox" role="switch" id="chartModeSwitch" v-model="chartMode">
                    <label class="form-check-label" for="chartModeSwitch">
                        <i class="bi bi-bar-chart"></i>
                    </label>
                </div>
            </div>

            <ContractsList :contratCurrentStats="contratCurrentStats" v-if="displayMode == 'list'"/>
            <ContractsGraph :contratCurrentStats="contratCurrentStats" v-if="displayMode =='chart'"/>
        </div>
</template>

<script>

import ContractsList from './ContractsList.vue';
import ContractsGraph from './ContractsGraph.vue';

export default {
    props: {
        contratCurrentStats: Object
    },

    data() {
        return {
            chartMode: true
        }
    },

    computed: {
        displayMode() {
                return this.chartMode ? 'chart' : 'list';
        }
    },

    components: { ContractsGraph, ContractsList}
}

</script>