import { define } from 'preactement'
import { ImageUploader, ImageUploaderProps } from './image_uploader.js'
import { LinkForm, LinkFormItem } from './link_form.js'
import { Menu, MenuItem, MenuItemsProps } from './menu.js'
import { Editor } from './editor.js'

define('image-uploader', () => ImageUploader, { attributes: Object.keys(new ImageUploaderProps()) })
define('link-form', () => LinkForm)
define('link-form-item', () => LinkFormItem)
define('jojo-menu', () => Menu)
define('jojo-menu-item', () => MenuItem, {
  attributes: [...Object.keys(new MenuItemsProps()), 'disabled-up-follow'],
})
customElements.define('textarea-editor', Editor)
