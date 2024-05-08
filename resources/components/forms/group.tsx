import { Label } from '#components/forms/label'
import { Textarea } from '#components/forms/textarea'
import { Input } from '#components/forms/input'

interface GroupProps {
  title: string
  name: string
  required?: boolean
  type?: 'text' | 'email' | 'password' | 'textarea'
}

export const Group = (props: GroupProps) => {
  const { title, name, required = false, type = 'text', ...extraProps } = props

  return (
    <div class="form_group" up-form-group>
      <Label required={required} for={name} title={title} />

      {type === 'textarea' ? (
        <Textarea name={name} required={required} {...extraProps} />
      ) : (
        <Input name={name} type={type} required={required} {...extraProps} />
      )}
    </div>
  )
}
