import { Button } from '#components/button'
import { Form } from '#components/forms/index'
import { AdminLayout } from '#layouts/admin.layout'
import Patch from '#models/patch'
import { csrfField, route } from '#start/view'

interface CreateUpdatePatchProps {
  patch?: Patch
}

export const CreateUpdatePatch = (props: CreateUpdatePatchProps) => {
  const { patch } = props

  const title = patch ? 'Mettre à jour un patch/Fix/Astuce' : 'Créer un patch/Fix/Astuce'
  const action = patch
    ? `${route('admin.patchs.update', { id: patch.id })}?_method=PUT`
    : route('admin.patchs.store')
  const btnText = patch ? 'Modifier le patch' : 'Créer le patch'

  return (
    <AdminLayout title={title} returnHref={route('admin.patchs')}>
      <form action={action} class="flex column gap-5 p-5" method="POST">
        {csrfField()}
        <Form.Group name="program" title="Programme" defaultValue={patch?.program || ''} required />
        <Form.Group name="type" title="Type de patch" defaultValue={patch?.type || ''} required />
        <Form.Group
          name="link"
          title="Lien de téléchargement"
          defaultValue={patch?.link || ''}
          type="url"
          required
        />
        <Form.Group
          name="youtube"
          title="Tuto d'installation"
          defaultValue={patch?.youtube || ''}
          type="url"
        />
        <div class="flex items-center gap-5">
          <Form.Checkbox
            name="requiredWinrar"
            title="Winrar"
            defaultValue={patch?.requiredWinrar}
          />
          <Form.Checkbox
            name="requiredUtorrent"
            title="Utorrent"
            defaultValue={patch?.requiredUtorrent}
          />
          <Form.Checkbox
            name="requiredDaemon"
            title="Daemon tools"
            defaultValue={patch?.requiredDaemon}
          />
        </div>

        <Button type="submit" text={btnText} />
      </form>
    </AdminLayout>
  )
}
