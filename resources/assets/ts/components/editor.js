import '../vendors/ckeditor/ckeditor'

export class Editor extends HTMLElement {
  connectedCallback() {
    ClassicEditor.create(this).catch((error) => {
      console.error(error)
    })
  }
}

customElements.define('textarea-editor', Editor)
