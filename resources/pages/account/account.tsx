import { Avatar } from '#components/avatar'
import { ButtonIcon } from '#components/button'
import { Card } from '#components/card'
import { Divider } from '#components/divider'
import { AppLayout } from '#layouts/app.layout'
import User from '#models/user'
import { csrfField, route } from '#start/view'
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
                {auth.user?.id === user.id ? (
                  <div class="flex itms-center">
                    <ButtonIcon
                      icon="fa-solid fa-pen"
                      href={route('account.edit', { username: user.username })}
                      data-tooltip="Mettre à jour"
                      up-layer="new"
                      up-accept-location={`${route('account', { username: '*' })} -${route('account', { username: user.username })}/*`}
                      up-on-accepted="up.render('body', { response: event.response })"
                    />
                    <ButtonIcon
                      icon="fa-solid fa-lock"
                      href={route('account.edit.password', { username: user.username })}
                      data-tooltip="Modifier mot de passe"
                      up-layer="new"
                      up-accept-location={`${route('account', { username: '*' })} -${route('account', { username: user.username })}/*`}
                      up-on-accepted="up.render('body', { response: event.response })"
                    />

                    <form
                      action={`${route('account.delete', { id: user.id })}?_method=DELETE`}
                      method="post"
                      up-confirm="Voulez-vous vraiment supprimer votre compte ?"
                      up-target="body"
                    >
                      {csrfField()}
                      <ButtonIcon type="submit" icon="fa-solid fa-trash" color="error" />
                    </form>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <span>Inscrit le {user.createdAt.toFormat('F', { locale: 'fr-FR' })}</span>
            </div>
            <Divider />
            <div class="flex items-center">
              <div class="stack items-center flex-1">
                <i class="fa-solid fa-comment account__icon" />
                <h3>{user.$extras.comments_count + user.$extras.responses_count}</h3>
                <span>Commentaires</span>
              </div>
              <div class="stack items-center flex-1">
                <i class="fa-solid fa-gamepad account__icon" />
                <h3>{user.favoriteGames?.length || 0}</h3>
                <span>Jeux en favoris</span>
              </div>
            </div>
          </>
        </Card>
      </div>
    </AppLayout>
  )
}
