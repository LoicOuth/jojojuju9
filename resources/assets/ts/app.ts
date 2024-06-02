import './vendors/unpoly.js'
import './vendors/vite.js'
import './vendors/fontawesome_icons.js'
import './components/index.js'

declare var up: any

const burgerBtn = document.getElementById('burger-btn')
const burgerMenu = document.getElementById('burger-menu')

burgerBtn.addEventListener('click', () => {
  if (burgerMenu.classList.contains('show')) {
    burgerMenu.classList.remove('show')
    burgerBtn.classList.add('fa-bars')
    burgerBtn.classList.remove('fa-xmark')
  } else {
    burgerMenu.classList.add('show')
    burgerBtn.classList.remove('fa-bars')
    burgerBtn.classList.add('fa-xmark')
  }
})

up.on('up:location:changed', () => {
  if (burgerMenu.classList.contains('show')) {
    burgerMenu.classList.remove('show')
    burgerBtn.classList.add('fa-bars')
    burgerBtn.classList.remove('fa-xmark')
  }
})
