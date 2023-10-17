<template>

    <form method="post" @submit.prevent="record()" v-if="attributesCollection">
        <div class="mb-3">
            <label for="personnel_attribute" class="form-label">{{ attributeTypeLabel }}</label>
            <select name="personnel_attribute" id="personnel_attribute" class="form-select" v-model="attributeId">
                <option value="">Aucun</option>
                <option :value="attribute.id" v-for="attribute in attributesCollection" :key="attribute.id">{{ attribute.label }}</option>
            </select>
        </div>

        <div class="my-3">
            <button type="submit" class="btn btn-primary me-2"><i class="bi bi-check me-1"></i> Valider</button>
            <button type="button" class="btn btn-secondary" @click.prevent="cancel()">Annuler</button>
        </div>
    </form>

    <div class="my-2" v-else>
        <spinner />
    </div>

</template>

<script>
import Spinner from '../pebble-ui/Spinner.vue';

export default {
  components: { Spinner },
    props: {
        attributeConfig: Object,
        personnel: Object
    },

    data() {
        return {
            attributeId: null,
            attributesCollection: null
        }
    },

    emits: ["updated", "cancel"],

    computed: {
        attributeTypeLabel() {
            const str = this.attributeConfig.type;
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    },

    methods: {
        /**
         * Enregistre les informations sur le serveur
         */
        async record() {
            this.pending = true;

            const mls = "mls__"+this.attributeConfig.type;
            let payload = {};
            payload[mls] = this.attributeId;

            try {
                const personnel = await this.$app.apiPost("structurePersonnel/POST/"+this.personnel.id, payload);
                this.$emit("updated", personnel);
            }
            catch (e) {
                this.$app.catchError(e);
            }
            finally {
                this.pending = false;
            }
        },

        /**
         * Envoie un signal d'annulation
         */
        cancel() {
            this.storeCurrentAttributeId();
            this.$emit("cancel");
        },

        /**
         * Stoque dans le composant l'ID courrant de l'attribut sur le personnel
         */
        storeCurrentAttributeId() {
            const mls = "mls__"+this.attributeConfig.type;
            this.attributeId = this.personnel[mls];
        },

        /**
         * Stoque dans le composant la collection des attributs pour le type actif
         */
        storeAttributesCollection() {
            const collection = this.$assets.getCollection(this.attributeConfig.collectionName);
            this.attributesCollection = collection.getCollection();
        },

        /**
         * Initialise les informations
         */
        init() {
            this.storeCurrentAttributeId();
            this.storeAttributesCollection();
        }
    },

    mounted() {
        this.init();
    }
}

</script>