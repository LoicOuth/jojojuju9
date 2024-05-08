import { Avatar } from '#components/avatar'
import { ButtonIcon } from '#components/button'
import { Card } from '#components/card'
import { Divider } from '#components/divider'
import { AppLayout } from '#layouts/app.layout'
import User from '#models/user'
import { route } from '#start/view'
import { HttpContext } from '@adonisjs/core/http'

interface AccoutProps {
  user: User
}

export const AccountPage = async (props: AccoutProps) => {
  const { user } = props
  const { auth } = HttpContext.getOrFail()
  await auth.check()

  const title = auth.user?.id === user.id ? 'Mon compte' : `Profil de ${user.username}`

  return (
    <AppLayout title={title}>
      <div class="max-width-wrapper mt-5">
        <Card>
          <>
            <div class="flex column items-start">
              <div class="flex items-center w-full justify-between">
                <Avatar user={user} location="left" size="lg" />
                {auth.user?.id === user.id && (
                  <div class="flex itms-center">
                    <ButtonIcon
                      icon="fa-solid fa-pen"
                      href={route('account.edit', { username: user.username })}
                      data-tooltip="Mettre à jour"
                      up-layer="new"
                      up-mode="modal"
                      up-target="[up-modal-scope]"
                    />
                    <ButtonIcon icon="fa-solid fa-lock" />
                  </div>
                )}
              </div>
              <span>Inscrit le {user.createdAt.toLocaleString()}</span>
            </div>
            <Divider />
            <div class="flex items-center">
              <div class="stack items-center flex-1">
                <i class="fa-solid fa-comment account__icon" />
                <h3>35</h3>
                <span>Commentaires</span>
              </div>
              <div class="stack items-center flex-1">
                <i class="fa-solid fa-gamepad account__icon" />
                <h3>10</h3>
                <span>Jeux en favoris</span>
              </div>
            </div>
          </>
        </Card>
      </div>
    </AppLayout>
  )
}
