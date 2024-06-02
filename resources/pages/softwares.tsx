import { Card } from '#components/card'
import { Chip } from '#components/chip'
import { Form } from '#components/forms/index'
import { Pagination } from '#components/pagination'
import { Search } from '#components/search'
import { AppLayout } from '#layouts/app.layout'
import Software from '#models/software'
import { route } from '#start/view'
import { SortText } from '#types/sort'
import { HttpContext } from '@adonisjs/core/http'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

interface SoftwaresPageProps {
  softwares: ModelPaginatorContract<Software>
}

export const SoftwaresPage = async (props: SoftwaresPageProps) => {
  const { softwares } = props
  const { request, auth } = HttpContext.getOrFail()
  await auth.check()

  return (
    <AppLayout title="Logiciels">
      <div class="max-width-wrapper flex column mt-10 gap-5">
        <Card>
          <>
            <h4>Filtre</h4>
            <div class="flex items-center gap-5 mt-3 wrap">
              <Search placeholder="Rechercher un logiciel" />

              <Form.Select
                name="sort"
                options={Object.entries(SortText).map(([value, text]) => ({ text, value }))}
                defaultValue={request.qs().sort}
                query
              />

              {auth.user && (
                <Form.Checkbox
                  name="favorite"
                  title="Favoris"
                  defaultValue={request.qs().favorite}
                  query
                />
              )}
            </div>
          </>
        </Card>
        <div class="flex wrap gap-5">
          {softwares.map((software) => (
            <a class="flex-1 games__item" href={route('softwares.show', { slug: software.slug })}>
              <Card noPadding clickable>
                <>
                  <img src={software.picture} />
                  <div class="p-3 flex column">
                    <div class="flex items-center">
                      <span class="text-caption flex-1">
                        Mis à jour le {software.updatedAt.toLocaleString()}
                      </span>
                      <span>
                        {software.$extras.comments_count} <i class="fa-solid fa-comment ml-1" />
                      </span>
                    </div>

                    <h4>{software.name}</h4>

                    <div class="flex items-center gap-2 mt-2">
                      <Chip text={software.version} color="success" />
                    </div>

                    <div class="mt-2">
                      Tags: {software.kinds.map((kind) => kind.name).join(', ')}
                    </div>
                  </div>
                </>
              </Card>
            </a>
          ))}
        </div>

        <div class="flex justify-center">
          <Pagination nbPages={softwares.lastPage} />
        </div>
      </div>
    </AppLayout>
  )
}
