import { ButtonIcon } from '#components/button'
import { Table } from '#components/table/index'
import { AdminLayout } from '#layouts/admin.layout'
import Game from '#models/game'
import Hack from '#models/hack'
import Patch from '#models/patch'
import Question from '#models/question'
import Software from '#models/software'
import { csrfField, route } from '#start/view'
import { ValidateTableItem, ValidateTypeValue } from '#types/validate'

interface ListValidateProps {
  games: Game[]
  softwares: Software[]
  hacks: Hack[]
  patchs: Patch[]
  questions: Question[]
}

export const ListValidatePage = (props: ListValidateProps) => {
  const { games, hacks, patchs, questions, softwares } = props

  const headers = ['Nom', 'Type', 'Créé le', 'Créé par', 'Actions']

  const validateTableItems = [
    ...softwares.map<ValidateTableItem>((software) => ({
      id: software.id,
      name: software.name,
      createdBy: software.createdBy,
      createdAt: software.createdAt,
      type: 'software',
      deleteRoute: route(`admin.softwares.delete`, { id: software.id }),
      editRoute: route(
        'admin.softwares.edit',
        { slug: software.slug },
        { qs: { from: 'validate' } }
      ),
    })),
    ...games.map<ValidateTableItem>((game) => ({
      id: game.id,
      name: game.name,
      createdBy: game.createdBy,
      createdAt: game.createdAt,
      type: 'game',
      deleteRoute: route(`admin.games.delete`, { id: game.id }),
      editRoute: route('admin.games.edit', { slug: game.slug }, { qs: { from: 'validate' } }),
    })),
    ...hacks.map<ValidateTableItem>((hack) => ({
      id: hack.id,
      name: hack.game,
      createdBy: hack.createdBy,
      createdAt: hack.createdAt,
      type: 'hack',
      deleteRoute: route(`admin.hack.delete`, { id: hack.id }),
      editRoute: route('admin.hack.edit', { id: hack.id }, { qs: { from: 'validate' } }),
    })),
    ...patchs.map<ValidateTableItem>((patch) => ({
      id: patch.id,
      name: patch.program,
      createdBy: patch.createdBy,
      createdAt: patch.createdAt,
      type: 'patch',
      deleteRoute: route(`admin.patchs.delete`, { id: patch.id }),
      editRoute: route('admin.patchs.edit', { id: patch.id }, { qs: { from: 'validate' } }),
    })),
    ...questions.map<ValidateTableItem>((question) => ({
      id: question.id,
      name: question.question,
      createdBy: question.createdBy,
      createdAt: question.createdAt,
      type: 'question',
      deleteRoute: route(`admin.faq.delete`, { id: question.id }),
      editRoute: route('admin.faq.edit', { id: question.id }, { qs: { from: 'validate' } }),
    })),
  ].sort((a, b) => a.createdAt.toMillis() - b.createdAt.toMillis())

  return (
    <AdminLayout title="Validé">
      <Table.Index headers={headers} withPagination={false} withSearch={false}>
        <>
          {validateTableItems.map((item) => (
            <Table.Row>
              <>
                <Table.RowItem>{item.name}</Table.RowItem>
                <Table.RowItem>{ValidateTypeValue[item.type]}</Table.RowItem>
                <Table.RowItem>{item.createdAt.toFormat('F', { locale: 'fr-FR' })}</Table.RowItem>
                <Table.RowItem>{item.createdBy?.username || 'Inconnu'}</Table.RowItem>
                <Table.RowItem width={68}>
                  <div class="flex items-center">
                    <form
                      action={`${route('admin.validate.handle', { type: item.type, id: item.id })}?_method=PATCH`}
                      method="post"
                      up-confirm={`Voulez-vous vraiment valider le ${ValidateTypeValue[item.type]} ${item.name}?`}
                      up-target="body"
                    >
                      {csrfField()}
                      <ButtonIcon
                        type="submit"
                        icon="fa-regular fa-circle-check"
                        data-tooltip="Valider"
                      />
                    </form>
                    <ButtonIcon
                      icon="fa-solid fa-pen"
                      href={item.editRoute}
                      data-tooltip="Modifier"
                    />
                    <form
                      action={`${item.deleteRoute}?_method=DELETE`}
                      method="post"
                      up-confirm={`Voulez-vous vraiment supprimer le ${ValidateTypeValue[item.type]} ${item.name}?`}
                      up-target="body"
                    >
                      {csrfField()}
                      <ButtonIcon
                        type="submit"
                        icon="fa-solid fa-trash"
                        color="error"
                        data-tooltip="Supprimer"
                      />
                    </form>
                  </div>
                </Table.RowItem>
              </>
            </Table.Row>
          ))}
        </>
      </Table.Index>
    </AdminLayout>
  )
}
