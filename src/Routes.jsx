import { BrowserRouter, Routes as Routers, Route, Navigate } from "react-router"
import { LandingPage } from "./pages/LandingPage"
import { SearchResults } from "./pages/SearchResults"
import { AddWebsite } from "./pages/AddWebsite"

export const Routes = () => {
    return <BrowserRouter>
        <Routers>
            <Route path="/">
                <Route path="" Component={LandingPage} />
                <Route path="search" Component={SearchResults} />

                <Route path="website">
                    <Route path="" element={<Navigate to="/" />} />
                    <Route path="add" element={<AddWebsite />} />
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routers>
    </BrowserRouter>
}