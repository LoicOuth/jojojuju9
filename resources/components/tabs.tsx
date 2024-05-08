interface TabsProps {
  tabs: TabProps[]
  children: JSX.Element
}
export interface TabProps {
  icon?: string
  href?: string
  title: string
}

export const Tabs = (props: TabsProps) => {
  const { children, tabs } = props
  return (
    <div class="flex column">
      <nav class="flex items-center w-full">
        {tabs.map((tab) => (
          <Tab title={tab.title} icon={tab.icon} href={tab.href} />
        ))}
      </nav>
      <div>{children}</div>
    </div>
  )
}

const Tab = (props: TabProps) => {
  const { title, icon, href } = props

  const content = (
    <>
      {icon ? (
        <span v-if="icon" class="mr-2">
          {icon}
        </span>
      ) : (
        ''
      )}
      <h5>{title}</h5>
    </>
  )

  if (typeof href !== 'undefined') {
    return (
      <a class="flex-1 centered tab" href={href}>
        {content}
      </a>
    )
  }

  return <div class="flex-1 centered tab">{content}</div>
}
