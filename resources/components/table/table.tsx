import { Pagination } from '#components/pagination'
import { Search } from '#components/search'

interface TableProps {
  headers: string[]
  children: JSX.Element
  class: string
  nbPage: number
}

export const Table = (props: TableProps) => {
  const { children, headers, nbPage, class: className } = props

  return (
    <>
      <div class="mt-5">
        <Search placeholder="Rechercher un jeu" />
      </div>
      <table class={`${className} table`}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      <Pagination nbPages={nbPage} />
    </>
  )
}
