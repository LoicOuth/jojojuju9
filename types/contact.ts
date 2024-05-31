export const ArrayContactProblem = ['install', 'link', 'update', 'other'] as const
export type ContactProblem = (typeof ArrayContactProblem)[number]

export const ContactProblemText: Record<ContactProblem, string> = {
  install: 'Un problème d’installation/Crack',
  link: 'Un/des lien(s) défectueux',
  update: 'Une mise à jour de crack/hack',
  other: 'Autre',
}

export const ContactProblemEmailText: Record<ContactProblem, string> = {
  install: "J'ai un problème d’installation/Crack",
  link: "J'ai trouvé un/des lien(s) défectueux",
  update: "J'ai un problème de mise à jour crack/hack",
  other: "J'ai un problème",
}
