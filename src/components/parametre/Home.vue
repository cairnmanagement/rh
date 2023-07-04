<template>

    <form @submit.prevent="record()" v-if="tmpConfig">
        <div class="card card-body my-3">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="MODULE_RH_REGNUM_AUTO" v-model="tmpConfig.MODULE_RH_REGNUM_AUTO" :disabled="isReadonly('MODULE_RH_REGNUM_AUTO')">
                <label class="form-check-label" for="MODULE_RH_REGNUM_AUTO">
                    <h4 class="fs-5">
                        Activer la gestion automatique du matricule
                        <span class="badge rounded-pill text-bg-admin">
                            <i class="bi bi-shield-shaded"></i> 5
                        </span>
                    </h4>
                </label>
            </div>
    
            <span class="form-text">
                La gestion automatisée permet au système de générer un matricule unique pour 
                chaque membre du personnel. Ce matricule peut être créé lors du premier contrat 
                de travail ou sur demande via la fiche personnel.
            </span>
    
            <div class="row mt-3" v-if="tmpConfig.MODULE_RH_REGNUM_AUTO">
                <div class="col">
                    <label for="MODULE_RH_REGNUM_NEXT" class="form-label">Prochain numéro généré</label>
                    <input type="text" id="MODULE_RH_REGNUM_NEXT" name="MODULE_RH_REGNUM_NEXT" class="form-control" v-model="tmpConfig.MODULE_RH_REGNUM_NEXT" :disabled="isReadonly('MODULE_RH_REGNUM_NEXT')">
                </div>
                <div class="col">
                    <label for="MODULE_RH_REGNUM_MATRIX" class="form-label">Matrice du matricule</label>
                    <input type="text" id="MODULE_RH_REGNUM_MATRIX" name="MODULE_RH_REGNUM_MATRIX" class="form-control" v-model="tmpConfig.MODULE_RH_REGNUM_MATRIX" :disabled="isReadonly('MODULE_RH_REGNUM_MATRIX')">
                    <div class="form-text">Ex : PE000000. Les 0 seront remplacés par le numéro automatique.</div>
                </div>
            </div>

            <div v-if="isReadonly('MODULE_RH_REGNUM_AUTO')" class="text-admin  mt-2">
                Votre niveau utilisateur ne vous permet pas de modifier cette configuration. Renseignez vous auprès d'un administrateur.
            </div>
        </div>
    
        <div class="card card-body my-3">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="MODULE_RH_ENABLE_RUP" v-model="tmpConfig.MODULE_RH_ENABLE_RUP" :disabled="isReadonly('MODULE_RH_ENABLE_RUP')">
                <label class="form-check-label" for="MODULE_RH_ENABLE_RUP">
                    <h4 class="fs-5">
                        Activer l'enregistrement des contrats dans le RUP
                        <span class="badge rounded-pill text-bg-admin">
                            <i class="bi bi-shield-shaded"></i> 5
                        </span>
                    </h4>
                </label>
            </div>
    
            <span class="form-text">
                Le système verrouillera les contrats dans le Registre Unique du Personnel. Une fois enregistré dans 
                le RUP, les contrats ne sont plus modifiables. La création des avenants, la fin d'un contrat ou la 
                création d'un nouveau contrat sont conditionnés par l'enregistrement du contrat précédent dans le RUP.
            </span>

            <div v-if="isReadonly('MODULE_RH_ENABLE_RUP')" class="text-admin mt-2">
                Votre niveau utilisateur ne vous permet pas de modifier cette configuration. Renseignez vous auprès d'un administrateur.
            </div>
        </div>

        <div class="my-3 text-end">
            <button type="submit" class="btn btn-admin" :disabled="pending || isReadonly('all')">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="pending"></span>
                <i class="bi bi-shield-shaded" v-else></i> 
                Appliquer
            </button>
        </div>
    </form>

</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
            tmpConfig: null,
            pending: false,
            role_levels: {
                MODULE_RH_REGNUM_AUTO: 5,
                MODULE_RH_REGNUM_NEXT: 5,
                MODULE_RH_REGNUM_MATRIX: 5,
                MODULE_RH_ENABLE_RUP: 5
            }
        }
    },

    computed: {
        ...mapState(['config'])
    },
    
    methods: {
        ...mapActions(['updateConfig']),

        /**
         * Enregistre la nouvelle configuration
         */
        async record() {
            this.pending = true;
            try {
                const config = await this.$app.api.patch('v2/personnel/config', this.tmpConfig);
                this.updateConfig(config);
            }
            catch (e) {
                this.$app.catchError(e);
            }
            finally {
                this.pending = false;
            }
        },

        /**
         * Contrôle si une clé de configuration est accessible en lecture seule au regard du niveau utilisateur
         * 
         * @param {string} key La clé à contrôler
         */
        isReadonly(key) {
            const login_type = this.$app.local_user.login.type;

            if (key === 'all') {
                for (const k in this.role_levels) {
                    if (this.role_levels[k] <= login_type) {
                        return false;
                    }
                }
                return true;
            }
            else {
                return this.role_levels[key] > login_type;
            }
        }
    },

    beforeMount() {
        this.tmpConfig = JSON.parse(JSON.stringify(this.config));
        
        const boolVals = ['MODULE_RH_REGNUM_AUTO', 'MODULE_RH_ENABLE_RUP'];

        boolVals.forEach(key => {
            this.tmpConfig[key] = this.tmpConfig[key] ? true : false;
        })
    }
}
</script>