interface ButtonProps {
  blank?: boolean
  color?: 'primary' | 'secondary' | 'error'
  href?: string
  size?: 'sm' | 'md'
  type?: 'button' | 'submit'
  class?: string
  icon?: string
  text: string
}

interface ButtonIconProps extends Omit<ButtonProps, 'text' | 'size'> {
  size?: 'md' | 'lg'
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

export const ButtonIcon = (props: ButtonIconProps) => {
  const {
    blank,
    class: className,
    icon,
    href,
    color = 'secondary',
    size = 'md',
    type = 'button',
    ...extraProps
  } = props

  const buttonIconClass = `button__icon text-center flex items-center ${className} ${color} ${size}`

  if (typeof href !== 'undefined') {
    return (
      <a href={href} class={buttonIconClass} target={blank ? '_blank' : undefined} {...extraProps}>
        <i class={icon} />
      </a>
    )
  }

  return (
    <button class={buttonIconClass} type={type} {...extraProps}>
      <i class={icon} />
    </button>
  )
}
