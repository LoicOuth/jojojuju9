declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['custom-menu']: HtmlMenuTag & {
        btnId: string
      }
      ['menu-item']: HtmlTag & {
        icon?: string
        text: string
        href?: string
        action?: string
        csrfField?: string
        iconColor?: 'default' | 'red'
        upFollow?: string
      }
    }

    interface HtmlTag {
      ['up-main']?: boolean
      ['up-hungry']?: boolean
      ['slot']?: string
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
