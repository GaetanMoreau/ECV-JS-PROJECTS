const input = document.querySelector("#text")
const blackMail = document.querySelector("#blackmail")

input.addEventListener('input', updateValue)

const fontClasses = ['blackmail__font-1', 'blackmail__font-2', 'blackmail__font-3', 'blackmail__font-4']

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

function save() {
    localStorage.setItem('blackmail', input.value)
}

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

function remove() {
    blackMail.innerHTML = ""
    input.value = ""
    localStorage.removeItem('blackmail')
}