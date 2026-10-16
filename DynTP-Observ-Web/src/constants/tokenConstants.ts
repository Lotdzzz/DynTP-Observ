/**
 * tokenService is used to storage the token in local storage and retrieve it when needed.
 */
export const tokenConstants = {
    // the key that store the token in local storage
    TOKEN_STORAGE_KEY: "token",
    // the authorization header prefix
    AUTHORIZATION_HEADER_PREFIX: "Bearer",
    // the expiry time of the token in hour -- prefix
    TOKEN_EXPIRY_TIME_KEY: "token_expiry_time",
    // the expiry time of the token in hour
    TOKEN_EXPIRY_TIME: 12 * 60 * 60 * 1000
}