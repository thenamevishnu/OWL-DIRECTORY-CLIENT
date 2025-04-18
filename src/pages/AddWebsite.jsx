import { useState } from "react"
import { CgAdd } from "react-icons/cg"
import { toaster } from "../Lib/alert"
import { is_url } from "../Lib/url"
import { api } from "../axios"
import { ResultPreview } from "../components/ResultPreview"
import { MdAdd, MdRemoveCircle } from "react-icons/md"
import { useSelector } from "react-redux"

export const AddWebsite = () => {

    const { email, meta_code } = useSelector(state => state.user)
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
            if (data.owl != meta_code) {
                setFetching(false)
                return toaster.error("Unable to add the website. Please ensure ownership or correct meta code addition.")
            }
            data.origin = origin.origin
            data.host_name = origin.host_name
            if (query.split("").reverse()[0] == "/") {
                const qr = query.split("")
                qr.pop()
                data.url = qr.join("")
            } else {
                data.url = query
            }
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
            setSiteData(null)
            return toaster.success(data.message)
        } catch (error) {
            setSiteData(null)
            return toaster.error(error.response?.data.message || "Error while adding website. Please try again.")
        }
    }

    return <div className="flex justify-center p-2 sm:p-10">
        <div className="w-full max-w-[700px]">
            <h1 className="text-xl xxs:text-3xl tracking-wide font-secondary font-bold text-center">ADD WEBSITE</h1>
            <form className="w-full mt-5" onSubmit={handleAddSite}>
                <div className="w-full flex items-center bg-secondary/50 rounded-md">
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter the url for adding..." className="w-full p-2 outline-none"/>
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
            <div className="mt-8 p-2 bg-secondary">
                <p>Before adding a website, make sure you added the meta tags correctly.</p>
                <p className="my-3">Place this meta tag in your head section:</p>
                <p className="text-nowrap font-mono overflow-scroll w-full">{`<meta name="owl-directory" content='${meta_code}'>`}</p>
            </div>
        </div>
    </div>
}