<template>
    
    <div class="card my-3">
        <div class="card-body" v-if="attributes">
            <h3 class="card-title">Attributs</h3>

            <div class="row">
                <div class="col" v-for="attributeConfig in attributeConfigs" :key="attributeConfig.type">
                    <attribute-button :attribute="getPersonnelAttribute(attributeConfig.type)" :personnel="personnel" :attributeConfig="attributeConfig" />
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import AttributeButton from './AttributeButton.vue'

export default {
  components: { AttributeButton },
    props: {
        personnel: Object
    },

    data() {
        return {
            attributeConfigs: [
                {
                    type: "secteur",
                    fallbackLabel: "Définir un secteur",
                    collectionName: "personnelSecteurs"
                },
                {
                    type: "fonction",
                    fallbackLabel: "Définir une fonction",
                    collectionName: "personnelFonctions"
                }
            ],
            attributes: null
        }
    },

    watch: {
        personnel: {
            deep: true,
            handler() {
                this.storePersonnelAttributes();
            }
        }
    },

    methods: {
        /**
         * Retourne les informations du type d'attribut passé en paramètre
         * 
         * @param {string} type fonction, secteur
         */
        getPersonnelAttribute(type) {
            return this.attributes[type];
        },

        /**
         * Retourne la configuration du type d'attribut passé en paramètre
         * 
         * @param {string} type fonction, secteur
         */
        getAttributeConfig(type) {
            return this.attributeConfigs.find(e => e.type === type);
        },

        /**
         * Stocke les informations concernant les attributs du personnel actif
         */
        async storePersonnelAttributes() {
            this.attributes = null;

            let attributes = {};

            for (const config of this.attributeConfigs) {
                const collection = this.$assets.getCollection(config.collectionName);
                const mls = "mls__"+config.type;
                attributes[config.type] = this.personnel[mls] ? await collection.getById(this.personnel[mls]) : null;
            }

            this.attributes = attributes;
        }
    },

    mounted() {
        this.storePersonnelAttributes();
    }

}

</script>