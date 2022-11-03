const url = `https://pokeapi.co/api/v2/generation`
const urlPokemon = `https://pokeapi.co/api/v2/pokemon`

async function getPokemons(number, lang) {
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
                console.log(pokemonId, pokemonName, pokemonSprite)
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

getPokemons(1)


// data.names.forEach(element => {
//     console.log(element.language.names)
// });