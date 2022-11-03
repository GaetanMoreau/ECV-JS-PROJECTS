'use strict';
console.log('Exos 1-3: Boucles');

/**========================================================================
 *                           Assurance vie
 *========================================================================**/
console.log('*** Assurance vie ***');

/**
 * 1) Créez une variable money, l'initialiser à 10000
 * 2) Créez une boucle for qui multiplie money par 1.02 tous les 6 mois pendant 30 ans
 * 3) Afficher le résultat
 */
let money = 10000
for (let i = 1; i < 60; i++) {
    money *= 1.02
}
console.log(money)
/**========================================================================
 *                           Paires
 *========================================================================**/
console.log('*** Paires ***');

/**
 * 1) Affichez toutes les paires possibles de nombres entre 0 et 9.
 * (1, 2) et (2, 1) sont considérées 2 paires différentes.
 */

for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
        console.log(i, j)
    }
}

/**========================================================================
 *                           Carte Bleue
 *========================================================================**/
console.log('*** Carte bleue ***');

/**
 * 1) Créez une variable argent, l'initialiser à 1000
 * 2) Créez une variable cout, l'initialiser à 30
 * 3) À l'aide d'une boucle while, déduire de la variable argent le cout,
 * en vérifiant que l'opération soit toujours possible
 * 4) Combien d'opérations ont pu être effectuées avant de ne plus pouvoir payer ?
 */

let argent = 1000
let cout = 30
let i = 0;

while (argent > cout) {
    argent -= cout
    i++
}
console.log(argent, i)

/**
 * Bonus 1) Comment retrouver le résultat précédent avec une boucle for ?
 * Bonus 2) Comment retrouver ce résultat précédent sans aucune boucle ?
 */

//Bonus 1)
for (i; argent > cout; i++) {
    argent -= cout
}
console.log(argent, i)


// Bonus 2)
let nb = Math.floor(argent / cout * 100)
let reste = argent % cout
console.log(reste, nb)

/**========================================================================
 *                           [Bonus] Mastercard
 *========================================================================**/
console.log('*** [Bonus] Mastercard ***');

/**
 * 1) Reproduisez l'exercice précédent, avec le changement suivant:
 * - après chaque opération le coût augmente de 5%
 * tant que l'argent restant est plus grand strictement que 500
 * - sinon, le coût diminue de 15%
 * - le coût ne peut pas être plus grand que 45 ni plus petit que 15
 *
 * Combien reste t'il d'argent à la fin des achats ?
 * Combien de fois a t'on payé plus que 30€ ? Moins que 30€ ?
 */

let argent2 = 1000
let cout2 = 30
let j = 0;
let nbup = 0
let nbdown = 0

for (j; argent2 > cout2; j++) {
    if (argent2 > 500) {
        argent2 -= cout2
        cout2 += (1 + 5 / 100)
        nbup++
    } else {
        argent2 -= cout2
        cout2 -= (1 + 15 / 100)
        nbdown++
    }
}
console.log(argent2, j)
console.log(nbup, nbdown)

// Combien reste t'il d'argent à la fin des achats ? --> Il reste 23,95 €
// Combien de fois a t'on payé plus que 30€ ? Moins que 30€ ? --> Il y a eu 26 paiements, 14 à plus de 30€ et 12 à moins de 30€