import { Button } from '#components/button'
import { Form } from '#components/forms/index'
import { AdminLayout } from '#layouts/admin.layout'
import Hack from '#models/hack'
import { csrfField, route } from '#start/view'

interface CreateUpdateHackProps {
  hack?: Hack
}

export const CreateUpdateHack = (props: CreateUpdateHackProps) => {
  const { hack } = props

  const title = hack ? 'Mettre à jour un hack' : 'Créer un hack'
  const action = hack
    ? `${route('admin.hack.update', { id: hack.id })}?_method=PUT`
    : route('admin.hack.store')
  const btnText = hack ? 'Modifier le hack' : 'Créer le hack'

  return (
    <AdminLayout title={title} returnHref={route('admin.hack')}>
      <form
        action={action}
        class="flex column gap-5 p-5"
        method="POST"
        up-modal-scope
        up-layer="parent"
        up-target="body"
      >
        {csrfField()}
        <Form.Group name="game" title="Jeu" defaultValue={hack?.game || ''} required />
        <Form.Group name="type" title="Type de hack" defaultValue={hack?.type || ''} required />
        <Form.Group
          name="link"
          title="Lien de téléchargement"
          defaultValue={hack?.link || ''}
          type="url"
          required
        />
        <Form.Group
          name="youtube"
          title="Tuto d'installation"
          defaultValue={hack?.youtube || ''}
          type="url"
          required
        />
        <div class="flex items-center gap-5">
          <Form.Checkbox name="requiredWinrar" title="Winrar" defaultValue={hack?.requiredWinrar} />
          <Form.Checkbox
            name="requiredUtorrent"
            title="Utorrent"
            defaultValue={hack?.requiredUtorrent}
          />
          <Form.Checkbox
            name="requiredDaemon"
            title="Daemon tools"
            defaultValue={hack?.requiredDaemon}
          />
        </div>

        <Button type="submit" text={btnText} />
      </form>
    </AdminLayout>
  )
}
