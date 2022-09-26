import { PublicationState } from "./PublicationState";
export { PublicationState };
export type JSON = string;
export type DateTime = string;
export type Date = string;
export type Upload = string;
export interface IDFilterInput {
  and?: (string | null)[] | null;
  or?: (string | null)[] | null;
  not?: IDFilterInput | null;
  eq?: string | null;
  ne?: string | null;
  startsWith?: string | null;
  endsWith?: string | null;
  contains?: string | null;
  notContains?: string | null;
  containsi?: string | null;
  notContainsi?: string | null;
  gt?: string | null;
  gte?: string | null;
  lt?: string | null;
  lte?: string | null;
  null?: boolean | null;
  notNull?: boolean | null;
  in?: (string | null)[] | null;
  notIn?: (string | null)[] | null;
  between?: (string | null)[] | null;
}
export interface BooleanFilterInput {
  and?: (boolean | null)[] | null;
  or?: (boolean | null)[] | null;
  not?: BooleanFilterInput | null;
  eq?: boolean | null;
  ne?: boolean | null;
  startsWith?: boolean | null;
  endsWith?: boolean | null;
  contains?: boolean | null;
  notContains?: boolean | null;
  containsi?: boolean | null;
  notContainsi?: boolean | null;
  gt?: boolean | null;
  gte?: boolean | null;
  lt?: boolean | null;
  lte?: boolean | null;
  null?: boolean | null;
  notNull?: boolean | null;
  in?: (boolean | null)[] | null;
  notIn?: (boolean | null)[] | null;
  between?: (boolean | null)[] | null;
}
export interface StringFilterInput {
  and?: (string | null)[] | null;
  or?: (string | null)[] | null;
  not?: StringFilterInput | null;
  eq?: string | null;
  ne?: string | null;
  startsWith?: string | null;
  endsWith?: string | null;
  contains?: string | null;
  notContains?: string | null;
  containsi?: string | null;
  notContainsi?: string | null;
  gt?: string | null;
  gte?: string | null;
  lt?: string | null;
  lte?: string | null;
  null?: boolean | null;
  notNull?: boolean | null;
  in?: (string | null)[] | null;
  notIn?: (string | null)[] | null;
  between?: (string | null)[] | null;
}
export interface IntFilterInput {
  and?: (number | null)[] | null;
  or?: (number | null)[] | null;
  not?: IntFilterInput | null;
  eq?: number | null;
  ne?: number | null;
  startsWith?: number | null;
  endsWith?: number | null;
  contains?: number | null;
  notContains?: number | null;
  containsi?: number | null;
  notContainsi?: number | null;
  gt?: number | null;
  gte?: number | null;
  lt?: number | null;
  lte?: number | null;
  null?: boolean | null;
  notNull?: boolean | null;
  in?: (number | null)[] | null;
  notIn?: (number | null)[] | null;
  between?: (number | null)[] | null;
}
export interface FloatFilterInput {
  and?: (number | null)[] | null;
  or?: (number | null)[] | null;
  not?: FloatFilterInput | null;
  eq?: number | null;
  ne?: number | null;
  startsWith?: number | null;
  endsWith?: number | null;
  contains?: number | null;
  notContains?: number | null;
  containsi?: number | null;
  notContainsi?: number | null;
  gt?: number | null;
  gte?: number | null;
  lt?: number | null;
  lte?: number | null;
  null?: boolean | null;
  notNull?: boolean | null;
  in?: (number | null)[] | null;
  notIn?: (number | null)[] | null;
  between?: (number | null)[] | null;
}
export interface DateFilterInput {
  and?: (Date | null)[] | null;
  or?: (Date | null)[] | null;
  not?: DateFilterInput | null;
  eq?: Date | null;
  ne?: Date | null;
  startsWith?: Date | null;
  endsWith?: Date | null;
  contains?: Date | null;
  notContains?: Date | null;
  containsi?: Date | null;
  notContainsi?: Date | null;
  gt?: Date | null;
  gte?: Date | null;
  lt?: Date | null;
  lte?: Date | null;
  null?: boolean | null;
  notNull?: boolean | null;
  in?: (Date | null)[] | null;
  notIn?: (Date | null)[] | null;
  between?: (Date | null)[] | null;
}
export interface DateTimeFilterInput {
  and?: (DateTime | null)[] | null;
  or?: (DateTime | null)[] | null;
  not?: DateTimeFilterInput | null;
  eq?: DateTime | null;
  ne?: DateTime | null;
  startsWith?: DateTime | null;
  endsWith?: DateTime | null;
  contains?: DateTime | null;
  notContains?: DateTime | null;
  containsi?: DateTime | null;
  notContainsi?: DateTime | null;
  gt?: DateTime | null;
  gte?: DateTime | null;
  lt?: DateTime | null;
  lte?: DateTime | null;
  null?: boolean | null;
  notNull?: boolean | null;
  in?: (DateTime | null)[] | null;
  notIn?: (DateTime | null)[] | null;
  between?: (DateTime | null)[] | null;
}
export interface JSONFilterInput {
  and?: (JSON | null)[] | null;
  or?: (JSON | null)[] | null;
  not?: JSONFilterInput | null;
  eq?: JSON | null;
  ne?: JSON | null;
  startsWith?: JSON | null;
  endsWith?: JSON | null;
  contains?: JSON | null;
  notContains?: JSON | null;
  containsi?: JSON | null;
  notContainsi?: JSON | null;
  gt?: JSON | null;
  gte?: JSON | null;
  lt?: JSON | null;
  lte?: JSON | null;
  null?: boolean | null;
  notNull?: boolean | null;
  in?: (JSON | null)[] | null;
  notIn?: (JSON | null)[] | null;
  between?: (JSON | null)[] | null;
}
export interface UploadFileFiltersInput {
  id?: IDFilterInput | null;
  name?: StringFilterInput | null;
  alternativeText?: StringFilterInput | null;
  caption?: StringFilterInput | null;
  width?: IntFilterInput | null;
  height?: IntFilterInput | null;
  formats?: JSONFilterInput | null;
  hash?: StringFilterInput | null;
  ext?: StringFilterInput | null;
  mime?: StringFilterInput | null;
  size?: FloatFilterInput | null;
  url?: StringFilterInput | null;
  previewUrl?: StringFilterInput | null;
  provider?: StringFilterInput | null;
  provider_metadata?: JSONFilterInput | null;
  createdAt?: DateTimeFilterInput | null;
  updatedAt?: DateTimeFilterInput | null;
  and?: (UploadFileFiltersInput | null)[] | null;
  or?: (UploadFileFiltersInput | null)[] | null;
  not?: UploadFileFiltersInput | null;
}
export interface UploadFileInput {
  name?: string | null;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  formats?: JSON | null;
  hash?: string | null;
  ext?: string | null;
  mime?: string | null;
  size?: number | null;
  url?: string | null;
  previewUrl?: string | null;
  provider?: string | null;
  provider_metadata?: JSON | null;
}
export interface I18NLocaleFiltersInput {
  id?: IDFilterInput | null;
  name?: StringFilterInput | null;
  code?: StringFilterInput | null;
  createdAt?: DateTimeFilterInput | null;
  updatedAt?: DateTimeFilterInput | null;
  and?: (I18NLocaleFiltersInput | null)[] | null;
  or?: (I18NLocaleFiltersInput | null)[] | null;
  not?: I18NLocaleFiltersInput | null;
}
export interface UsersPermissionsPermissionFiltersInput {
  id?: IDFilterInput | null;
  action?: StringFilterInput | null;
  role?: UsersPermissionsRoleFiltersInput | null;
  createdAt?: DateTimeFilterInput | null;
  updatedAt?: DateTimeFilterInput | null;
  and?: (UsersPermissionsPermissionFiltersInput | null)[] | null;
  or?: (UsersPermissionsPermissionFiltersInput | null)[] | null;
  not?: UsersPermissionsPermissionFiltersInput | null;
}
export interface UsersPermissionsRoleFiltersInput {
  id?: IDFilterInput | null;
  name?: StringFilterInput | null;
  description?: StringFilterInput | null;
  type?: StringFilterInput | null;
  permissions?: UsersPermissionsPermissionFiltersInput | null;
  users?: UsersPermissionsUserFiltersInput | null;
  createdAt?: DateTimeFilterInput | null;
  updatedAt?: DateTimeFilterInput | null;
  and?: (UsersPermissionsRoleFiltersInput | null)[] | null;
  or?: (UsersPermissionsRoleFiltersInput | null)[] | null;
  not?: UsersPermissionsRoleFiltersInput | null;
}
export interface UsersPermissionsRoleInput {
  name?: string | null;
  description?: string | null;
  type?: string | null;
  permissions?: (string | null)[] | null;
  users?: (string | null)[] | null;
}
export interface UsersPermissionsUserFiltersInput {
  id?: IDFilterInput | null;
  username?: StringFilterInput | null;
  email?: StringFilterInput | null;
  provider?: StringFilterInput | null;
  password?: StringFilterInput | null;
  resetPasswordToken?: StringFilterInput | null;
  confirmationToken?: StringFilterInput | null;
  confirmed?: BooleanFilterInput | null;
  blocked?: BooleanFilterInput | null;
  role?: UsersPermissionsRoleFiltersInput | null;
  createdAt?: DateTimeFilterInput | null;
  updatedAt?: DateTimeFilterInput | null;
  and?: (UsersPermissionsUserFiltersInput | null)[] | null;
  or?: (UsersPermissionsUserFiltersInput | null)[] | null;
  not?: UsersPermissionsUserFiltersInput | null;
}
export interface UsersPermissionsUserInput {
  username?: string | null;
  email?: string | null;
  provider?: string | null;
  password?: string | null;
  resetPasswordToken?: string | null;
  confirmationToken?: string | null;
  confirmed?: boolean | null;
  blocked?: boolean | null;
  role?: string | null;
}
export interface ContactInput {
  linkedin?: string | null;
  instagram?: string | null;
  github?: string | null;
  codepen?: string | null;
  observablehq?: string | null;
  stackoverflow?: string | null;
  codesandbox?: string | null;
  publishedAt?: DateTime | null;
}
export interface PostFiltersInput {
  id?: IDFilterInput | null;
  title?: StringFilterInput | null;
  content?: StringFilterInput | null;
  tags?: TagFiltersInput | null;
  uid?: StringFilterInput | null;
  dateOverride?: DateFilterInput | null;
  createdAt?: DateTimeFilterInput | null;
  updatedAt?: DateTimeFilterInput | null;
  publishedAt?: DateTimeFilterInput | null;
  and?: (PostFiltersInput | null)[] | null;
  or?: (PostFiltersInput | null)[] | null;
  not?: PostFiltersInput | null;
}
export interface PostInput {
  title?: string | null;
  content?: string | null;
  tags?: (string | null)[] | null;
  uid?: string | null;
  dateOverride?: Date | null;
  publishedAt?: DateTime | null;
}
export interface TagFiltersInput {
  id?: IDFilterInput | null;
  label?: StringFilterInput | null;
  posts?: PostFiltersInput | null;
  key?: StringFilterInput | null;
  createdAt?: DateTimeFilterInput | null;
  updatedAt?: DateTimeFilterInput | null;
  and?: (TagFiltersInput | null)[] | null;
  or?: (TagFiltersInput | null)[] | null;
  not?: TagFiltersInput | null;
}
export interface TagInput {
  label?: string | null;
  posts?: (string | null)[] | null;
  key?: string | null;
}
export interface WorkInput {
  content?: string | null;
  publishedAt?: DateTime | null;
}
export interface FileInfoInput {
  name?: string | null;
  alternativeText?: string | null;
  caption?: string | null;
}
export interface UsersPermissionsRegisterInput {
  username: string;
  email: string;
  password: string;
}
export interface UsersPermissionsLoginInput {
  identifier: string;
  password: string;
  provider: string;
}
export interface PaginationArg {
  page?: number | null;
  pageSize?: number | null;
  start?: number | null;
  limit?: number | null;
}