import { csrfField } from '#start/view'

interface MenuProps {
  items: MenuItem[]
  btnId: string
  children: JSX.Element
}
export interface MenuItem {
  text: string
  icon?: string
  href?: string
  action?: string
  iconcolor?: 'default' | 'red'
  upFollow?: boolean
}

export const Menu = (props: MenuProps) => {
  const { btnId, children, items } = props
  return (
    <div class="menu-container">
      {children}
      <custom-menu btnId={btnId}>
        <div class="flex column w-full">
          {items.map((menuItem) => (
            <menu-item
              text={menuItem.text}
              href={menuItem.href}
              icon={menuItem.icon}
              iconColor={menuItem.iconcolor}
              action={menuItem.action}
              csrfField={csrfField()}
              upFollow={`${menuItem.upFollow}`}
            />
          ))}
        </div>
      </custom-menu>
    </div>
  )
}
