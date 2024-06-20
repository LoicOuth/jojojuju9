import { useEffect, useRef, useState } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime'

interface MenuProps {
  children: JSX.Element
  button: JSX.Element
}
export class MenuItemsProps {
  text: string
  icon?: string
  href?: string
  action?: string
  iconcolor?: 'default' | 'red'
  disabledUpFollow?: 'true'
  csrfield?: string
}

export const Menu = ({ children, button }: MenuProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuContainer = useRef<HTMLDivElement>()

  const handleClickOutside = (event) => {
    if (menuContainer.current && !menuContainer.current.contains(event.target)) {
      setShowMenu(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <>
      <div style={{ position: 'relative' }}>
        <div onClick={() => setShowMenu((value) => !value)}>{button}</div>
        {showMenu ? (
          <div
            ref={menuContainer}
            style={{
              position: 'absolute',
              zIndex: 50,
              width: '250px',
              top: '40px',
              right: '0px',
              borderRadius: '6px',
              border: 'var(--border)',
              paddingBlock: '16px',
              backgroundColor: 'var(--background)',
            }}
          >
            {children}
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export const MenuItem = ({
  text,
  action,
  href,
  icon,
  iconcolor = 'default',
  disabledUpFollow,
  csrfield,
}: MenuItemsProps) => {
  const form = useRef<HTMLFormElement>()
  const defaultClassList = 'flex items-center py-2 px-5 w-full menu-item'
  const iconColor = iconcolor !== 'default' ? 'menu-item__icon--red' : ''

  useEffect(() => {
    if (form.current && csrfield) {
      form.current.append(
        new DOMParser().parseFromString(csrfield, 'text/html').body.firstElementChild
      )
    }
  }, [form])

  if (href) {
    return (
      <a href={href} class={defaultClassList} {...(disabledUpFollow && { 'up-follow': 'false' })}>
        <i class={`${icon} ${iconColor} mr-5`}></i>
        <span>{text}</span>
      </a>
    )
  }
  if (action) {
    return (
      <form ref={form} action={action} up-target="body" method="POST">
        <button type="submit" class={defaultClassList}>
          <i class={`${icon} ${iconColor} mr-5`}></i>
          <span>{text}</span>
        </button>
      </form>
    )
  }

  return (
    <button type="button" class={defaultClassList}>
      <i class={`${icon} ${iconColor} mr-5`}></i>
      <span>{text}</span>
    </button>
  )
}
