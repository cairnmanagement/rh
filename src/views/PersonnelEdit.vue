<template>
    <AppModal 
    :title="this.$route.params.id ?'Modification Contact' : 'Nouveau Contact'" 
    size="lg" 
    @submit="record()"
    @modal-hide="routeToParent()" 
    :submitBtn="true" 
    :cancelBtn="true"
    >
        <ContactForm></ContactForm>
    </AppModal>
</template>
<script>
import { mapState } from 'vuex';

import AppModal from '../components/pebble-ui/AppModal.vue';
import ContactForm from '../components/ContactForm.vue';

export default {
    components: { AppModal, ContactForm },

    // data() {

    //     return {

    //         pending: {
    //             contact : false
    //         },
    //         personnel: null,

    //     }

    // },
    computed: {
        ...mapState(['openedElement']),
    },

    methods: {
        /**
         * retourne à la route précédente
         */
        routeToParent() {
            this.$router.go(-1);
        },

        record() {
            //alert('vous souhaitez enregistrer ces modifications')
            this.$app.apiPost('structurePersonnel/POST/'+this.openedElement.id+ {
                nss : '12345',
                nom: 'lehoux',
            })
            .then ((data) => {
                console.log(data)
            })
            .catch(this.$app.catchError)
        }
    },

    // record() {
    //         // Verrouille le status de chargement
    //         this.pending.contact = true;

    //         // Enregistre les informations
    //         this.$app.apiPost('structurePersonnel/POST/new', {
    //             civilite: this.personnel.civilite,
    //             nom: this.personnel.nom,
    //             prenom: this.personnel.prenom,
    //             dn: this.personnel.dn,
    //             lieuNaissance: this.personnel.lieuNaissance,
    //             nss: this.personnel.nss,
    //             nationalite: this.personnel.nationalite,
    //             // paysNaissance : this.personnel.paysNaissance
    //         })
    //         .then((data) => {
    //             // Met à jour le store avec les nouvelles informations
    //             this.updateRessource({
    //             });
    //             console.log('nouvea',data)
    //             this.routeToParent();
    //         })
    //         .catch(this.$app.catchError)
    //         .finally(() => {
    //             // Déverouille le status de chargement
    //             this.pending.contact = false;
    //         });

    //     },
}
</script>