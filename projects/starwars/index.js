const charactersContainer = document.querySelector(".characters__grid")
let active = null

async function getStarWarsData() {
    try {
        const response = await fetch('https://swapi.dev/api/people/')
        const data = await response.json()
        charactersContainer.textContent = ""

        data.results.forEach(function (character) {
            const charactersDiv = document.createElement("div")
            const charactersName = document.createElement("H2")
            const charactersHeight = document.createElement("p")
            const charactersMass = document.createElement("p")
            charactersName.textContent = "Name: " + character.name
            charactersHeight.textContent = "Height: " + character.height
            charactersMass.textContent = "Mass: " + character.mass

            const charactersFilmsList = document.createElement("ul")
            try {
                character.films.forEach(async function (film) {
                    const response = await fetch(film)
                    const data = await response.json()
                    const charactersFilmItem = document.createElement("li")
                    charactersFilmItem.textContent = data.title
                    charactersFilmsList.append(charactersFilmItem)
                })
            }

            catch (film) {
                console.log('La raison du problème', film)
            }

            charactersContainer.append(charactersDiv)
            charactersDiv.append(charactersName, charactersHeight, charactersMass, charactersFilmsList)
        })
    }

    catch (character) {
        console.log('La raison du problème', character)
    }
}

async function getStarWarsDataByIndex(index) {
    try {
        const response = await fetch('https://swapi.dev/api/people/' + index)
        const data = await response.json()

        const charactersDiv = document.createElement("div")
        const charactersName = document.createElement("H2")
        const charactersHeight = document.createElement("p")
        const charactersMass = document.createElement("p")
        charactersName.textContent = "Name: " + data.name
        charactersHeight.textContent = "Height: " + data.height
        charactersMass.textContent = "Mass: " + data.mass

        const charactersFilmsList = document.createElement("ul")
        try {
            data.films.forEach(async function (film) {
                const response = await fetch(film)
                const data = await response.json()
                const charactersFilmItem = document.createElement("li")
                charactersFilmItem.textContent = data.title
                charactersFilmsList.append(charactersFilmItem)
            })
        }

        catch (film) {
            console.log('La raison du problème', film)
        }

        charactersContainer.append(charactersDiv)
        charactersDiv.append(charactersName, charactersHeight, charactersMass, charactersFilmsList)
    }

    catch (character) {
        console.log('La raison du problème', character)
    }
}

document.getElementById('all').addEventListener('click', function (e) {
    changeColor(e)
    getStarWarsData()
})

const buttons = document.querySelectorAll(".btn__number").forEach(function (button) {
    button.addEventListener('click', function (e) {
        charactersContainer.textContent = ""
        changeColor(e)
        getStarWarsDataByIndex(button.textContent)
    })
})

document.getElementById('random').addEventListener("click", function (e) {
    charactersContainer.textContent = ""
    changeColor(e)
    getStarWarsDataByIndex(Math.floor(Math.random() * 10) + 1)
})

function changeColor(e) {
    if (active) {
        active.classList.remove('active')
    }
    const target = e.currentTarget
    target.classList.add('active')
    active = target
}