/**
 * Retourne le nom à afficher pour un personnel.
 * 
 * @param {object} personnel Le personnel à analyser
 * @param {object} options Les options supplémentaires
 * - {string} defaultName Le nom par défaut lorsque celui-ci est vide
 * 
 * @returns {string}
 */
export function getName(personnel, options)
{
    options = typeof options === 'undefined' ? {} : options;

    if (!options.defaultName) {
        options.defaultName = "Personnel non trouvé";
    }

    return personnel?.cache_nom ? personnel.cache_nom : options.defaultName;
}

/**
 * Retourne true si la licence contient un accès à l'application team-pointage
 * 
 * @param {object} licence La licence à contrôler
 * 
 * @return {bool}
 */
export function hasTeamclockAppLicence(licence)
{
    if (licence) {
        for (const key in licence.apps) {
            const app = licence.apps[key];
            const appName = app.split("@");
            if (appName[0] === "team-pointage") {
                return true;
            }
        }
    }
    return false;
}