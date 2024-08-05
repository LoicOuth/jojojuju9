import { HttpContext } from '@adonisjs/core/http'
import Game from '#models/game'
import Hack from '#models/hack'
import Patch from '#models/patch'
import Question from '#models/question'
import Software from '#models/software'
import { Admin } from '#pages/admin/index'
import { ValidateType, ValidateTypeValue } from '#types/validate'
import { inject } from '@adonisjs/core'
import { ToastService } from '#services/toast.service'

export default class AdminFAQController {
  async render() {
    const questions = await Question.query().where('isValidated', false).preload('createdBy')
    const hacks = await Hack.query().where('isValidated', false).preload('createdBy')
    const patchs = await Patch.query().where('isValidated', false).preload('createdBy')
    const games = await Game.query().where('isValidated', false).preload('createdBy')
    const softwares = await Software.query().where('isValidated', false).preload('createdBy')

    return (
      <Admin.Validate.Index
        questions={questions}
        hacks={hacks}
        patchs={patchs}
        games={games}
        softwares={softwares}
      />
    )
  }

  @inject()
  async handle({ request, response }: HttpContext, toast: ToastService) {
    const type = request.param('type') as ValidateType
    const id = request.param('id') as number

    switch (type) {
      case 'game':
        await Game.query().where('id', id).update({ isValidated: true })
        break
      case 'software':
        await Software.query().where('id', id).update({ isValidated: true })
        break
      case 'hack':
        await Hack.query().where('id', id).update({ isValidated: true })
        break
      case 'patch':
        await Patch.query().where('id', id).update({ isValidated: true })
        break
      case 'question':
        await Question.query().where('id', id).update({ isValidated: true })
        break
    }

    toast.success(`Le ${ValidateTypeValue[type]} a été validé !`)

    return response.redirect().toRoute('admin.validate')
  }
}
