/**
 * Contrôle que le mot de passe saisis correspond bien aux critères de sécurités :
 * - des lettres minuscules
 * - des lettres majuscules
 * - des chiffres
 * - des caractères spéciaux
 * - au moins 8 caractères
 * 
 * @param {string} password Le mot de passe
 * @param {string} confirmation La confirmation du mot de passe
 */
export function validatePasswordOrThrow(password, confirmation) {
    if (password !== confirmation) {
        throw new Error("La confirmation du mot de passe n'est pas concordante.");
    }

    if (password.length < 8) {
        throw new Error("Le mot de passe doit faire au moins 8 caractères.");
    }

    if (!password.match(/[0-9]/g) || !password.match(/[a-z]/g) || !password.match(/[A-Z]/g) || !password.match( /[^a-zA-Z\d]/g)) {
        throw new Error("Le mot de passe doit contenir des caractères minuscules et majuscules, des chiffres et des caractères spéciaux.");
    }
}

/**
 * Contrôle que le pin saisis correspond bien aux critères de sécurité :
 * - 4 caractères
 * - Uniquement des chiffres
 * 
 * @param {string} pin Le code PIN
 * @param {string} confirmation La confirmation du PIN
 */
export function validatePinOrThrow(pin, confirmation) {
    if (pin !== confirmation) {
        throw new Error("La confirmation du code pin n'est pas concordante.");
    }

    if (pin.length != 4) {
        throw new Error("Le code pin doit faire exactement 4 caractères.");
    }

    if (!pin.match(/^[0-9]{4}$/g)) {
        throw new Error("Le code pin ne doit contenir que des chiffres.");
    }
}