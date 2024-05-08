import { Form } from '#components/forms/index'
import { AdminLayout } from '#layouts/admin.layout'
import Kind from '#models/kind'
import { route } from '#start/view'

interface CreateGameProps {
  kinds: Kind[]
}

export const CreateGame = ({ kinds }: CreateGameProps) => {
  return (
    <AdminLayout title="Ajouter un jeu" returnHref={route('admin.games')}>
      <form>
        <div class="mb-10">
          <image-uploader name="picture" text="Ajouter une image du jeu" />
        </div>
        <div class="flex flex-wrap align-center w-full gap-5">
          <div class="flex column gap-5 flex-1">
            <Form.Group>
              <>
                <Form.Label title="Nom du jeu" for="name" required />
                <Form.Input name="name" />
              </>
            </Form.Group>
            <Form.Group>
              <>
                <Form.Label title="Développeur" for="developer" required />
                <Form.Input name="developer" />
              </>
            </Form.Group>
            <Form.Group>
              <>
                <Form.Label title="Mode" for="mode" required />
                <Form.Input name="mode" />
              </>
            </Form.Group>
            <Form.Group>
              <>
                <Form.Label title="Version" for="version" required />
                <Form.Input name="version" />
              </>
            </Form.Group>

            <div class="flex items-center gap-5">
              <Form.Checkbox name="multiplayer" title="En multijoueur" />
              <Form.Checkbox name="withDlc" title="Avec tous les DLC" />
            </div>
          </div>
          <div class="flex column gap-5 flex-1">
            <Form.Group>
              <>
                <Form.Label title="Système d'exploitation" for="os" required />
                <Form.Input name="os" />
              </>
            </Form.Group>
            <Form.Group>
              <>
                <Form.Label title="Processeur" for="cpu" required />
                <Form.Input name="cpu" />
              </>
            </Form.Group>
            <Form.Group>
              <>
                <Form.Label title="Carte graphique" for="gpu" required />
                <Form.Input name="gpu" />
              </>
            </Form.Group>
            <Form.Group>
              <>
                <Form.Label title="Stockage" for="storage" required />
                <Form.Input name="storage" />
              </>
            </Form.Group>
          </div>
        </div>

        <div class="mt-5">
          <Form.Group>
            <>
              <Form.Label title="Description" for="description" required />
              <Form.Textarea name="description" />
            </>
          </Form.Group>
        </div>

        <div class="my-10">
          <Form.Label title="Contenu" required />
          <textarea-editor name="content" />
        </div>
      </form>
    </AdminLayout>
  )
}
