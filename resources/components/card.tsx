interface CardProps {
  children: JSX.Element
  title?: string
  noPadding?: boolean
  clickable?: boolean
  height?: string
  width?: string
  class?: string
}

export const Card = (props: CardProps) => {
  const { title, children, class: className = '', noPadding = false, clickable = false } = props

  const noPaddingClass = noPadding ? 'no-padding' : ''
  const clickableClass = clickable ? 'clickable' : ''
  const width = props.width ?? 'auto'
  const height = props.height ?? 'auto'

  const CardHeader = () => {
    if (title) {
      return (
        <header>
          <h3>{title}</h3>
        </header>
      )
    }

    return ''
  }

  return (
    <article
      class={`card ${noPaddingClass} ${clickableClass} ${className}`}
      style={{ width, height }}
    >
      <CardHeader />
      {children}
    </article>
  )
}
