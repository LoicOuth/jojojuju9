declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['jojo-menu']: HtmlTag
      ['jojo-menu-item']: HtmlTag & {
        'icon'?: string
        'text': string
        'href'?: string
        'action'?: string
        'csrfield'?: Element
        'iconColor'?: 'default' | 'red'
        'disabled-up-follow'?: 'true'
      }

      ['image-uploader']: HtmlTag & {
        text: string
        name: string
        src?: string
        rounded?: string
      }
      ['textarea-editor']: HtmlTag & {
        oldValue: string
      }
      ['link-form']: HtmlTag & {
        items?: string
      }
      ['auto-complete']: HtmlTag & {
        items: string
        selected?: string
        name: string
      }
      ['jojo-comments']: HtmlTag & {
        'game-id'?: string
        'software-id'?: string
        'user-id'?: string
      }
    }

    interface HtmlTag {
      ['up-main']?: boolean
      ['up-hungry']?: boolean
      ['slot']?: string
      ['data-tooltip']?: string
    }

    interface HtmlAnchorTag {
      ['up-follow']?: boolean
      ['up-target']?: string
      ['up-layer']?: 'new' | 'swap' | 'shatter'
      ['up-accept-location']?: string
      ['up-mode']?: 'root' | 'modal' | 'drawer' | 'popup' | 'cover'
      ['up-on-accepted']?: string
    }

    interface HtmlFormTag {
      ['up-submit']?: boolean
      ['up-target']?: string
    }
  }
}
