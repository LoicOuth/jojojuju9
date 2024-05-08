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
    if (event.key === 'Enter' && !selectedOptions.some((option) => option.name === inputValue)) {
      setSelectedOptions((options) => [...options, { name: inputValue }])
      setInputValue('')
    }
  }

  const filteredOptions = options.filter((item) =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  )

  return (
    <>
      <div class="flex align-center w-full">
        {selectedOptions.length ? (
          <div class="flex wrap align-center gap-2 mr-2">
            {selectedOptions.map((option, index) => (
              <div class="autocomplete__item">
                <input type="hidden" name={`${name}[${index}][id]`} value={option.id} key={index} />
                <input
                  type="hidden"
                  name={`${name}[${index}][name]`}
                  value={option.name}
                  key={index}
                />
                {option.name}

                <i
                  class="fa-solid fa-xmark autocomplete__item__icon"
                  onClick={() => handleRemoveOption(index)}
                />
              </div>
            ))}
          </div>
        ) : (
          ''
        )}

        <div class="autocomplete__input w-full">
          <input
            type="text"
            value={inputValue}
            onInput={handleInputChange}
            placeholder="Type to search..."
            onKeyPressCapture={handleKeyPress}
            class="form_control w-full"
          />
          <ul class="autocomplete__input__list">
            {filteredOptions.map((option, index) => (
              <li key={index} onClick={() => handleSelectOption(option)}>
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
