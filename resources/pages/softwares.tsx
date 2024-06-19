import { Card } from '#components/card'
import { Chip } from '#components/chip'
import { Form } from '#components/forms/index'
import { Options } from '#components/forms/select'
import { Pagination } from '#components/pagination'
import { Search } from '#components/search'
import { AppLayout } from '#layouts/app.layout'
import Kind from '#models/kind'
import Software from '#models/software'
import { route } from '#start/view'
import { SortText } from '#types/sort'
import { HttpContext } from '@adonisjs/core/http'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

interface SoftwaresPageProps {
  softwares: ModelPaginatorContract<Software>
  kinds: Kind[]
}

export const SoftwaresPage = async (props: SoftwaresPageProps) => {
  const { softwares, kinds } = props
  const { request, auth } = HttpContext.getOrFail()
  await auth.check()

  const kindsOptions: Options[] = kinds.map((kind) => ({
    text: kind.name,
    value: kind.id,
  }))
  kindsOptions.unshift({ text: 'Filtrer par tag', value: 'null' })

  return (
    <AppLayout title="Logiciels">
      <div class="flex column mt-10 gap-5">
        <div class="max-width-wrapper">
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

                <Form.Select
                  name="tag"
                  options={kindsOptions}
                  defaultValue={request.qs().tag}
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
        </div>
        <div class="flex wrap justify-center gap-5 px-2">
          {softwares.map((software) => (
            <a class="games__item" href={route('softwares.show', { slug: software.slug })}>
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

                    <div class="flex wrap items-center gap-2 mt-2">
                      {software.version && <Chip text={software.version} color="success" />}
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
