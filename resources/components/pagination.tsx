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

  return (
    <div class="flex items-center gap-3 mt-5 ">
      <>
        <ButtonIcon
          href={changePage(page - 1)}
          icon="fa-solid fa-angle-left"
          disabled={page === 1}
        />
        {[...Array(nbPages)].map((_, i) => (
          <Button
            href={changePage(i + 1)}
            text={`${i + 1}`}
            size="sm"
            color="secondary"
            class={`pagination__page-button ${page === i + 1 ? 'pagination__page-button--active' : ''}`}
          />
        ))}
        <ButtonIcon
          href={changePage(page + 1)}
          icon="fa-solid fa-angle-right"
          disabled={page === nbPages}
        />
      </>
    </div>
  )
}
