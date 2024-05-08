import { Card } from '#components/card'
import { TabProps, Tabs } from '#components/tabs'
import { route } from '#start/view'
import { MasterLayout } from '#layouts/master.layout'

interface AuthLayoutProps {
  title?: string
  children: JSX.Element
}

export const AuthLayout = (props: AuthLayoutProps) => {
  const { title, children } = props

  const tabs: TabProps[] = [
    {
      title: 'Se connecter',
      href: route('login.index'),
    },
    {
      title: "S'enregistrer",
      href: route('register.index'),
    },
  ]
  return (
    <MasterLayout title={title}>
      <main>
        <div class="centered">
          <Card width="650px" noPadding>
            <Tabs tabs={tabs}>
              <div class="p-5">{children}</div>
            </Tabs>
          </Card>
        </div>
      </main>
    </MasterLayout>
  )
}
