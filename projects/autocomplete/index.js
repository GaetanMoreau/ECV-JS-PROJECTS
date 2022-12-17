'use strict'

// Déclaration des urls qui vont être utilisé
const urlCommunesBoost = 'https://geo.api.gouv.fr/communes?&fields=departement&boost=population'
const urlCommunes = 'https://geo.api.gouv.fr/communes'
const urlDepartements = 'https://geo.api.gouv.fr/departements'
const urlRegions = 'https://geo.api.gouv.fr/regions'

// Fonction qui nous sert à fetch une url
function getJson(url) {
    return fetch(url).then(resp => resp.json())
}

// Déclaration des tableaux qui vont être utilisé pour stocker et afficher les données récupérées pas l'api
let allData = []
let allCommunes = []
let allDeparements = []
let allRegions = []

const infoList = document.getElementById("infoFromList");

// Récupération des communes, départements, régions. Chaque url est parcouru est les données sont placé dans trois tableaux distincts
// Puis ces tableaux sont push dans un tableau principal, ce qui permet de bien différent les communes, départements et régions
function getData() {
    const communesP = getJson(urlCommunesBoost).catch(() => null);
    const departementsP = getJson(urlDepartements).catch(() => null);
    const regionsP = getJson(urlRegions).catch(() => null);

    return Promise.all([communesP, departementsP, regionsP]).then(([communes, departements, regions]) => {
        communes.forEach(function (data) {
            const communesName = data.nom
            const communesCode = data.departement.code
            allCommunes.push(communesName + " " + communesCode)
        })
        departements.forEach(function (data) {
            const departementsName = data.nom
            allDeparements.push(departementsName)
        })
        regions.forEach(function (data) {
            const regionsName = data.nom
            allRegions.push(regionsName)
        })
        /**
         * Je ne suis pas sur d'être fan de cette organisation.
         * Tu aurais pu choisir de créer un seul tableau, quitte à créer des objets de type
         * {nom: 'Bordeaux', type: 'Commune'}
         * {nom: 'Nouvelle-Aquitaine', type: 'Région'}
         */
        allData.push(allCommunes, allDeparements, allRegions)
    }).catch(e => {
        console.error('Oups...', e);
    });
}

// Charger toutes les données initialement dans ce cas n'est pas idéal (35000+ communes)
getData()

// Ajoute un écouteur d'événement "input" pour écouter la saisie par l'utilisateur,
let inputField = document.getElementById("inputField");
inputField.addEventListener("input", function (e) {
    const inputValue = e.target.value;
    // Création d'un nouveau tableau principal avec les sous-tableaux dont les éléments correspondent à la valeur dans l'input
    const filteredData = allData.map(item => item.filter(subitem => subitem.toLowerCase().startsWith(inputValue.toLowerCase())));
    // Envoie de ce tableau dans la fonction updateAutocomplete
    updateAutocomplete(filteredData);
});

// Fonction qui va afficher les données correspondantes à la saisie de l'utilisateur dans la page
function updateAutocomplete(data) {
    // Cache le bloc d'information d'un élément si déja affiché sur la page
    if (infoList.style.display = "flex") {
        infoList.style.display = "none"
    }
    // Réinitialise la liste déroulante en supprimant tous les éléments existants
    const autocompleteList = document.getElementById("autocompleteList");
    while (autocompleteList.firstChild) {
        autocompleteList.removeChild(autocompleteList.firstChild);
    }
    // Ajoute les éléments filtrés à la liste déroulante

    /**
     * Vu le nombre d'éléments à afficher dans ton cas,
     * ça vaut peut-être le coup de filtrer pour n'afficher que les 5 premiers de chaque type par ex.
     */
    data.forEach((item, index) => {
        // Dans chaque itération, "item" est un des sous-tableaux de "data"
        item.forEach(element => {
            // Crée un nouvel élément <li> pour chaque élément du tableau de données
            const li = document.createElement("li");
            let current = '<span>' + element.substr(0, inputField.value.length) + '</span>'
            current += element.substr(inputField.value.length)
            li.innerHTML = current;

            // Attribution des classes selon le sous-tableau
            // Switch complètement inutile, ici if, else if, else suffit
            switch (true) {
                case index === 0:
                    li.classList.add("communes")
                    break
                case index === 1:
                    li.classList.add("departements")
                    break
                case index === 2:
                    li.classList.add("regions")
                    break
            }

            // Ajoute un écouteur d'événement "click" pour sélectionner la valeur de l'élément lorsqu'il est cliqué, et pour obtenir les informations de l'élément
            li.addEventListener("click", function () {
                inputField.value = element;
                autocompleteList.textContent = ""
                getDataFromList(element.replace(/\d/g, ''))
            });

            // Ajoute l'élément <li> à la liste déroulante
            autocompleteList.appendChild(li);
        });
    });
    // Si l'input est vidé, ne pas afficher tous les éléments
    if (inputField.value === "") {
        autocompleteList.textContent = ""
    }
}

// Récupération des informations de l'élément cliqué dans l'autocomplete
function getDataFromList(element) {
    const choosenCommune = getJson(urlCommunes + "?nom=" + element).catch(() => null);
    const choosenDepartement = getJson(urlDepartements + "?nom=" + element).catch(() => null);
    const choosenRegion = getJson(urlRegions + "?nom=" + element).catch(() => null);

    /**
     * Ici c'est bizarre, tu fetch des données pour potentiellement plusieurs
     * communes, départements ou régions, alors qu'on ne peut cliquer que sur un seul élément à la fois.
     */
    return Promise.all([choosenCommune, choosenDepartement, choosenRegion]).then(([communes, departements, regions]) => {
        communes.forEach(function (data) {
            const elementCorrect = element.substring(0, element.length - 1)
            if (data.nom === elementCorrect) {
                updateInfoList(data)
            }
        })
        departements.forEach(function (data) {
            updateInfoList(data)
        })
        regions.forEach(function (data) {
            updateInfoList(data)
        })
    }).catch(e => {
        console.error('Oups...', e);
    });
}

// Fonction qui va afficher les données de l'élément cliqué dans l'autocomplete
function updateInfoList(data) {
    infoList.innerHTML = ""
    infoList.style.display = "flex"
    const list = document.createElement("ul");

    let content = '';
    Object.entries(data).forEach(([key, value]) => {
        content += `<li>${key}: ${value}</li>`;
    })

    list.innerHTML = content
    infoList.appendChild(list);
}
