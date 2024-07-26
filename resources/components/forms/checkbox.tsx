import { HttpContext } from '@adonisjs/core/http'
import { Query } from '../../utils/query.js'

interface CheckboxProps {
  name: string
  title: string
  defaultValue?: boolean | 0 | 1 | 'on'
  query?: boolean
}

export const Checkbox = (props: CheckboxProps) => {
  const { name, title, defaultValue = false, query = false } = props

  const { session } = HttpContext.getOrFail()
  const flashMessages = session.flashMessages

  const oldValue = flashMessages.get(name) || ''

  const checked = oldValue || defaultValue === true || defaultValue === 1 || defaultValue === 'on'

  const Checkbox = () => (
    <label class="form__checkbox" for={name}>
      <input id={name} name={name} type="checkbox" class="mr-3" {...(checked ? { checked } : {})} />
      {title}
    </label>
  )
  return query ? (
    <form up-autosubmit>
      <>
        <Checkbox />
        <Query current={name} resetPage />
      </>
    </form>
  ) : (
    <Checkbox />
  )
}
