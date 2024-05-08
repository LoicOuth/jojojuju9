import { route } from '#start/view'
import { HttpContext } from '@adonisjs/core/http'

interface SearchProps {
  placeholder: string
}

export const Search = (props: SearchProps) => {
  const { placeholder } = props

  const { request } = HttpContext.getOrFail()

  return (
    <form
      action={route(request.url(), request.params(), { qs: { ...request.qs() } })}
      up-focus="keep"
    >
      <input
        name="s"
        class="form_control form__search"
        type="search"
        value={request.qs().s}
        placeholder={placeholder}
        up-autosubmit
        up-watch-delay="250"
      />
    </form>
  )
}
