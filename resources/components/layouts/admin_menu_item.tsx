interface AdminMenuItemProps {
  href: string
  title: string
  icon: string
}

export const AdminMenuItem = (props: AdminMenuItemProps) => {
  const { href, icon, title } = props
  return (
    <a href={href} class="admin-menu-item">
      <span class="flex items-center">
        <i class={`admin-menu-item__icon ${icon}`} />
        <span class="ml-3">{title}</span>
      </span>
    </a>
  )
}
