import { Button } from '#components/button'
import { Form } from '#components/forms/index'
import { AdminLayout } from '#layouts/admin.layout'
import Question from '#models/question'
import { csrfField, route } from '#start/view'

interface CreateUpdateQuestionProps {
  question?: Question
}

export const CreateUpdateQuestion = (props: CreateUpdateQuestionProps) => {
  const { question } = props

  const title = question ? 'Mettre à jour une question' : 'Créer une question'
  const action = question
    ? `${route('admin.faq.update', { id: question.id })}?_method=PUT`
    : route('admin.faq.store')
  const btnText = question ? 'Modifier la question' : 'Créer la question'

  return (
    <AdminLayout title={title} returnHref={route('admin.faq')}>
      <form
        action={action}
        class="flex column gap-5 p-5"
        method="POST"
        up-modal-scope
        up-layer="parent"
        up-target="body"
      >
        {csrfField()}
        <Form.Group
          name="question"
          title="Question"
          defaultValue={question?.question || ''}
          required
        />

        <Form.RichText name="content" defaultValue={question?.content || ''} />

        <Button type="submit" text={btnText} />
      </form>
    </AdminLayout>
  )
}
