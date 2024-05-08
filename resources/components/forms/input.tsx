import { HttpContext } from '@adonisjs/core/http'

interface InputProps {
  name: string
  required?: boolean
  type?: 'text' | 'email' | 'password' | 'number'
  defaultValue?: string
}

export const Input = (props: InputProps) => {
  const { name, required = false, type = 'text', defaultValue, ...extraProps } = props

  const { session } = HttpContext.getOrFail()
  const flashMessages = session.flashMessages

  const oldValue = flashMessages.get(name) || ''
  const error = flashMessages.get(`errors.${name}`) || ''

  return (
    <>
      <input
        class="form_control"
        id={name}
        name={name}
        type={type}
        value={oldValue || defaultValue}
        required={required}
        {...extraProps}
      />

      {error && <span class="form_error">{error}</span>}
    </>
  )
}
