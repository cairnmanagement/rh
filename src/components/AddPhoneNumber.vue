<template>
    <div>
        <form action="">
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
                    <label for="tel" class="form-label">Numéro</label>
                    <input type="tel" class="form-control" id="tel" name="tel">
                </div>
            </div>
        </form>
    </div>
</template>