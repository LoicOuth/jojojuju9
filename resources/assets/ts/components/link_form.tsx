// TODO: Find a way to use ssr components in client side components

import { useEffect, useState } from 'preact/hooks'

interface LinkFormData {
  id?: number
  name: string
  url: string
  requiredUtorrent: boolean
  requiredWinrar: boolean
  requiredDaemon: boolean
  multiplayer: boolean
}

export class LinkFormProps {
  items?: string
}

interface LinkFormItemProps {
  index: number
  item: LinkFormData
  removeLinkFormItem: (linkFormItem: number) => void
}

export const LinkForm = ({ items }: LinkFormProps) => {
  const [linkFormItems, setLinkFormItems] = useState<LinkFormData[]>([])
  const defaultLinkFormItem: LinkFormData = {
    name: '',
    url: '',
    requiredUtorrent: false,
    requiredWinrar: false,
    requiredDaemon: false,
    multiplayer: false,
  }

  useEffect(() => {
    if (items) {
      setLinkFormItems(JSON.parse(items) as LinkFormData[])
    } else {
      setLinkFormItems([defaultLinkFormItem])
    }
  }, [])

  const addLinkFormItem = () => {
    setLinkFormItems([...linkFormItems, { ...defaultLinkFormItem }])
  }
  const removeLinkFormItem = (linkFormItemIndex: number) => {
    setLinkFormItems(linkFormItems.filter((_, index) => index !== linkFormItemIndex))
  }

  return (
    <>
      <button
        type="button"
        onClick={addLinkFormItem}
        class="button text-center flex items-center primary md"
      >
        Ajouter un lien
      </button>
      {linkFormItems.map((item, index) => (
        <LinkFormItem index={index} item={item} removeLinkFormItem={removeLinkFormItem} />
      ))}
    </>
  )
}

export const LinkFormItem = ({ index, item, removeLinkFormItem }: LinkFormItemProps) => {
  const inputsName = `links[${index}]`
  return (
    <>
      {item.id && <input type="hidden" name="id" value={item.id} />}
      <div class="p-5 mt-5 border">
        <div class="flex gap-5">
          <div class="form_group flex-1">
            <label class="form_label" for={`${inputsName}[name]`}>
              Nom du lien
            </label>
            <input
              class="form_control"
              id={`${inputsName}[name]`}
              name={`${inputsName}[name]`}
              type="text"
              value={item.name}
            />

            {/* {error && <span class="form_error">{error}</span>} */}
          </div>
          <div class="form_group flex-1">
            <label class="form_label" for={`${inputsName}[url]`}>
              Url<span class="text-xs">*</span>
            </label>
            <input
              class="form_control"
              id={`${inputsName}[url]`}
              name={`${inputsName}[url]`}
              type="url"
              value={item.url}
              required
            />

            {/* {error && <span class="form_error">{error}</span>} */}
          </div>
        </div>
        <div class="flex mt-5">
          <div class="flex flex-1">
            <label class="form__checkbox" for={`${inputsName}[requiredUtorrent]`}>
              <input
                id={`${inputsName}[requiredUtorrent]`}
                name={`${inputsName}[requiredUtorrent]`}
                type="checkbox"
                class="mr-3"
                checked={item.requiredUtorrent}
              />
              UTorrent
            </label>
            <label class="form__checkbox ml-5" for={`${inputsName}[requiredWinrar]`}>
              <input
                id={`${inputsName}[requiredWinrar]`}
                name={`${inputsName}[requiredWinrar]`}
                type="checkbox"
                class="mr-3"
                checked={item.requiredWinrar}
              />
              Winrar
            </label>
            <label class="form__checkbox ml-5" for={`${inputsName}[requiredDaemon]`}>
              <input
                id={`${inputsName}[requiredDaemon]`}
                name={`${inputsName}[requiredDaemon]`}
                type="checkbox"
                class="mr-3"
                checked={item.requiredDaemon}
              />
              Daemon tools
            </label>
            <label class="form__checkbox ml-5" for={`${inputsName}[multiplayer]`}>
              <input
                id={`${inputsName}[multiplayer]`}
                name={`${inputsName}[multiplayer]`}
                type="checkbox"
                class="mr-3"
                checked={item.multiplayer}
              />
              Multijoueur
            </label>
          </div>
          <div class="ml-5">
            <button
              class="button__icon text-center flex items-center secondary md error"
              type="button"
              onClick={() => removeLinkFormItem(index)}
            >
              <i class="fa-solid fa-trash" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
