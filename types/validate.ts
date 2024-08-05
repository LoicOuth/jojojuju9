import User from '#models/user'
import { DateTime } from 'luxon'

export type ValidateType = 'game' | 'software' | 'hack' | 'patch' | 'question'
export const ValidateTypeValue: Record<ValidateType, string> = {
  game: 'Jeu',
  software: 'Logiciel',
  hack: 'Hack',
  patch: 'Patch/fix/astuce',
  question: 'FAQ (question)',
}
export interface ValidateTableItem {
  id: number
  createdBy?: User
  name: string
  type: ValidateType
  createdAt: DateTime<boolean>
  deleteRoute: string
  editRoute: string
}
