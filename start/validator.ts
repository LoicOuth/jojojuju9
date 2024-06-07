import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { ValidationFields, ValidationMessages } from '@vinejs/vine/types'

const messages: ValidationMessages = {
  'required': 'Le champ {{ field }} est obligatoire',
  'database.unique': 'La valeur du champ {{ field }} est déjà utilisé',
  'minLength': 'Le champ {{ field }} doit contenir au moins {{ min }} caractères',
  'maxLength': 'Le champ {{ field }}  ne peut contenir plus de {{ max }} caractères',
  'confirmed': 'Le champ de confirmation {{ field }} ne correspond pas.',
}

const fields: ValidationFields = {
  username: 'pseudo',
  password: 'mot de passe',
  password_confirmation: 'confirmer le mot de passe',
  email: 'email',
  name: 'nom',
  content: 'contenu',
  developer: 'développeur',
  withDlc: 'avec tous les DLC',
  multiplayer: 'multijoueur',
  picture: 'image',
  memory: 'mémoire vive',
  os: "système d'exploitation",
  cpu: 'processeur',
  gpu: 'carte graphique',
  storage: 'stockage',
  requiredUtorrent: 'utorrent',
  requiredWinrar: 'winrar',
  requiredDaemon: 'daemon tools',
  link: 'lien de téléchargement',
  stringValue: 'valeur',
  decimalValue: 'valeur',
}

vine.messagesProvider = new SimpleMessagesProvider(messages, fields)
