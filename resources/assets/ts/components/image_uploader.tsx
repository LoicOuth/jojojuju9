import { useState, useRef } from 'preact/hooks'

export class ImageUploaderProps {
  name: string
  text: string
}

export const ImageUploader = (props: ImageUploaderProps) => {
  const { name, text } = props

  const [image, setImage] = useState<string>()
  const inputFile = useRef<HTMLInputElement>()

  const handleChooseImage = () => {
    setImage(URL.createObjectURL(inputFile.current.files[0]))
  }

  return (
    <>
      {image ? (
        <img class="image-uploader__preview" src={image} />
      ) : (
        <div onClick={() => inputFile.current.click()} class="image-uploader__btn">
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
