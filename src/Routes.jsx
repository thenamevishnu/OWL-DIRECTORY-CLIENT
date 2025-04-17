import { BrowserRouter, Routes as Routers, Route, Navigate } from "react-router"
import { LandingPage } from "./pages/LandingPage"
import { SearchResults } from "./pages/SearchResults"
import { AddWebsite } from "./pages/AddWebsite"
import { ProtectedRoute } from "./ProtectedRoute"
import { useSelector } from "react-redux"
import { useEffect } from "react"

export const Routes = () => {
    
    const theme = useSelector(state => state.theme)

    useEffect(() => {
        const body = document.body.style
        body.color = theme.color
        body.backgroundImage = theme.background
    }, [theme])

    return <BrowserRouter>
        <Routers>
            <Route path="/">
                <Route path="" Component={LandingPage} />
                <Route path="search" Component={SearchResults} />

                <Route path="website">
                    <Route path="" element={<Navigate to="/" />} />
                    <Route path="add" element={<ProtectedRoute><AddWebsite /></ProtectedRoute>} />
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routers>
    </BrowserRouter>
}