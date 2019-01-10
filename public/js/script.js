const greetingMessage = () => {
  console.log(`  #####   `)
  console.log(` #######  `)
  console.log(`#  ###  #  Hello There`)
  console.log(`#   #   # `)
  console.log(`#########  Come contribute to the code !`)
  console.log(` ### ###  `)
  console.log(`  #####    github.com/SkullMasher/wish-card-2019`)
  console.log(`  # # #   `)
}

let formChecker = () => {
  // input selector
  const $wishText = document.querySelector('.js-wishText')
  const $wishSign = document.querySelector('.js-wishSign')
  const $wishSubmit = document.querySelector('.js-wishSubmit')
  const $wishWarn = document.querySelector('.js-wishWarn')
  // states
  let wishTextIsDirty = false
  let wishSignIsDirty = false
  // functions
  const isWishCompleted = () => {
    if (wishTextIsDirty && wishSignIsDirty) {
      $wishWarn.classList.add('is-hidden')
      $wishSubmit.classList.remove('js-disabled')

      return true
    } else {
      return false
    }
  }

  const postWish = async (location, data) => {
    const fetchSettings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    }
    const response = await fetch(location, fetchSettings)
    const json = await response.json()
    console.log(json)
  }

  // Events
  $wishText.addEventListener('input', (event) => {
    wishTextIsDirty = true
    isWishCompleted()
  })

  $wishSign.addEventListener('input', (event) => {
    wishSignIsDirty = true
    isWishCompleted()
  })

  $wishSubmit.addEventListener('click', (event) => {
    // if (isWishCompleted()) {
    // }
    const data = JSON.stringify([$wishText.innerHTML, $wishSign.innerHTML])
    postWish(`${location.href}topkek`, data)
  })
}

addEventListener('DOMContentLoaded', (event) => {
  greetingMessage()
  formChecker()
})
