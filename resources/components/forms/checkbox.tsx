import { HttpContext } from '@adonisjs/core/http'
import { Query } from '../../utils/query.js'

interface CheckboxProps {
  name: string
  title: string
  defaultValue?: boolean
  query?: boolean
}

export const Checkbox = (props: CheckboxProps) => {
  const { name, title, defaultValue = false, query = false } = props

  const { session } = HttpContext.getOrFail()
  const flashMessages = session.flashMessages

  const oldValue = flashMessages.get(name) || ''

  const Checkbox = () => (
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
  return query ? (
    <form up-autosubmit>
      <>
        <Checkbox />
        <Query current={name} />
      </>
    </form>
  ) : (
    <Checkbox />
  )
}
