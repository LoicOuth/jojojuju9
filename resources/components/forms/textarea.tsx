import { HttpContext } from '@adonisjs/core/http'

interface TextareaProps {
  name: string
}

export const Textarea = (props: TextareaProps) => {
  const { name, ...extraProps } = props

  const { session } = HttpContext.getOrFail()
  const flashMessages = session.flashMessages

  const oldValue = flashMessages.get(name) || ''
  const error = flashMessages.get(`errors.${name}`) || ''

  return (
    <>
      <textarea class="form_control" id={name} name={name} {...extraProps}>
        {oldValue}
      </textarea>

      {error && <span class="form_error">{error}</span>}
    </>
  )
}
