import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'
import { linkValidator } from '#validators/link'
import { kindsValidator } from '#validators/kind'

const gameValidator = {
  description: vine.string(),
  content: vine.string(),
  developer: vine.string().maxLength(255),
  version: vine.string().maxLength(255).optional(),
  mode: vine.string().maxLength(255),
  withDlc: vine.boolean().optional(),
  multiplayer: vine.boolean().optional(),
  picture: vine.file({ extnames: ['png', 'jpg', 'jpeg'], size: '20mb' }),
  memory: vine.string().maxLength(255),
  os: vine.string().maxLength(255),
  cpu: vine.string().maxLength(255),
  gpu: vine.string().maxLength(255),
  storage: vine.string().maxLength(255),
  youtube: vine.string().url().optional(),
}

export const createGameValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .unique(
        async (db: Database, value: string, field: FieldContext) =>
          !(await db.from('games').where(field.name.toString(), value).first())
      ),
    ...gameValidator,
    ...linkValidator,
    ...kindsValidator,
  })
)

export const updateGameValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .unique(
        async (db: Database, value: string, field: FieldContext) =>
          !(await db
            .from('games')
            .whereNot('id', field.meta.id)
            .where(field.name.toString(), value)
            .first())
      ),
    ...gameValidator,
    picture: vine.file({ extnames: ['png', 'jpg', 'jpeg'], size: '20mb' }).optional(),
    ...linkValidator,
    ...kindsValidator,
  })
)
