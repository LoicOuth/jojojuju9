import { Label } from '#components/forms/label'
import { Textarea } from '#components/forms/textarea'
import { Input } from '#components/forms/input'

interface GroupProps {
  title?: string
  name: string
  required?: boolean
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea'
  defaultValue?: string
  class?: string
}

export const Group = (props: GroupProps) => {
  const { title, name, required = false, type = 'text', defaultValue, class: className } = props

  return (
    <div class={`${className} form_group`} up-form-group>
      <Label required={required} for={name} title={title} />

      {type === 'textarea' ? (
        <Textarea name={name} required={required} defaultValue={defaultValue} />
      ) : (
        <Input name={name} type={type} required={required} defaultValue={defaultValue} />
      )}
    </div>
  )
}
