'use strict'
const charactersContainer = document.querySelector(".characters__grid")
let active = null

const url = 'https://swapi.dev/api/people/'
function getCharacters(url) {
    return fetch(url).then(resp => resp.json())
}
function getFilms(film) {
    return fetch(film).then(resp => resp.json())
}

/**Listener for button 'all'*/
document.getElementById('all').addEventListener('click', function (e) {
    changeColor(e)
    charactersContainer.textContent = ""
    Promise.all(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => `https://swapi.dev/api/people/${id}`).map(getCharacters),
    ).then(data => {
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
        getCharacters(url + e.target.innerText).then(data => {
            createCharacter(data)
        })
    })
})

/**Listener for button 'random'*/
document.getElementById('random').addEventListener("click", function (e) {
    charactersContainer.textContent = ""
    changeColor(e)
    const nb = Math.floor(Math.random() * 10) + 1
    getCharacters(url + nb).then(data => {
        createCharacter(data)
    })
})

/**Create character item and display it*/
function createCharacter(character) {
    const charactersDiv = document.createElement("div")
    const charactersName = document.createElement("H2")
    const charactersHeight = document.createElement("p")
    const charactersMass = document.createElement("p")
    charactersName.textContent = "Name: " + character.name
    charactersHeight.textContent = "Height: " + character.height
    charactersMass.textContent = "Mass: " + character.mass

    const charactersFilmsList = document.createElement("ul")
    character.films.forEach(function (film) {
        getFilms(film).then(data => {
            const charactersFilmItem = document.createElement("li")
            charactersFilmItem.textContent = data.title
            charactersFilmsList.append(charactersFilmItem)
        })
    })
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