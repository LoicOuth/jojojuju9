import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

const checkUniqueField = async (db: Database, value: string, field: FieldContext) =>
  !(await db.from('users').where(field.name.toString(), value).first())

export const registerValidator = vine.compile(
  vine.object({
    username: vine.string().unique(checkUniqueField),
    email: vine.string().email().unique(checkUniqueField),
    password: vine.string().minLength(8).confirmed(),
  })
)
