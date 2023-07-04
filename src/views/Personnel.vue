<template>

	<div class="container py-3" v-if="openedPersonnel">
		<template v-if="openedPersonnel.extendedData">
			<div class="row">
				<div class="col-12 col-xxl-6">
					<div class="card mb-3">
						<personnel-header-card></personnel-header-card>
					</div>

					<div class="card mb-3">
						<etat-civil-info/>
					</div>

					<div class="card mb-3">
						<contact-info/>
					</div>
				</div>

				<div class="col-12 col-xxl-6">
					<div class="card">
						<ContratList :contrats="openedContrats" />
					</div>
				</div>
			</div>	
		</template>

        <router-view></router-view>
	</div>
	<spinner v-else></spinner>
</template>

<script>

import {mapActions, mapState} from 'vuex'

import ContratList from '../components/contrat/ContratList.vue';
import ContactInfo from '../components/ContactInfo.vue';
import EtatCivilInfo from '../components/EtatCivilInfo.vue';
import PersonnelHeaderCard from '@/components/PersonnelHeaderCard.vue';
import Spinner from '../components/pebble-ui/Spinner.vue';

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
        ...mapState(["openedPersonnel", 'openedContrats']),		
    },

	components: { ContratList, ContactInfo, EtatCivilInfo, PersonnelHeaderCard, Spinner },

    methods: {
		...mapActions(['setOpenedContrats']),
		
        /**
         * Charger les données complémentaires du personnel
		 * 
		 * @param {number}	personnelId		l'id d'un personnel
         */
        loadData(personnelId) {
			if (this.openedPersonnel) {
				
				if (!this.openedPersonnel.extendedData) {
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
			personnelId = typeof personnelId === 'undefined' ? this.openedPersonnel.id  : personnelId;
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
