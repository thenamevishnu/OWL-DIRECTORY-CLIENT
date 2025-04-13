import { useSelector } from "react-redux"
import { Unauthorized } from "./pages/Unauthorized"
import { cookie } from "./Lib/cookie"
import { jwtDecode } from "jwt-decode"

export const ProtectedRoute = ({ children }) => {
    const { email } = useSelector(state => state.user)
    const token = cookie.get()

    if (!email || !token) {
        return <Unauthorized />
    }
    try {
        const decoded = jwtDecode(token)
        if (!decoded) {
            return <Unauthorized />
        }
        return children
    } catch (_err) {
        return <Unauthorized />
    }
}