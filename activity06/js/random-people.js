export default async function run(targetId = 'personas') {
  // Set the amount of people to be shown at once and how many times they shuffle.
  const amount = 20
  const times = 100

  // Get the parent element of the images
  const target = document.getElementById(targetId)

  /* Add custom global CSS to hide excess images.
  Loading all the images all at once and hiding some of them
  is slower on initial load but faster when shuffling. */
  const css = `
  #${target.id} > :nth-child(n+${amount+1}) {
    display: none !important;
  }`
  const style = document.createElement('style')
  style.appendChild(document.createTextNode(css))
  document.head.appendChild(style)

  // Fetch more people than necessary. This makes the animation show different people.
  const data = await fetch('https://randomuser.me/api/?results='+(amount*3))
    .then(response => {
      if (response.ok)
        return response.json()
      else
        console.log('Error procesando la petición: '+response)
    })

  // Create an <img> element for each picture and store them in an array.
  let pictures = data.results.map(p => {
    const div = document.createElement('div')
    div.dataset.name = p.name.first + ' ' + p.name.last
    const img = document.createElement('img')
    img.src = p.picture.large
    div.appendChild(img)
    return div
  })

  // Add/replace all the images to the parent element after shuffling them every 0.2s.
  let count = 0
  var tmp = setInterval(() => {
    target.append(...pictures.shuffle())
    count++
    if (count >= times)
      clearInterval(tmp)
  }, 200)
}

// Add function to the array class to shuffle its instances.
Array.prototype.shuffle = function () {
  let random = NaN
  let aux = []

  // Take out random elements from the array and put it another array.
  while (this.length != 0) {
    random = Math.floor(Math.random() * this.length)
    aux.push(...this.splice(random, 1));
  }

  // Add the elements in aux to the array
  this.push(...aux)
  return this
}

