import { HttpContext } from '@adonisjs/core/http'

interface QueryProps {
  current: string
  resetPage?: boolean
}

export const Query = (props: QueryProps) => {
  const { current, resetPage = false } = props
  const { request } = HttpContext.getOrFail()

  return (
    <>
      {Object.entries(request.qs())
        .filter(([key]) => key !== current && (!resetPage || key !== 'page'))
        .map(([name, value]) => (
          <input type="hidden" name={name} value={value} />
        ))}
    </>
  )
}
