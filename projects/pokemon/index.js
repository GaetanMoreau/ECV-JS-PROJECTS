const url = `https://pokeapi.co/api/v2/generation`
const urlPokemon = `https://pokeapi.co/api/v2/pokemon`

const defaultImg = '/img/pokemon-logo.png'

const pokemonGeneration = document.querySelector('.pokemon__generation')
const pokemonChoose = document.querySelector('.controller-btn')
const controller = document.querySelector('.controller__container')
const pokemonContainer = document.querySelector('.pokemon__container')
const controllerInfo = document.querySelector('.controller__info')

pokemonChoose.addEventListener('click', function () {
    if (pokemonGeneration.value < 1 || pokemonGeneration.value > 8) {
        controllerInfo.textContent = "Generation should be between 1 and 8"
        controllerInfo.classList.add('alert')
        controllerInfo.classList.remove('sucess')
    } else {
        getPokemons(pokemonGeneration.value)
        controllerInfo.classList.add('sucess')
        controllerInfo.classList.remove('alert')
        controllerInfo.textContent = "Generation " + pokemonGeneration.value + " have been generated !"
    }
})


async function getPokemons(number, lang) {
    pokemonContainer.textContent = ''
    try {
        const response = await fetch(url + '/' + number);
        const data = await response.json()

        try {
            data.pokemon_species.forEach(async function (element) {
                const pokemonName = element.name
                const pokemonSpecies = await fetch(element.url)
                const pokemonSpeciesResults = await pokemonSpecies.json()
                const pokemonId = pokemonSpeciesResults.id

                const pokemonDetails = await fetch(urlPokemon + '/' + pokemonId)
                const pokemonDetailsResults = await pokemonDetails.json()
                const pokemonSprite = pokemonDetailsResults.sprites.front_default
                createPokemon(pokemonId, pokemonName, pokemonSprite)
            })
        }

        catch (error) {
            console.log('La raison du problème', error)
        }
        return data
    }
    catch (error) {
        console.log('La raison du problème', error)
    }
}

function createPokemon(pokemonId, pokemonName, pokemonSprite) {
    const pokemonItem = document.createElement('div')
    const pokemonDisplayId = document.createElement('p')
    const pokemonDisplayName = document.createElement('h2')
    const pokemonDisplayImage = document.createElement('img')
    const pokemonDisplayInfo = document.createElement('div')

    pokemonDisplayId.textContent = pokemonId
    pokemonDisplayName.textContent = pokemonName
    pokemonDisplayName.classList.add('pokemon__name')
    pokemonDisplayImage.src = pokemonSprite

    if (!pokemonSprite) {
        pokemonDisplayImage.src = 'img/default.png'
    }

    pokemonDisplayInfo.classList.add('pokemon__info')
    pokemonDisplayInfo.append(pokemonDisplayId)

    pokemonItem.append(pokemonDisplayInfo, pokemonDisplayImage, pokemonDisplayName)
    pokemonItem.classList.add('pokemon__card')
    pokemonContainer.append(pokemonItem)
}


// data.names.forEach(element => {
//     console.log(element.language.names)
// });