import { BrowserRouter, Routes as Routers, Route, Navigate } from "react-router"
import { LandingPage } from "./pages/LandingPage"
import { SearchResults } from "./pages/SearchResults"
import { AddWebsite } from "./pages/AddWebsite"
import { AdminProtectedRoute, ProtectedRoute } from "./ProtectedRoute"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { MyWebsites } from "./pages/MyWebsites"
import { PageNotFound } from "./pages/PageNotFound"
import { AdminDashboard } from "./pages/Admins/Dashboard"

export const Routes = () => {
    
    const theme = useSelector(state => state.theme)

    useEffect(() => {
        const body = document.body.style
        body.color = theme.color
        body.backgroundImage = theme.background
    }, [theme.color, theme.background])

    return <BrowserRouter>
        <Routers>
            <Route path="/">
                <Route path="" Component={LandingPage} />
                <Route path="search" Component={SearchResults} />

                <Route path="website">
                    <Route path="" element={<Navigate to="/" />} />
                    <Route path="add" element={<ProtectedRoute><AddWebsite /></ProtectedRoute>} />
                    <Route path="list" element={<ProtectedRoute><MyWebsites /></ProtectedRoute>} />
                </Route>

                <Route path="admin">
                    <Route path="" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
                </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routers>
    </BrowserRouter>
}