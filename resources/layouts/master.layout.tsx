import { Vite } from '#start/view'

interface MasterProps {
  title?: string
  children: JSX.Element
}

export const MasterLayout = (props: MasterProps) => {
  const { title, children } = props

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

        <body>{children}</body>
      </html>
    </>
  )
}
