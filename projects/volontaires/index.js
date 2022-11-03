const inputVolunteer = document.querySelector('.volunteer')
const submitVolunteer = document.querySelector('.volunteer__btn')
const volunteerList = document.querySelector('.volunteer__list')
const chooseVolunteer = document.querySelector('#choose')
let volunteers = []

submitVolunteer.addEventListener('click', function () {
    //volunteers.push(inputVolunteer.value)
    createItem(inputVolunteer.value)
})
function createItem(value) {
    const volunteerItem = document.createElement("li")
    volunteerItem.textContent = value
    volunteerItem.classList.add('volunteer_item')
    volunteerList.append(volunteerItem)
    console.log(volunteers)
}

chooseVolunteer.addEventListener('click', function () {
    designateVolunteer()
})
function designateVolunteer() {
    const item = volunteerList.getElementsByTagName('li');
    item[Math.floor(Math.random() * item.length)].classList.add('selected');
}





