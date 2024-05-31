import { Vite } from '#start/view'
import { HttpContext } from '@adonisjs/core/http'

interface MasterProps {
  title?: string
  children: JSX.Element
}

export const MasterLayout = async (props: MasterProps) => {
  const { title, children } = props

  const { session } = await HttpContext.getOrFail()

  const successMessage = session.flashMessages.get('success')?.message

  return (
    <>
      {'<!DOCTYPE html>'}
      <html lang="fr">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="view-transition" content="same-origin" />
          <title>Jojojuju9 {title ? `- ${title}` : ''}</title>
          <Vite.Favicon href="resources/assets/images/jojojuju9_logo.png" type="image/png" />

          <Vite.Entrypoint
            entrypoints={['resources/assets/css/app.scss', 'resources/assets/ts/app.ts']}
          />
        </head>

        <body>
          <>
            {successMessage && <div class="toast">{successMessage}</div>}
            {children}
          </>
        </body>
      </html>
    </>
  )
}
