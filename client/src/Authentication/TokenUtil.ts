import axios from "axios";

export const setHeaders = (token : string) => {
    axios.defaults.headers.common['x-auth-token'] = token;
}