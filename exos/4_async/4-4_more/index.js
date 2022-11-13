'use strict';
import { waitACertainTime } from '../../utils/index.js';
console.log('Exos 4-4: Plus de promesses');

/**========================================================================
 *                          GetJson
 *========================================================================**/
console.log('*** GetJson ***');

/**
 * 1) Créez une fonction getJSON qui:
 * - en entrée prend une url
 * - en sortie renvoie la promesse de la donnée parsée en JSON
 * 2) Utilisez cette fonction getJson pour afficher les données à cette adresse:
 * https://swapi.dev/api/people/6/
 */

const url = 'https://swapi.dev/api/people/6/'

async function getJSON(url) {
    const response = await fetch(url);
    const data = response.json()

    return data
}

getJSON(url).then(data => console.log(data))

/**========================================================================
 *                          La rebellion
 *========================================================================**/
console.log('*** La rebellion ***');

/**
 * 1) Chargez les données des 5 premiers personnages Star Wars en parallèle,
 * et affichez leur données
 */

const url2 = 'https://swapi.dev/api/people/'
const nb = [1, 2, 3, 4, 5]

const urls = nb.map(nb => getJSON(url2 + nb))

Promise.all(urls).then(function (tableauDesResultats) {
    console.log(tableauDesResultats);
});

/**========================================================================
 *                          [Bonus] Medium
 *========================================================================**/
console.log('*** [Bonus] Medium ***');

/**
 * La fonction waitACertainTime crée une promesse similaire à celle de l'exercice 4-1: Bonus
 * 1) Trouvez un moyen d'estimer le temps d'attente maximum qu'accepte
 * d'attendre la promesse créée par cette fonction
 */
