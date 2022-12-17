'use strict'
const inputVolunteer = document.querySelector('.volunteer')
const submitVolunteer = document.querySelector('#add')
const volunteerList = document.querySelector('.volunteer__list')
const chooseVolunteer = document.querySelector('.choosen__volunteer')
const choose = document.querySelector('#choose')
const deleteVolunteers = document.querySelector('#delete')

/** Add volunteer to the list*/
let volunteers = [], volunteerPending = [], personne = ""
submitVolunteer.addEventListener('click', function () {
    if (inputVolunteer.value) {
        volunteerList.textContent = ""
        volunteers.push(inputVolunteer.value)
        volunteerPending = [...volunteers]
        // Tu peux écrire volunteerPending.forEach(createItem)
        volunteerPending.forEach(e => createItem(e))
        personne = { pending: volunteerPending, list: volunteers }
        save()
    }
})

/** Display volunteer*/
function createItem(value) {
    const volunteerItem = document.createElement("li")
    volunteerItem.textContent = value
    volunteerItem.classList.add('volunteer_item')
    volunteerList.append(volunteerItem)
}

/** Designate a volunteer*/
choose.addEventListener('click', function () {
    const choosenVolunteer = volunteerPending[Math.floor(Math.random() * volunteerPending.length)]
    chooseVolunteer.textContent = choosenVolunteer

    Array.from(document.querySelectorAll('.volunteer_item'))
        .find(el => {
            if (el.textContent === choosenVolunteer) {
                el.classList.add('choosen')
            }
        })

    volunteerPending = volunteerPending.filter(item => item !== choosenVolunteer)
    personne = { pending: volunteerPending.filter(item => item !== choosenVolunteer), list: volunteers }
    if (volunteerPending == 0) {
        volunteerPending = [...volunteers]
        personne.pending = [...volunteers]
        Array.from(document.querySelectorAll('.volunteer_item'))
            .find(el => {
                if (el.classList.contains('choosen')) {
                    el.classList.remove('choosen')
                }
            })
    }
    save()
})

/** Delete the list of volunteers*/
deleteVolunteers.addEventListener('click', function () {
    volunteers = [], volunteerPending = []
    volunteerList.textContent = "", chooseVolunteer.textContent = "", inputVolunteer.value = ""
    localStorage.removeItem('Volunteers list')
    localStorage.removeItem('personne')
})

/**Save the list in the local storage*/
function save() {
    localStorage.setItem('Volunteers list', JSON.stringify(volunteerPending))
    localStorage.setItem('personne', JSON.stringify(personne))
}

/**Get the list from the local storage*/
function get() {
    const storedValue = JSON.parse(localStorage.getItem('personne')) ?? { pending: volunteerPending, list: volunteers }
    if (storedValue) {
        let difference = storedValue.list.filter(x => !storedValue.pending.includes(x))
        for (let i = 0; i <= storedValue.list.length - 1; i++) {
            createItem(storedValue.list[i])
            volunteers.push(storedValue.list[i])
            volunteerPending.push(storedValue.pending[i])
        }
        for (let i = 0; i <= difference.length; i++) {
            Array.from(document.querySelectorAll('.volunteer_item'))
                .find(el => {
                    if (el.textContent === difference[i]) {
                        el.classList.add('choosen')
                    }
                })
        }
    }
}

/**
 * Ici tu n'attends pas vraiment DOMContentLoaded,
 * il faudrait que tu écrives
 * window.addEventListener('DOMContentLoaded', () => get())
 * ou
 * window.addEventListener('DOMContentLoaded', get)
 */
window.addEventListener('DOMContentLoaded', get())
