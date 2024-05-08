import vine from '@vinejs/vine'

export const kindsValidator = {
  kinds: vine
    .array(
      vine.object({
        name: vine.string().maxLength(255),
        id: vine.number().optional(),
      })
    )
    .optional(),
}
