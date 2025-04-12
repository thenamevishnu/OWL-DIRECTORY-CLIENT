import { useState } from "react"
import { CgAdd } from "react-icons/cg"
import { toaster } from "../Lib/alert"
import { is_url } from "../Lib/url"
import { api } from "../axios"
import { ResultPreview } from "../components/ResultPreview"
import { MdAdd, MdRemoveCircle } from "react-icons/md"
import { useSelector } from "react-redux"

export const AddWebsite = () => {

    const { email } = useSelector(state => state.user)
    const [query, setQuery] = useState("")
    const [siteData, setSiteData] = useState(null)
    const [isFetching, setFetching] = useState(false)

    const handleAddSite = async (e) => {
        e.preventDefault()
        if (!query) {
            return toaster.error("Please enter a valid url")
        }
        const origin = is_url(query)
        if (!origin) {
            return toaster.error("Please enter a valid url")
        }
        try {
            setFetching(true)
            const { data } = await api.get("/url/fetch", {
                params: {
                    url: query
                }
            })
            data.origin = origin.origin
            data.host_name = origin.host_name
            data.url = query
            data.added = email
            setSiteData(data)
            setFetching(false)
            return setQuery("")
        } catch (err) {
            setFetching(false)
            return toaster.error(err.response?.data.message || "Error while fetching website. Please try again.")
        }
    }

    const handleLinkSubmit = async () => {
        if(!siteData) {
            return toaster.error("Please add a website first")
        }
        try {
            const { data } = await api.post("/url/add", siteData)
            return toaster.success(data.message)
        } catch (error) {
            return toaster.error(error.response?.data.message || "Error while adding website. Please try again.")
        }
    }

    return <div className="flex justify-center">
        <div className="w-full max-w-[700px]">
            <form className="w-full mt-10" onSubmit={handleAddSite}>
                <div className="w-full flex items-center bg-tertiary rounded-md">
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the web using text or url..." className="w-full p-2 outline-none"/>
                    {!isFetching && <button className="p-2 text-dim cursor-pointer"><CgAdd /></button>}
                    {isFetching && <div className="w-5 h-5 mr-2 border-light border-t-transparent border-b-transparent rounded-full border-2 animate-spin"></div>}
                </div>
            </form>
            <div className="my-3">
                {
                    siteData && <ResultPreview result={siteData}/>
                }
            </div>
            {
                siteData && <div className="flex gap-2">
                    <button onClick={handleLinkSubmit} className="flex w-full justify-center cursor-pointer items-center gap-1 border border-dim p-1 px-2 rounded"><MdAdd /> Submit</button>
                    <button onClick={() => setSiteData(null)} className="flex w-full justify-center cursor-pointer items-center gap-1 border border-dim p-1 px-2 rounded"><MdRemoveCircle /> Remove</button>
                </div>
            }
        </div>
    </div>
}