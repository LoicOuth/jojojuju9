import { HttpContext } from '@adonisjs/core/http'

interface CheckboxProps {
  name: string
  title: string
}

export const Checkbox = (props: CheckboxProps) => {
  const { name, title } = props

  const { session } = HttpContext.getOrFail()
  const flashMessages = session.flashMessages

  const oldValue = flashMessages.get(name) || ''

  return (
    <label class="form__checkbox" for={name}>
      <input id={name} name={name} type="checkbox" class="mr-3" checked={oldValue || false} />
      {title}
    </label>
  )
}
