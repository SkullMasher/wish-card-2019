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

  const request = async () => {
      const response = await fetch(location);
      const json = await response.json();
      console.log(json);
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
    console.log(`${location.href}topkek`)
  })
}

addEventListener('DOMContentLoaded', (event) => {
  greetingMessage()
  formChecker()
})
