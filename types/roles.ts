export enum Role {
  Admin = 'admin',
  Moderator = 'moderator',
  Autor = 'autor',
}

export const RoleName = {
  [Role.Admin]: 'Administrateur',
  [Role.Moderator]: 'Modérateur',
  [Role.Autor]: 'Auteur',
}
