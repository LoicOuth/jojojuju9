// TODO: Find a way to use ssr components in client side components

import { useState } from 'preact/hooks'

interface LinkFormItemProps {
  index: number
  removeLinkFormItem: (linkFormItem: number) => void
}

export const LinkForm = () => {
  const [linkFormItems, setLinkFormItems] = useState([0])

  const addLinkFormItem = () => {
    setLinkFormItems([...linkFormItems, linkFormItems[linkFormItems.length - 1] + 1 || 0])
  }
  const removeLinkFormItem = (linkFormItem: number) => {
    setLinkFormItems(linkFormItems.filter((el) => el !== linkFormItem))
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
      {linkFormItems.map((item) => (
        <LinkFormItem index={item} removeLinkFormItem={removeLinkFormItem} />
      ))}
    </>
  )
}

export const LinkFormItem = ({ index, removeLinkFormItem }: LinkFormItemProps) => {
  const inputsName = `links[${index}]`
  return (
    <div class="p-5 mt-5 border">
      <div class="flex gap-5">
        <div class="form_group flex-1">
          <label class="form_label" for={`${inputsName}[name]`}>
            Nom du lien<span class="text-xs">*</span>
          </label>
          <input
            class="form_control"
            id={`${inputsName}[name]`}
            name={`${inputsName}[name]`}
            type="text"
            // value={oldValue}
            required
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
            // value={oldValue}
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
            />
            UTorrent
          </label>
          <label class="form__checkbox ml-5" for={`${inputsName}[requiredWinrar]`}>
            <input
              id={`${inputsName}[requiredWinrar]`}
              name={`${inputsName}[requiredWinrar]`}
              type="checkbox"
              class="mr-3"
            />
            Winrar
          </label>
          <label class="form__checkbox ml-5" for={`${inputsName}[multiplayer]`}>
            <input
              id={`${inputsName}[multiplayer]`}
              name={`${inputsName}[multiplayer]`}
              type="checkbox"
              class="mr-3"
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
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
