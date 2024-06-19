import { HttpContext } from '@adonisjs/core/http'
import { Query } from '../../utils/query.js'

export interface Options {
  value: number | string | 'null'
  text: string
}

interface SelectProps {
  name: string
  options: Options[]
  required?: boolean
  defaultValue?: string
  query?: boolean
}

export const Select = (props: SelectProps) => {
  const { name, required = false, defaultValue, options, query = false } = props

  const { session } = HttpContext.getOrFail()
  const flashMessages = session.flashMessages

  const oldValue = flashMessages.get(name) || ''
  const error = flashMessages.get(`errors.${name}`) || ''

  const SelectOptions = () => (
    <select
      class="form_control"
      id={name}
      name={name}
      required={required}
      {...(query && { 'up-autosubmit': true })}
    >
      {options.map((option) => (
        <option
          value={option.value?.toString() || 'null'}
          selected={
            (oldValue && oldValue === option.value?.toString()) ||
            defaultValue === option.value?.toString()
          }
        >
          {option.text}
        </option>
      ))}
    </select>
  )

  return query ? (
    <form>
      <>
        <SelectOptions />
        <Query current={name} />
      </>
    </form>
  ) : (
    <>
      <SelectOptions /> {error && <span class="form_error">{error}</span>}
    </>
  )
}
