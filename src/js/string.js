/**
 * Met un mot au pluriel en fonction d'un nombre fournis.
 * 
 * @param {string} word Le mot à mettre au pluriel
 * @param {number} number Le nombre à contrôler
 * 
 * @returns {string}
 */
export function pluralize(word, number) {
    let s = number > 1 ? "s" : "";
    return word+s;
} 