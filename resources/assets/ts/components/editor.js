import '../vendors/ckeditor/ckeditor'

export class Editor extends HTMLElement {
  static observedAttributes = ['oldValue']
  static observedAttributes = ['addValue']
  textarea
  editor

  connectedCallback() {
    this.textarea = document.createElement('textarea')
    this.textarea.id = this.getAttribute('id')
    this.textarea.name = this.getAttribute('id')
    this.append(this.textarea)
    const btn = document.getElementById('editor-add')

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
        ],
      },
    })
      .then((editor) => {
        this.editor = editor
      })
      .catch((error) => {
        console.error(error)
      })

    btn.addEventListener('click', () => {
      console.log(this.getAttribute('addValue'))
      this.editor.setData(`${this.editor.getData()} ${this.getAttribute('addValue')}`)
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'oldValue' && oldValue !== newValue) {
      this.textarea.innerText = newValue
    }
  }
}
