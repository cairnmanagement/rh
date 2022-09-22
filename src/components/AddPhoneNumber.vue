<template>
    <div>
        <div class="row g-2">
            <div class="col mb-3">
            <label for="type" class="form-label me-3">Type:</label>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="typemail" id="inlineCheckbox1" value="option1">
                <label class="form-check-label" for="inlineCheckbox1">Professionnel</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="typemail" id="inlineCheckbox2" value="option2">
                <label class="form-check-label" for="inlineCheckbox2">Personnel</label>
            </div>
            </div>
        </div>
        <div class="row g-2">
            <div class="col mb-3">
                <label for="tel" class="form-label">Numéro</label>
                <input type="tel" class="form-control" id="tel" name="tel">
            </div>
        </div>
    </div>
</template>