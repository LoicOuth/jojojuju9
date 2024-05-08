import '../vendors/ckeditor/ckeditor'

export class Editor extends HTMLElement {
  static observedAttributes = ['oldValue']
  textarea

  connectedCallback() {
    this.textarea = document.createElement('textarea')
    this.textarea.id = this.getAttribute('id')
    this.textarea.name = this.getAttribute('id')
    this.append(this.textarea)

    if (this.getAttribute('oldValue')) {
      this.textarea.innerText = this.getAttribute('oldValue')
    }

    ClassicEditor.create(this.textarea).catch((error) => {
      console.error(error)
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'oldValue' && oldValue !== newValue) {
      this.textarea.innerText = newValue
    }
  }
}
