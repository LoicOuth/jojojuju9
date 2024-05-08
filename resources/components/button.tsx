interface ButtonProps {
  blank?: boolean
  color?: 'primary' | 'secondary'
  href?: string
  size?: 'sm' | 'md'
  type?: 'button' | 'submit'
  class?: string
  icon?: string
  text: string
}

export const Button = (props: ButtonProps) => {
  const {
    blank,
    href,
    color = 'primary',
    size = 'md',
    type = 'button',
    text,
    icon,
    class: className,
    ...extraProps
  } = props

  const buttonClass = `button text-center flex items-center ${className} ${color} ${size}`

  const ButtonIcon = () => {
    if (icon) {
      return <i class={`${icon} mr-2`} />
    }

    return ''
  }

  if (typeof href !== 'undefined') {
    return (
      <a href={href} class={buttonClass} target={blank ? '_blank' : undefined} {...extraProps}>
        <ButtonIcon />
        <span>{text}</span>
      </a>
    )
  }

  return (
    <button class={buttonClass} type={type} {...extraProps}>
      <ButtonIcon />
      <span>{text}</span>
    </button>
  )
}
