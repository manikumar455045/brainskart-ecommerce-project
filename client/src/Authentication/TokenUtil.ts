import axios from "axios";

export const setHeaders = (token : string) => {
    axios.defaults.headers.common['x-auth-token'] = token;
}
export const setStripeKey = () => {
    axios.defaults.headers.common['Authorization'] = `Authorization: Bearer pk_test_51JfS69SEbowm0GHsaEoXhfueRmaKcDU41XxXrIIUXG1ghCEaheCEoFt5UXuqRUXqkh4ZDg9OqhfwGBPvbvspILc200v4LkSV2u`;
}