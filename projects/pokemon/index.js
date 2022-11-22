'use strict'
const urlPokemon = `https://pokeapi.co/api/v2/pokemon/`
const defaultImg = '/img/pokemon-logo.png'
const pokemonGeneration = document.querySelector('.pokemon__generation')
const pokemonChoose = document.querySelector('.controller-btn')
const controller = document.querySelector('.controller__container')
const pokemonContainer = document.querySelector('.pokemon__container')
const controllerInfo = document.querySelector('.controller__info')
const languageSelect = document.querySelector('.controller__language')

pokemonChoose.addEventListener('click', function () {
    if (pokemonGeneration.value < 1 || pokemonGeneration.value > 8) {
        controllerInfo.textContent = "Generation should be between 1 and 8"
        controllerInfo.classList.add('alert')
        controllerInfo.classList.remove('sucess')
    } else {
        generatePokemonList()
    }
})

const url = `https://pokeapi.co/api/v2/generation/`

/**
 * [Romain] Tes deux fonctions getGeneration et getPokemonSprite sont exactement les mêmes
 * et devraient s'appeler plutot getJson
 */
function getGeneration(url) {
    return fetch(url).then(resp => resp.json())
}
function getPokemonSprite(url) {
    return fetch(url).then(resp => resp.json())
}
// [Romain] La consigne demandait à ce que la fonction prenne des arguments. Ce n'est pas le cas ici.
function generatePokemonList() {
    pokemonContainer.textContent = ''
    getGeneration(url + pokemonGeneration.value).then(data => {
        const promises = []
        // [Romain] tu pourrais utiliser un .map() pour construire ton tableau de promesses
        for (let i = 0; i < data.pokemon_species.length; i++) {
            const url = data.pokemon_species[i].url
            promises.push(fetch(url).then((res) => res.json()))
        }
        Promise.all(promises).then((results) => {
            const pokemon = results.map((result) => ({
                id: result.id,
                name: result.name,
                names: result.names,
            })).sort((a, b) => a.id > b.id ? 1 : -1)
            /**
             * [Romain] Pour une raison bizarre,
             * l'ordre a l'air bon ici, mais à l'affichage ce n'est pas toujours le cas
             */
            pokemon.forEach(function (pokemon) {
                const pokemonId = pokemon.id, pokemonLanguage = pokemon.names
                let pokemonName = null, pokemomImage = null
                pokemonLanguage.forEach(function (e) {
                    if (languageSelect.value == e.language.name) {
                        pokemonName = e.name
                    }
                })
                if (!pokemonName) {
                    pokemonName = pokemon.name
                }

                getPokemonSprite(urlPokemon + pokemonId).then(pokemonSprite => {
                    pokemomImage = pokemonSprite.sprites.front_default
                    createPokemon(pokemonId, pokemonName, pokemomImage)
                })
            })
        })
    })
    controllerInfo.classList.add('sucess')
    controllerInfo.classList.remove('alert')
    controllerInfo.textContent = "Generation " + pokemonGeneration.value + " have been generated !"

    // [Romain] La consigne demandait à renvoyer une liste. Or ta fonction ne renvoie rien.
}

function createPokemon(pokemonId, pokemonName, pokemomImage) {
    const pokemonItem = document.createElement('div')
    const pokemonDisplayId = document.createElement('p')
    const pokemonDisplayName = document.createElement('h2')
    const pokemonDisplayImage = document.createElement('img')
    const pokemonDisplayInfo = document.createElement('div')

    pokemonDisplayId.textContent = pokemonId
    pokemonDisplayName.textContent = pokemonName
    pokemonDisplayName.classList.add('pokemon__name')
    pokemonDisplayImage.src = pokemomImage

    if (!pokemomImage) {
        pokemonDisplayImage.src = 'img/default.png'
    }

    pokemonDisplayInfo.classList.add('pokemon__info')
    pokemonDisplayInfo.append(pokemonDisplayId)

    pokemonItem.append(pokemonDisplayInfo, pokemonDisplayImage, pokemonDisplayName)
    pokemonItem.classList.add('pokemon__card')
    /**
     * [Romain] En général on voudrait que createPokemon renvoie la <div> créée
     * pour l'ajouter au DOM plus tard.
     * Ça permet de pouvoir réutiliser cette fonction dans un autre contexte.
     */
    pokemonContainer.append(pokemonItem)
}
