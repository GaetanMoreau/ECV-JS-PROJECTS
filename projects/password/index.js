'use strict'

const slider = document.getElementById("slider")
const output = document.getElementById("password__size-value")
const checkbox = document.getElementById("checkbox")
const password = document.getElementById("password")
const protection = document.getElementById("protection")
const passwordContainer = document.querySelector(".password__container")
const protectionContainer = document.querySelector(".protection__container")

/**Display password length */
output.innerHTML = slider.value
slider.oninput = function (options) {
    output.innerHTML = this.value
    makePassword(options)
}

/**Copy password to clipboard*/
const passwordCopy = document.querySelector('.password__copy')
passwordCopy.addEventListener('click', function () {
    if (password.textContent.length > 0) {
        navigator.clipboard.writeText(password.textContent).then(() => {
            alert("Copied to clipboard")
        })
    }
})

/**Return a random number*/
function random(nb) {
    return Math.floor(Math.random() * nb)
}

/**Return a random letter*/
const letters = 'abcdefghijklmnopqrstuvwxyz'
let randomLetters = '', randomLettersOdd = ''

function getLetter() {
    // [Romain] pkoi réassigner randomLetters ici ?
    return randomLetters = letters[Math.floor(Math.random() * letters.length)]
}

/**Create the password*/
function makePassword(options) {
    /**
     * [Romain] Ta fonction makePassword est très corrélée à ton interface.
     * Cela implique:
     * - plus dur à comprendre, notamment isoler le fond de ce qu'elle fait
     * - plus dur à débugguer
     * - impossible de s'en servir dans un autre contexte
     *
     * Dans ton cas, tu n'as pas du tout besoin de passer des options,
     * car tu viens les lire depuis des éléments extérieurs (slider, checkbox),
     * ce qui, en partie, fait que ta fonction est très corrélée à l'extérieur.
     *
     */

    randomLetters = ''
    options.size = slider.value
    options.withNumbers = checkbox.checked

    if (options.length === 0 || options.size.length === 0 || options.withNumbers.length === 0) {
        options.size = 10
        options.withNumbers = true
    }
    if (options.size < 8) {
        passwordContainer.classList.add("alert-container")
        protectionContainer.classList.add("alert")
        passwordContainer.classList.remove("sucess-container")
        protectionContainer.classList.remove("sucess")
        protection.textContent = "Your password is less than 8 characters long, which is weak for a secure password."
    } else {
        passwordContainer.classList.add("sucess-container")
        protectionContainer.classList.add("sucess")
        passwordContainer.classList.remove("alert-container")
        protectionContainer.classList.remove("alert")
        protection.textContent = "Good password !"
    }

    for (let i = 0; i < options.size; i++) {
        if (options.withNumbers === true) {
            if (i % 2 === 0) {
              /**
               * [Romain] tu n'as pas besoin de concaténer une lettre et un chiffre,
               * si tu mets une lettre pour les i pairs, et un chiffre pour les impairs
               * ...
               */
              randomLetters += getLetter() + random(10);
            }
        } else {
            randomLetters += getLetter()
        }
    }

    // [Romain] ... et du coup tu n'aurais pas besoin de supprimer la dernière lettre
    if (options.withNumbers === true) {
        if (options.size % 2 === 1) {
            let randomLettersOdd = randomLetters.slice(0, -1)
            password.textContent = randomLettersOdd
            return randomLettersOdd
        }
    }

    password.textContent = randomLetters
    return randomLetters
}
