<template>
    <div class="row row-cols-1 row-cols-lg-2">
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                        <h3><span class="me-2">{{tabStats.actifs}}</span> personnels actifs</h3>
                        <router-link :to="{name:'PersonnelNew'}" v-slot="{navigate,href}" custom>
                            <a :href="href" @click="navigate" class="btn btn-light">Nouveau<i class="bi bi-plus-lg ms-1"></i></a>
                        </router-link>
                    </div>
                    <div>
                    </div>
                    <PersonalList :tab = "tabStats"></PersonalList>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                        <h3><span class="me-2"> {{tabContractsDay.total}} </span>  Contrats en cours</h3>
                        <div class="form-check form-switch form-check-reverse ms-2" title="Mode graphique">
                            <input class="form-check-input" type="checkbox" role="switch" id="chartModeSwitch" v-model="chartMode">
                            <label class="form-check-label" for="chartModeSwitch">
                                <i class="bi bi-bar-chart"></i>
                            </label>
                        </div>
                    </div>
                    <ContractsList :tabContracts="tabContractsDay" v-if="displayMode == 'list'"/>
                    <ContractsGraph :tabContracts="tabContractsDay" v-if="displayMode =='chart'"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import ContractsList from './ContractsList.vue';
import ContractsGraph from './ContractsGraph.vue';
import PersonalList from './PersonalList.vue';

export default {

    data() {
		return {
			chartMode: false,
            tabStats:{},
            tabContractsDay: {},
		}
	},

    methods:{
        displayStats (){
            let apiUrl = 'structurePersonnel/GET/stats';
            this.$app.apiGet(apiUrl)
            .then((data) => {
                this.tabStats = data;
                console.log('staff',this.tabStats);
            })
            .catch(this.$app.catchError);
        },

        displayStatsContractsDay(){
            let apiUrl = 'structurePersonnelContrat/GET/compteur?date';
            this.$app.apiGet(apiUrl)
            .then((data) => {
                this.tabContractsDay = data;
                console.log('contrats du jour', this.tabContractsDay);
            })
            .catch(this.$app.catchError);
        },

    },

    
    computed: {
        displayMode() {
                return this.chartMode ? 'chart' : 'list';
        },
    },

    mounted() {
        this.displayStats();
        this.displayStatsContractsDay();
    },


    components: { ContractsList, ContractsGraph, PersonalList,}
}

</script>