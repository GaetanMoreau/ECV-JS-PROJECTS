'use strict'

// [Romain] Tu as modifié le HTML, j'aurais préféré pour cet exo que tu fasses tout en JS

const input = document.querySelector("#text")
const blackMail = document.querySelector("#blackmail")
const fontClasses = ['blackmail__font-1', 'blackmail__font-2', 'blackmail__font-3', 'blackmail__font-4']
const blackMailRemove = document.querySelector('.blackmail__remove')
// [Romain] cet élément est le même que #text, pas besoin d'en faire 2 variables
const blackMailInpute = document.querySelector('.blackmail__input')
let classIndex = ""

/**Get the value from the input and update the message*/
input.addEventListener('input', updateValue)
// [Romain] Il faudrait que tu utilises l'argument event ici pour récupérer la value
function updateValue() {
    blackMail.innerHTML = ""

    /**
     * [Romain] comme je disais, il est très recommandé de prendre l'habitude de récupérer
     * la value de l'input en utilisant event.target.value plutot que input.value
     */
    for (let i = 0; i <= input.value.length - 1; i++) {
        const divBlackMail = document.createElement("div")
        divBlackMail.textContent = input.value[i]
        classIndex = Math.floor(Math.random() * fontClasses.length)
        divBlackMail.classList.add(fontClasses[classIndex])
        blackMail.append(divBlackMail)
        if (divBlackMail.textContent == " ") {
            divBlackMail.classList.add('blackmail__space')
        }
    }
}

/**Save the message in the local storage*/
blackMailInpute.addEventListener('input', function () {
    localStorage.setItem('blackmail', input.value)
})

/**Get the message from the local storage*/
// [Romain] tu pourrais écrire window.addEventListener('load', get), ça serait pareil
window.addEventListener('load', () => {
    get()
})
function get() {
    const storedValue = localStorage.getItem('blackmail')
    if (storedValue) {
      // [Romain] Le code est dupliqué ici et dans updateValue, ça serait intéressant de le factoriser
        for (let i = 0; i <= storedValue.length; i++) {
            const divBlackMail = document.createElement("div")
            divBlackMail.textContent = storedValue[i]
            classIndex = Math.floor(Math.random() * fontClasses.length)
            divBlackMail.classList.add(fontClasses[classIndex])
            blackMail.append(divBlackMail)
            if (divBlackMail.textContent == " ") {
                divBlackMail.classList.add('blackmail__space')
            }
        }
        input.value = storedValue
    }
}

/**Remove the current message*/
blackMailRemove.addEventListener('click', function () {
    blackMail.innerHTML = ""
    input.value = ""
    localStorage.removeItem('blackmail')
})
