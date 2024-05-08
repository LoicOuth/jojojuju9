import { define } from 'preactement'
import { ImageUploader, ImageUploaderProps } from './image_uploader.js'
import { LinkForm, LinkFormItem, LinkFormProps } from './link_form.js'
import { Menu, MenuItem, MenuItemsProps } from './menu.js'
import { Editor } from './editor.js'
import { AutoCompleteProps, AutoComplete } from './autocomplete.js'

define('image-uploader', () => ImageUploader, { attributes: Object.keys(new ImageUploaderProps()) })
define('link-form', () => LinkForm, { attributes: Object.keys(new LinkFormProps()) })
define('link-form-item', () => LinkFormItem)
define('jojo-menu', () => Menu)
define('jojo-menu-item', () => MenuItem, {
  attributes: [...Object.keys(new MenuItemsProps()), 'disabled-up-follow'],
})
define('auto-complete', () => AutoComplete, {
  attributes: Object.keys(new AutoCompleteProps()),
})
customElements.define('textarea-editor', Editor)
