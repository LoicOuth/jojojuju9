interface CheckboxProps {
  name: string
  title: string
}

export const Checkbox = (props: CheckboxProps) => {
  const { name, title } = props

  return (
    <label class="form__checkbox" for={name}>
      <input id={name} name={name} type="checkbox" class="mr-3" />
      {title}
    </label>
  )
}
