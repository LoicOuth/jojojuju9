interface ChipProps {
  color: 'success' | 'primary' | 'error' | 'yellow' | 'blue'
  text: string
}

export const Chip = (props: ChipProps) => {
  const { color, text } = props

  return <span class={`chip ${color}`}>{text}</span>
}
