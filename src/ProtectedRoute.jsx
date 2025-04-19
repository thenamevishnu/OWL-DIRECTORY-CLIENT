import { useSelector } from "react-redux"
import { Unauthorized } from "./pages/Unauthorized"
import { cookie } from "./Lib/cookie"
import { jwtDecode } from "jwt-decode"
import { PageNotFound } from "./pages/PageNotFound"

export const isAdmin = (email) => {
    if(!email) return false
    return email == import.meta.env.VITE_ADMIN_EMAIL
}

export const ProtectedRoute = ({ children }) => {
    const { email } = useSelector(state => state.user)
    const token = cookie.get()

    if (!email || !token) {
        return <Unauthorized />
    }
    try {
        const decoded = jwtDecode(token)
        const endTime = decoded.exp * 1000
        const currentTime = Date.now()
        if (!decoded || endTime < currentTime) {
            return <Unauthorized />
        }
        return children
    } catch (_err) {
        return <Unauthorized />
    }
}

export const AdminProtectedRoute = ({ children }) => {
    const { email } = useSelector(state => state.user)
    const token = cookie.get()
    if(!email || !token) {
        return <Unauthorized />
    }
    if(!isAdmin(email)) return <PageNotFound />
    try {
        const decoded = jwtDecode(token)
        const endTime = decoded.exp * 1000
        const currentTime = Date.now()
        if (!decoded || endTime < currentTime) {
            return <Unauthorized />
        }
        return children
    } catch (_err) {
        return <Unauthorized />
    }
}

