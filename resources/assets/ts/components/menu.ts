class Menu extends HTMLElement {
  private btn: HTMLElement

  get btnId() {
    return this.getAttribute('btnId') || ''
  }

  toggleShow() {
    this.classList.toggle('show')
  }
  closeMenu(event: MouseEvent) {
    if (
      !this.contains(event.target as Node) &&
      event.target !== this.btn &&
      !this.btn.contains(event.target as Node)
    ) {
      this.classList.remove('show')
    }
  }

  connectedCallback() {
    this.classList.add('menu')

    this.btn = document.getElementById(this.btnId)
    if (!this.btn) return

    this.btn.addEventListener('click', this.toggleShow.bind(this))

    window.addEventListener('click', this.closeMenu.bind(this))
  }

  disconnectedCallback() {
    this.btn.removeEventListener('click', this.toggleShow.bind(this))
    window.removeEventListener('click', this.closeMenu.bind(this))
  }
}

class MenuItem extends HTMLElement {
  private defaultClassList = ['flex', 'items-center', 'py-2', 'px-5', 'w-full', 'menu-item']

  get text() {
    if (this.getAttribute('text')) {
      const text = document.createElement('span')
      text.innerHTML = this.getAttribute('text')

      return text
    }

    return null
  }

  get icon() {
    if (this.getAttribute('icon')) {
      const icon = document.createElement('i')
      icon.classList.add('mr-5', ...this.getAttribute('icon').split(' '))

      const iconColor = this.getAttribute('iconColor')
      if (iconColor && iconColor !== 'default') {
        icon.classList.add('menu-item__icon--red')
      }

      return icon
    }

    return null
  }

  get href() {
    if (this.getAttribute('href')) {
      const a = document.createElement('a')
      a.setAttribute('href', this.getAttribute('href'))
      a.classList.add(...this.defaultClassList)

      if (this.icon) {
        a.appendChild(this.icon)
      }

      if (this.text) {
        a.appendChild(this.text)
      }

      const upFollow = this.getAttribute('upFollow')
      if (upFollow && upFollow === 'false') {
        a.setAttribute('up-follow', 'false')
      }

      return a
    }

    return null
  }

  get form() {
    if (this.getAttribute('action') && this.getAttribute('csrfField')) {
      const form = document.createElement('form')
      form.action = this.getAttribute('action')
      form.method = 'POST'
      form.classList.add('w-full')
      form.setAttribute('up-target', 'body')

      const button = document.createElement('button')
      button.type = 'submit'
      button.classList.add(...this.defaultClassList)

      if (this.icon) {
        button.appendChild(this.icon)
      }

      if (this.text) {
        button.appendChild(this.text)
      }

      form.innerHTML = this.getAttribute('csrfField')
      form.append(button)

      return form
    }

    return null
  }

  connectedCallback() {
    this.appendChild(this.href || this.form)
  }
}

customElements.define('custom-menu', Menu)
customElements.define('menu-item', MenuItem)
