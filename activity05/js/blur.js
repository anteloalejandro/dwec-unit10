export default async function run() {
  /**
  This webpage has two kinds of cookies:

  aafX:
    The 'X' represents the index of the image inside of its parent element.
    This cookie's name corresponds to the ID of an image.
    It doesn't have a value, but it has an expiration date.
    There's one for each image that needs to be blurred.

  blurred-order:
    Its value is an stringified Array that contains the IDs of clicked images.
    These IDs are in order, the first ones to be clicked come first.
    The IDs need to be removed when clicking on an image that already exist.
    The IDs need to be removed when the cookie having this ID as a name expires.
  */

  // The parent element of the images.
  const galeria = document.getElementById('galeria')

  // Function that creates a Map with all the cookies to handle them more easily.
  function cookiesMap() {
    const cookies = document.cookie.split('; ')
    const map = new Map(cookies.map(c => {
      return [...c.split('=')]
    }))
    return map
  }

  // Remove images from the 'blur-order' cookie when their cookies expire.
  if (cookiesMap().has('blur-order')) {
    /** @type {Array} */
    const blurredImages = JSON.parse(cookiesMap().get('blur-order'))

    for (let i = 0; i < blurredImages.length; i++) {
      if (!cookiesMap().has(blurredImages[i])) {
        blurredImages.splice(i, 1)
        document.cookie = 'blur-order='+JSON.stringify(blurredImages)
      }
    }
  }

  // Create the images
  for (let i = 0; i < 10; i++) {
    // Create an image element and add it to the gallery
    const img = document.createElement('img')
    img.id = 'aaf' + i
    galeria.appendChild(img)

    // Set filter to 'blur' this image if it's the first one on the 'blur-order' cookie
    let filter = ''
    if (cookiesMap().has('blur-order') && JSON.parse(cookiesMap().get('blur-order'))[0] === img.id)
      filter = '?blur'

    // Create a static random image using it's ID as a seed
    fetch('https://picsum.photos/seed/' + img.id + '/300/300/' + filter)
      .then(response => response.blob())
      .then(data => { img.src = URL.createObjectURL(data) })
  }

  // This event handles the cookies that tell the code when an image needs to be blurred
  galeria.addEventListener('click', ev => {
    if (ev.target.tagName !== 'IMG') return

    // Get the 'blur-order' cookie
    /**@type {Array}*/
    let blurOrder = []
    if (cookiesMap().has('blur-order'))
      blurOrder = JSON.parse(cookiesMap().get('blur-order'))

    // If the clicked image exists on 'blur-order', remove it.
    // If it doesn't, append it.
    if (blurOrder.includes(ev.target.id))
      blurOrder.splice(blurOrder.indexOf(ev.target.id), 1)
    else
      blurOrder.push(ev.target.id)

    // Create/Update the 'blur-order' cookie.
    document.cookie = 'blur-order='+JSON.stringify(blurOrder)


    // Expiration date prep work
    let expire = '; expires='
    const baseTime = 1000*60*60*24*7 // A week
    const finalTime = baseTime * (blurOrder.length + 1)

    // If the clicked image already has a cookie, remove said cookie.
    // If it doesn't, create it and set its expiration date.
    if (cookiesMap().has(ev.target.id))
      expire += new Date(0).toUTCString()
    else
      expire += new Date(Date.now() + finalTime).toUTCString()

    document.cookie = ev.target.id+'='+expire
    location.reload()
  })


}
