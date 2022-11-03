'use strict';
console.log('Exos 3-3: Évènements');

/**========================================================================
 *                           Couleurs
 *========================================================================**/
console.log('*** Couleurs ***');

/**
 * 1) Créez une <div> pour chaque couleur, avec la class 'color'
 * 2) L'ajouter à l'élément de la page qui a l'id 'exo1'
 * 3) Chaque div doit avoir un fond coloré de sa couleur
 * 4) Chaque div doit afficher en textContent le texte de sa couleur,
 * ainsi que la position de la couleur dans le tableau  (1. white)
 * 5) Au click, chaque div doit changer la couleur du background du body
 */

const colors = [
  'white',
  'blue',
  'red',
  'green',
  'black',
  'grey',
  'orange',
  'purple',
];

let element = document.getElementById('exo1')
colors.forEach(function (color, index) {
  const d = document.createElement("div")
  d.classList.add('color')
  element.append(d)
  d.style.backgroundColor = color
  d.textContent = (index + 1) + ". " + color

  d.addEventListener("click", function () {
    document.body.style.backgroundColor = color
  }
  );
});


/**========================================================================
 *                           Taille
 *========================================================================**/
console.log('*** Taille ***');

/**
 * 1) Créez une <section> avec l'id 'exo2', et l'ajouter au body
 * 2) Créez une <div> carrée, de couleur noire, et l'ajouter à la 2e section
 * 3) Lui ajouter un listener au mousemove, qui change sa largeur
 * en fonction de la position en Y de la souris à l'écran (event.clientY)
 */

let secondSection = document.createElement("section")
secondSection.setAttribute('id', 'exo2')
document.body.append(secondSection)


let squareDiv = document.createElement("div")
squareDiv.classList.add('square')
secondSection.append(squareDiv)

squareDiv.addEventListener('mousemove', function (event) {
  squareDiv.style.width = event.clientY + 'px'
})



/**========================================================================
 *                           Nom
 *========================================================================**/
console.log('*** Nom ***');

/**
 * 1) Créez une <section> avec l'id 'exo3', et l'ajouter au body
 * 2) Ajouter un `<input />` à la section 'exo3'
 * 3) Lui ajouter un listener au input, qui change le 'textContent' du '<h1>' pour y mettre le contenu de l'input
 */

let thirdSection = document.createElement("section")
thirdSection.setAttribute('id', 'exo')
document.body.append(thirdSection)

let exo3Input = document.createElement("input")
thirdSection.append(exo3Input)

let title = document.querySelector('h1')

exo3Input.addEventListener('input', function (event) {
  title.textContent = event.target.value
})


/**========================================================================
 *                           Clavier
 *========================================================================**/
console.log('*** Clavier ***');

/**
 * 1) Faire en sorte de changer la couleur du background du body quand on appuie sur 1, 2, 3...
 * en fonction de la position des boutons de l'exercice Couleurs
 * 2) Faire en sorte de remettre la page dans l'état initial (aucune section sauf exo1)
 * lorsque l'on appuie sur CTRL-R (COMMAND-R)
 * 3) Exécutez chacun des 3 premiers exercices lorsque la page est vide en appuyant sur ENTER
 */


document.addEventListener("keydown", function (event) {
  document.body.style.backgroundColor = colors[event.key]
}
)

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key == 'r') {
    event.preventDefault()
    document.body.style.backgroundColor = '#fff'
    secondSection.remove()
    thirdSection.remove()
  }
})

/**========================================================================
 *                           [Bonus] Harry Potter
 *========================================================================**/
console.log('*** [Bonus] Harry Potter ***');

/**
 * 1) Créez une <section> avec l'id 'exoBonus', et l'ajouter au body
 * 2) Créez une <div> pour Harry, avec la classe 'character' et l'ajouter à la section 'exoBonus'
 * 3) La div 'character' a pour enfant une div avec la classe 'name' avec le nom en textContent
 * et une img avec le src correspondant
 * 4) Ajoutez un listener qui, au click, choisit un personnage au hasard
 * puis remplace les infos
 * 5) Essayez de faire la même chose, mais le listener doit recréer de zéro une nouvelle <div>,
 * puis remplacer la <div> courante, et garder le même comportement au click
*/

const characters = [
  {
    name: 'Harry',
    src: 'static/Harry_Potter_character_poster.jpeg',
  },
  {
    name: 'Hermione',
    src: 'static/Hermione_Granger_poster.jpeg',
  },
  {
    name: 'Ron',
    src: 'static/Ron_Weasley_poster.jpeg',
  },
  {
    name: 'Sirius',
    src: 'static/Sirius_Black.jpeg',
  },
  {
    name: 'Rubeus',
    src: 'static/RubeusHagrid.jpeg',
  },
  {
    name: 'Albus',
    src: 'static/Dumbledore_and_Elder_Wand.jpeg',
  },
];

let bonusSection = document.createElement("section")
bonusSection.setAttribute('id', 'exoBonus')
document.body.append(bonusSection)

let bonusDiv = document.createElement("div")
bonusDiv.classList.add('character')
bonusSection.append(bonusDiv)

let nameDiv = document.createElement("div")
nameDiv.textContent = characters[0]['name']
let imgBonus = document.createElement("img")
imgBonus.src = characters[0]['src']
bonusDiv.append(nameDiv, imgBonus)

bonusDiv.addEventListener('click', function () {
  let bonusDiv2 = document.createElement("div")
  bonusDiv2.classList.add('character')
  let choosenCharacter = characters[Math.floor(Math.random() * characters.length)]
  imgBonus.src = choosenCharacter['src']
  nameDiv.textContent = choosenCharacter['name']
  bonusDiv2.append(nameDiv, imgBonus)
  bonusDiv.replaceWith(bonusDiv2)
})