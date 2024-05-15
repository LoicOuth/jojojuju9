import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'
import { linkValidator } from '#validators/link'
import { kindsValidator } from '#validators/kind'

const softwareValidator = {
  description: vine.string(),
  content: vine.string(),
  developer: vine.string().maxLength(255),
  version: vine.string().maxLength(255),
  picture: vine.file({ extnames: ['png', 'jpg', 'jpeg'], size: '20mb' }),
  os: vine.string().maxLength(255),
  storage: vine.string().maxLength(255),
}

export const createSoftwareValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .unique(
        async (db: Database, value: string, field: FieldContext) =>
          !(await db.from('softwares').where(field.name.toString(), value).first())
      ),
    ...softwareValidator,
    ...linkValidator,
    ...kindsValidator,
  })
)

export const updateSoftwareValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .unique(
        async (db: Database, value: string, field: FieldContext) =>
          !(await db
            .from('softwares')
            .whereNot('id', field.meta.id)
            .where(field.name.toString(), value)
            .first())
      ),
    ...softwareValidator,
    picture: vine.file({ extnames: ['png', 'jpg', 'jpeg'], size: '20mb' }).optional(),
    ...linkValidator,
    ...kindsValidator,
  })
)
