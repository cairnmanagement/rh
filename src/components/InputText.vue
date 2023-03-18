<template>
    <div class="input-group mb-2">
        <input type="text" class="form-control" :placeholder="placeholder" v-model="inputValue"/>

        <button v-if="confirmMode" type="button" class="btn btn-warning d-flex justify-content-center align-items-center" @click="record()">
            <i class="bi bi-info-circle me-1"></i>
            <span class="d-none d-md-block">{{ confirmLabel }}</span>
        </button> 

        <button v-else type="button" class="btn btn-success d-flex justify-content-center align-items-center" @click.prevent="saveOptions()">
            <i class="bi bi-save me-1"></i>
            <span class="d-none d-md-block">{{ saveLabel }}</span>
        </button>

        <button v-if="pending">
            
        </button>

        <button type="button" class="btn btn-danger d-flex justify-content-center align-items-center" @click.prevent="cancelOptions()">
            <i class="bi bi-trash-fill me-1"></i>
            <span class="d-none d-md-block">{{ cancelLabel }}</span>
        </button>

    </div>
</template>

<script>

export default {
    name: "InputText",

    props: {
        value: String,
        placeholder: String,
        pending: Boolean,

        confirmSave: {
            type: Boolean,
            default: false
        },
        confirmCancel: {
            type: Boolean,
            default: false
        },

        saveLabel: {
            type: String,
            default: 'Enregistrer'
        },

        cancelLabel: {
            type: String,
            default: 'Annuler'
        },

        show: {
            type: Boolean,
            default: true
        }
    },

    emits: [
        'update:value',
        'update:show',
        'save-value'
    ],

    data() {
        return {
            inputValue: null,
            inputShow: null,
            confirmMode: null
        }
    },

    computed: {
        confirmLabel() {
            if ('save' == this.confirmMode) {
                return "Confirmer l'enregistrement"
            }

            if ('cancel' == this.confirmMode) {
                return "Confirmer l'annulation"
            }

            return '';
        }
    },

    watch: {
        /**
         * Met à jour la varible à l'element parents
         */
        inputValue() {
            this.updateProps('value', this.inputValue);
        },

        inputShow() {
            this.updateProps('show', this.inputShow);
        }
    },

    methods: {
        /**
         * Met à jour la variabel avec la nouvelle valeur via un emit
         * 
         * @param {String} props    props name a changer
         * @param {*} newVal        la nouvelle valeur
         */
        updateProps(props, newVal) {
            this.$emit(`update:${props}`, newVal); 
        },

        /**
         * Charge les valeurs renseigner en props
         */
        loadInput() {
            this.inputValue = this.value;
            this.inputShow = this.show;
        },

        /**
         * Annul la confirmation ou annule le le text renseigné
         * 
         * @return {void}
         */
        cancelOptions() {
            if (!this.confirmMode && this.confirmCancel) {
                this.confirmMode = 'cancel'
                return;
            } 

            if (this.confirmMode) {
                this.confirmMode = null;
                return;
            }

            this.inputValue = null;
            this.inputShow = false;
        },

        /**
         * Demande la confimation si confirmSave existe sinon lance l'enregistrement
         */
        saveOptions() {
            if (this.confirmSave) {
                this.confirmMode = 'save';
                return;
            }

            this.record();
        },

        /**
         * Envoi a l'element parents l'information de faire l'enregistrement
         */
        record() {
            if ('cancel' == this.confirmMode) {
                this.inputValue = null;
                this.inputShow = false;

                return;
            }

            this.confirmMode = null;
            this.$emit('save-value');
        }
    },

    mounted() {
        this.loadInput();
    }
}

</script>