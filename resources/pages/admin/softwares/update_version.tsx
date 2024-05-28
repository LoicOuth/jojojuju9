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
    <AdminLayout title="Mettre à jour les versions des jeux" returnHref={route('admin.softwares')}>
      <form action={`${route('admin.softwares.version.update')}?_method=PUT`} method="POST">
        {csrfField()}
        <div class="flex wrap gap-5">
          {softwares.map((software, index) => (
            <div class="flex items-center gap-2">
              <span>{software.name} :</span>
              <input
                type="hidden"
                name={`softwares[${index}][id]`}
                value={software.id.toString()}
              />
              <Form.Group name={`softwares[${index}][version]`} defaultValue={software.version} />
            </div>
          ))}
        </div>
        <Button text="Mettre à jour" type="submit" class="mt-5" />
      </form>
    </AdminLayout>
  )
}
