import vine from '@vinejs/vine'

export const linkValidator = {
  links: vine
    .array(
      vine.object({
        id: vine.number().optional(),
        name: vine.string().maxLength(255).optional(),
        url: vine.string(),
        multiplayer: vine.boolean().optional(),
        requiredUtorrent: vine.boolean().optional(),
        requiredWinrar: vine.boolean().optional(),
        requiredDaemon: vine.boolean().optional(),
      })
    )
    .optional(),
}
