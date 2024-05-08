import { Form } from '#components/forms/index'
import { HttpContext } from '@adonisjs/core/http'

interface RichTextProps {
  name: string
}

export const RichText = (props: RichTextProps) => {
  const { name } = props

  const { session } = HttpContext.getOrFail()
  const flashMessages = session.flashMessages

  const oldValue = flashMessages.get(name) || ''
  const error = flashMessages.get(`errors.${name}`) || ''
  return (
    <div class="form_group">
      <Form.Label title="Contenu" required />
      <textarea-editor id="content" oldValue={oldValue} />
      {error && <span class="form_error">{error}</span>}
    </div>
  )
}
