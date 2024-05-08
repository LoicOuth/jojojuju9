interface RowProps {
  children: JSX.Element
}
interface RowItemProps {
  children: JSX.Element
  width?: number
}

export const Row = (props: RowProps) => {
  const { children } = props

  return <tr>{children}</tr>
}

export const RowItem = (props: RowItemProps) => {
  const { children, width } = props

  return <td style={{ width: `${width}px` }}>{children}</td>
}
