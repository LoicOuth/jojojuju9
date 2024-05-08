import { HttpContext } from '@adonisjs/core/http'

interface CheckboxProps {
  name: string
  title: string
  defaultValue?: boolean
}

export const Checkbox = (props: CheckboxProps) => {
  const { name, title, defaultValue = false } = props

  const { session } = HttpContext.getOrFail()
  const flashMessages = session.flashMessages

  const oldValue = flashMessages.get(name) || ''

  return (
    <label class="form__checkbox" for={name}>
      <input
        id={name}
        name={name}
        type="checkbox"
        class="mr-3"
        checked={oldValue || defaultValue}
      />
      {title}
    </label>
  )
}
