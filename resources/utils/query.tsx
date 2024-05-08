import { HttpContext } from '@adonisjs/core/http'

interface QueryProps {
  current: string
}

export const Query = (props: QueryProps) => {
  const { current } = props
  const { request } = HttpContext.getOrFail()

  return (
    <>
      {Object.entries(request.qs())
        .filter(([key]) => key !== current)
        .map(([name, value]) => (
          <input type="hidden" name={name} value={value} />
        ))}
    </>
  )
}
