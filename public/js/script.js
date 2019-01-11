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
// Helper to select text
let selectText = (element) => {
  element = document.getElementById(element)
  const selection = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(element)
  selection.removeAllRanges()
  selection.addRange(range)
}

let formChecker = () => {
  // input selector
  const $wishText = document.querySelector('.js-wishText')
  const $wishSign = document.querySelector('.js-wishSign')
  const $wishSubmit = document.querySelector('.js-wishSubmit')
  const $wishSubmitBtn = document.querySelector('.js-wishSubmitBtn')
  const $wishShare = document.querySelector('.js-wishShare')
  const $wishWarn = document.querySelector('.js-wishWarn')
  const $wishShareLink = document.querySelectorAll('.js-shareWishLink')

  // states
  let wishTextIsDirty = false
  let wishSignIsDirty = false

  // functions
  const isWishCompleted = () => {
    if (wishTextIsDirty && wishSignIsDirty) {
      $wishWarn.classList.add('text-blur-out')
      $wishSubmitBtn.classList.remove('js-disabled')
      return true
    } else {
      return false
    }
  }

  const animateWishValidation = () => {
    $wishSubmit.classList.add('slide-out-blurred-left')
    $wishShare.classList.add('slide-in-blurred-right')
  }

  const fillShareWish = (seed) => {
    $wishShareLink.forEach((element, index, list) => {
      console.log(element)
      element.href = element.href + seed

      if (index === 1) {
        element.text = element.href
      }
    })
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
    const seed = await response.json()

    fillShareWish(seed)
    animateWishValidation()
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

  $wishSubmitBtn.addEventListener('click', (event) => {
    if (isWishCompleted()) {
      const data = JSON.stringify([$wishText.innerHTML, $wishSign.innerHTML])
      postWish(location.href, data)
    }
  })
}

addEventListener('DOMContentLoaded', (event) => {
  greetingMessage()
  formChecker()
})
