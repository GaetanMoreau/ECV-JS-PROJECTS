'use strict';
console.log('Exos 1-5: Tableaux');

/**========================================================================
 *                           Pop 'n Push
 *========================================================================**/
console.log("*** Pop 'n Push ***");

const nombres = [5, 6, 1, 2, 3, 4, 7];
/**
 * 1) Enlevez des éléments de 'nombres' pour ne garder que [1, 2, 3]
 * 2) Ajoutez des éléments dans 'nombres' pour faire [0, 1, 2, 3, 4, 5, 6]
 */
nombres.pop()
nombres.pop()
nombres.shift()
nombres.shift()
nombres.push(4, 5, 6)
console.log(nombres)

/**========================================================================
 *                           A7
 *========================================================================**/
console.log('*** A7 ***');

const speeds = [23, 12, 57, 178, 129, 434, 222, 1000, 59, 887, 134];

/**
 * 1) Logguez chacune des valeurs du tableau speeds dans la console avec une boucle for
 * 2) Faire de même avec une boucle .forEach() */

for (let i = 0; i < speeds.length; i++) {
    console.log(speeds[i])
}

speeds.forEach(function (element) {
    console.log(element)
})
/**
 * 3) Créer une fonction 'moins5' qui en entrée prend un nombre et renvoie le nombre moins 5
 * 4) Changer la boucle de la question 2 pour corriger chaque vitesse avec la fonction 'moins5'.
 * Si le résultat est supérieur à 130, logguer 'Vous allez trop vite !'
 */

function moins5(nb) {
    return nb - 5
}

speeds.forEach(function (element) {
    if (moins5(element) > 130) {
        console.log("Vous alelz trop vite !")
    }
})

/**========================================================================
 *                           Conversions
 *========================================================================**/
console.log('*** Conversions ***');

/**
 * 1) Créez un nouveau tableau avec les vitesses en m/s, en utilisant une boucle for.
 * 2) Même chose, en utilisant une boucle for of.
 * 3) Même chose, en utilisant .map().
 */
const kmHtoms = 1000 / 3600; // conversion de km/h à m/s
let newspeedms = []
let newspeedms2 = []

for (let i = 0; i < speeds.length; i++) {
    newspeedms.push(speeds[i] * kmHtoms)
}
console.log(newspeedms)

for (let vitesse of speeds) {
    newspeedms2.push(vitesse * kmHtoms)
}
console.log(newspeedms2)

const newspeedms3 = speeds.map(function (e) {
    return e * kmHtoms
})
console.log(newspeedms3)
/**
 * 4) Créez un tableau filtré (avec .filter) avec uniquement les vitesses en km/h supérieures à 130 km/h
 */
const newspeedms4 = speeds.filter(function (vitesse) {
    return vitesse > 130
})
console.log("ICI", newspeedms4)
/**
 * 5) Créez une fonction pour transformer une vitesse en km/h en vitesse en noeud;
 * 6) Utilisez cette fonction pour créer un tableau des vitesses en noeuds
 */

const ndTokmH = 1.852; // 1 noeud vaut 1.852 km/h

function transform(vitesse) {
    return vitesse / ndTokmH
}

const newspeedms5 = speeds.map(transform)
console.log(newspeedms5)

/**========================================================================
 *                           [Bonus] Pokemons
 *========================================================================**/
console.log('*** [Bonus] Pokemons ***');

/**
 * 1) Trouvez toutes les types uniques de Pokemons à partir du tableau de données pokemons
 */
import { pokemons } from '../../utils/index.js';

let pokemonstypes = []

for (let i = 0; i < pokemons.length; i++) {
    for (let j = 0; j < pokemons[i].types.length; j++) {
        if (!pokemonstypes.includes(pokemons[i].types[j].type.name)) {
            pokemonstypes.push(pokemons[i].types[j].type.name)
        }
    }
}

console.log(pokemonstypes);

/**========================================================================
 *                           [Bonus] Musique
 *========================================================================**/
/**
 * 1) Tableau des prenoms
 * 2) Tableau des des personnes dont le nom ou le prénom commence par F
 * 3) Tableau des prenoms + nom
 */

const personnes = [
    {
        nom: 'Hardy',
        prenom: 'Françoise'
    },
    {
        nom: 'François',
        prenom: 'Claude'
    },
    {
        nom: 'Dutronc',
        prenom: 'Jacques'
    }
]

let tableauPrenoms = []
for (let personne of personnes) {
    tableauPrenoms.push(personne.prenom)
}
console.log(tableauPrenoms)

let tableauStartWithF = []
for (let personne of personnes) {
    if (personne.prenom)
        tableauPrenoms.push(personne.prenom)
}
console.log(tableauStartWithF)

let tableauPrenomsNoms = []
for (let personne of personnes) {
    tableauPrenomsNoms.push(personne.prenom + " " + personne.nom)
}
console.log(tableauPrenomsNoms)

const tableau = personnes.map(function (personne) {
    return personne.prenom + " " + personne.nom
})