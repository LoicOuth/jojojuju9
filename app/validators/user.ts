import { Role } from '#types/roles'
import vine from '@vinejs/vine'

export const changeRoleValidator = vine.compile(
  vine.object({
    [Role.Admin]: vine.boolean().optional(),
    [Role.Moderator]: vine.boolean().optional(),
    [Role.Autor]: vine.boolean().optional(),
  })
)
