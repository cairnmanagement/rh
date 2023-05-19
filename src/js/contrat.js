import { getValue as getDateValue, getDisplayFormatedDate } from "./date"

/**
 * Teste si un contrat est actif
 * 
 * - La date du jour est dans l'interval date de début et date de fin
 * - Le contrat n'a pas de date de fin et la date du jour et >= à la date de début
 * 
 * @param {object}
 * - {bool} fromFirst       false par défaut. Si true, prend en référence la date du premier contrat d'une chaine d'avenant
 * 
 * @param {object} contrat Le contrat à tester
 */
export function isActive(contrat, options) {
    options = options ?? {};

    let date_start = options.fromFirst ? new Date(getDateValue(contrat.dentree)) : getSelfDateStart(contrat);
    let date_end = getSelfDateEnd(contrat);

    let now = new Date();

    if (date_end) {
        return now >= date_start && now <= date_end;
    }
    else {
        return now >= date_start;
    }
}

/**
 * Retourne la date de début du contrat.
 * 
 * Si le contrat est un avenant, la fonction retourne la date de début de l'avenant et non celle du contrat originel.
 * 
 * @param {object} contrat Le contrat à tester
 * 
 * @returns {Date}
 */
export function getSelfDateStart(contrat) {
    let date = getDateValue(contrat.dentree_relative) ?? getDateValue(contrat.dentree);
    return date ? new Date(date) : null;
}

/**
 * Retourne la date de début du contrat originel en cas de séquence d'avenants
 * 
 * Si le contrat est un avenant, la fonction retourne la date d'entrée du premier contrat de la séquence.
 * 
 * @param {object} contrat Le contrat à tester
 * 
 * @returns {Date}
 */
export function getOriginDateStart(contrat) {
    let date = getDateValue(contrat.dentree);
    return date ? new Date(date) : null;
}

/**
 * Retourne la date de fin du contrat.
 * 
 * @param {object} contrat Le contrat à tester
 * 
 * @returns {Date}
 */
export function getSelfDateEnd(contrat) {
    let date = getDateValue(contrat.dsortie_reelle) ?? getDateValue(contrat.dsortie);
    return date ? new Date(date) : null;
}

/**
 * Transforme une clé de type en une chaine de caractère lisible pour l'affichage.
 * 
 * Remplace les underscores (_) par des espaces et met la première lettre en majuscule
 * 
 * @param {string} typeKey Le type de contrat sans caractères spéciaux ni espaces
 * 
 * @returns {string}
 */
export function getDisplayFormatedType(typeKey) {
    let label = typeKey.split('_').join(' ');
    label = label.charAt(0).toUpperCase() + label.slice(1);
    return label;
}

/**
 * Retourne une chaine de caractère formatée exprimant la période du contrat
 * 
 * Chaines retournées :
 * - Aucune date définie
 * - Depuis le 1 Fév. 2022
 * - Du 1 Fév. 2022 au 30 nov. 2022
 * 
 * @param {object} contrat Le contrat à analyser
 * 
 * @returns {string}
 */
export function getDisplayFormatedDateRange(contrat, options) {
    options = typeof options === 'undefined' ? {} : options;

    const dateStart = options.fromFirst ? getOriginDateStart(contrat) : getSelfDateStart(contrat);
    const dateEnd = getSelfDateEnd(contrat);

    if (!dateStart && !dateEnd) {
        return "Aucune date définie";
    }

    if (!dateEnd) {
        return `Depuis le ${getDisplayFormatedDate(dateStart)}`;
    }

    return `Du ${getDisplayFormatedDate(dateStart)} au ${getDisplayFormatedDate(dateEnd)}`;
}