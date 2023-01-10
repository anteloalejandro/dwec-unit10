// Get the requiered elements
const img = document.querySelector('#imagen img')
const email = document.getElementById('email')
const nombre = document.getElementById('nombre')
const direccion = document.getElementById('direccion')

// Fetch one random person
fetch('https://randomuser.me/api/?results=1')
  .then(response => {
    if (response.ok)
      return response.json()
    else
      throw new Error('Error')
  })
  .then(response => {
    // Add the user's data to corresponding elements
    const person = response.results[0]
    img.setAttribute('src', person.picture.large)
    nombre.textContent += person.name.first + ' ' + person.name.last
    email.textContent += person.email
    direccion.textContent += person.location.street.name + ' (' + person.location.state.toUpperCase() + ')'
  })

