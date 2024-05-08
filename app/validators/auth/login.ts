import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string(),
  })
)
