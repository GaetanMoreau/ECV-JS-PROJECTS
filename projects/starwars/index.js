'use strict'
const charactersContainer = document.querySelector(".characters__grid")
const btnContainer = document.querySelector(".btn__numbers")
let active = null
const nbItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const url = 'https://swapi.dev/api/people/'

function getJson(url) {
    return fetch(url).then(resp => resp.json())
}

let i = 1
nbItems.forEach(function () {
    const btn = document.createElement("button")
    btn.setAttribute('id', i)
    btn.textContent = i
    btn.classList.add('btn__number')
    /**
     * tu peux utiliser l'argument de ta fonction pour récupérer l'item courant
     * et éviter d'avoir à créer et maintenir la variable i
     */
    i++
    btnContainer.append(btn)
})

/**Listener for button 'all'*/
document.getElementById('all').addEventListener('click', function (e) {
    changeColor(e)
    charactersContainer.textContent = ""
    Promise.all(
        nbItems.map(id => `https://swapi.dev/api/people/${id}`).map(getJson),
    ).then(data => {
      /**
       * Ici tu pourrais écrire juste data.forEach(createCharacter)
       */
        data.forEach(function (character) {
            createCharacter(character)
        })
    })
})

/**Listener for button button from 1 to 10*/
document.querySelectorAll(".btn__number").forEach(function (button) {
    button.addEventListener('click', function (e) {
        changeColor(e)
        charactersContainer.textContent = ""
        /**
         * Ici tu pourrais écrire juste then(createCharacter)
         */
        getJson(url + e.target.innerText).then(data => {
            createCharacter(data)
        })
    })
})

/**Listener for button 'random'*/
document.getElementById('random').addEventListener("click", function (e) {
    charactersContainer.textContent = ""
    changeColor(e)
    const nb = Math.floor(Math.random() * 10) + 1
    /**
     * Ici tu pourrais écrire juste then(createCharacter)
     */
    getJson(url + nb).then(data => {
        createCharacter(data)
    })
})

/**Create character item and display it*/
function createCharacter(character) {
    const charactersDiv = document.createElement("div")
    const charactersName = document.createElement("h2")
    const charactersHeight = document.createElement("p")
    const charactersMass = document.createElement("p")
    charactersName.textContent = "Name: " + character.name
    charactersHeight.textContent = "Height: " + character.height
    charactersMass.textContent = "Mass: " + character.mass

    const charactersFilmsList = document.createElement("ul")
    /**
     * Ça vaudrait peut-être le coup d'attendre les films de chaque personnage
     * avant d'afficher les films, pour éviter l'affichage au fur et à mesure,
     * qui peut paraitre bizarre.
     */
    character.films.forEach(function (film) {
        getJson(film).then(data => {
            const charactersFilmItem = document.createElement("li")
            charactersFilmItem.textContent = data.title
            charactersFilmsList.append(charactersFilmItem)
        })
    })
    /**
     * Si tu cliques vite sur 2 boutons différents,
     * les persos vont se cumuler
     */
    charactersContainer.append(charactersDiv)
    charactersDiv.append(charactersName, charactersHeight, charactersMass, charactersFilmsList)
}

/**Change button color*/
function changeColor(e) {
    if (active) {
        active.classList.remove('active')
    }
    const target = e.currentTarget
    target.classList.add('active')
    active = target
}
