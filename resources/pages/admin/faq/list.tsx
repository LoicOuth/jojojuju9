import { Button, ButtonIcon } from '#components/button'
import { Table } from '#components/table/index'
import { AdminLayout } from '#layouts/admin.layout'
import Question from '#models/question'
import { csrfField, route } from '#start/view'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

interface AminFaqListProps {
  questions: ModelPaginatorContract<Question>
}

export const AdminFaqList = (props: AminFaqListProps) => {
  const { questions } = props

  const headers = ['Question', 'Créé le', 'Modifié le', 'Actions']

  return (
    <AdminLayout title="FAQ">
      <div class="flex column">
        <div class="flex items-center gap-3">
          <Button
            text="Ajouter une question"
            href={route('admin.faq.create')}
            icon="fa-solid fa-plus"
            up-layer="new"
            up-accept-location={route('admin.faq')}
            up-on-accepted="up.render('body', { response: event.response })"
          />
        </div>
        <Table.Index
          headers={headers}
          nbPage={questions.lastPage}
          searchPlaceholder="Rechercher une question"
          class="mt-5"
        >
          <>
            {questions.map((question) => (
              <Table.Row>
                <>
                  <Table.RowItem>{question.question}</Table.RowItem>
                  <Table.RowItem>{question.createdAt.toFormat('dd/LL/yyyy HH:mm')}</Table.RowItem>
                  <Table.RowItem>{question.updatedAt.toFormat('dd/LL/yyyy HH:mm')}</Table.RowItem>
                  <Table.RowItem width={68}>
                    <div class="flex items-center">
                      <ButtonIcon
                        icon="fa-solid fa-pen"
                        href={route('admin.faq.edit', { id: question.id })}
                        data-tooltip="Modifier"
                        up-layer="new"
                        up-accept-location={route('admin.faq')}
                        up-on-accepted="up.render('body', { response: event.response })"
                      />
                      <form
                        action={`${route('admin.faq.delete', { id: question.id })}?_method=DELETE`}
                        method="post"
                        up-confirm="Voulez-vous vraiment supprimer la question ?"
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
      </div>
    </AdminLayout>
  )
}
