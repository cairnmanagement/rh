<template>
    <div class="row g-2">
        <div class="col mb-3">
                <label for="type" class="form-label">Type:</label>
                <select class="form-select" aria-label="Default select example">
                    <option selected></option>
                    <option value="1">Contrat</option>
                    <option value="2">Domicile</option>
                </select>
            </div>
    </div>
    <div class="row g-2">
        <div class="col-2 mb-3">
            <label for="voie_numero" class="form-label">n°</label>
            <input type="number" class="form-control" id="voie_numero" name="voieNumero">
        </div>
        <div class="col mb-3">
            <label for="voie" class="form-label">Voie</label>
            <input type="text" class="form-control" id="voie_nom" name="voie">
        </div>
    </div>
    <div class="row g-2">
        <div class="col mb-3">
            <label for="localite" class="form-label">Complément</label>
            <input type="text" class="form-control" id="complement" name="complement">
        </div>
    </div>
    <div class="row g-2">
        <div class="col-3 mb-3">
            <label for="code_postal" class="form-label">Code postal</label>
            <input type="number" class="form-control" id="code_postal" name="cp">
        </div>
        <div class="col mb-3">
            <label for="localite" class="form-label">Localité</label>
            <input type="text" class="form-control" id="localite" name="localite">
        </div>
    </div> 
    <div class="row g-2">
        <div class="col mb-3">
            <label for="localite" class="form-label">Pays</label>
            <input type="text" class="form-control" id="pays" name="pays">
        </div>
    </div>	
</template>