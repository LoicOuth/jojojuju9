import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

export const createGameValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .unique(
        async (db: Database, value: string, field: FieldContext) =>
          !(await db.from('games').where(field.name.toString(), value).first())
      ),
    description: vine.string().maxLength(255),
    content: vine.string(),
    developer: vine.string().maxLength(255),
    version: vine.string().maxLength(255),
    mode: vine.string().maxLength(255),
    withDlc: vine.boolean().optional(),
    multiplayer: vine.boolean().optional(),
    picture: vine.file({ extnames: ['png', 'jpg', 'jpeg'], size: '20mb' }),
    memory: vine.string().maxLength(255),
    os: vine.string().maxLength(255),
    cpu: vine.string().maxLength(255),
    gpu: vine.string().maxLength(255),
    storage: vine.string().maxLength(255),
    links: vine
      .array(
        vine.object({
          name: vine.string().maxLength(255),
          url: vine.string().url(),
          multiplayer: vine.boolean().optional(),
          requiredUtorrent: vine.boolean().optional(),
          requiredWinrar: vine.boolean().optional(),
        })
      )
      .optional(),
  })
)
