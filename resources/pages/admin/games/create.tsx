//TODO: Implement kinds & link forlm errors and old value

import { Button } from '#components/button'
import { Form } from '#components/forms/index'
import { AdminLayout } from '#layouts/admin.layout'
import Kind from '#models/kind'
import { csrfField, route } from '#start/view'
import { HttpContext } from '@adonisjs/core/http'

interface CreateGameProps {
  kinds: Kind[]
  defaultContent: string
}

export const CreateGame = ({ kinds, defaultContent }: CreateGameProps) => {
  const { session } = HttpContext.getOrFail()

  return (
    <AdminLayout title="Ajouter un jeu" returnHref={route('admin.games')}>
      <form action={route('admin.games.store')} method="POST" enctype="multipart/form-data">
        {csrfField()}
        <div class="mb-10">
          <Form.ImageUploader name="picture" text="Ajouter une image du jeu" />
        </div>
        <div class="flex flex-wrap align-center w-full gap-5">
          <div class="flex column gap-5 flex-1">
            <Form.Group title="Nom du jeu" name="name" required />
            <Form.Group title="Développeur" name="developer" required />
            <Form.Group title="Mode" name="mode" required />
            <Form.Group title="Version" name="version" required />
            <Form.AutoComplete title="Genres" name="kinds" items={kinds} />
            <div class="flex items-center gap-5">
              <Form.Checkbox name="multiplayer" title="En multijoueur" />
              <Form.Checkbox name="withDlc" title="Avec tous les DLC" />
            </div>
          </div>
          <div class="flex column gap-5 flex-1">
            <Form.Group title="Système d'exploitation" name="os" required />
            <Form.Group title="Processeur" name="cpu" required />
            <Form.Group title="Mémoire vive" name="memory" required />
            <Form.Group title="Carte graphique" name="gpu" required />
            <Form.Group title="Stockage" name="storage" required />
          </div>
        </div>

        <div class="mt-5">
          <Form.Group title="Description du jeu" name="description" type="textarea" required />
        </div>

        <div class="my-10">
          <Form.RichText name="content" defaultValue={defaultContent} />
        </div>

        <link-form />
        <div class="flex justify-end mt-10">
          <Button type="submit" text="Créer le jeu" />
        </div>
      </form>
    </AdminLayout>
  )
}
