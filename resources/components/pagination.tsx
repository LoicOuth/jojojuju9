import { Button, ButtonIcon } from '#components/button'
import { route } from '#start/view'
import { HttpContext } from '@adonisjs/core/http'

interface PaginationProps {
  nbPages: number
}

export const Pagination = (props: PaginationProps) => {
  const { nbPages } = props
  const { request } = HttpContext.getOrFail()
  const page = request.qs().page ? Number.parseInt(request.qs().page) : 1

  const changePage = (newPage: number) =>
    route(request.url(), request.params(), { qs: { ...request.qs(), page: newPage } })

  const renderPageNumbers = () => {
    const pages = []
    const showPages = 3

    pages.push(
      <Button
        href={changePage(1)}
        text="1"
        size="sm"
        color="secondary"
        class={`pagination__page-button ${page === 1 ? 'pagination__page-button--active' : ''}`}
      />
    )

    if (page > showPages + 2) {
      pages.push(<span>...</span>)
    }

    const startPage = Math.max(2, page - showPages)
    const endPage = Math.min(nbPages - 1, page + showPages)

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          href={changePage(i)}
          text={`${i}`}
          size="sm"
          color="secondary"
          class={`pagination__page-button ${page === i ? 'pagination__page-button--active' : ''}`}
        />
      )
    }

    if (page < nbPages - showPages - 1) {
      pages.push(<span>...</span>)
    }

    if (nbPages > 1) {
      pages.push(
        <Button
          href={changePage(nbPages)}
          text={`${nbPages}`}
          size="sm"
          color="secondary"
          class={`pagination__page-button ${page === nbPages ? 'pagination__page-button--active' : ''}`}
        />
      )
    }

    return pages
  }

  return (
    <div class="pagination flex gap-2 items-center mt-5">
      <>
        <ButtonIcon
          href={changePage(page - 1)}
          icon="fa-solid fa-angle-left"
          disabled={page === 1}
        />
        {renderPageNumbers()}
        <ButtonIcon
          href={changePage(page + 1)}
          icon="fa-solid fa-angle-right"
          disabled={page === nbPages}
        />
      </>
    </div>
  )
}
