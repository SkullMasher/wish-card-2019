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
  let $wishText = document.querySelector('.js-wishText')
  let $wishSign = document.querySelector('.js-wishSign')
  let $wishSubmit = document.querySelector('.js-wishSubmit')
  let $wishWarn = document.querySelector('.js-wishWarn')
  // states
  let wishTextIsDirty = false
  let wishSignIsDirty = false
  // functions
  let isWishCompleted = () => {
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
    // const data = [$wishText.innerHTML]
    postWish(`${location.href}topkek`, data)
  })
}

addEventListener('DOMContentLoaded', (event) => {
  greetingMessage()
  formChecker()
})
