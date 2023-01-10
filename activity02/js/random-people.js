// Get the container element
const container = document.querySelector('#container')

// Create 10 random people
fetch('https://randomuser.me/api/?results=10')
  .then(response => {
    if (response.ok)
      return response.json()
    else
      throw new Error('Error')
  })
  .then(response => {

    // Iterate through each person and
    // create a profile for each one inside the container
    for(let i = 0; i < response.results.length; i++) {
      const person = response.results[i]

      const div = document.createElement('div')
      div.classList.add('persona')

      const img = document.createElement('img')
      div.appendChild(img)

      const nombre = document.createElement('p')
      div.appendChild(nombre)

      const email = document.createElement('p')
      div.appendChild(email)

      const direccion = document.createElement('p')
      div.appendChild(direccion)

      // Create a button in each profile to replace a person with another one
      const reemplazar = document.createElement('button')
      reemplazar.textContent = 'Reemplazar'
      reemplazar.addEventListener('click', ev => {

        // Create one random person and
        // replace the data of the profile containing this button with its data
        fetch('https://randomuser.me/api/?results=1')
          .then(response => {
            if (response.ok)
              return response.json()
            else
              throw new Error('Error')
          }).then(response => {
            const newPerson = response.results[0]
            img.setAttribute('src', newPerson.picture.large)
            nombre.textContent = newPerson.name.first + ' ' + person.name.last
            email.textContent = 'Email: ' + newPerson.email
            direccion.textContent = newPerson.location.street.name + ' (' + newPerson.location.state.toUpperCase() + ')'
          })
      })
      div.appendChild(reemplazar)

      img.setAttribute('src', person.picture.large)
      nombre.textContent += person.name.first + ' ' + person.name.last
      email.textContent += person.email
      direccion.textContent += person.location.street.name + ' (' + person.location.state.toUpperCase() + ')'

      container.appendChild(div)
    }
  })

