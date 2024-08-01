import { ThemeCookieKey, Themes } from '#types/common'
import { HttpContext } from '@adonisjs/core/http'

export default class ChangeThemeController {
  async handleChange({ request, response }: HttpContext) {
    const theme = request.plainCookie(ThemeCookieKey, Themes.Light) as Themes

    const newTheme = theme === Themes.Dark ? Themes.Light : Themes.Dark

    response.plainCookie(ThemeCookieKey, newTheme)
    return response.redirect().back()
  }
}
