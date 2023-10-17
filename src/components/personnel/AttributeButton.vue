<template>
    
    <div class="d-grid gap-2">
        <router-link :to="'/personnel/'+personnel.id+'/'+attributeConfig.type" custom v-slot="{ navigate, href }">
            <a :href="href" @click="navigate" class="btn btn-light text-center p-0 shadow-sm border" :class="labelClassName" type="button">
                <div class="p-2 border-bottom">
                    {{ typeLabel }}
                </div>
                
                <div class="p-2">
                    <i class="bi bi-plus me-2" v-if="!attribute"></i>
                    {{ attributeLabel }}
                </div>
            </a>
        </router-link>
    </div>

</template>

<script>

export default {
    props: {
        attribute: Object,
        personnel: Object,
        attributeConfig: Object
    },

    computed: {
        /**
         * Retourne le libellé à afficher
         * 
         * Si il n'y a pas d'attribut, c'est le libellé de base de la configuration qui est utilisé
         */
        attributeLabel() {
            return this.attribute ? this.attribute.label : this.attributeConfig.fallbackLabel;
        },

        /**
         * Retourne le libeller du type d'attribut
         */
        typeLabel() {
            const str = this.attributeConfig.type;
            return str.charAt(0).toUpperCase() + str.slice(1);
        },

        /**
         * Retourne une classe grisée lorsque auccun attribut n'est défini
         */
        labelClassName()  {
            return this.attribute ? "" : "text-muted";
        }
    }
}

</script>