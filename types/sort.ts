export type Sort = 'updatedAtAsc' | 'updatedAtDesc' | 'nameAsc' | 'nameDesc'

export const SortText: Record<Sort, string> = {
  nameAsc: 'Nom croissant',
  nameDesc: 'Nom décroissant',
  updatedAtAsc: 'Date de mise à jour croissant',
  updatedAtDesc: 'Date de mise à jour décroissant',
}
