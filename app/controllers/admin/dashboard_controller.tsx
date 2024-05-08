import User from '#models/user'
import { Admin } from '#pages/admin/index'

export default class DashboardController {
  async render() {
    const users = await User.all()

    return <Admin.Dashboard userCount={users.length} />
  }
}
