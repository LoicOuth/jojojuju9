import './vendors/unpoly.js'
import './vendors/vite.js'
import './vendors/fontawesome_icons.js'
import './components/index.js'

declare var up: any

const burgerBtn = document.getElementById('burger-btn')
const burgerMenu = document.getElementById('burger-menu')

if (burgerBtn) {
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
}

export function search() {
  const searchValue = (document.getElementById('version-search') as HTMLInputElement)?.value
  const divs = document.getElementById('update-version-container')?.getElementsByTagName('div')

  if (divs) {
    for (let i = 0; i < divs.length; i++) {
      if (divs[i].id.includes(searchValue) || !searchValue) {
        divs[i].classList.remove('hidden')
      } else {
        divs[i].classList.add('hidden')
      }
    }
  }
}

;(window as any).search = search
