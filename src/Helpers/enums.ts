export enum ResponseCodes {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ResponseMessages {
  BAD_REQUEST = "Bad request!",
  NO_INFORMATION = "No information on that route!",
  NO_DATA = "No data was found by your ID",
  SUCCESS_REGISTRATION = "You was successfuly registered!",
  SUCCESS_SHUFFLE = "Shuffle done!",
  INTERNAL_SERVER_ERROR = "Oops... Something bad happens on server!",
  NO_PAIRS = "Oh... Seems like game doesn't start ¯_(ツ)_/¯",
  NOT_ENOUGH_PEOPLE = "You can shuffle only if registered more then 2 users.",
  NO_REGISTRATION_SLOTS = "You can't register now, wait when shuffle ends.",
}
