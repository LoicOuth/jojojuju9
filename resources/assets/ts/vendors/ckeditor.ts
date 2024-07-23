import {
  AutoLink,
  Autosave,
  Bold,
  Code,
  Essentials,
  FontColor,
  Heading,
  HorizontalLine,
  Indent,
  Italic,
  Link,
  List,
  Paragraph,
  Strikethrough,
  Table,
  TableToolbar,
  Underline,
  Undo,
  Style,
  EditorConfig,
  GeneralHtmlSupport,
} from 'ckeditor5'

import translations from 'ckeditor5/translations/fr.js'

import 'ckeditor5/ckeditor5.css'

export const editorConfig: EditorConfig = {
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'heading',
      'style',
      '|',
      'fontColor',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'code',
      '|',
      'horizontalLine',
      'link',
      'insertTable',
      '|',
      'bulletedList',
      'numberedList',
      'outdent',
      'indent',
    ],
    shouldNotGroupWhenFull: false,
  },
  plugins: [
    AutoLink,
    Autosave,
    Bold,
    Code,
    Essentials,
    FontColor,
    GeneralHtmlSupport,
    Heading,
    HorizontalLine,
    Indent,
    Italic,
    Link,
    List,
    Paragraph,
    Strikethrough,
    Table,
    TableToolbar,
    Underline,
    Undo,
    Style,
  ],
  heading: {
    options: [
      {
        model: 'paragraph',
        title: 'Paragraph',
        class: '',
      },
      {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 3',
        class: 'underline',
      },
      {
        model: 'heading4',
        view: 'h4',
        title: 'Heading 4',
        class: 'underline',
      },
    ],
  },
  htmlSupport: {
    allow: [
      {
        name: /^.*$/,
        styles: true,
        attributes: true,
        classes: true,
      },
    ],
  },
  style: {
    definitions: [
      {
        name: 'Titre',
        element: 'h3',
        classes: ['underline'],
      },
    ],
  },
  language: 'fr',
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: 'https://',
    decorators: {
      toggleDownloadable: {
        mode: 'manual',
        label: 'Downloadable',
        attributes: {
          download: 'file',
        },
      },
    },
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
  translations: [translations],
}
