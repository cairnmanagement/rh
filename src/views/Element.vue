<template>

	<div class="container" v-if="openedElement">
		<section class="text-center py-3 bg-light" v-if="openedElement.extendedData">
			<div class="row">
				<div class="col-12 col-xxl-6">
					<div class="card mb-3">
						<personnel-header-card></personnel-header-card>
					</div>

					<div class="card mb-3">
						<etat-civil-info/>
					</div>

					<div class="card mb-3">
						<coord-info/>
					</div>
				</div>

				<div class="col-12 col-xxl-6">
					<div class="card">
						<contract-info :contracts="openedContrats"></contract-info>
					</div>
				</div>
			</div>	
		</section>

        <router-view></router-view>
	</div>

	<spinner v-else></spinner>

</template>

<script>

import {mapActions, mapState} from 'vuex'

import ContractInfo from '../components/ContractInfo.vue';
import CoordInfo from '../components/CoordInfo.vue';
import EtatCivilInfo from '../components/EtatCivilInfo.vue';
import Spinner from '../components/pebble-ui/Spinner.vue';
import PersonnelHeaderCard from '@/components/PersonnelHeaderCard.vue';

export default {
    data() {
        return {
            pending: {
                extendedData: true,
				contrats: true
            }
        };
    },

    computed: {
        ...mapState(["openedElement", 'openedContrats']),		
    },

	components: { ContractInfo, CoordInfo, EtatCivilInfo, Spinner, PersonnelHeaderCard },

    methods: {
		...mapActions(['setOpenedContrats']),
		
        /**
         * Charger les données complémentaires du personnel
		 * 
		 * @param {number}	personnelId		l'id d'un personnel
         */
        loadData(personnelId) {
			if (this.openedElement) {
				if (!this.openedElement.extendedData) {
					this.pending.extendedData = true;

					this.$app.apiGet("structurePersonnel/GET/" + personnelId, {
						api_hierarchy: true
					})
					.then(personnelData => {
						personnelData.extendedData = true;
						this.$store.dispatch("refreshOpened", personnelData);
					})
					.catch(this.$app.catchError)
					.finally(() => this.pending.extendedData = false);
				}
				else {
					this.pending.extendedData = false;
				}
			}
        },

		/**
		 * Charge l'ensemble des contrats du personnel ouvert
		 * 
		 * @param {number} personnelId ID du personnel pour charger les contrats. Si undefined, ID actif
		 */
		loadContract(personnelId) {
			personnelId = typeof personnelId === 'undefined' ? this.openedElement.id  : personnelId;
			this.pending.contrats = true;
			this.$app.apiGet("structurePersonnel/GET/" + personnelId +"/contrats")
			.then((data) => {
				this.setOpenedContrats(data);
			})
			.catch(this.$app.catchError).finally(() => this.pending.contrats = false);
        }
    },
	
    /**
     * Lorsque la route interne est mise à jour, le nouvel élément doit être chargé.
     */
    beforeRouteUpdate(to) {
        this.$store.dispatch("load", to.params.id);
        this.loadData(to.params.id);
        this.loadContract(to.params.id);

    },

    /**
     * Lorsqu'on quite la route active, l'élément ouvert est vidé.
     */
    beforeRouteLeave(from, to, next) {
        this.$store.dispatch("unload");
        next();
    },

    /**
     * Lorsque l'élément est monté, on va lire l'élément à charger passé en paramètre.
     */
    mounted() {
        /**
         * Ici on va charger l'élém
         */
        this.$store.dispatch("load", this.$route.params.id);
        this.loadData(this.$route.params.id);
		this.loadContract(this.$route.params.id);
    },
}

</script>
