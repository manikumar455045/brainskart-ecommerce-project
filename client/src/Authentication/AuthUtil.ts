export const isLoggedIn = () : boolean => {
    return !!localStorage.getItem(process.env.REACT_APP_FEATURE_KEY as string)
}
export const getToken = () : string | null => {
    return localStorage.getItem(process.env.REACT_APP_FEATURE_KEY as string)
}