'use strict';
console.log('Exos 3-2: DOM');

/**========================================================================
 *                           Chirugie
 *========================================================================**/
console.log('*** Chirurgie ***');

/**
 * 1) Changez le texte et la couleur du background de l'élément avec l'id 'coucou'
 * 2) Comptez les éléments de type 'i'
 * 3) Comptez les 'i' gris, bleus, et rouge
 * 4) Supprimez les éléments avec la classe 'inutile', ainsi que les i bleus et rouge
 * 5) Créez un élément de type 'p', avec:
 * - votre ville en textContent
 * - la classe 'blue'
 * - ajoutez cet élément en dernier enfant du footer
 * 6) Créez un élément de type 'h3', avec:
 * - 'Infos' en textContent
 * - la classe 'red'
 * - ajoutez cet élément en premier enfant du footer
 * Bonus) Créez 15 éléments de type 'div', avec la classe 'numero'.
 * - Ajoutez en textContent de ces éléments leur numero (entre 1 et 15) et ajoutez les à la 2e section
 */


let text = document.querySelector('#coucou')
text.textContent = "Bonsoir"
text.classList.add("primaryColor")

let numberOfI = document.querySelectorAll("i")
let numberOfBlueI = document.querySelectorAll('i.blue')
let numberOfRedI = document.querySelectorAll('i.red')
let numberOfGrayI = numberOfI.length - (numberOfBlueI.length + numberOfRedI.length)
console.log(numberOfI.length, numberOfGrayI, numberOfBlueI.length, numberOfRedI.length)


document.querySelectorAll('.inutile, .red, .blue').forEach(e => e.remove());
//numberOfRedI.forEach(e => e.remove())
//numberOfBlueI.forEach(e => e.remove())

let myCity = document.createElement("p");
myCity.textContent = "La Chapelle-Gonaguet"
myCity.classList.add("blue")

let footer = document.querySelector("footer")
footer.append(myCity)

let infos = document.createElement("h3");
infos.textContent = "Infos"
infos.classList.add("red")
footer.prepend(infos)


let secondSection = document.querySelectorAll("section")[1]

for (let i = 1; i < 15 + 1; i++) {
    let myDiv = document.createElement("div");
    myDiv.classList.add("numero")
    myDiv.textContent = i
    secondSection.append(myDiv)
}



/**========================================================================
 *                           [BONUS] Article
 *========================================================================**/
console.log('*** [BONUS] Article ***');

/**
 * 1) Déplacer l'article dans la 1ère section
 * 2) Reproduire programmatiquement l'élément d'article, et l'ajouter à la 2e section
 */

let article = document.querySelector("article")
let firstSection = document.querySelector("section")

firstSection.append(article)

let articleClone = article.cloneNode(true)
secondSection.append(articleClone)
