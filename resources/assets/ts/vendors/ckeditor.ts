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
  ShowBlocks,
  SourceEditing,
  SpecialCharacters,
  Autoformat,
  FullPage,
  HtmlEmbed,
  FontFamily,
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
      'fontFamily',
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
      '|',
      'sourceEditing',
      'showBlocks',
      'htmlEmbed',
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
    ShowBlocks,
    SourceEditing,
    SpecialCharacters,
    Autoformat,
    FullPage,
    HtmlEmbed,
    FontFamily,
  ],
  fontFamily: {
    supportAllValues: false,
    options: [
      'Lato, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
    ],
  },
  heading: {
    options: [
      {
        model: 'paragraph',
        title: 'Paragraph',
        class: '',
      },
      {
        model: 'heading4',
        view: 'h4',
        title: 'Heading 4',
        class: 'yellow',
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
        element: 'h4',
        classes: ['yellow'],
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
