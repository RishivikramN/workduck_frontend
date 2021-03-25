import config from "./config.json";

export const signupEndpoint = `${config.host}/api/users/registeruser`;
export const signinEndpoint = `${config.host}/api/users/signinuser`;