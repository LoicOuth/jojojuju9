import { HttpContext } from '@adonisjs/core/http'
import { Query } from '../utils/query.js'

interface SearchProps {
  placeholder: string
}

export const Search = (props: SearchProps) => {
  const { placeholder } = props

  const { request } = HttpContext.getOrFail()

  return (
    <form up-focus="keep">
      <input
        name="s"
        class="form_control form__search"
        type="search"
        value={request.qs().s}
        placeholder={placeholder}
        up-autosubmit
        up-watch-delay="250"
      />

      <Query current="s" />
    </form>
  )
}
