import { useState } from "react"
import { CgAdd } from "react-icons/cg"
import { toaster } from "../Lib/alert"
import { getUrlComponent, is_url } from "../Lib/url"

export const AddWebsite = () => {

    const [query, setQuery] = useState("")

    const handleAddSite = async (e) => {
        e.preventDefault()
        if (!query) {
            return toaster.error("Please enter a valid url")
        }
        const origin = is_url(query)
        if (!origin) {
            return toaster.error("Please enter a valid url")
        }
        const response = await getUrlComponent(query)
        if(response?.err) return toaster.error(response.err)
        response.origin = origin
        console.log(response);
        setQuery("")
    }

    return <div className="flex justify-center">
        <form className="w-full mt-10 max-w-[700px]" onSubmit={handleAddSite}>
            <div className="w-full flex items-center bg-tertiary rounded-md">
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the web using text or url..." className="w-full p-2 outline-none"/>
                <button className="p-2 text-dim cursor-pointer"><CgAdd/></button>
            </div>
        </form>
    </div>
}