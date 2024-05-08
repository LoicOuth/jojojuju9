//TODO: link forlm errors and old value
import Link from '#models/link'
// import { HttpContext } from '@adonisjs/core/http'

interface LinksFormProps {
  items?: Link[]
}

export const LinksForm = (props: LinksFormProps) => {
  const { items } = props
  //   const { session } = HttpContext.getOrFail()

  return <link-form items={JSON.stringify(items)} />
}
