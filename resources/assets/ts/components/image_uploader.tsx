import { useState, useRef } from 'preact/hooks'

export class ImageUploaderProps {
  name: string
  text: string
  src?: string
  rounded?: 'true' | 'false'
}

export const ImageUploader = (props: ImageUploaderProps) => {
  const { name, text, src, rounded = 'false' } = props

  const [image, setImage] = useState<string>()
  const inputFile = useRef<HTMLInputElement>()

  const handleChooseImage = () => {
    setImage(URL.createObjectURL(inputFile.current.files[0]))
  }

  return (
    <>
      {image || src ? (
        <div class={`${rounded === 'true' && 'rounded'} image-uploader__preview`}>
          <img onClick={() => inputFile.current.click()} src={image || src} />
        </div>
      ) : (
        <div
          onClick={() => inputFile.current.click()}
          class={`${rounded === 'true' && 'rounded'} image-uploader__btn`}
        >
          {text}
        </div>
      )}

      <input
        ref={inputFile}
        type="file"
        style="display: none"
        accept="image/*"
        name={name}
        onChange={handleChooseImage}
      />
    </>
  )
}
