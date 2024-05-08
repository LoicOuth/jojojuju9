class ImageUploader extends HTMLElement {
  get preview() {
    const preview = document.createElement('img')
    preview.classList.add('image-uploader__preview')
    preview.style.display = 'none'

    return preview
  }

  get fileInput() {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.name = this.getAttribute('name') || ''
    fileInput.accept = 'image/*'
    fileInput.style.display = 'none'

    return fileInput
  }

  get btn() {
    const div = document.createElement('div')
    div.innerText = this.getAttribute('text') || ''
    div.classList.add('image-uploader__btn')

    return div
  }

  connectedCallback() {
    const preview = this.preview
    const fileInput = this.fileInput
    const btn = this.btn

    btn.addEventListener('click', () => {
      fileInput.click()
    })
    fileInput.addEventListener('input', (value) => {
      btn.style.display = 'none'
      const file = (value.target as HTMLInputElement).files[0]
      preview.src = URL.createObjectURL(file)
      preview.style.display = 'block'
    })

    this.appendChild(preview)
    this.appendChild(fileInput)
    this.appendChild(btn)
  }
}

customElements.define('image-uploader', ImageUploader)
