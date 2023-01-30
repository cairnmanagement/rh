<template>
    <div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>Contrat à durée indéterminée</span>
                <span class="badge text-bg-secondary">{{contratCurrentStats.contrat_a_duree_indeterminee}}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>Contrat à durée déterminée</span>
                <span class="badge text-bg-secondary">{{contratCurrentStats.contrat_a_duree_determinee}}</span>
            </li>
            <li class="list-group-item list-group-flush d-flex justify-content-between align-items-center">
                <span>Contrat d'apprentissage</span>
                <span class="badge text-bg-secondary">{{contratCurrentStats.contrat_d_apprentissage}}</span>
            </li>
            <li class="list-group-item list-group-flush d-flex justify-content-between align-items-center">
                <span>Contrat de professionnalisation</span>
                <span class="badge text-bg-secondary">{{contratCurrentStats.contrat_de_professionnalisation}}</span>
            </li>
            <li class="list-group-item list-group-flush d-flex justify-content-between align-items-center">
                <span>Contrat de stage</span>
                <span class="badge text-bg-secondary">{{contratCurrentStats.stage}}</span>
            </li>
        </ul>
    </div>
</template>
<script>

export default {
    
    data() {
        return {
            displayMode: false
        }
    },

    props: {
        contratCurrentStats: Object
    },
  
}
</script>