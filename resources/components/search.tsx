//TODO: send request

interface SearchProps {
  placeholder: string
}

export const Search = (props: SearchProps) => {
  const { placeholder } = props

  return (
    <input
      name="search"
      class="form_control"
      type="search"
      placeholder={placeholder}
      up-watch="console.log(value)"
      up-watch-delay="250"
    />
  )
}
