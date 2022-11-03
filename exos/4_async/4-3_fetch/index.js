'use strict';
console.log('Exos 4-3: Fetch');

/**========================================================================
 *                           Meta HTML
 *========================================================================**/
console.log('*** Meta HTML ***');

/**
 * 1) Utilisez fetch pour récupérer la page test.html
 * - utiliser .text()
 * 2) Affichez le contenu de la page récupérée dans un <p>
 */

function getPage() {
  return fetch('test.html').then(function (response) {
    return response.text();
  });
}

getPage().then(function (pageContent) {
  console.log(pageContent);
});


/**========================================================================
 *                           Star Wars
 *========================================================================**/
console.log('*** Star Wars ***');

/**
 * 1) Utilisez fetch pour récupérer les données contenues à cette adresse
 * - utilisez .json()
 * 2) Affichez les infos principales du personnage dans votre page
 */
const starWarsUrl = 'https://swapi.dev/api/people/1/';

async function getStarWarsDataByUrl() {
  const response = await fetch(starWarsUrl);
  const data = await response.json();

  console.log(data);
}

getStarWarsDataByUrl();

/**
 * Bonus) Créez une fonction qui permet de récupérer les infos de n'importe quel personnage:
 * - en entrée, fournir un numéro
 * - en sortie, renvoyer les infos traitées (= passées par .json())
 * Affichez dans la page les infos des 5 premiers personnages
 */

async function getStarWarsData(index) {
  const response = await fetch('https://swapi.dev/api/people/' + index);
  const data = await response.json();

  return data
}
getStarWarsData(2);

async function getStarWarsDataBy5() {
  for (let i = 1; i < 6; i++) {
    getStarWarsData(i).then(function (data) {
      const div = document.createElement('div')
      div.textContent = data.name
      document.body.append(div)
    })
  }
}
getStarWarsDataBy5();


/**========================================================================
 *                           Svelte
 *========================================================================**/
console.log('*** Svelte ***');

/**
 * 1) Comptez le nombre de tweets dont le texte inclut "Svelte" à l'adresse suivante.
 */

const tweetsUrl =
  'https://raw.githubusercontent.com/iOiurson/data/master/data/tweets.json';
