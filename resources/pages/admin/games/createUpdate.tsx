//TODO: Implement update image

import { Button } from '#components/button'
import { Form } from '#components/forms/index'
import { LinksForm } from '#components/forms/links'
import { AdminLayout } from '#layouts/admin.layout'
import Game from '#models/game'
import Kind from '#models/kind'
import { csrfField, route } from '#start/view'

interface CreateUpdateGameProps {
  kinds: Kind[]
  game?: Game
  defaultContent?: string
}

export const CreateUpdateGame = ({ kinds, game, defaultContent = '' }: CreateUpdateGameProps) => {
  const title = game ? 'Modifier un jeu' : 'Ajouter un jeu'
  const action = game ? route('admin.games.update', { id: game.id }) : route('admin.games.store')
  const btnText = game ? 'Modifier le jeu' : 'Créer le jeu'

  return (
    <AdminLayout title={title} returnHref={route('admin.games')}>
      <form action={action} method="POST" enctype="multipart/form-data">
        {csrfField()}
        <div class="mb-10">
          <Form.ImageUploader name="picture" text="Ajouter une image du jeu" src={game?.picture} />
        </div>
        <div class="flex flex-wrap align-center w-full gap-5">
          <div class="flex column gap-5 flex-1">
            <Form.Group title="Nom du jeu" name="name" defaultValue={game?.name} required />
            <Form.Group
              title="Développeur"
              name="developer"
              defaultValue={game?.developer}
              required
            />
            <Form.Group title="Mode" name="mode" defaultValue={game?.mode} required />
            <Form.Group title="Version" name="version" defaultValue={game?.version} required />
            <Form.AutoComplete title="Genres" name="kinds" items={kinds} selected={game?.kinds} />
            <div class="flex items-center gap-5">
              <Form.Checkbox
                name="multiplayer"
                title="En multijoueur"
                defaultValue={game?.multiplayer}
              />
              <Form.Checkbox
                name="withDlc"
                title="Avec tous les DLC"
                defaultValue={game?.withDlc}
              />
            </div>
          </div>
          <div class="flex column gap-5 flex-1">
            <Form.Group title="Système d'exploitation" name="os" defaultValue={game?.os} required />
            <Form.Group title="Processeur" name="cpu" defaultValue={game?.cpu} required />
            <Form.Group title="Mémoire vive" name="memory" defaultValue={game?.memory} required />
            <Form.Group title="Carte graphique" name="gpu" defaultValue={game?.gpu} required />
            <Form.Group title="Stockage" name="storage" defaultValue={game?.storage} required />
          </div>
        </div>

        <div class="mt-5">
          <Form.Group
            title="Description du jeu"
            name="description"
            type="textarea"
            defaultValue={game?.description}
            required
          />
        </div>

        <div class="my-10">
          <Form.RichText name="content" defaultValue={game?.content || defaultContent} />
        </div>

        <LinksForm items={game?.links} />
        <div class="flex justify-end mt-10">
          <Button type="submit" text={btnText} />
        </div>
      </form>
    </AdminLayout>
  )
}
