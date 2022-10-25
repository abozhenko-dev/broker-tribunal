// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export enum LanguagesEnum {
  RU = "ru",
  EN = "en",
  DE = "de"
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export enum HttpStatusMessages {
  NOT_FOUND = "notFound",
  USER_NOT_EXIST = "userNotExist",
  USER_EXIST = "userAlreadyExist",
  INVALID_CREDENTIALS = "invalidCredentials",
  TOKEN_EXPIRED = "tokenExpired",
  INVALID_TOKEN = "invalidToken",
  UNAUTHORIZED = "unauthorized",
  FORBIDDEN = "forbidden",
  OK = "success",
  INTERNAL_SERVER_ERROR = "internalServerError",
  UNPROCESSABLE_ENTITY = "unprocessableEntity",
  BAD_REQUEST = "badRequest"
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export enum SortEnum {
  ASC = "asc",
  DESC = "desc"
}

export enum SortWithDefaultEnum {
  ASC = "asc",
  DESC = "desc",
  DEFAULT = "default"
}
