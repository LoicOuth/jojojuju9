import { Button } from '#components/button'
import { Form } from '#components/forms/index'
import { LinksForm } from '#components/forms/links'
import { AdminLayout } from '#layouts/admin.layout'
import Kind from '#models/kind'
import Software from '#models/software'
import { csrfField, route } from '#start/view'

interface CreateUpdateSoftwareProps {
  kinds: Kind[]
  software?: Software
  defaultContent?: string
}

export const CreateUpdateSoftware = (props: CreateUpdateSoftwareProps) => {
  const { kinds, software, defaultContent = '' } = props
  const title = software ? 'Modifier un logiciel' : 'Ajouter un logiciel'
  const action = software
    ? `${route('admin.softwares.update', { id: software.id })}?_method=PUT`
    : route('admin.softwares.store')
  const btnText = software ? 'Modifier le logiciel' : 'Créer le logiciel'

  return (
    <AdminLayout title={title} returnHref={route('admin.softwares')}>
      <form action={action} method="POST" enctype="multipart/form-data">
        {csrfField()}
        <div class="mb-10">
          <Form.ImageUploader
            name="picture"
            text="Ajouter une image du logiciel"
            src={software?.picture}
          />
        </div>
        <div class="flex column gap-5 flex-1">
          <h2 class="underline">Informations</h2>

          <Form.Group title="Nom du logiciel" name="name" defaultValue={software?.name} required />
          <Form.Group
            title="Développeur"
            name="developer"
            defaultValue={software?.developer}
            required
          />
          <Form.Group title="Éditeur" name="editor" defaultValue={software?.editor} />
          <Form.Group title="Version" name="version" defaultValue={software?.version || ''} />
          <Form.Group
            title="Vidéo de présentation"
            name="youtube"
            defaultValue={software?.youtube}
          />

          <Form.AutoComplete title="Tags" name="kinds" items={kinds} selected={software?.kinds} />

          <Form.Group
            title="Description du logiciel"
            name="description"
            type="textarea"
            defaultValue={software?.description}
            required
          />
        </div>

        <div class="flex column gap-5 flex-1 my-10">
          <h2 class="underline">Configuration minimale</h2>

          <Form.Group
            title="Système d'exploitation"
            name="os"
            defaultValue={software?.os}
            required
          />
          <Form.Group title="Processeur" name="cpu" defaultValue={software?.cpu} />
          <Form.Group title="Mémoire vive" name="memory" defaultValue={software?.memory} />
          <Form.Group title="Carte graphique" name="gpu" defaultValue={software?.gpu} />
          <Form.Group title="Stockage" name="storage" defaultValue={software?.storage} required />
          <Form.Group title="Notes supplémentaires" name="notes" defaultValue={software?.notes} />
        </div>

        <div class="flex column gap-5 my-10">
          <h2 class="underline">Contenu</h2>
          <Form.RichText name="content" defaultValue={software?.content || defaultContent} />
        </div>

        <LinksForm items={software?.links} />
        <div class="flex justify-end mt-10">
          <Button type="submit" text={btnText} />
        </div>
      </form>
    </AdminLayout>
  )
}
