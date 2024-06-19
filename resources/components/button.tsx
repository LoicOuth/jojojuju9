interface ButtonProps {
  id?: string
  blank?: boolean
  color?: 'primary' | 'secondary' | 'error' | 'success'
  href?: string
  size?: 'sm' | 'md'
  type?: 'button' | 'submit'
  class?: string
  icon?: string
  text: string
  disabled?: boolean
}

interface ButtonIconProps extends Omit<ButtonProps, 'text' | 'size'> {
  size?: 'md' | 'lg'
}

export const Button = (props: ButtonProps) => {
  const {
    id,
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
      <a
        id={id}
        href={href}
        class={buttonClass}
        target={blank ? '_blank' : undefined}
        {...extraProps}
      >
        <ButtonIcon />
        <span>{text}</span>
      </a>
    )
  }

  return (
    <button id={id} class={buttonClass} type={type} {...extraProps}>
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
    disabled = false,
    ...extraProps
  } = props

  const buttonIconClass = `button__icon text-center flex items-center ${className || ''} ${color} ${size} ${disabled ? 'disabled' : ''}`

  if (typeof href !== 'undefined') {
    return (
      <a href={href} class={buttonIconClass} target={blank ? '_blank' : undefined} {...extraProps}>
        <i class={icon} />
      </a>
    )
  }

  return (
    <button class={buttonIconClass} type={type} {...extraProps} disabled={disabled}>
      <i class={icon} />
    </button>
  )
}
