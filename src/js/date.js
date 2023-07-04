import date from 'date-and-time';
import fr from 'date-and-time/locale/fr';

/**
 * Formate une date pour l'affichage.
 * 
 * Formatage retournée : 4 oct. 2023
 * 
 * @param {string|Date} val Une date au format YYYY-MM-DD HH:II:SS
 * 
 * @returns {string}
 */
export function getDisplayFormatedDate(val) {
    if (!val) {
        return null;
    }
    
    let d = val instanceof Date ? val : getDateFromSQL(val);
    date.locale(fr);
    return date.format(d, 'D MMM YYYY');
}

/**
 * Retourne un objet Date depuis une date SQL
 * 
 * @param {string} val Une date au format SQL
 * 
 * @returns {Date}
 */
export function getDateFromSQL(val) {
    val = val ? val.replace(' ', 'T') : null;
    return new Date(val);
}

/**
 * Retourne la valeur de la date ou NULL
 * 
 * La fonction retourne null si la valeur entrée est null ou égale à 0000-00-00( 00:00:00)
 * @param {string} val Une date au format SQL
 * @returns {string}
 */
export function getValue(val) {
    return val && val !== "0000-00-00 00:00:00" && val !== "0000-00-00" ? val : null;
}