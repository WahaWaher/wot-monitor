const {
  REACT_APP_AUTH_APP_ID,
  REACT_APP_AUTH_EXPIRES_AT,
  REACT_APP_AUTH_CHECK_TIIMEOUT,
} = process.env;

export const AUTH_EXPIRES_AT = Number(REACT_APP_AUTH_EXPIRES_AT) || undefined;

export { REACT_APP_AUTH_APP_ID, REACT_APP_AUTH_CHECK_TIIMEOUT };
