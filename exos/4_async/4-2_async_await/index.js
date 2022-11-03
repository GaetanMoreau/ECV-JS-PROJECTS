'use strict';
console.log('Exos 4-2: async / await');

/**========================================================================
 *                           Copycat
 *========================================================================**/
console.log('*** Copycat ***');

/**
 * 1) Reprendre les exercices de 4-1, mais avec unniquement async/await
 */

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
async function attendre() {
    try {
        const vp = await maPromesse;
        console.log('Valeur promise', vp);
    } catch (e) {
        console.log('La raison du problème', e);
    }
}
attendre()

function getnumber() {
    const p = new Promise(function (resolve) {
        setTimeout(() => {
            const number = random()
            resolve(number);
        }, 2000)
    });
    return p
}

async function somme() {
    try {
        const vp = await getnumber();
        const vp2 = await getnumber();
        const vp3 = await getnumber();
        console.log(vp, vp2, vp3)
        console.log('Valeur promise', vp + vp2 + vp3);
    } catch (e) {
        console.log('La raison du problème', e);
    }
}
somme()