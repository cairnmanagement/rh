<template>
        <div class="row g-2">
            <div class="col mb-3">
                <label for="type" class="form-label">Type:</label>

                <select class="form-select" aria-label="Default select example">
                    <option selected></option>
                    <option value="1">Personnel</option>
                    <option value="2">Professionnel</option>
                </select>
            </div>
        </div>
        <div class="row g-2">
            <div class="col mb-3">
                <label for="mail" class="form-label">Adresse mail</label>
                <input type="mail" class="form-control" id="mail" name="mail">
            </div>
        </div>
</template>