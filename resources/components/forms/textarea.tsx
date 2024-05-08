import { HttpContext } from '@adonisjs/core/http'

interface TextareaProps {
  name: string
  required?: boolean
}

export const Textarea = (props: TextareaProps) => {
  const { name, required = false, ...extraProps } = props

  const { session } = HttpContext.getOrFail()
  const flashMessages = session.flashMessages

  const oldValue = flashMessages.get(name) || ''
  const error = flashMessages.get(`errors.${name}`) || ''

  return (
    <>
      <textarea
        class="form_control"
        id={name}
        name={name}
        required={required}
        rows="3"
        {...extraProps}
      >
        {oldValue}
      </textarea>

      {error && <span class="form_error">{error}</span>}
    </>
  )
}
