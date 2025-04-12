import { BrowserRouter, Routes as Routers, Route, Navigate } from "react-router"
import { LandingPage } from "./pages/LandingPage"
import { SearchResults } from "./pages/SearchResults"
import { AddWebsite } from "./pages/AddWebsite"
import { ProtectedRoute } from "./ProtectedRoute"

export const Routes = () => {
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