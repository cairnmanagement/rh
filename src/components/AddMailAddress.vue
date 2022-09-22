<template>
        <div class="row g-2">
            <div class="col mb-3">
            <label for="type" class="form-label me-3">Type:</label>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="typemail" id="inlineCheckbox1" value="option1">
                <label class="form-check-label" for="inlineCheckbox1">Professionnelle</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="typemail" id="inlineCheckbox2" value="option2">
                <label class="form-check-label" for="inlineCheckbox2">Personnelle</label>
            </div>
            </div>
        </div>
        <div class="row g-2">
            <div class="col mb-3">
                <label for="mail" class="form-label">Adresse mail</label>
                <input type="mail" class="form-control" id="mail" name="mail">
            </div>
        </div>
</template>