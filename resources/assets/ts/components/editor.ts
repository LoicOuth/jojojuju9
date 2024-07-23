import { ClassicEditor } from 'ckeditor5'
import { editorConfig } from '../vendors/ckeditor.js'

export class Editor extends HTMLElement {
  static observedAttributes = ['oldValue', 'addValue']
  declare textarea
  declare editor: ClassicEditor

  connectedCallback() {
    this.textarea = document.createElement('textarea')
    this.textarea.id = this.getAttribute('id')
    this.textarea.name = this.getAttribute('id')
    this.append(this.textarea)
    const btn = document.getElementById('editor-add')

    if (this.getAttribute('oldValue')) {
      this.textarea.innerText = this.getAttribute('oldValue')
    }

    ClassicEditor.create(this.textarea, editorConfig)
      .then((editor) => {
        this.editor = editor
      })
      .catch((error) => {
        console.error(error)
      })

    if (btn) {
      btn.addEventListener('click', () => {
        console.log(this.getAttribute('addValue'))
        this.editor.setData(`${this.editor.getData()} ${this.getAttribute('addValue')}`)
      })
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'oldValue' && oldValue !== newValue) {
      this.textarea.innerText = newValue
    }
  }
}
