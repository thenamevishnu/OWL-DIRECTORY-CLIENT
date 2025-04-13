import { jwtDecode } from "jwt-decode"

const key = "OWL-TOKEN"

export const cookie = {
    set: token => {
        const decoded = jwtDecode(token)
        const expire = new Date(decoded.exp * 1000).toUTCString();
        document.cookie = `${key}=${token}; expires=${expire}; Secure`
    },
    get: () => {
        return document.cookie.replace(/(?:(?:^|.*;\s*)OWL-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    },
    remove: () => {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure;`
    }
}