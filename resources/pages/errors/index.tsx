import { FobiddenPage } from '#pages/errors/forbidden'
import { NotFoundPage } from '#pages/errors/not_found'
import { ServerErrorPage } from '#pages/errors/server'

export const ErrorPage = {
  Forbidden: FobiddenPage,
  NotFound: NotFoundPage,
  Server: ServerErrorPage,
}
