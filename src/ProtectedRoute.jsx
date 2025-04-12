import { useSelector } from "react-redux"
import { Navigate, useLocation, useNavigate } from "react-router"
import { toaster } from "./Lib/alert"
import { Unauthorized } from "./pages/Unauthorized"

export const ProtectedRoute = ({ children }) => {
    const { state } = useLocation()
    const { email } = useSelector(state => state.user)
    const redirect = useNavigate()

    if (!email) {
        return <Unauthorized />
    }
    return children
}