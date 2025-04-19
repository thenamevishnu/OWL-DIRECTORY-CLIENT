import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toaster } from "../Lib/alert"
import { api } from "../axios"
import { FaTrash } from "react-icons/fa"

export const MyWebsites = () => {

    const theme = useSelector(state => state.theme)
    const { email } = useSelector(state => state.user)
    const [websites, setWebsites] = useState([])

    const getMyWebsites = async () => {
        try {
            const { data, status } = await api.get("/website/list", { params: { user: email } })
            if (status !== 200) return toaster.error(data.message)
            setWebsites(data.websites)
        } catch (error) {
            return toaster.error(error.response?.data.message || error.message || "Error while fetching websites. Please try again.")
        }
    }

    useEffect(() => {
        getMyWebsites()
    }, [])

    const handleDelete = async (id, website) => {
        const confirm = window.confirm(`Are you sure you want to delete ${website}?`)
        if (!confirm) return;
        try {
            const { data, status } = await api.delete(`/website/delete/${id}`)
            if (status !== 200) return toaster.error(data.message)
            const newWebsites = websites.filter(website => website._id !== id)
            setWebsites(newWebsites)
            return toaster.success(data.message)
        } catch (error) {
            return toaster.error(error.response?.data.message || error.message || "Error while deleting website. Please try again.")
        }
    }

    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {
            websites.map((website, index) => {
                return <div className="relative" key={index}>
                    <button className="text-red-400 cursor-pointer absolute z-1 top-2 right-1" onClick={() => handleDelete(website._id, website.url)}><FaTrash size={13}/></button>
                    <div className="bg-secondary group cursor-pointer hover:relative duration-300 shadow-md rounded-lg p-3 flex flex-col">
                        <div className="text-center">
                            <div className="flex justify-center">
                                <img src={website.icon} alt={website.title} className="w-10 h-10  rounded-full" />
                            </div>
                            <div>
                                <h2 className="truncate">{website.host_name}</h2>
                                <p className="text-sm truncate">{website.origin}</p>
                            </div>
                        </div>
                        <div className="max-h-0 text-center group-hover:max-h-[500px] transition-all ease-linear duration-500 overflow-hidden">
                            <h2 className="text-lg truncate my-1" style={{ color: theme.link_color }} onClick={() => window.open(website.url, "_blank")}>{website.title}</h2>
                            <p className="text-sm">{website.description.slice(0, 150).length > 150 ? website.description.slice(0, 150) + "..." : website.description}</p>
                        </div>
                    </div>
                </div>
            })
        }
    </div>
}