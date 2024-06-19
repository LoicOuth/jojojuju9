import { Button } from '#components/button'
import { Form } from '#components/forms/index'
import { HttpContext } from '@adonisjs/core/http'

interface RichTextProps {
  name: string
  defaultValue?: string
  withBtn?: boolean
  addValue?: string
}

export const RichText = (props: RichTextProps) => {
  const { name, defaultValue, withBtn = false, addValue } = props

  const { session } = HttpContext.getOrFail()
  const flashMessages = session.flashMessages

  const oldValue = flashMessages.get(name) || ''
  const error = flashMessages.get(`errors.${name}`) || ''
  return (
    <div class="form_group">
      <div class="flex items-center justify-between">
        <Form.Label title="Contenu" required />
        {withBtn ? (
          <Button
            id="editor-add"
            type="button"
            text='Ajouter "Comment faire fonctionner vos manettes ?"'
            size="sm"
          />
        ) : (
          ''
        )}
      </div>
      <textarea-editor id={name} oldValue={oldValue || defaultValue} addValue={addValue || ''} />
      {error && <span class="form_error">{error}</span>}
    </div>
  )
}
