import { AppLayout } from '#layouts/app.layout'

interface FaqProps {}

export const FaqPage = (props: FaqProps) => {
  return (
    <AppLayout title="Foire aux questions">
      <div>FAQ</div>
    </AppLayout>
  )
}
