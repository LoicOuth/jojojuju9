import { Vite } from '#start/view'
import { ThemeCookieKey, Themes } from '#types/common'
import { HttpContext } from '@adonisjs/core/http'

interface MasterProps {
  title?: string
  children: JSX.Element
}

export const MasterLayout = async (props: MasterProps) => {
  const { title, children } = props
  const { request } = HttpContext.getOrFail()

  const theme = request.plainCookie(ThemeCookieKey, Themes.Light) as Themes

  return (
    <>
      {'<!DOCTYPE html>'}
      <html lang="fr" class={theme}>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="view-transition" content="same-origin" />
          <title>Jojojuju9 {title ? `- ${title}` : ''}</title>
          <Vite.Favicon href={'resources/assets/images/jojojuju9_logo.png'} type="image/png" />

          <Vite.Entrypoint
            entrypoints={['resources/assets/css/app.scss', 'resources/assets/ts/app.ts']}
          />
        </head>

        <body id="all">
          <>{children}</>
        </body>
      </html>
    </>
  )
}
