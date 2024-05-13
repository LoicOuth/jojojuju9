export const ArraySettingsCode = [
  'defaultContent',
  'operateController',
  'utorrentLink',
  'winrarLink',
] as const
export type SettingsCode = (typeof ArraySettingsCode)[number]
