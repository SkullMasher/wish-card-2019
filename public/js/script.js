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
  element = document.getElementById(element);
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(element);
  selection.removeAllRanges();
  selection.addRange(range);
}

let formChecker = () => {
  // input selector
  const $wishText = document.querySelector('.js-wishText')
  const $wishSign = document.querySelector('.js-wishSign')
  const $wishSubmit = document.querySelector('.js-wishSubmit')
  const $wishWarn = document.querySelector('.js-wishWarn')
  const $wishInputShare = document.querySelector('.js-shareWishLink')
  // states
  let wishTextIsDirty = false
  let wishSignIsDirty = false
  // functions
  const isWishCompleted = () => {
    if (wishTextIsDirty && wishSignIsDirty) {
      $wishWarn.classList.add('text-blur-out')
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
    if (isWishCompleted()) {
      const data = JSON.stringify([$wishText.innerHTML, $wishSign.innerHTML])
      postWish(location.href, data)
    }
  })

  $wishInputShare.addEventListener('click', () => selectText('share-wish-link'))
}

addEventListener('DOMContentLoaded', (event) => {
  greetingMessage()
  formChecker()
})
