interface CheckboxProps {
  name: string
  children?: JSX.Element
}

export const Checkbox = (props: CheckboxProps) => {
  const { name, children } = props

  return (
    <label class="form__checkbox" for={name}>
      <input id={name} name={name} type="checkbox" class="mr-3" />

      {children}
    </label>
  )
}
