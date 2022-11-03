'use strict';
console.log('Exos 3-4: Stockage');

/**========================================================================
 *                           Who are you  ?
 *========================================================================**/
console.log('*** Who are you ? ***');

/**
 * 1) Utilisez l'input pour stocker votre nom dans le localStorage
 * 2) Affichez dans le <span> de l'élément #hello le nom lu depuis le localStorage
 * 3) Modifiez votre code pour également stocker le nom de famille, le tout devant être stocké dans un même objet {name, familyName}
 */

/*let inputName = document.querySelector("#name")
let inputSpan = document.querySelector("#hello span")

inputName.addEventListener('input', function () {
    localStorage.setItem('name', inputName.value)
    inputSpan.textContent = localStorage.getItem('name')
})*/

const inputName = document.querySelector("#name")
const inputFamilyName = document.querySelector("#familyName")
const inputSpan = document.querySelector("#hello span")

const personne = JSON.parse(localStorage.getItem('personne')) ?? { nom: '', prenom: '' }
inputSpan.textContent = personne.prenom + " " + personne.nom

inputName.addEventListener('input', function (e) {
    personne.prenom = e.target.value
    saveToStorage()
})
inputFamilyName.addEventListener('input', function (e) {
    personne.nom = e.target.value
    saveToStorage()
})

function saveToStorage() {
    localStorage.setItem('personne', JSON.stringify(personne))
    inputSpan.textContent = personne.prenom + " " + personne.nom
}

/**========================================================================
 *                           [Bonus] Contrôle parental
 *========================================================================**/
console.log('*** [Bonus] Contrôle parental ***');

/**
 * 1) Affichez le temps total passé sur la page
 */

let inputTime = document.querySelector("#time span")


