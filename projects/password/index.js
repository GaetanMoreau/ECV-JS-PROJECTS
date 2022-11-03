const slider = document.getElementById("slider")
const output = document.getElementById("password__size-value")
output.innerHTML = slider.value

slider.oninput = function (options) {
    output.innerHTML = this.value
    makePassword(options)
}

const checkbox = document.getElementById("checkbox")
const password = document.getElementById("password")
const protection = document.getElementById("protection")
const passwordContainer = document.querySelector(".password__container")
const protectionContainer = document.querySelector(".protection__container")

const passwordCopy = document.querySelector('.password__copy')
passwordCopy.addEventListener('click', function () {
    const copyText = password.textContent
    navigator.clipboard.writeText(copyText).then(() => {
        console.log("Copied to clipboard")
    })
})

function random(nb) {
    return Math.floor(Math.random() * nb)
}

const letters = 'abcdefghijklmnopqrstuvwxyz'
let randomLetters = ''
let randomLettersOdd = ''

function getLetter() {
    return randomLetters = letters[Math.floor(Math.random() * letters.length)]
}

let options = {
    size: 10,
    withNumbers: true
}

function makePassword(options) {
    randomLetters = ""
    options.size = slider.value
    options.withNumbers = checkbox.checked

    if (options.length === 0 || options.size.length === 0 || options.withNumbers.length === 0) {
        options.size = 10
        options.withNumbers = true
    }
    if (options.size < 8) {
        console.log("Your password is less than 8 characters long, which is weak for a secure password.")
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
                randomLetters += getLetter() + random(10)
            }
        } else {
            randomLetters += getLetter()
        }
    }

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