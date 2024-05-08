import { Button } from '#components/button'
import { Form } from '#components/forms/index'
import { AdminLayout } from '#layouts/admin.layout'
import Setting from '#models/setting'
import { csrfField, route } from '#start/view'

interface UpdateSettingProps {
  setting: Setting
}

export const UpdateSetting = (props: UpdateSettingProps) => {
  const { setting } = props

  return (
    <AdminLayout
      title={`Mettre à jour le paramètre ${setting.name}`}
      returnHref={route('admin.settings')}
    >
      <form
        action={`${route('admin.settings.update', { id: setting.id })}?_method=PUT`}
        class="flex column gap-5 p-5"
        method="POST"
        up-modal-scope
        up-layer="parent"
        up-target="body"
      >
        {csrfField()}
        {setting.decimalValue ? (
          <Form.Group
            type="number"
            title="Valeur"
            name="decimalValue"
            defaultValue={setting.decimalValue?.toString() || ''}
            required
          />
        ) : (
          <Form.RichText name="stringValue" defaultValue={setting.stringValue || ''} />
        )}

        <Button type="submit" text="Mettre à jour" />
      </form>
    </AdminLayout>
  )
}
