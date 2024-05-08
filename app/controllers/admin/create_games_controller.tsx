import Kind from '#models/kind'
import { Admin } from '#pages/admin/index'

export default class CreateGamesController {
  async render() {
    const kinds = await Kind.all()

    return <Admin.Games.Create kinds={kinds} />
  }
}
