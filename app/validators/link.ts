import vine from '@vinejs/vine'

export const linkValidator = {
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
}
