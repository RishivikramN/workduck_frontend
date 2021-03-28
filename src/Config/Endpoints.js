import config from "./config.json";

//User Endpoints
export const signupEndpoint = `${config.host}/api/users/registeruser`;
export const signinEndpoint = `${config.host}/api/users/signinuser`;

//Train Endpoints
export const trainRoutesEndpoint = `${config.host}/api/trainroutes/`;
export const getTrainEndpoint = `${config.host}/api/trains`;
export const bookSeatTrainEndpoint = `${config.host}/api/trains/bookseat`;
export const bookingHistoryTrainEndpoint = `${config.host}/api/trains/getbookinghistory`;
export const liveStatusTrainEndpoint = `${config.host}/api/trains/livestatus`;
export const trainTrafficTrainEndpoint = `${config.host}/api/trains/traintraffic`;