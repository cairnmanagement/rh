<template>
    <div class="input-group">
        <input type="text" class="form-control" :placeholder="placeholder" v-model="inputValue" />

        <button type="button" class="btn btn-primary d-flex justify-content-center align-items-center" @click.prevent="confirm()" :disabled="pending">
            <i v-if="!pending" class="bi bi-save me-1"></i>
            <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>

            <span v-if="!pending">{{ confirmLabel }}</span>
            <span v-else>{{ pendingLabel }}...</span>
        </button>

        <button type="button" class="btn btn-secondary d-flex justify-content-center align-items-center" @click.prevent="cancel()">
            <i class="bi bi-trash-fill me-1"></i>
            <span class="d-none d-md-block">{{ cancelLabel }}</span>
        </button>

    </div>
</template>

<script>

export default {
    props: {
        pending: Boolean,
        value: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: ""
        },
        confirmLabel: {
            type: String,
            default: 'Enregistrer'
        },
        pendingLabel: {
            type: String,
            default: "Enregistrement"
        },
        cancelLabel: {
            type: String,
            default: 'Annuler'
        }
    },

    emits: [
        'confirm',
        'cancel'
    ],

    data() {
        return {
            inputValue: null,
        }
    },

    methods: {
        /**
         * Charge les valeurs renseigner en props
         */
        loadInput() {
            this.inputValue = this.value;
        },

        /**
         * Annul la confirmation ou annule le le text renseigné
         * 
         * @return {void}
         */
        cancel() {
            this.inputValue = null;
            this.$emit('cancel');
        },

        /**
         * Confirme la valeur renseigné
         * 
         * @return {void}
         */
        confirm() {
            this.$emit('confirm', this.inputValue);
        }
    },

    mounted() {
        this.loadInput();
    }
}

</script>