interface CardProps {
  title?: string
  noPadding?: boolean
  width?: string
  height?: string
  clickable?: boolean
  children: JSX.Element
}

export const Card = (props: CardProps) => {
  const { title, children, noPadding = false, clickable = false } = props

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
    <article class={`card ${noPaddingClass} ${clickableClass}`} style={{ width, height }}>
      <CardHeader />
      {children}
    </article>
  )
}
