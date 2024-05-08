export enum Role {
  Admin,
  Moderator,
  Autor,
}

export const RoleName = {
  [Role.Admin]: 'Administrateur',
  [Role.Moderator]: 'Modérateur',
  [Role.Autor]: 'Auteur',
}
