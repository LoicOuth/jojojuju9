import { HttpContext } from '@adonisjs/core/http'

interface ImageUploaderProps {
  name: string
  text: string
  src?: string
}

export const ImageUploader = (props: ImageUploaderProps) => {
  const { name, text, src, ...extraProps } = props

  const { session } = HttpContext.getOrFail()
  const flashMessages = session.flashMessages

  const oldValue = flashMessages.get(name) || ''
  const error = flashMessages.get(`errors.${name}`) || ''

  return (
    <div class="form_group" up-form-group {...extraProps}>
      {oldValue && <span class="text-xs">{oldValue}</span>}
      <image-uploader name={name} text={text} src={src} />

      {error && <span class="form_error">{error}</span>}
    </div>
  )
}
