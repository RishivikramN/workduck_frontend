import config from "./config.json";

//User Endpoints
export const signupEndpoint = `${config.host}/api/users/registeruser`;
export const signinEndpoint = `${config.host}/api/users/signinuser`;

//Train Endpoints
export const trainRoutesEndpoint = `${config.host}/api/trainroutes/`;
export const getTrainEndpoint = `${config.host}/api/trains/`;