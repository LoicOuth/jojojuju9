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

    ClassicEditor.create(this.textarea, {
      style: {
        definitions: [
          {
            name: 'Titre 3 souligné',
            element: 'h4',
            classes: ['underline'],
          },
          {
            name: 'Titre 2 souligné',
            element: 'h3',
            classes: ['underline'],
          },
        ],
      },
    }).catch((error) => {
      console.error(error)
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'oldValue' && oldValue !== newValue) {
      this.textarea.innerText = newValue
    }
  }
}
