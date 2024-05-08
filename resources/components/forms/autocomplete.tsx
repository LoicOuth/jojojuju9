import { Label } from '#components/forms/label'

interface AutoCompleteProps<T extends { id: number; name: string }> {
  items: T[]
  name: string
  title: string
}

export function AutoComplete<T extends { id: number; name: string }>(props: AutoCompleteProps<T>) {
  const { items, name, title } = props

  return (
    <div class="form_group" up-form-group>
      <>
        <Label for={name} title={title} />
        <auto-complete name={name} items={JSON.stringify(items)} />
      </>
    </div>
  )
}
