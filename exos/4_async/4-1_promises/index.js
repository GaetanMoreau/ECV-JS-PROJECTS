'use strict';
console.log('Exos 4-1: Promesses');

/**========================================================================
 *                           Aléatoire
 *========================================================================**/
console.log('*** Aléatoire ***');

function random() {
    return Math.floor(Math.random() * 10)
}

const maPromesse = new Promise(function (resolve, reject) {
    setTimeout(() => {
        const number = random()
        if (number % 2 == 0) resolve('Le nombre est pair ' + number);
        else reject('Le nombre est impair ' + number);
    }, 2000)
});
maPromesse
    .then(function (valeurPromise) {
        console.log('Résultat:', valeurPromise);
    })
    .catch(function (erreur) {
        console.error('Erreur:', erreur);
    });

/**
 * 1) Créer une Promesse qui renvoie au bout de 2s un nombre entier aléatoire
 * - le nombre doit être entre 0 et 9
 * - si ce nombre est pair, le résoudre
 * - sinon le rejeter
 * Utiliser setTimeout().
 * 2) Consommer la Promesse de 1) pour:
 * - afficher le nombre renvoyé quand elle résoud
 * - logguer un message d'erreur quand elle est rejetée
*/

/**========================================================================
 *                            Calcul aléatoire
 *========================================================================**/
console.log('*** Calcul aléatoire ***');

function getnumber() {
    const p = new Promise(function (resolve) {
        setTimeout(() => {
            const number = random()
            resolve(number);
        }, 2000)
    });
    return p
}
const pA = getnumber()
pA.then((vpA) => {
    console.log(vpA)
    const pB = getnumber()
    pB.then((vpB) => {
        console.log(vpB)
        const pC = getnumber()
        pC.then((vpC) => {
            console.log(vpC)
            const vp = vpA + vpB + vpC
            console.log(vp)
        })
    })
})
/**
 * 1) En se servant de l'exercice précédent, créer une fonction qui renvoie une promesse
 * d'avoir un nombre aléatoire au bout de 2s
 * 2) Créer 3 nombres aléatoires, et calculer leur somme
 */

/**========================================================================
 *                           [Bonus] Attente incertaine
 *========================================================================**/
console.log('*** [Bonus] Attente incertaine ***');

/**
 * 1) Créez une Promesse qui:
 * - crée un nombre aléatoire (delay) en 0 et 5000
 * - au bout de 2s, rejeter la Promesse avec le texte 'Trop long...'
 * - au bout de delay ms pour résoudre le nombre delay
 * 2) Consommez la Promesse de sorte que si elle est rejetée,
 * on recommence jusqu'à ce qu'elle résolve
 */
