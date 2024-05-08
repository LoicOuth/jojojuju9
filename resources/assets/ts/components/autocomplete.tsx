import { options } from 'preact'
import { useEffect, useState } from 'preact/hooks'

export class AutoCompleteProps {
  items: string
  name: string
}

interface Item {
  id?: number
  name: string
}

export const AutoComplete = ({ items, name }: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<Item[]>([])
  const [options, setOptions] = useState<Item[]>([])

  useEffect(() => {
    setOptions(JSON.parse(items) as Item[])
  }, [])

  const handleInputChange = (event) => {
    console.log(event)
    setInputValue(event.target.value)
  }

  const handleSelectOption = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option])
    }
    setInputValue('')
  }

  const handleRemoveOption = (indexOptionToRemove: number) => {
    setSelectedOptions((selectedOptions) =>
      selectedOptions.filter((_, index) => index !== indexOptionToRemove)
    )
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()

      if (inputValue && !selectedOptions.some((option) => option.name === inputValue)) {
        const option = options.find((option) => option.name === inputValue)
        setSelectedOptions((options) => [...options, option || { name: inputValue }])
        setInputValue('')
      }
    }
  }

  const filteredOptions = options.filter(
    (item) =>
      !selectedOptions.some((selectOption) => selectOption.id === item.id) &&
      item.name.toLowerCase().includes(inputValue.toLowerCase())
  )

  return (
    <div class="flex flex-wrap align-center gap-3 w-full autocomplete">
      {selectedOptions.map((option, index) => (
        <div class="autocomplete__item">
          <input type="hidden" name={`${name}[${index}][id]`} value={option.id} key={index} />
          <input type="hidden" name={`${name}[${index}][name]`} value={option.name} key={index} />
          {option.name}

          <i
            class="fa-solid fa-xmark autocomplete__item__icon"
            onClick={() => handleRemoveOption(index)}
          />
        </div>
      ))}

      <div class="autocomplete__input w-full">
        <input
          type="text"
          value={inputValue}
          onInput={handleInputChange}
          placeholder="Écrire pour rechercher..."
          onKeyPressCapture={handleKeyPress}
          class="w-full"
        />
        {inputValue && (
          <div class="autocomplete__input__list flex column">
            {filteredOptions.length ? (
              filteredOptions.map((option, index) => (
                <span
                  class="autocomplete__input__list__item"
                  key={index}
                  onClick={() => handleSelectOption(option)}
                >
                  {option.name}
                </span>
              ))
            ) : (
              <span class="p-3">
                <kbd>Entrer</kbd> pour ajouter
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
