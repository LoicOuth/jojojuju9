export const ArraySettingsCode = [
  'defaultContent',
  'operateController',
  'utorrentLink',
  'winrarLink',
  'daemonLink',
] as const
export type SettingsCode = (typeof ArraySettingsCode)[number]
