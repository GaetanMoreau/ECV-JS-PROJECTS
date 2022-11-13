'use strict'

const input = document.querySelector("#text")
const blackMail = document.querySelector("#blackmail")
const fontClasses = ['blackmail__font-1', 'blackmail__font-2', 'blackmail__font-3', 'blackmail__font-4']
const blackMailRemove = document.querySelector('.blackmail__remove')
const blackMailInpute = document.querySelector('.blackmail__input')
let classIndex = ""

/**Get the value from the input and update the message*/
input.addEventListener('input', updateValue)
function updateValue() {
    blackMail.innerHTML = ""
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
window.addEventListener('load', () => {
    get()
})
function get() {
    const storedValue = localStorage.getItem('blackmail')
    if (storedValue) {
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