import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import vite from '@adonisjs/vite/services/main'

export const route = (...args: Parameters<typeof router.makeUrl>) => {
  return router.makeUrl(...args)
}

export const csrfField = () => {
  // Note the usage of ALS here.
  const { request } = HttpContext.getOrFail()

  return Html.createElement('input', { type: 'hidden', value: request.csrfToken, name: '_csrf' })
}

const Image = (props: { src: string; alt?: string; class?: string }) => {
  const url = vite.assetPath(props.src)

  return Html.createElement('img', { src: url, alt: props.alt, class: props.class })
}

const Entrypoint = (props: { entrypoints: string[] }) => {
  const assets = vite.generateEntryPointsTags(props.entrypoints)

  const elements = assets.map((asset) => {
    if (asset.tag === 'script') {
      return Html.createElement('script', {
        ...asset.attributes,
      })
    }

    return Html.createElement('link', {
      ...asset.attributes,
    })
  })

  return Html.createElement(Html.Fragment, {}, elements)
}

export const Vite = {
  Entrypoint,
  Image,
}
