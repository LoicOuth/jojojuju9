import { Pagination } from '#components/pagination'
import { Search } from '#components/search'

interface TableProps {
  headers: string[]
  children: JSX.Element
  class?: string
  nbPage?: number
  searchPlaceholder?: string
  withSearch?: boolean
  withPagination?: boolean
}

export const Table = (props: TableProps) => {
  const {
    children,
    headers,
    nbPage,
    class: className,
    withSearch = true,
    withPagination = true,
    searchPlaceholder = 'Rechercher',
  } = props

  return (
    <>
      {withSearch ? (
        <div class="mt-5">
          <Search placeholder={searchPlaceholder} />
        </div>
      ) : (
        ''
      )}
      <div class="table_wrapper">
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
      </div>

      {withPagination && nbPage ? <Pagination nbPages={nbPage} /> : ''}
    </>
  )
}
