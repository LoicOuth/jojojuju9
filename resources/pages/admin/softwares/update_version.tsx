import { Button } from '#components/button'
import { Form } from '#components/forms/index'
import { AdminLayout } from '#layouts/admin.layout'
import Software from '#models/software'
import { csrfField, route } from '#start/view'

interface UpdateVersionSoftwaresProps {
  softwares: Software[]
}

export const UpdateVersionSoftwares = (props: UpdateVersionSoftwaresProps) => {
  const { softwares } = props

  return (
    <AdminLayout
      title="Mettre à jour les versions des logiciels"
      returnHref={route('admin.softwares')}
    >
      <form
        action={`${route('admin.softwares.version.update')}?_method=PUT`}
        method="POST"
        enctype="multipart/form-data"
      >
        {csrfField()}
        <div id="update-version-container" class="flex column gap-5">
          <input
            id="version-search"
            type="search"
            class="form_control form__search"
            placeholder="Rechercher un logiciel"
            oninput="search()"
          />
          {softwares.map((software, index) => (
            <div id={software.name} class="flex items-center gap-2">
              <input
                type="hidden"
                name={`softwares[${index}][id]`}
                value={software.id.toString()}
              />
              <Form.Group
                title={software.name}
                name={`softwares[${index}][version]`}
                defaultValue={software.version || ''}
              />
            </div>
          ))}
        </div>
        <Button text="Mettre à jour" type="submit" class="mt-5" />
      </form>
    </AdminLayout>
  )
}
